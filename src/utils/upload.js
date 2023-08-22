import { v2 as cloudinary } from "cloudinary";
import streamifier from "streamifier";

const handleUpload = async (req) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });

  return new Promise((resolve, reject) => {
    let stream = cloudinary.uploader.upload_stream(function (error, result) {
      if (result) {
        resolve(result);
      } else {
        reject(error);
      }
    });

    return streamifier.createReadStream(req.file.buffer).pipe(stream);
  });
};

export default handleUpload;
