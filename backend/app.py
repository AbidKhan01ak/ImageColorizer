from flask import Flask, request, jsonify, send_from_directory, send_file
from flask_cors import CORS
from colorization import initialize_network, colorize_image, ensure_model_files
from config import Config
import os
import logging

# Initialize the app and logging
app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])
logging.basicConfig(level=logging.INFO)

# Initialize directories
if not os.path.exists(Config.UPLOAD_FOLDER):
    os.makedirs(Config.UPLOAD_FOLDER)

if not os.path.exists(Config.RESULT_FOLDER):
    os.makedirs(Config.RESULT_FOLDER)

app.config['UPLOAD_FOLDER'] = Config.UPLOAD_FOLDER
app.config['RESULT_FOLDER'] = Config.RESULT_FOLDER

# Ensure model files are ready and initialize the colorization network
MODEL_FILES = {
    "colorization_release_v0.caffemodel": "colorization_release_v0.caffemodel",
}
ensure_model_files(MODEL_FILES)
net = initialize_network()

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in Config.ALLOWED_EXTENSIONS

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
        colorized_image_path = colorize_image(file_path, net)
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
