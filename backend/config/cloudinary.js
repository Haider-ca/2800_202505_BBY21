const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY,
  api_secret: process.env.CLOUD_API_SECRET
});

console.log("🔧 Cloudinary config loaded:", {
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_API_KEY ? '[OK]' : '[MISSING]',
  api_secret: process.env.CLOUD_API_SECRET ? '[OK]' : '[MISSING]'
});


module.exports = cloudinary;
