const express=require('express')
//const {connect}=require('http2')
const app=express()
const mongoose=require('mongoose')
const dotenv = require('dotenv')

dotenv.config()
app.use(express.json());

mongoose.connect(
    process.env.MONGO_URI
)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
})
app.use('/auth', require('./routes/authoRoutes'))
app.use('/task',require('./routes/taskRoutes'))

app.get('/api', (req, res) => {
    res.send("Hello from  backend!");
})
app.post('/api',(req,res) => {
    const temp=req.body;
    res.send(temp);
})
app.listen(4000,()=>{
    console.log("Server is running on port 4000");
})