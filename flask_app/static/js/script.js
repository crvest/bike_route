// get user coordinates
if(navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(storePosition);
} else {
    userLat = 42.3601;
    userLng = -71.0589;
}

function storePosition(position) {
    userLat = position.coords.latitude;
    userLng = position.coords.longitude;
}

// Initialize and add the map
function initMap() {
    // locations instructions
    let directionsService = new google.maps.DirectionsService();
    let directionsRenderer = new google.maps.DirectionsRenderer({
        draggable: true
    });
    // The location of the user
    const userLoc = { lat: userLat, lng: userLng };
    // declare map options
    const options = {
        zoom: 14,
        center: userLoc,
    };
    // The map, centered at the users location
    const map = new google.maps.Map(document.getElementById("map"), options);
    directionsRenderer.setMap(map);

    // set marker image to bike icon
    const image = {
        url: "https://img.icons8.com/ios/344/bicycle.png",
        // resize icon
        scaledSize: new google.maps.Size(40, 40),
    };

    // The marker, positioned at center
    const marker = new google.maps.Marker({
        position: userLoc,
        title: "Your Location",
        icon: image,
        draggable: true,
    });
    marker.setMap(map);

    //-------------------------------//
    // set bikeLayer
    const bikeLayer = new google.maps.BicyclingLayer();
    // toggle bikeLayer on/off
    document.getElementById("toggle").onclick = function () {
        toggleBikeLayer();
    };
    let state = map;
    function toggleBikeLayer() {
        bikeLayer.setMap(state);
        if (state == map) {
            state = null;
        } else {
            state = map;
        }
    }


    // set directions data
    function calcRoute() {
        let start = document.getElementById('start').value;
        let end = document.getElementById('end').value;
        let newDirectionsRequest = {
            origin: start,
            destination: end,
            travelMode: 'BICYCLING',
            unitSystem: google.maps.UnitSystem.IMPERIAL
        };
    
        directionsService.route(newDirectionsRequest, function(result, status) {
            if(status == 'OK'){
                directionsRenderer.setDirections(result);
            }
        });
    }


    
    
    // autocomplete 
    let autocompleteOptions = {
        types: ['street_address']
    }
    let startInput = document.getElementById('start');
    let startAutocomplete = new google.maps.places.Autocomplete(startInput, autocompleteOptions);
    let endInput = document.getElementById('end');
    let endAutocomplete = new google.maps.places.Autocomplete(endInput, autocompleteOptions);
}

window.initMap = initMap;
