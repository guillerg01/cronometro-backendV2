const {Schema,model} = require('mongoose')


const TiempoSchema = Schema({



   
    time:{
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