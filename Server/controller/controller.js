import multer from 'multer';
import fs from 'fs'
import { fileURLToPath } from 'url';
import path from 'path'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


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
      
        const filename = req.query.filename; // Get filename from query params
        console.log(filename)
        if (!filename) {
            return res.status(400).json({ error: 'Filename is required' });
        }

        // Adjust the file path to access the uploads folder outside the controller folder
        const filePath = path.join(__dirname, '..', 'uploads', filename); // '..' goes one level up
console.log(filePath);

        // Check if the file exists
        if (!fs.existsSync(filePath)) {
            return res.status(404).json({ error: 'File not found' });
        }

        // Send the file to the client
        res.sendFile(filePath);
    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'An internal server error occurred' });
    }
};
