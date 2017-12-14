// // Slightly Edited from HW11 and HW12 views and models
// // The function names explain which CRUD operation is occuring

// // Had to change my success functions in each of my CRUD functions so that 
// // I was returning data;

$(function() {
    $("#signup-form").submit(function( event ) {
        event.preventDefault();
        addUser();
    })
})


//new user
function addUser() {
    $("#signup-form").hide();

    var first_name = $("#first_name1").val();
    var last_name = $("#last_name1").val();
    var email = $("#email1").val();
    var username = $("#username1").val();
    var password = $("#password1").val();
    var city = $("#city1").val();
    $.ajax({
        url: `/users/${first_name}/${last_name}/${email}/${username}/${password}/${city}`,
        type: 'PUT',
        success: function(data) {
            $("#add").html(data);
        }
    });

    $("#login-form").show();
    $("#have-acct").hide();
}


