import express , {Express , Request ,Response}  from 'express'
import dotenv from 'dotenv'
import './database'
import todoRoutes from './routes/todoRoutes'
import authRoutes from './routes/authRoutes'
import bodyParser from 'body-parser'
dotenv.config()

const app: Express =express()
const port=process.env.PORT

app.get('/', (req:Request,res:Response)=>{
    //Request : object contain useful information about the request (req.body)
    //Res : response will contain the response of the request message: res.send({})
    res.send('RESPONSE FROM API : Express + Javascript server')
})

app.listen(port,()=>{
})

app.use(bodyParser.json())
app.use('/v1/auth',authRoutes)
app.use('/v1/api',todoRoutes)

import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

const swaggerDefinition = {
    openapi:'3.0.3',
    info:{
        title:'Todo Api',
        description: 'Our todo description',
        version:'2.0.0',
    },
    servers:[
        {
            url: process.env.DOCS_API_BASE_URL,
            description:'Local server'
        }
    ],
}
const options={
    swaggerDefinition,
    apis: [path.resolve(__dirname, '../docs/**/*.yaml')]
}

const swaggerDoc = swaggerJsDoc(options)

app.use('/api-docs',swaggerUi.serve,swaggerUi.setup(swaggerDoc))
