import express , {Express , Request ,Response}  from 'express'
import dotenv from 'dotenv'
import './database'
import todoRoutes from './routes/todoRoutes'
import authRoutes from './routes/authRoutes'
import bodyParser from 'body-parser'
dotenv.config()
import swaggerJsDoc from 'swagger-jsdoc'
import swaggerUi from 'swagger-ui-express'
import path from 'path'

import http from 'http'
import {Server,Socket} from 'socket.io'

const app: Express =express()
const port=process.env.PORT

app.use(express.static('public'))

const server = http.createServer(app); 
const io = new Server(server)

io.on('connection',(socket:Socket)=>{
    console.log(`🔥 SOCKET: ${socket.id} just user connected!`)

    socket.on('message',(data:string)=>{
        console.log('RECIEVED DATA:',data)
    })

})

app.get('/', (req:Request,res:Response)=>{
    res.sendFile(path.join(__dirname,'/index.html'))
})

app.use(bodyParser.json())
app.use('/v1/auth',authRoutes)
app.use('/v1/api',todoRoutes)

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

server.listen(port,()=>{
    console.log(`SERVER RUNNING ON PORT ${port}`)
})
