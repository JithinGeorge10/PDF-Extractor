import React from 'react'
import { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import { apiClient } from '../lib/api-client.js';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';
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
                toast.success('PDF file selected successfully!');

                const formData = new FormData();
                formData.append('file', file);

                try {
                    await axios.post(`http://localhost:3000/api/uploadPdf`, { name:'jithin' }, {
                        headers: {
                          'Content-Type': 'application/json'
                        },
                        withCredentials: true
                      })

                    if (response.ok) {
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
