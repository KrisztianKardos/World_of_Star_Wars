function main() {
    var defaultPageNumber = 1
    apiConnect(defaultPageNumber);
    var planetsSwapi = apiConnect(defaultPageNumber);
    fillTable(planetsSwapi);
}


function apiConnect(apiPageNumber) {
    var apiUrl = "http://swapi.co/api/planets/?page="
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", apiUrl + apiPageNumber, false);
    xhttp.setRequestHeader("Content-type", "application/json");
    xhttp.send();
    var response = JSON.parse(xhttp.responseText);
    return response['results']
}


function fillTable(planetsSwapi) {
    //debugger;
    var table = document.getElementById('planetsTable');
    var planetsSwapiLength = planetsSwapi.length;

    for (let i = 0; i < planetsSwapiLength; i++) {
        var row = document.createElement('tr');
        row.setAttribute('class', 'planetsRow');
        table.appendChild(row);

        var cellName = document.createElement('td');
        var cellDiameter = document.createElement('td');
        var cellClimate = document.createElement('td');
        var cellTerrain = document.createElement('td');
        var cellSurfaceWater = document.createElement('td');
        var cellPopulation = document.createElement('td');
        var cellResidents = document.createElement('td');

        row.appendChild(cellName);
        row.appendChild(cellDiameter);
        row.appendChild(cellClimate);
        row.appendChild(cellTerrain);
        row.appendChild(cellSurfaceWater);
        row.appendChild(cellPopulation);
        row.appendChild(cellResidents);

        var name = planetsSwapi[i]['name'];
        var diameter = planetsSwapi[i]['diameter'];
        var climate = planetsSwapi[i]['climate'];
        var terrain = planetsSwapi[i]['terrain'];
        var surfaceWater = planetsSwapi[i]['surface_water'] + ' %';
        var population = planetsSwapi[i]['population'];
        if (planetsSwapi[i]['residents'].length == 0) {
            var residents = 'No known residents';
        } else if (planetsSwapi[i]['residents'].length == 1) {
            var residents = planetsSwapi[i]['residents'].length + ' resident';
            } else {
                var residents = planetsSwapi[i]['residents'].length + ' residents';
            }

        cellName.innerHTML = name;
        cellDiameter.innerHTML = diameter;
        cellClimate.innerHTML = climate;
        cellTerrain.innerHTML = terrain;
        cellSurfaceWater.innerHTML = surfaceWater;
        cellPopulation.innerHTML = population;

        // Resident buttons
        var residentsLink = document.createElement('button');
        residentsLink.setAttribute('type', 'button');
        residentsLink.innerText = residents;
        residentsLink.setAttribute('data-residents', planetsSwapi[i]['residents']);
        residentsLink.setAttribute('class', 'btn btn-primary residents');
        residentsLink.setAttribute('data-planetName', planetsSwapi[i]['name']);
        residentsLink.setAttribute('data-toggle', 'modal');
        residentsLink.setAttribute('data-target', '#residentsModal');
        cellResidents.appendChild(residentsLink);
    }
}

$(document).ready(main());
