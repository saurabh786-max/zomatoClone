// src/utils/imagekit.js

import ImageKit from "@imagekit/nodejs";

// Use a unique, capitalized name for the instance here
const ImageKitInstance = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

async function uploadFile(file, fileName) {
    // 🛑 Call the upload method on the unique instance name
    const result = await ImageKitInstance.files.upload({
        file: file,
        fileName: fileName,
        useUniqueFileName: true

    });

    console.log(result);
}

// ⚠️ We only export the function, and also the instance if needed for other methods
export { uploadFile, ImageKitInstance };