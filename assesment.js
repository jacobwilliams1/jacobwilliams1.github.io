function initMap() {
        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 4,
          center: {lat: +latitude, lng: +longitude},
        });
        var marker = new google.maps.Marker({
          position: {lat: +latitude, lng: +longitude},
          map: map
        });
      }
// ************************************
// ** Making a Container for my card **
// ************************************
function makeAcard(weatherData) {

var template = $("#templateDiv").html();
template = template.replace("@@AREANAME@@", longName1 + ", " + longName2);
template = template.replace("#map", initMap());
return template;
}


// ***************************
// **  Google Web Services  **
// ***************************


var longName1 = "";
var longName2 = "";
var latitude = "";
var longitude ="";
var latlng="";
function lookupLatLong_Complete(result) {
// currentLocale = results.geometry.location;
// console.log(currentLocale);
    var result = result.results[0];
    var latlng= result.geometry.location
     latitude = result.geometry.location.lat;
     longitude = result.geometry.location.lng;
    
latlng ="{" + "lat: " + +latitude + ", " + "lng: " +  +longitude + "}";
console.log("The lat and long is " + latlng);
console.log(latlng);
 longName1 = result.address_components[1].long_name;
 longName2 = result.address_components[2].long_name; 
 var html = makeAcard(result);
            $("#cards").append(html);
}
var currentLocale="";
var map;

function lookupLatLong(city, state, postalCode) {
    // Create the address.
    var address = "";
    if (postalCode.length != 0) {
        address = postalCode.trim();
    }
    else if (city.length != 0 && state != 0) {
        address = city.trim() + ", " + state;
    }
    else {
        return; // they didn't give me anything valid, so exit
    }

    // Call Google's API.
    var googleUrl = "https://maps.googleapis.com/maps/api/geocode/json?address=" + address + "&key=AIzaSyAQsMF6GQMAD_JlBLibE1ZprVVwxK0kfac";

    var request = {
        url: googleUrl,
        success: lookupLatLong_Complete
    };

    $.ajax(request);
}
// **********************
// **  Event Handlers  **
// **********************
function lookupWeatherForPostalCode_Click() {
    var pcode = $("#postalCode").val();
    lookupLatLong("", "", pcode);
}

$(document).on("click", "#removeCard", function(){
   $(this).parent('#rmv').fadeOut();
});
// ***********************
// **  Document ready.  **
// ***********************

$(function () {
    $("#lookupWeatherForPostalCode").on("click", lookupWeatherForPostalCode_Click)
});