const database = require('../database/connection');

class PrescricaoController{
    novaPrescricao(request, response){

        const {cpf_funcionario, cpf, leito, prescricao, diagnostico} = request.body


        console.log(cpf_funcionario, cpf, leito, prescricao, diagnostico)

        database.insert({cpf_funcionario, cpf, leito, prescricao, diagnostico}).table("prescricao_mapa").then(data=>{
            console.log(data)
            response.json({mensage: `Prescricao ${data} criado com sucesso!`})
        }).catch(error =>{
            console.log(error)
        })
    }
    listarPrescricoes(request, response){
        database.select("*").table("prescricao_mapa").then(prescricao =>{
            console.log(prescricao)
            response.json(prescricao)
        }).catch(error=>{
            console.log(error)
        })
    }

    listarUmaPrescricao(request, response){
        const {id} = request.params

        database.select("*").table("prescricao_mapa").where({id}).then((prescricao) =>{
            response.json(prescricao)
        }).catch(error=>{
            console.log(error)
        })

    }
}



module.exports = new PrescricaoController();