import numpy as np 
import cv2
import sys

# Accept file paths from the command-line arguments
input_image_path = sys.argv[1]  # Path to the uploaded image
output_image_path = sys.argv[2]  # Path to save the colorized image

#pretained model loaded
net = cv2.dnn.readNetFromCaffe('colorization_deploy_v2.prototxt','colorization_release_v0.caffemodel')
pts = np.load('pts_in_hull.npy')

# Set up the network layers
class8 = net.getLayerId("class8_ab")
conv8 = net.getLayerId("conv8_313_rh")
pts = pts.transpose().reshape(2,313,1,1)

net.getLayer(class8).blobs = [pts.astype("float32")]
net.getLayer(conv8).blobs = [np.full([1,313],2.606,dtype='float32')]

# Read the image
image = cv2.imread(input_image_path)

# Check if image is loaded correctly
if image is None:
    print(f"Error: Unable to load image from {input_image_path}")
    sys.exit()

# Preprocess the image
scaled = image.astype("float32")/255.0
lab = cv2.cvtColor(scaled,cv2.COLOR_BGR2LAB)
resized = cv2.resize(lab,(224,224))
L = cv2.split(resized)[0]
L -= 50

# Apply the model to predict color
net.setInput(cv2.dnn.blobFromImage(L))
ab = net.forward()[0, :, :, :].transpose((1,2,0))

# Resize and merge the colorized components
ab = cv2.resize(ab, (image.shape[1],image.shape[0]))
L = cv2.split(lab)[0]
colorized = np.concatenate((L[:,:,np.newaxis], ab), axis=2)

# Convert to BGR and clip the values
colorized = cv2.cvtColor(colorized,cv2.COLOR_LAB2BGR)
colorized = np.clip(colorized,0,1)
colorized = (255 * colorized).astype("uint8")

# Save the colorized image
cv2.imwrite(output_image_path, colorized)
if cv2.imwrite(output_image_path, colorized):
    print(f"Colorized image saved at: {output_image_path}")
else:
    print(f"Error: Failed to save the colorized image at: {output_image_path}")


cv2.imshow("Original",image)
cv2.imshow("Colorized",colorized)
cv2.waitKey(0)