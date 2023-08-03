const S3 = require("aws-sdk/clients/s3");
const fs = require("fs");

const dotenv = require("dotenv");
dotenv.config();

// setting credentials to access the bucket
const s3 = new S3({
  region: process.env.AWS_REGION,
  accessKeyId: process.env.AWS_ACCESS_KEY,
  secretAccessKey: process.env.AWS_SECRET_KEY,
});

// function to upload file to s3 bucket
const upload_file = (file, source) => {
  const fileStream = fs.createReadStream(file.path);
  const file_type = file.mimetype.split("/")[1];

  const uploadParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Body: fileStream,
    Key: `${source.from}/${source.record_id}_${file.filename}.${file_type}`,
  };

  return s3.upload(uploadParams).promise();
};

module.exports = {
  upload_file,
};
