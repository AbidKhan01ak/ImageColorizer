import numpy as np
import cv2
import os
from config import Config
import logging

logger = logging.getLogger(__name__)
def ensure_model_files(model_files):
    """Ensure all required model files are downloaded."""
    from s3_utils import download_from_s3

    for filename, file_key in model_files.items():
        file_path = os.path.join(Config.MODEL_FOLDER, filename)
        if not os.path.exists(file_path):
            download_from_s3(file_key, file_path)
    logger.info("All model files are ready.")

def initialize_network():
    """Initialize the colorization network."""
    net = cv2.dnn.readNetFromCaffe(
        os.path.join(Config.MODEL_FOLDER, 'colorization_deploy_v2.prototxt'),
        os.path.join(Config.MODEL_FOLDER, 'colorization_release_v0.caffemodel')
    )
    pts = np.load(os.path.join(Config.MODEL_FOLDER, 'pts_in_hull.npy'))
    pts = pts.transpose().reshape(2, 313, 1, 1)

    class8 = net.getLayerId("class8_ab")
    conv8 = net.getLayerId("conv8_313_rh")

    net.getLayer(class8).blobs = [pts.astype("float32")]
    net.getLayer(conv8).blobs = [np.full([1, 313], 2.606, dtype='float32')]

    return net

def colorize_image(image_path, net):
    """Colorize the input image."""
    image = cv2.imread(image_path)
    scaled = image.astype("float32") / 255.0
    lab = cv2.cvtColor(scaled, cv2.COLOR_BGR2LAB)

    resized = cv2.resize(lab, (224, 224))
    L = cv2.split(resized)[0]
    L -= 50

    net.setInput(cv2.dnn.blobFromImage(L))
    ab = net.forward()[0, :, :, :].transpose((1, 2, 0))
    ab = cv2.resize(ab, (image.shape[1], image.shape[0]))

    L = cv2.split(lab)[0]
    colorized = np.concatenate((L[:, :, np.newaxis], ab), axis=2)

    colorized = cv2.cvtColor(colorized, cv2.COLOR_LAB2BGR)
    colorized = np.clip(colorized, 0, 1)
    colorized = (255 * colorized).astype("uint8")

    filename = os.path.basename(image_path)
    result_path = os.path.join(Config.RESULT_FOLDER, filename)
    cv2.imwrite(result_path, colorized)

    return result_path
