import fs from "fs";
import sharp from "sharp";

export async function imageResize(filePath: string) {
  console.log("checking image");
  console.log([{ filePath }]);
  try {
    if (!fs.existsSync(filePath)) {
      console.log("file does'nt exist");
      return await setDefaultProfileImage(filePath);
    } else {
      const file = fs.readFileSync(filePath);
      const image = await sharp(filePath).metadata();
      const maxWidth = 212; // Maximum width in pixels
      const maxHeight = 237; // Maximum height in pixels
      if (image.width! > maxWidth || image.height! > maxHeight) {
        console.log("trying to resize image");
        const resizedImage = await sharp(file)
          .resize({ width: maxWidth, height: maxHeight })
          .toBuffer();
        await fs.writeFileSync(filePath, resizedImage);
      }
    }
  } catch (error) {
    return error;
  }
}
async function setDefaultProfileImage(destinationFilePath: string) {
  const defaultProfileImage = "./images/assests/profile_icon.jpeg";
  console.log("running copy");
  try {
    const readDefaultImage = fs.readFileSync(defaultProfileImage);
    fs.writeFileSync(destinationFilePath + ".jpeg", readDefaultImage);
  } catch (error) {
    return error;
  }
}
