// // Slightly Edited from HW11 and HW12 views and models
// // The function names explain which CRUD operation is occuring

// // Had to change my success functions in each of my CRUD functions so that 
// // I was returning data;

$(function() {
    $("#f1").submit(function( event ) {
        event.preventDefault();
        addUser();
    })
})

// // $(function() {
// //     $("#f3").submit(function( event ) {
// //         event.preventDefault();
// //         updateUser();
// //     })
// // })

// // $(function() {
// //     $("#f4").submit(function( event ) {
// //         event.preventDefault();
// //         deleteUser();
// //     })
// // })


//new user
function addUser() {
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
}

// // function updateUser() {
// //     var first_name = $("#first_name3").val();
// //     var last_name = $("#last_name3").val();
// //     var email = $("#email3").val();
// //     $.ajax({
// //         url: `/users/${first_name}/${last_name}/${email}`,
// //         type: 'POST',
// //         success: function(data) {
// //             $("#update").html(data);
// //         }
// //     });
// // }


// // function deleteUser() {
// //     var first_name = $("#first_name4").val();
// //     $.ajax({
// //         url: `/users/${first_name}`,
// //         type: 'DELETE',
// //         success: function(data) {
// //             $("#delete").html(data);
// //         }
// //     })
// // }



