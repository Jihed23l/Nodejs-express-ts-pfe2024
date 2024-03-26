import express , {Express , Request ,Response}  from 'express'
import dotenv from 'dotenv'
import * as fs from 'fs'
import mongoose from 'mongoose'

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

// Order n1: {ordername:'smartphone' , orderprice:1000, adress:'sousse' ,name:'softy' ,lastname:'education'}
// Order n2: 
// orders collection: {ordername:'smartphone' , orderprice:1000, adress:'sousse',userId:'16'}
// users collection: {id:"16",name:'softy', lastname:'education' ,phonenumber:"20000000"}
// get order  as front developer : {ordername:'smartphone' , orderprice:1000, adress:'sousse' , userId:"16"}
// populate: userId:"*", "collection:users", select:"name,phoneNumber"
// front developer: {ordername:'smartphone' , orderprice:1000, adress:'sousse' , userId:"16", user:{name:"softy",phonenumber:"20000000"}}

//perform update on specifc user
//userscollection.findByIdAndUpdate(userId,{'name':'samir'})

// const textIn = fs.readFileSync('./src/input.txt','utf-8')
// console.log(textIn)
// console.log('nodejs')

// const textOut=`NEW CONTENT : CREATED AT ${Date.now()} \n ${textIn}`
// fs.writeFileSync('./src/output.txt',textOut)

// fs.readFile('./src/input.txt','utf-8',(err,data)=>{
//     if(err){
//         console.log('File not found❌')
//     }
//     console.log(data)
// })
// console.log('nodejs')



// fs.readFile('./src/start.txt','utf-8',(err,data1)=>{
//     console.log(data1)
//     fs.readFile(`./src/${data1}.txt`,'utf-8',(err,data2)=>{
//           console.log(data2)
//         fs.readFile('./src/append.txt','utf-8',(err,data3)=>{
//             console.log(data3)
//             fs.writeFile('./src/final.txt', `${data2}\n${data3}`,'utf-8',err=>{
//                 console.log('Final file added successfully ✅ ')
//             })
//         })
//     })
// })


mongoose.connect("mongodb+srv://admin:aSbTLw8ilLnrAGS4@cluster0.ggt2ywi.mongodb.net/")
        .then(()=>{
            console.log('Mongoose connection done 😁')
        })
        .catch(()=>{
            console.log('ERROR:❌ Mongoose connection failed')
        })

import superagent from 'superagent'

// fs.readFile('./src/dog.txt','utf-8',(err,data)=>{
//     if(err){
//         return console.log('Cannot read file')
//     }
//     console.log(data)
//     superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
//     .end((err,res)=>{
//         if (err) return console.log(err?.message)
//         console.log(res.body)
//         fs.writeFile('./src/dog-img.txt',res.body.message,err=>{
//             if(err) return console.log(err?.message)
//             console.log('Random dog img saved to file! ✅')
//         })
//     })
// 
//Promise : except value to be available in the future 
//Start promise => status = pending
//Successful promise => status = fullfilled
//Error in promise => status = rejected

const readFilePro=(file:string)=>{
    return new Promise ((resolve,reject)=>{
        fs.readFile(file,'utf-8',(err,data)=>{
            if (err) return reject('couldnt read file data')
            resolve(data)
        })
    })
}

const writeFilePro=(file:string,data:string)=>{
    return new Promise ((resolve,reject)=>{
        fs.writeFile(file,data, err=>{
             if(err) return reject('Couldnt write this file ')
             resolve('success')
        })
    })
}

readFilePro(`./src/dog.txt`)
.then( data =>{
    // console.log('recieved value from promise',data)
    return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`)
})
.then( res => {
    // console.log(res.body)
    return writeFilePro('./src/dog-img.txt',res.body.message)
})
.then( ()=>{
    // console.log('Random dog image saved to file ✅')
})
.catch( err =>{
    // console.log('error recieved from promise',err)
})
