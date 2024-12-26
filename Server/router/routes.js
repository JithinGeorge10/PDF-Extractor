import { Router } from 'express'
import { uploadPdfController,retrievePdfController } from '../controller/controller.js'


const route = Router()

route.post('/uploadPdf', uploadPdfController)
route.get('/retrievePdf', retrievePdfController)

export default route   