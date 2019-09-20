const mongoose= require("mongoose")
const URI= "mongodb://localhost/mern-task"
mongoose.connect(URI,{ useNewUrlParser: true })
    .then(db => console.log("bd conected"))
    .catch(err => console.log(err))

    module.exports=mongoose