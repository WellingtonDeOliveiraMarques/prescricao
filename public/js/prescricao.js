$(document).ready(function () {

    // //const URL_DADOS_PACIENTE = ;
    // const URL_DADOS_FUNCIONARIO ="http://localhost:4000/tarefa/1";

    // init();
    // function init (){
    //     renderFuncionario();
    // };


    // function renderFuncionario() {
    //     $.getJSON(URL_DADOS_FUNCIONARIO, function (data) {
    //         let contentDados= '';
    //         $.each(data, function (key, value) {
    //             let dia = new Date();
    //             contentDados += ` <td colspan="2" class="text-start w-50">Nome do Medico: ${value.nomeFuncionario}</td>
    //                                 <td>Data: ${dia}</td>`
    //         });
    //         $('#medicoData').append(contentDados);
    //     });
    // }



    $("#cpf").keyup(function () {
        let cpf = $(this).val()
        axios.get(`/paciente/${cpf}`)
            .then(response => {
                $("#nomePaciente").val(response.data[0].nome)
            })
            .catch(err => {
                console.error(err)
            })
    })


    $("#cpf_func").keyup(function () {
        let cpf = $(this).val()
       
        axios.get(`/Funcionario/${cpf}`)
            .then((response) => {
                $("#nomeMedico").val(response.data[0].nomeFuncionario)
            })
            .catch(err => {
                console.error(err)
            })
    })





    var id = 0;
    $('#btn-add').click(function () {
        var dieta = $('input[type=checkbox]:checked').get().map(el => el.value).join(' - ');
        let medicacao = $('#med').val();
        let via = $('#via option:selected').val();
        let horario = $('#horario option:selected').val();
        let horas = new Date();
        let horasMed = parseInt(horas.getHours());
        let anotacoes = $("#anotacoes").val()
        horasMed = horasMed + 1;

        id++;
        if (id == 1) {
            let content = `<tr ${id} ><td>${id} - ${dieta}</td></tr>
                    <tr><td>${++id} - ${medicacao} ${via} ${horario} </td><td>${horasMed}</td><td>${anotacoes}</td></tr>`;
            $('#lista').append(content);
        } else {
            let content = `<tr><td>${id} - ${medicacao} ${via} ${horario} </td> <td ">${horasMed}</td> <td>${anotacoes}</td></tr>`;
            $('#lista').append(content);
        }


        $('#med').val("");
        $('#via option:selected').val("");
        $('#horario option:selected').val("");
        $("#anotacoes").val("")
        $(".form-check-input").each(function () {

            $(this).attr("checked", false)

        })
    });



    $("#salvarPrescricao").click(function(){
        let prescricao = $("#lista").html()
        let cpf_funcionario = $("#cpf_func").val()
        let diagnostico = $("#diagnostico").val()
        let leito = $("#leito").val()
        let cpf = $("#cpf").val()

        axios.post("/novaPrescricao", {
            prescricao, 
            cpf_funcionario, 
            diagnostico, 
            leito, 
            cpf,
        }).then((response) => {
            alert(response.data.mensage)
            location.reload()
           //limpar campos 
        }).catch(err => {
            console.error(err.message)
        })
    })


    $("#idPrescricao").keyup(function () {
        let idPrescricao = $(this).val()
       
        axios.get(`/prescricao/${idPrescricao}`)
            .then((response) => {
               console.log(response.data[0])

               $("#lista").html(response.data[0].prescricao)
               $("#cpf_func").val(response.data[0].cpf_funcionario)
               $("#diagnostico").val(response.data[0].diagnostico)
               $("#leito").val(response.data[0].leito)
               $("#cpf").val(response.data[0].cpf)

            })
            .catch(err => {
                console.error(err)
            })
    })

});