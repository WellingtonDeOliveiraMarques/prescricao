$(document).ready(function(){

    $(document).keyup(function(event) {
        if ($("#cpfFunc").is(":focus") && event.key == "Enter") {
            alert("Hey")
        }
    });

})
