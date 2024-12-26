import multer from 'multer';
import fs from 'fs'
import path from 'path'
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`);
    }
});

export const upload = multer({
    storage,
    fileFilter: (req, file, cb) => {

        if (file.mimetype === 'application/pdf') {
            cb(null, true);
        } else {
            cb(new Error('Only PDF files are allowed!'), false);
        }
    }
}).single('file');

export const uploadPdfController = (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            console.error('File upload error:', err);
            return res.status(400).json({ message: err.message });
        }
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
    });
};
export const retrievePdfController = (req, res) => {
    try {
        const filename = req.query.filename;
        console.log(filename)
    } catch (error) {
        console.error('Server error:', error);

    }
};

