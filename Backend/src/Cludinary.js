
export const cloudnaryUpload = async (filePath, folder = "Uploads") => {
 if(!lfilePath) throw new Error("File path is required for upload.");
 try {
    const result = await cloundary.uploader.upload(filePath, {
        folder,
        resource_type: "image",
    });
    await fs.promises.unlink(filePath); // Delete the local file after successful upload
    return {
        url: result.secure_url,
        public_id: result.public_id,
    }
 } catch (error) {
    throw new Error("Error uploading file to Cloudinary");
 }
}