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
const{tiempos,user} = req.body
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


const actualizarEvento = (req,res=response ) =>{


    res.json({

        ok:true,
        msg:'actualizarEvento'
    })

}


const eliminarEvento = (req,res=response ) =>{


    res.json({

        ok:true,
        msg:'eliminarEvento'
    })

}

module.exports = {  
    getEventos,
    crearEventos,
    actualizarEvento,
    eliminarEvento
}