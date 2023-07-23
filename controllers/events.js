const {response} = require('express')
const Evento = require('../models/Evento')






const getEventos = async (req,res=response ) =>{

    const eventos = await Evento.find().populate('user','name')


    res.json({

        ok:true,
        eventos
    })

}








const crearEventos = async (req,res=response ) =>{

console.log(req.body);
const  evento = new Evento (req.body)

try{

    evento.user=req.uid
const eventoguardado = await evento.save()

res.status(201).json({

    ok:true,
    eventoguardado,
    

})


}catch(error){
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })
}


}













const actualizarEvento = async (req,res=response ) =>{
    const eventoId = req.params.id
    const {uid}  = req.uid
    const {tiempos,user} = req.body
try{
const evento =await Evento.findById(eventoId)
if(!evento){

    res.status(404).json({
        ok:false,
        msg:'Evento no existe'
    })
}

// if(evento.user.toString() !== uid){


//     return res.status(401).json({
//         ok:false,
//         msg:'No tienes privilegio para editar'
//     })
// }
const nuevoEvento = {
    tiempos,
    user
}
const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento)

res.json({

    ok:true,
    msg:'actualizarEvento',
    evento:eventoActualizado
})

}catch(error){
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })}










   

}


const eliminarEvento = async (req,res=response ) =>{


   
    const eventoId = req.params.id
    const {uid}  = req.uid
  
try{
const evento =await Evento.findById(eventoId)
if(!evento){

    res.status(404).json({
        ok:false,
        msg:'Evento no existe'
    })
}


const eventoActualizado = await Evento.findByIdAndDelete(eventoId)

res.json({

    ok:true,
    msg:'eliminarEvento',
    evento:eventoActualizado
})

}catch(error){
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })}







}

module.exports = {  
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento
}