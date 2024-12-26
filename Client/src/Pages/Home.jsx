import React from 'react'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';
import { HOST } from '../utils/Constants';
function Home() {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/pdf';

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file && file.type === 'application/pdf') {
                setSelectedFile(file);
                const formData = new FormData();
                formData.append('file', file);
                console.log(formData)
                try {
                    console.log({ HOST })
                    const response = await axios.post(`${HOST}/api/uploadPdf`, formData, {
                        headers: {},
                        withCredentials: true
                    })
                    if (response.status === 200) {
                        toast.success('File uploaded successfully!');
                    } else {
                        toast.error('Failed to upload file');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error);
                    toast.error('An error occurred while uploading the file');
                }
            } else {
                toast.error('Please select a valid PDF file');
            }
        };

        fileInput.click();
    };
    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" />
            <div className="container">
                <h1>Select a PDF file and upload</h1>
                <p className="file-support-info">Supported formats: PDF, up to 2 MB</p>
                <button onClick={handleUpload} className="file-upload-button">
                    Upload
                </button>
            </div>
        </>
    )
}

export default Home
