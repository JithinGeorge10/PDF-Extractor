import React from 'react'
import { useState } from 'react';
    import { toast, ToastContainer } from 'react-toastify';
import axios from 'axios'
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../components/navbar';
import { HOST } from '../utils/Constants';
import { useNavigate } from 'react-router-dom';
function Home() {
    const navigate = useNavigate()
    const [selectedFile, setSelectedFile] = useState(null);

    const handleUpload = async () => {
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'application/pdf';

        fileInput.onchange = async (e) => {
            const file = e.target.files[0];
            if (file && file.type === 'application/pdf') {
                setSelectedFile(file);
                const formData = new FormData()
                formData.append('file', file)
                try {
                    const response = await axios.post(`${HOST}/api/uploadPdf`, formData, {
                        headers: {},
                        withCredentials: true
                    })
                    if (response.status === 200) {
                        toast.success('File uploaded successfully!')
                        setTimeout(() => {
                            navigate('/extractPdf', { state: { data: response.data } });
                        }, 3000); 
                    } else {
                        toast.error('Failed to upload file');
                    }
                } catch (error) {
                    console.error('Error uploading file:', error)
                    toast.error('An error occurred while uploading the file');
                }
            } else {
                toast.error('Please select a valid PDF file');
            }
        }
        fileInput.click();
    }
    return (
        <>
            <Navbar />
            <ToastContainer position="top-center" />
            <div className="container">
                <h1>Extract PDF Online</h1>
                <h3>Extract the specific pages you need from your PDF instantly.</h3>
                <button onClick={handleUpload} className="file-upload-button">
                    Upload PDF
                </button>
            </div>
        </>
    )
}

export default Home
