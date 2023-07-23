const {response} = require('express')
const Tiempo = require('../models/Evento')






const getTiempos = async (req,res=response ) =>{

    const tiempos = await Tiempo.find().populate('user','name')


    res.json({

        ok:true,
         tiempos
    })

}








const crearTiempos = async (req,res=response ) =>{

console.log(req.body);

const  tiempo = new Tiempo (req.body)

try{

    tiempo.user=req.uid
const eventoguardado = await tiempo.save()

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













const actualizarTiempos = async (req,res=response ) =>{
    const tiempoId = req.params.id
    const {uid}  = req.uid
    const {tiempos,user} = req.body
try{
const tiempo =await Tiempo.findById(tiempoId)
if(!tiempo){

    res.status(404).json({
        ok:false,
        msg:'Tiempo no existe'
    })
}

// if(evento.user.toString() !== uid){


//     return res.status(401).json({
//         ok:false,
//         msg:'No tienes privilegio para editar'
//     })
// }
const nuevoTiempo = {
    tiempos,
    user
}

const eventoActualizado = await Tiempo.findByIdAndUpdate(tiempoId,nuevoTiempo)

res.json({

    ok:true,
    msg:'actualizarTiempo',
    evento:eventoActualizado
})

}catch(error){
    console.log(error);
    return res.status(500).json({
        ok:false,
        msg:'Hable con el administrador'
    })}










   

}


const eliminarTiempo = async (req,res=response ) =>{


   
    const tiempoId = req.params.id
    const {uid}  = req.uid
  
try{
const tiempo =await Tiempo.findById(tiempoId)
if(!tiempo){

    res.status(404).json({
        ok:false,
        msg:'Tiempo no existe'
    })
}


const eventoActualizado = await Tiempo.findByIdAndDelete(tiempoId)

res.json({

    ok:true,
    msg:'eliminarTiempo',
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
    getTiempos,
    crearTiempos,
    actualizarTiempos,
     eliminarTiempo
}