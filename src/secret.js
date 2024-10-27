require("dotenv").config();
const serverPort = process.env.PORT || 5000;
const db_url = process.env.DB_URL;
const default_user_image_path = process.env.DEFAULT_USER_IMAGE_PATH;

module.exports = {
  serverPort,
  db_url,
  default_user_image_path,
};
