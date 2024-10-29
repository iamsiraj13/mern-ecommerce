const fs = require("fs");

const deleteImage = async (userImagePath) => {
  try {
    await fs.access(userImagePath);
    await fs.unlink(userImagePath);
    console.log("Image was deletd");
  } catch (error) {
    console.log("Image does not exist");
  }
  s;
};

module.exports = deleteImage;
