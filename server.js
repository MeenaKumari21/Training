const express=require("express")
const app=express()
const mongoose=require("mongoose")

app.use(express.json());

mongoose.connect('mongodb+srv://mallimeena2005_db_user:meena21@cluster0.9kh8c6r.mongodb.net/',)
.then(() => {
    console.log("Connected to MongoDB");
})
.catch((err) => {
    console.log(err);
})
app.use('/auth', require('./routes/authoRoutes'))

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