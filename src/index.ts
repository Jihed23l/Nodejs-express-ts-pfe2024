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
    console.log(`server running http://localhost:${port}`)
})

app.use(bodyParser.json())
app.use('/v1/auth',authRoutes)
app.use('/v1/api',todoRoutes)