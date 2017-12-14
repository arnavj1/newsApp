function doXMLHttpRequest(){
    var xhr = new XMLHttpRequest();

    //api url
    // var url = 'https://newsapi.org/v2/top-headlines?category=business&language=en&apiKey=601bad2189254152a32bab894de96b64'
    var url = 'https://newsapi.org/v2/everything?domains=wsj.com,nytimes.com&language=en&apiKey=601bad2189254152a32bab894de96b64'

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


            var title = article[0].title;
            var description = article[0].description;
            var url = article[0].url;
            var urlToImage = article[0].urlToImage;

            var title1 = article[1].title;
            var description1 = article[1].description;
            var url1 = article[1].url;
            var urlToImage1 = article[1].urlToImage;

            var title2 = article[2].title;
            var description2 = article[2].description;
            var url2 = article[2].url;
            var urlToImage2 = article[2].urlToImage;

            var title3 = article[3].title;
            var description3 = article[3].description;
            var url3 = article[3].url;
            var urlToImage3 = article[3].urlToImage;

            var title4 = article[4].title;
            var description4 = article[4].description;
            var url4 = article[4].url;
            var urlToImage4 = article[4].urlToImage;

            document.getElementById("responseArea1").innerHTML = title;
            document.getElementById("responseArea2").innerHTML = description;
            document.getElementById("responseArea3").innerHTML = '<a href="'+ url +'">Read the Full Story</a>';
            document.getElementById("responseArea4").innerHTML = '<img class="photo" src="' + urlToImage + '">';

            document.getElementById("responseArea5").innerHTML = title1;
            document.getElementById("responseArea6").innerHTML = description1;
            document.getElementById("responseArea7").innerHTML = '<a href="'+ url1 +'">Read the Full Story</a>';
            document.getElementById("responseArea8").innerHTML = '<img class="photo" src="' + urlToImage1 + '">';

            document.getElementById("responseArea9").innerHTML = title2;
            document.getElementById("responseArea10").innerHTML = description2;
            document.getElementById("responseArea11").innerHTML = '<a href="'+ url2 +'">Read the Full Story</a>';
            document.getElementById("responseArea12").innerHTML = '<img class="photo" src="' + urlToImage2 + '">';

            document.getElementById("responseArea9").innerHTML = title2;
            document.getElementById("responseArea10").innerHTML = description2;
            document.getElementById("responseArea11").innerHTML = '<a href="'+ url2 +'">Read the Full Story</a>';
            document.getElementById("responseArea12").innerHTML = '<img class="photo" src="' + urlToImage2 + '">';

            document.getElementById("responseArea13").innerHTML = title3;
            document.getElementById("responseArea14").innerHTML = description3;
            document.getElementById("responseArea15").innerHTML = '<a href="'+ url3 +'">Read the Full Story</a>';
            document.getElementById("responseArea16").innerHTML = '<img class="photo" src="' + urlToImage3 + '">';

            document.getElementById("responseArea17").innerHTML = title4;
            document.getElementById("responseArea18").innerHTML = description4;
            document.getElementById("responseArea19").innerHTML = '<a href="'+ url4 +'">Read the Full Story</a>';
            document.getElementById("responseArea20").innerHTML = '<img class="photo" src="' + urlToImage4 + '">';

    }

}


$(document).ready(function(){
    doXMLHttpRequest();

});

