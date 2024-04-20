import mongoose from "mongoose"

mongoose.connect("mongodb+srv://admin:aSbTLw8ilLnrAGS4@cluster0.ggt2ywi.mongodb.net/todo-app")
.then(()=>{
  console.log('Mongoose connection done 😁')
})
.catch(()=>{
  console.log('ERROR:❌ Mongoose connection failed')
})
