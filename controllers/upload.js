import multer from "multer";
import path from "path";
import Image from "../models/image.js";

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    },
});

export const upload = multer({ storage: storage });

export const uploadFile = async (req, res) => {
    try {
        const filename = req.file.filename;
        const image = new Image({
            data: req.file.filename,
            contentType: req.file.mimetype,
        });
        await image.save();
        res.status(201).json({ filename : filename, message: 'Image uploaded successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Image uploaded failed' });
    }

};