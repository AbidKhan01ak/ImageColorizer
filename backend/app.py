from flask import Flask, request, jsonify, send_from_directory, send_file
import os
from flask_cors import CORS
import numpy as np 
import cv2

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
UPLOAD_FOLDER = 'static/uploads'
RESULT_FOLDER = 'static/output'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

if not os.path.exists(RESULT_FOLDER):
    os.makedirs(RESULT_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = RESULT_FOLDER

net = cv2.dnn.readNetFromCaffe('./backend/models/colorization_deploy_v2.prototxt','./backend/models/colorization_release_v0.caffemodel')
pts = np.load('./backend/models/pts_in_hull.npy')

class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2,313,1,1)

net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1,313],2.606,dtype='float32')]

def colorize_image(image_path):
    image = cv2.imread(image_path)
    scaled = image.astype("float32")/255.0
    lab = cv2.cvtColor(scaled,cv2.COLOR_BGR2LAB)

    resized = cv2.resize(lab,(224,224))
    L = cv2.split(resized)[0]
    L -= 50

    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1,2,0))
    ab = cv2.resize(ab, (image.shape[1],image.shape[0]))

    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:,:,np.newaxis], ab), axis=2)

    colorized = cv2.cvtColor(colorized,cv2.COLOR_LAB2BGR)
    colorized = np.clip(colorized,0,1)
    colorized = (255 * colorized).astype("uint8")

    filename = os.path.basename(image_path)
    result_path = os.path.join(app.config['RESULT_FOLDER'], filename)
    cv2.imwrite(result_path, colorized)

    return result_path

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/')
def index():
    return 'Flask backend is running!'

@app.route('/upload', methods=['POST'])
def upload_file():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400
    
    file = request.files['file']

    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400
    
    if file and allowed_file(file.filename):
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        colorized_image_path = colorize_image(file_path)
        # Return the relative path to the React frontend
        return jsonify({
            'output_url': f'/output/{os.path.basename(colorized_image_path)}',
            'original_url': f'/uploads/{filename}'
        })
    
    return jsonify({'error': 'Invalid file format'}), 400

@app.route('/uploads/<filename>')
def uploaded_file(filename):
    return send_from_directory(app.config['UPLOAD_FOLDER'], filename)

@app.route('/output/<filename>')
def output_file(filename):
    file_path = os.path.join(app.config['RESULT_FOLDER'], filename)
    return send_file(file_path, as_attachment=True)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
