import { Router } from 'express'
import { uploadPdfController } from '../controller/controller.js'

const route = Router()

route.post('/uploadPdf', uploadPdfController)
export default route   