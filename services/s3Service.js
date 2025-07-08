const { S3Client, PutObjectCommand, GetObjectCommand, ListObjectsV2Command } = require('@aws-sdk/client-s3');
const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');
const fs = require('fs');
const path = require('path');
const { BUCKET_NAME, REGION, SIGNED_URL_EXPIRY } = require('../config');

const s3 = new S3Client({ region: REGION });

async function uploadImage(file) {
  const uploadParams = {
    Bucket: BUCKET_NAME,
    Key: file.originalname,
    Body: fs.createReadStream(file.path),
    ContentType: file.mimetype,
  };

  await s3.send(new PutObjectCommand(uploadParams));
  fs.unlinkSync(file.path);

  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: file.originalname });
 const signedUrl = await getSignedUrl(s3, command, { expiresIn: SIGNED_URL_EXPIRY });

  return { key: file.originalname, signedUrl };
}

async function getImageUrl(key) {
  const command = new GetObjectCommand({ Bucket: BUCKET_NAME, Key: key });
  return await getSignedUrl(s3, command, { expiresIn: 60 });
}

async function listImages() {
  const command = new ListObjectsV2Command({ Bucket: BUCKET_NAME });
  const response = await s3.send(command);
  return (response.Contents || []).map(obj => obj.Key);
}

module.exports = {
  uploadImage,
  getImageUrl,
  listImages,
};
