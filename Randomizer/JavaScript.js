//GLOBALS
var GeoLat;
var GeoLon;
var Accuracy;
var GeoError;
var PlacesJson;
var query = 'restaurant';
var app_id = 'NMnZXmMmKjZ1KUgMwm5t';
var app_code = 'R6UBE0fKipUff0kVS3CDGg';
var formatAccept = 'application%2Fjson';
var debugDiv;
var requestSize = 10000;
var OpenJson;
var ClosedJson;
var geoObject;
//var RadiusArea = 100000;



window.onload = function () {

    document.getElementById('All')
        .innerHTML = 'Acquiring GPS Position';
    debugDiv = document.getElementById('debug');

    //1 Get Coordinates//2 call restfull
    //getGeoLocation();
    getGeoLocation();
    //Takes a while to get Maps to be called so we need to call the ajax from here.
    addEventHandler(document.getElementById('randomme'), 'click', Randomizer);



}


function Randomizer() {

    var ran = Math.floor(
        (
            Math.random() * (OpenJson.results.items.length)
        )
        // +1
    );
    if (OpenJson.results.items.length >= 1) {
        document.getElementById('PlaceResults')
            .innerHTML = '<br>' + OpenJson.results.items[ran].title + ' | ' + OpenJson.results.items[ran].distance + ' Meters | ';
        OpenJson.results.items.splice(ran, 1);
    } else {
        document.getElementById('PlaceResults')
            .innerHTML = "No more Places";
    }
}

function parseInfo() {
    document.getElementById('All')
        .innerHTML = '';
    document.getElementById('All')
        .innerHTML += '';
    document.getElementById('All')
        .innerHTML += PlacesJson.search.context.location.address.text;
    document.getElementById('All')
        .innerHTML += '<br>' + PlacesJson.search.context.location.position + '<br>Accuracy:' + Accuracy + '<br>';

    /* for (var i = 0; i < PlacesJson.results.items.length; i++) {
        document.getElementById('All').innerHTML += '<br>' + i + ' - ' + PlacesJson.results.items[i].title + ' | ' + PlacesJson.results.items[i].distance + ' Meters | ';
    }*/


}

var getJsonPlaces = function () {

    var m_URL = constructURL();
    var req = getXMLHttpRequest();
    if (req !== null) {

        req.open('get', m_URL, true);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    try {

                        //debugDiv += '<br>' + req.responseText;
                        // document.getElementById('All').innerHTML = req.responseText;
                        PlacesJson = JSON.parse(req.responseText);
                        OpenJson = PlacesJson;
                        ClosedJson = {};
                        parseInfo();
                        req = null;

                    } catch (e) {

                        document.getElementById('All')
                            .innerHTML = 'Exception';
                        req = null;
                    }
                } else {
                    document.getElementById('All')
                        .innerHTML = 'Loading...'
                }
            }
        };
        req.send(null);
    }

}

    function constructURL() {
        var u = 'http://places.cit.api.here.com/places/v1/discover/search?at=' + GeoLat + '%2C' + GeoLon + '&q=' + query + '&app_id=' + app_id + '&app_code=' + app_code + '&accept=' + formatAccept;

        //debugDiv.innerHTML += '<br>' + u;
        return u;
    }



    function getGeoLocation() {
        if (navigator.geolocation) {
            //navigator.geolocation.watchPosition(Maps, getLocationError);
            var geoOptions = {
                maximunAge: 0,
                enableHighAccuracy: true,
                timeout: 25000

            };
            geoObject = navigator.geolocation.watchPosition(Maps, getLocationError, geoOptions);

            window.setTimeout(
                function () {
                    window.navigator.geolocation.clearWatch(geoObject);
                    getJsonPlaces();
                },
                3000
            );

        } else {
            document.write('GEOLOCATION is not supported');
        }


    }

    function getLocationError(error) {
        GeoError = error;
    }



    function Maps(position) {
        GeoLat = position.coords.latitude;
        GeoLon = position.coords.longitude;
        Accuracy = position.coords.accuracy;
        //debugDiv.innerHTML += '<br>' + GeoLat + '<br>' + GeoLon + '<br> Accuracy:' + Accuracy;


    }


    function addEventHandler(obj, eventName, handler) {
        if (document.attachEvent) {
            eventName = "on" + eventName.toLowerCase();
            obj.attachEvent(eventName, handler);
        } else if (document.addEventListener) {
            obj.addEventListener(eventName.toLowerCase(), handler, false);
        }

    }

    function getXMLHttpRequest() {

        var requestObject = null;
        try {
            requestObject = new XMLHttpRequest();
        } catch (MS) {
            try {
                requestObject = new ActiveXObject("Msxml2.XMLHTTP");
            } catch (MSS) {
                try {
                    requestObject = new ActiveXObject("Microsoft.XMLHTTP");
                } catch (failed) {
                    requestObject = null;
                }
            }
        }
        return requestObject;
    }