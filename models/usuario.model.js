

const {Schema,model}=require('mongoose')

const UsuarioSchema = Schema({
    nombre:{
        type:String,
        require:true
    },
    email:{
        type:String,
        require:true,
        unique:true
    },
    password:{
        type:String,
        require:true
    },
    google:{
        type:Boolean,
        default:false
    }
})

module.exports=model('Usuario',UsuarioSchema);