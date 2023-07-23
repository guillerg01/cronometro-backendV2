const {Schema,model} = require('mongoose')


const UsuarioSchema = Schema({

    name: {
        type:String,
        require: true,
        unique:true
    },
    password:{
        type: String,
        require:true,
        

    },
    tiempo:{

        type:String,
        require:true
    }

})


module.exports = model('Usuario', UsuarioSchema)