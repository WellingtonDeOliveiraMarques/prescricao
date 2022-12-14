const connection = require('../database/connection')
const express = require('express')
const router = express.Router()
const FuncionarioController = require('../controllers/FuncionarioController')
const ControllerPaciente = require('../controllers/PacienteController')
const PrescricaoController = require('../controllers/PrescricaoController')

router.post('/novoFuncionario', FuncionarioController.novoFuncionario)

router.get('/Funcionarios', FuncionarioController.listarFuncionarios)

router.get('/Funcionario/:cpf', FuncionarioController.listarUmFuncionario)

router.put('/atualizar/funcionario/:genero', FuncionarioController.atualizarFuncionario)

router.delete('/delete/funcionario/:idfuncionario', FuncionarioController.removerFuncionario)



router.post('/novoPaciente', ControllerPaciente.novoPaciente)

router.get('/listarPaciente', ControllerPaciente.listarPaciente)

router.get('/paciente/:cpf', ControllerPaciente.listarUmPaciente)

router.put('/atualizar/paciente/:cpf', ControllerPaciente.atualizarPaciente)

router.delete('/delete/paciente/:cpf', ControllerPaciente.removerPaciente)


router.post('/novaPrescricao', PrescricaoController.novaPrescricao)

router.get('/listarPrescricoes', PrescricaoController.listarPrescricoes)

router.get('/prescricao/:id', PrescricaoController.listarUmaPrescricao)

module.exports = router
