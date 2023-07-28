const {Schema,model} = require('mongoose')


const TiempoSchema = Schema({



   
    tiempos:{
        type: Number,
        require:true,
        

    },
    user:{

        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true,
       unique:true
        
    }

})



module.exports = model('Tiempo', TiempoSchema)