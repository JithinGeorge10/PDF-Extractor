import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { HOST } from '../utils/Constants';
import * as pdfjsLib from "pdfjs-dist";

function ExtractPdf() {
    const location = useLocation();
    const data = location.state?.data;
    const hasFetched = useRef(false);
    const [path,setPath]=useState()
    useEffect(() => {
        if (!data || !data.file.filename) {
            console.error("No filename provided");
            return;
        }
        if (hasFetched.current) return;

        (async () => {
            try {
                const response = await axios.get(`${HOST}/api/retrievePdf`, {
                    params: { filename: data.file.filename },
                    withCredentials: true,
                    responseType: 'blob', // Important for handling binary data
                });
                console.log(response);
                setPath(response)
                hasFetched.current = true;
            } catch (error) {
                console.error('Error fetching PDF:', error);
            }
        })();
    }, [data]);


    useEffect(() => {
        const loadPdf = async () => {
          pdfjsLib.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`;
    
          const loadingTask = await pdfjsLib.getDocument(path);
          const pdfDoc = await loadingTask.promise;
          const numPages = pdfDoc.numPages;
    
          const pageImages = [];
          const pageWidthsArray = [];
          for (let i = 1; i <= numPages; i++) {
            const page = await pdfDoc.getPage(i);
            const totalPages = pdfDoc.numPages;
            setTotalPdfPage(totalPages);
            const viewport = page.getViewport({ scale: 1.5 });
            const width = viewport.width;
            pageWidthsArray.push(width);
            const canvas = document.createElement("canvas");
            const context = canvas.getContext("2d");
            if (!context) {
              console.error("Failed to get 2D context");
              continue;
            }
            canvas.height = viewport.height;
            canvas.width = viewport.width;
    
            const renderContext = {
              canvasContext: context,
              viewport: viewport,
            };
            const renderTask = page.render(renderContext);
    
            await renderTask.promise;
    
            const imageDataUrl = canvas.toDataURL("image/png");
            pageImages.push(imageDataUrl);
          }
          setImages(pageImages);
        };
    
        loadPdf();
      }, [path]);


    return <></>;
}

export default ExtractPdf;
