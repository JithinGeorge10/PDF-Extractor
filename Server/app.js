import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import routes from './router/routes.js'

dotenv.config()
const app = express()
app.use(express.json())
app.use('/uploads', express.static('uploads'));
app.use(express.urlencoded({ extended: true }));

    app.use(cors({
        origin: process.env.CLIENT,
        methods: ['GET', 'POST', 'DELETE', 'PUT', 'PATCH'],
        credentials: true
    }));

app.use(morgan('dev'))

app.use('/api', routes)
app.listen(process.env.PORT, console.log('server connected'))