const express = require('express');
const cors = require('cors')
const path = require('path')
const router = require('./src/routes/routes')
const database = require('./src/database/connection')
const bcrypt = require("bcrypt")
// login

const { body, validationResult } = require("express-validator")
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser")

const app = express()
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*")
    app.use(cors())
    next()
})
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(router)
app.use(cookieParser())

app.listen(4000, () => {
    console.log('Aplicação rodando na porta 4000');
});

app.get('/', (request, response) => {
    response.send("Hello world")
})

app.get('/cadastroFuncionario', (request, response) => {
    
    if(request.cookies.userID){
        response.sendFile(path.join(__dirname + "/telaCadastroFuncionario.html"))
    }else{
        response.redirect("/TelaLogin")
    } 
});

app.get('/cadastroPaciente', (request, response) => {
    
    if(request.cookies.userID){
        response.sendFile(path.join(__dirname + "/telaCadastrodePaciente.html"))
    }else{
        response.redirect("/TelaLogin")
    } 
});

app.get('/prescricaoPronta', (request, response) => {
    
    if(request.cookies.userID){
        response.sendFile(path.join(__dirname + "/prescricaoPronta.html"))
    }else{
        response.redirect("/TelaLogin")
    } 
});

app.get('/TelaLogin', (request, response) => {
    response.sendFile(path.join(__dirname + "/TelaLogin.html"))
});

app.get('/TelaAdmin', (request, response) => {
    if(request.cookies.userID){
        response.sendFile(path.join(__dirname + "/telaAdm.html"))
    }else{
        response.redirect("/TelaLogin")
    } 
});

app.get('/TelaRecepcionista', (request, response) => {
if(request.cookies.userID){
    response.sendFile(path.join(__dirname + "/telaRecepcionista.html"))
}else{
    response.redirect("/TelaLogin")
} 
});

app.post('/user', async (req, res) => {
    let { cpf, senha } = req.body
    let isEmail = await database.select("*").table("funcionario").where({ cpf })
    if (!isEmail) {
        return res.status(401).send("Autenticacao Falhou" + isEmail)
    }

    let isValid = await bcrypt.compare(senha, isEmail[0].senha)

    if (isValid) {
        console.log(isEmail[0].idfuncionario)
        res.cookie("userID", isEmail[0].idfuncionario, { expire: 3000 })
        res.status(200).send({ msg: "Autenticacao Funcionou" })
    } else {
        res.status(401).send({ msg: "Autenticacao Falhou" })
    }


});