const database = require('../database/connection');

class PacienteController{
    novoPaciente(request, response){

        const { nome, genero, cep, numero, dataNasc, rg, cpf,telefone} = request.body


        console.log( nome, genero, cep, numero, dataNasc, rg, cpf,telefone)

        database.insert({ nome, genero, cep, numero, dataNasc, rg, cpf,telefone}).table("paciente").then(data=>{
            console.log(data)
            response.json({mensage:"Cadastro de paciente criado com sucesso!"})
        }).catch(error =>{
            console.log(error)
        })
    }
    listarPaciente(request, response){
        database.select("*").table("paciente").then(paciente =>{
            console.log(paciente)
            response.json(paciente)
        }).catch(error=>{
            console.log(error)
        })
    }

    listarUmPaciente(request, response){
        console.log("vim para pegar por cpf")
        const cpf = request.params.cpf

        database.select("*").table("paciente").where({cpf}).then(paciente=>{
            response.json(paciente)
        }).catch(error=>{
            console.log(error)
        })

    }

    atualizarPaciente(request, response){
       
        const prontuario = request.params

        const {endereco} = request.body

        database.where({prontuario:prontuario}).update({endereco:endereco}).table("paciente").then(data => {
            response.json({message:"Endereço atualizado com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }
    
    removerPaciente(resquest, response){
        const prontuario = resquest.params
        
        database.where({prontuario:prontuario}).del().table("paciente").then(data =>{
            response.json({message:"paciente deletado com successo"})
        }).catch(error =>{
            response.json(error)
        })
    }
}



module.exports = new PacienteController();