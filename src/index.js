const express =require("express")
const app = express()
const morgan= require("morgan")
const routes= require("./routes/task.routes")
const path = require("path")
const mongoose= require("./database")

//settings
app.set("port", process.env.PORT || 3000)
app.use(express.static(path.join(__dirname,"public")))

//middlewares
app.use(morgan("dev"))
app.use(express.urlencoded({extended:false}))
app.use(express.json())


//routes
app.use("/api",routes)

app.listen(app.get("port"),()=>{
    console.log(`Server runing on port ${app.get("port")}`)
})