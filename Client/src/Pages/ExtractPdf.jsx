import React, { useEffect } from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'
import { HOST } from '../utils/Constants';
function ExtractPdf() {
    const location = useLocation();
    const data = location.state?.data;
    console.log(data.file.filename)

    useEffect(() => {
        (async() => {
           const response= await axios.get(`${HOST}/api/retrievePdf`, {
                params: { filename: data.file.filename },
                withCredentials: true
            })
            console.log(response)
        })()
    })
    return (
        <>

        </>
    )
}

export default ExtractPdf
