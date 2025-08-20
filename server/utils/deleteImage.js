const cloudinary = require("./cloudinary");

const deleteImage = async(imageId) => {
    try {
        // const parts = image.split("/");
        // const uploadIndex = parts.indexOf("upload");
        // const publicIdWithExt = parts.slice(uploadIndex + 2).join("/"); 
        // const publicId = publicIdWithExt.substring(0, publicIdWithExt.lastIndexOf(".")); 
        
        const result = await cloudinary.uploader.destroy(imageId);
        
        return result;
    } catch (err) {
        //console.log(err)
        process.exit(1)
    }
}

module.exports = deleteImage;