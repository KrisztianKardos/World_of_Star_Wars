function main() {
    var defaultPageNumber = 1
    loadPlanets(defaultPageNumber);
}

function loadPlanets(apiPageNumber) {
    var apiUrl = "http://swapi.co/api/planets/?page="
    $.ajax({
            type: 'GET',
            url: apiUrl + apiPageNumber,
            dataType: 'json',
            success: function(response) {
                fillTable(response['results']);
                },
            error: function() {
                alert('Error in network request!');
            } 
        });
}


function fillTable(planetsSwapi) {
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
        var diameter = planetsSwapi[i]['diameter'] / 1000 + ' km';
        var climate = planetsSwapi[i]['climate'];
        var terrain = planetsSwapi[i]['terrain'];
        if ( planetsSwapi[i]['surface_water'] == 'unknown' ) {
            surfaceWater = planetsSwapi[i]['surface_water'];
            } else {
                surfaceWater = planetsSwapi[i]['surface_water'] + ' %';
            }
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

    //modal trigger for residents
    $('#residentsModal').on('show.bs.modal', function (event) {
        
        var button = $(event.relatedTarget);
        var planetName = button.data('planetname');
        var residents = button.data('residents');
        var modal = $(this);
        var residentsSwapiLinks = residents.split(",");

        modal.find('.modal-title').text('Residents of ' + planetName);
        for (let i = 0; i < residentsSwapiLinks.length; i++) {
            $.ajax({
                type: 'GET',
                url: residentsSwapiLinks[i],
                dataType: 'json',
                success: function(response) {
                    console.log(response)
                    displayResidents(response);
                    },
                error: function() {
                    alert('Error in network request!');
                } 
            });
        }
    });

function displayResidents(residents) {
            var name = residents['name'];
            var height = residents['height'] / 100 + ' m';
            if ( residents['mass'] == 'unknown' ) {
                mass = residents['mass'];
                } else {
                    mass = residents['mass'] + ' kg';
                }
            var hair_color = residents['hair_color'];
            var skin_color = residents['skin_color'];
            var eye_color = residents['eye_color'];
            var birth_year = residents['birth_year'];
            var gender = residents['gender'];
            $('#residentsTable').append('<tr>' +
                                        '<td>' + name + '</td>' +
                                        '<td>' + height + '</td>' +
                                        '<td>' + mass + '</td>' +
                                        '<td>' + hair_color + '</td>' +
                                        '<td>' + skin_color + '</td>' +
                                        '<td>' + eye_color + '</td>' +
                                        '<td>' + birth_year + '</td>' +
                                        '<td>' + gender + '</td>' +
                                        '</tr>');
        }

    $('#residentsModal').on('hidden.bs.modal', function () {
        $(this).find('.modal-body').text('');
    });
}

$(document).ready(main());
