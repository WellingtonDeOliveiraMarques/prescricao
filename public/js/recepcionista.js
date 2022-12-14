$(document).ready(function(){
    $('#meuModal').on('shown.bs.modal', function () {
        $('#meuInput').trigger('focus')
      })
});