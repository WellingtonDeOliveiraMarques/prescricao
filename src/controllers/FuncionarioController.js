const database = require('../database/connection')
const {engine} = require("express-handlebars")
const bcrypt = require("bcrypt")


class FuncionarioController{
    async novoFuncionario(request, response){

        let {idfuncionario,nomeFuncionario, funcao, numeroConselho, genero, senha, dataCadastro, rg, cpf} = request.body


        console.log(idfuncionario, nomeFuncionario, funcao, numeroConselho, genero, senha, dataCadastro, rg, cpf)

        let p = await bcrypt.hash(senha, 10)

        console.log(p)

        database.insert({idfuncionario, nomeFuncionario, funcao, numeroConselho, genero, senha:p, dataCadastro, rg, cpf}).table("funcionario").then(data=>{
            console.log(data)
            response.json({mensage:"Cadastro de funcionario criado com sucesso!"})
        }).catch(error =>{
            response.status(500).send({error})
        })
        
    }
    listarFuncionarios(request, response){
       
        database.select("*").table("funcionario").then(funcionario =>{
            console.log(funcionario)
            response.json(funcionario)
        }).catch(error=>{
            console.log(error)
        })
    }

    listarUmFuncionario(request, response){

        console.log("vim para pegar por cpf")
        const cpf = request.params.cpf

        database.select("*").table("funcionario").where({cpf:cpf}).then(funcionario=>{
            response.json(funcionario)
        }).catch(error=>{
            console.log(error)
        })

    }

    atualizarFuncionario(request, response){
        const cpf = request.params
        const {genero} = request.body

        database.where({cpf:cpf}).update({genero:genero}).table("funcionario").then(data => {
            response.json({message:"Endereço atualizado com sucesso"})
        }).catch(error=>{
            response.json(error)
        })
    }
    
    removerFuncionario(resquest, response){
        const idfuncionario = resquest.params
        
        database.where({idfuncionario:idfuncionario}).del().table("funcionario").then(data =>{
            response.json({message:"Funcionario deletado com successo"})
        }).catch(error =>{
            response.json(error)
        })
    }
}



module.exports = new FuncionarioController();