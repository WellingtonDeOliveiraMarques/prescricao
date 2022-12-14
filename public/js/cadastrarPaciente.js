$(document).ready(function(){
  
    $('#btn-cadastrarPaciente').click(function () {
        let nome = $('#nameCli').val();
        let dataNasc = $('#dataNasc').val();
        let cpf = $('#cpfCli').val(); 
        let rg = $('#rgCli').val();
        let genero = $("input[name='gender']:checked").val();
        let cep = $('#cep').val()
        let numero = $('#numero').val()
        let telefone = $('#telCli').val();
       
        axios.post("/novoPaciente", {
            nome, 
            genero, 
            cep, 
            numero, 
            dataNasc, 
            rg, 
            cpf,
            telefone
        }).then((response) => {
            alert(response.data.mensage)
            location.reload()
           //limpar campos 
        }).catch(err => {
            console.error(err.message)
        })

    });

    $("#btn-buscarPaciente").click(function () {
        let nome = $('#nameCli').val();
        let dataNasc = $('#dataNasc').val();
        let cpf = $('#cpfCli').val(); 
        let rg = $('#rgCli').val();
        let genero = $("input[name='gender']:checked").val();
        let cep = $('#cep').val()
        let numero = $('#numero').val()
        let telefone = $('#telCli').val();

        axios.get(`/paciente/${cpf}`).then((response) => {
            console.log(response.data[0])
            $('#nameCli').val(response.data[0].nome)
            $('#dataNasc').val(response.data[0].dataNasc.substring(-11))
            $('#cpfCli').val(response.data[0].cpf)
            $('#rgCli').val(response.data[0].rg)
            $('#cep').val(response.data[0].cep)
            $('#numero').val(response.data[0].numero)
            //$("input[name='gender']:checked").val(response.data[0].telefone)
            $('#telCli').val(response.data[0].telefone)
           // location.reload()
           //limpar campos 
        }).catch(err => {
            console.error(err.message)
        })
    })

    

   
});