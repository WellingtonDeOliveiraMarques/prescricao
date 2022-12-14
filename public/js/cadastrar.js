$(document).ready(function () {

        


    $('#btn-cadastrarFuncionario').click(function () {
        let nomeFuncionario = $('#nameFunc').val();
        let dataCadasto = $('#dataNasc').val();
        let cpf = $('#cpfFunc').val();
        let rg = $('#rgFunc').val();
        let genero = $("input[name='gender']:checked").val();
        let funcao = $('#funcao option:selected').val();
        let numeroConselho = $('#numConselho').val();
        let senha = ''

        axios.post("/novoFuncionario", {
            nomeFuncionario,
            dataCadasto,
            cpf,
            rg,
            genero,
            senha,
            funcao,
            numeroConselho
        }).then((response) => {
            alert(response.data.mensage)
            location.reload()
            //limpar campos 
        }).catch(err => {
            console.error(err.message)
        })


    });

    // $(document).keyup(function(event) {
    //     if ($("#cpfFunc").is(":focus") && event.key == "Enter") {

    //         axios.get("/funcionario/23126300871").then((response)=>{

    //             alert(response.data.nomeFuncionario)


    //         }).catch(err=>{
    //             console.error(err.message)
    //         })

    //     }
    // });

    // axios.get("/Funcionarios",{


    // }).then((response)=>{
    //     console.log('teste');
    //     }).catch(err=>{
    //         console.error(err.message)
    //     })


    $("#btn-buscarFuncionario").click(function () {
        let nomeFuncionario = $('#nameFunc').val();
        let dataCadasto = $('#dataNasc').val();
        let cpf = $('#cpfFunc').val();
        let rg = $('#rgFunc').val();
        let genero = $("input[name='gender']:checked").val();
        let funcao = $('#funcao option:selected').val();
        let numeroConselho = $('#numConselho').val();
        let senha = ''
        
        axios.get(`/Funcionario/${cpf}`).then((response) => {

            console.log(response.data[0])
            $('#nameFunc').val(response.data[0].nomeFuncionario)
            $('#dataNasc').val(response.data[0].dataCadasto)
            $('#funcao option:selected').val(response.data[0].funcao)
            $('#rgFunc').val(response.data[0].rg)
            $('#numConselho').val(response.data[0].numeroConselho)

        }).catch(err => {
            console.error(err.message)
        })
    })


});