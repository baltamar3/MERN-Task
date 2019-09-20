express =require("express")
router = express.Router()
TaskModel= require("../models/task")

router.get("/", async(req,res)=>{
    const task=await TaskModel.find()
    if (task!="") return res.status(200).json({task: task})
    return res.status(200).json({msj: "Sin datos"})
})

router.get("/:id", (req,res)=>{
    task = TaskModel.findById(req.params.id,(err,task)=>{
        if (err) {
            return res.status(500).json({msg: `Error en consulta: ${err}`})
        }
        return res.status(200).json({task})
    })
})

router.post("/", async(req,res)=>{
    if (req.body.title==null || req.body.description==null) {
        return res.status(500).json({error: "Por favor, infrese todos los campos."})
    }else if(req.body.title.trim()=="" || req.body.description.trim()=="" ){
        return res.status(500).json({error: "No pueden haber campos vacios."})
    }

    const task = new TaskModel({title:req.body.title, description:req.body.description})
    await task.save()
    return res.status(200).json({msg: "task saved."})
   
})

router.put("/:id", async(req,res)=>{
    if (req.body.title==null || req.body.description==null) {
        return res.status(500).json({error: "Por favor, infrese todos los campos."})
    }else if(req.body.title.trim()=="" || req.body.description.trim()=="" ){
        return res.status(500).json({error: "No pueden haber campos vacios."})
    }

    await TaskModel.findByIdAndUpdate(req.params.id,req.body)
    return res.status(200).json({msj:"Task actualizada.."})
})


router.delete("/:id", (req,res)=>{
    TaskModel.findByIdAndRemove(req.params.id)
        .then(()=> res.status(200).json({msg: "Task deleted"}))
        .catch(()=> res.status(500).json({msg: "El ID no existe"}))
    
})

module.exports=router