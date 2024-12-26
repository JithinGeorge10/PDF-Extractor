import multer from 'multer';


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
        console.log('File uploaded:', req.file);
        res.status(200).json({ message: 'File uploaded successfully!', file: req.file });
    });
};
