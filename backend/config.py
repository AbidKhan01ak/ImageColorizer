import os

class Config:
    UPLOAD_FOLDER = 'static/uploads'
    RESULT_FOLDER = 'static/output'
    MODEL_FOLDER = './models'
    ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

    # AWS S3 credentials
    AWS_BUCKET_NAME = os.getenv('AWS_BUCKET_NAME')
    AWS_ACCESS_KEY = os.getenv('AWS_ACCESS_KEY')
    AWS_SECRET_KEY = os.getenv('AWS_SECRET_KEY')
