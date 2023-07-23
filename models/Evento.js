const {Schema,model} = require('mongoose')


const EventoSchema = Schema({

   
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



EventoSchema.method('toJSON',function(){
    const {__v , _id, ...object} = this.toObject();
    object.id = _id;
    return object

})
module.exports = model('Evento', EventoSchema)