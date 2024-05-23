const cloudinary=require("cloudinary").v2

exports.imageUploadToCloudinary=async(file,folder,height,quality)=>{
   const options={folder};

   if(height){
    options.height=height;
   }
    console.log("file",file)
   if(quality){
    options.quality=quality;
   }
   options.resource_type = "auto";

const data=await cloudinary.uploader.upload(file.tempFilePath,options);
console.log("data",data)
}