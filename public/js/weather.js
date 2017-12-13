
//API used to get the weather of a particular location
//https://developer.worldweatheronline.com/api/docs/local-city-town-weather-api.aspx
function getWeather() {
    var city = $("#city").val();
    $.ajax({
        url: 'https://api.worldweatheronline.com/premium/v1/weather.ashx',
        data: {
            key : "0155afa77fba4ba281230137172911",
            q : city,
            num_of_days : 1,
            format : "json",
            showmap : "yes"
        },
        success: function(data) {
            showWeather(data);
        }
        });
    }

//display the weather, taken from the API example
function showWeather(data) {
    //all the data to be displayed -- variables explain what is being displayed
    var date = "Date: " + data.data.weather[0].date;    
    var tempF = "Current Temp (F): " + data.data.current_condition[0].temp_F + " F";
    var tempC = "Current Temp (C): " + data.data.current_condition[0].temp_C + " C"
    var feelsLike = "Feels Like: " + data.data.current_condition[0].FeelsLikeF + " F";
    var humidity = "Humidity: " + data.data.current_condition[0].humidity + "%";
    var maxTemp = "Today's Max: " + data.data.weather[0].maxtempF + " F";
    var minTemp = "Today's Low: " + data.data.weather[0].mintempF + " F";
    document.getElementById("date").innerHTML = date; 
    document.getElementById("currentF").innerHTML = tempF;
    document.getElementById("currentC").innerHTML = tempC;
    document.getElementById("feelsLike").innerHTML = feelsLike;
    document.getElementById("humidity").innerHTML = humidity;
    document.getElementById("maxTemp").innerHTML = maxTemp;
    document.getElementById("minTemp").innerHTML = minTemp;
}

//pulls JSON file for temps in other cities
function doXMLHttpRequest() {
  var xhr = new XMLHttpRequest(); 

  xhr.onreadystatechange=function()  {
   if (xhr.readyState==4) {
     if(xhr.status == 200) {
        processResponse(xhr.responseText);
    } else {
      area.innerHTML="Error code " + xhr.status;
    }
   }
  }
  xhr.open("GET", "weather.json", true); 
  xhr.send(); 
  } 

//pulls JSON file --> made up temps
function processResponse(responseJSON) {
    var responseObject = JSON.parse(responseJSON);
    var displayText = ""  
    for (var i = 0; i<responseObject.weather.length; i++) {
        var city = responseObject.weather[i];
        displayText += "<li>" + city.city + ":   " + city.weather + "<\/li>";                                                                                                                                                                                                             
    }
    displayText += "<\/ol>";
    document.getElementById("area").innerHTML = displayText;
}



//Different jQuery functions
$(document).ready(function(){

    //Colors in the results appropriately
    $("#submit").click(function(){
        $("#results").css("color", "white").addClass("bold");
    });

    $("#submit").click(function(){
        $("#pre").append("Here is Today's Weather Data for this Location:").css("color", "white").addClass("bold2");
    });

    //fades out the data quickly
    $("#submit").click(function(){
        $("#results").fadeOut(1).fadeIn(3000);
    });

    //Change the background color of text box
    $("input").focus(function(){
        $(this).css("background-color", "#cccccc");
    });

    //Hide the Text
    $("#topArea").click(function(){
        $(this).hide();
    });

    //Gives a Pop-Up over Header
    // $("h1").mouseenter(function(){
    //     alert("Find the weather in your area!");
    // });

    //Fades out the submission form after Submit
    $("#enter").click(function(){
        $("#info").fadeOut(2500);
    });

    //Fades in the Thank You, and Appends
    $("#enter").click(function(){
        $("#thanks").append("Thanks for your submission!").fadeIn(5000);
    });

    //Fades out/in the area
    $("#getCity").click(function(){
        $("#area").fadeOut(1).fadeIn(2500);
    });

    // $("#area").on({
    //     mouseenter: function(){
    //         $(this).css("background-color", "#FF2400");
    // }
    // });

    // $("#area").on({
    //     mouseleave: function(){
    //         $(this).css("background-color", "#FFCC00");
    // }
    // });

    //Double Click to Hide Text
    $("#area").dblclick(function(){
        $(this).hide();
    });


});
