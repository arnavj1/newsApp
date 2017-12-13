function doXMLHttpRequest(){
    var xhr = new XMLHttpRequest();

    //api url
    var url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=601bad2189254152a32bab894de96b64'


    xhr.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            processResponse(xhr.responseText);
        }
    };

    xhr.open("GET", url, true);
    xhr.send();     

    //printing out API response to webpage
    function processResponse(responseJSON) {
        var responseObject = JSON.parse(responseJSON);
        var article = responseObject.articles;
        console.log(article);

        // var author = article[0].author;
        for(i=0; i<article.length;i++){
            var title = article[i].title;
            var description = article[i].description;
            var url = article[i].url;
            var urlToImage = article[i].urlToImage;

            // document.getElementById("responseArea1").innerHTML = author;
            document.getElementById("responseArea2").innerHTML = title;
            document.getElementById("responseArea3").innerHTML = description;
            document.getElementById("responseArea4").innerHTML = '<a href="'+ url +'">Read the Full Story</a>';
            document.getElementById("responseArea5").innerHTML = '<img src="' + urlToImage + '">';
        }

    
    }

}


$(document).ready(function(){

    $("#enter").click(function(){
        $("#enter").fadeOut(2500);
    });

});