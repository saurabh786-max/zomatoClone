// middlewares/multer.middleware.js

import multer from "multer";

// Use memoryStorage for cloud services like ImageKit.
// This stores the entire file content as a Buffer in req.file.buffer.
const storage = multer.memoryStorage(); 

export const upload = multer({
    storage: storage,
    // Optional: Add file size limits to prevent abuse (e.g., 50MB)
    limits: { 
        fileSize: 50 * 1024 * 1024 // 50MB limit
    }
});