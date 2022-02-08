const express = require("express");
const mongoose = require("mongoose")
const dotenv = require("dotenv");


//routes
const authRoute = require("./Routes/auth")
const userRoute = require('./Routes/users')
const movieRoute = require('./Routes/movies')
const listRoute = require('./Routes/lists')

dotenv.config()
const app = express();

app.use(express.json())

mongoose.connect(process.env.MONGODB_URL , {
    useNewUrlParser : true,
    useUnifiedTopology : true,
   
})
.then(() => console.log("DB connection successfull"))
.catch((err) => console.log(err));

app.get('/' , (req , res) => {
    res.send("Noor is hesr");
})

app.use('/api/auth' , authRoute);
app.use('/api/user' , userRoute);
app.use('/api/movies' , movieRoute)
app.use('/api/lists' , listRoute)

app.listen(3001 , ()=>{
    console.log("Server is running")
})