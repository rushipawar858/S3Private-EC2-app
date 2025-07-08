require('dotenv').config();
module.exports = {
  BUCKET_NAME: process.env.BUCKET_NAME,
  REGION: process.env.REGION,
  SIGNED_URL_EXPIRY: parseInt(process.env.SIGNED_URL_EXPIRY, 10) || 60,
  PORT: process.env.PORT || 3000,
};
