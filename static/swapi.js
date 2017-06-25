function main() {
    console.log(apiConnect(2));
}

function apiConnect(apiPageNumber) {
    var apiUrl = "http://swapi.co/api/planets/?page="
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiUrl + apiPageNumber, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response
}

$(document).ready(main())

