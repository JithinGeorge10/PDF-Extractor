export const uploadPdfController =  (req, res) => {
    try {
        console.log(req.body) 
        res.send('File uploaded successfully')
    } catch (error) {
        console.log(error);
    }
}
