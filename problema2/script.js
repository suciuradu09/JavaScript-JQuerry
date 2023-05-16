$(document).ready(function() {
    $('#buton').on('click', function() {
        myFunction();
    });
})

function myFunction() {
    var numele = $("#nume");
    var data_nasterii = $('#datan');
    var varsta = $('#varsta');
    var email = $('#mail');

    const errors = [];

    if (!/^[A-Za-z]+$/.test(numele.val())) {
        errors.push("nume");
        numele.css("border-color", "red");
    }
    else{
        numele.css("border-color", "green");
    }

    if (!/^[0-9]{2}-[0-9]{2}-[0-9]{4}$/.test(data_nasterii.val())) {
        errors.push("data nasterii");
        data_nasterii.css("border-color", "red");
    }
    else {
        data_nasterii.css("border-color", "green");
    }

    if (!/^[1-9]*[0-9]{1}$/.test(varsta.val())){
        errors.push("varsta");
        varsta.css("border-color", "red");
    }
    else{
        varsta.css("border-color", "green");
    }

    if(!/^[a-zA-Z]+\@[a-zA-Z]+\.[a-z]{2,}$/.test(email.val())){
        errors.push("email");
        email.css("border-color", "red");
    }
    else{
        email.css("border-color", "green");
    }

    if( errors.length == 0 ) {
        $('#mesaj').text("Datele sunt completate corect"); 
        alert("Datele sunt completate corect");
    }
    else{
        alert("Campurile " + errors.join(" si ") + " nu sunt completate corect");
    }
}
