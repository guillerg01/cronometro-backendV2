const {Schema,model} = require('mongoose')


const TiempoSchema = Schema({



   
    tiempos:{
        type: Array,
        require:true,
        

    },
    user:{

        type:Schema.Types.ObjectId,
        ref:'Usuario',
        require:true
    }

})



module.exports = model('Tiempo', TiempoSchema)