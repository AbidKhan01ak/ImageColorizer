import boto3
from botocore.exceptions import ClientError
import logging
from config import Config

logger = logging.getLogger(__name__)

def get_s3_client():
    """Create and return an S3 client."""
    return boto3.client('s3', aws_access_key_id=Config.AWS_ACCESS_KEY,
                        aws_secret_access_key=Config.AWS_SECRET_KEY)

def download_from_s3(file_key, destination):
    """Download a file from S3."""
    s3_client = get_s3_client()
    try:
        s3_client.head_object(Bucket=Config.AWS_BUCKET_NAME, Key=file_key)
        logger.info(f"Downloading {file_key} from S3...")
        s3_client.download_file(Config.AWS_BUCKET_NAME, file_key, destination)
        logger.info(f"Downloaded {destination}")
    except ClientError as e:
        if e.response['Error']['Code'] == '404':
            logger.error(f"Error: The file {file_key} does not exist in S3 bucket.")
        else:
            logger.error(f"Failed to download file from S3: {e}")
