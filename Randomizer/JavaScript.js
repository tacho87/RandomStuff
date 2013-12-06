


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

    document.getElementById( 'All' ).innerHTML = 'Acquiring GPS Position';
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
        document.getElementById( 'PlaceResults' ).innerHTML = '<br>'  + OpenJson.results.items[ran].title + ' | ' + OpenJson.results.items[ran].distance + ' Meters | ';
        OpenJson.results.items.splice(ran, 1);
    }
    else {
        document.getElementById( 'PlaceResults' ).innerHTML = "No more Places";
    }
}

function parseInfo() {
    document.getElementById('All').innerHTML = '';
    document.getElementById('All').innerHTML += '';
    document.getElementById('All').innerHTML += PlacesJson.search.context.location.address.text;
    document.getElementById('All').innerHTML += '<br>' + PlacesJson.search.context.location.position + '<br>Accuracy:' + Accuracy + '<br>';

   /* for (var i = 0; i < PlacesJson.results.items.length; i++) {
        document.getElementById('All').innerHTML += '<br>' + i + ' - ' + PlacesJson.results.items[i].title + ' | ' + PlacesJson.results.items[i].distance + ' Meters | ';
    }*/


}

var getJsonPlaces = function() {

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

                        document.getElementById('All').innerHTML = 'Exception';
                        req = null;
                    }
                }
                else {
                    document.getElementById('All').innerHTML = 'Loading...'
                }
            }
        };
        req.send(null);
    }

}

function constructURL() {
    var u = 'http://places.cit.api.here.com/places/v1/discover/search?at=' + GeoLat + '%2C' + GeoLon + '&q=' + query + '&app_id=' + app_id + '&app_code=' + app_code + '&accept=' + formatAccept ;
   
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
    }
    catch (MS) {
        try {
            requestObject = new ActiveXObject("Msxml2.XMLHTTP");
        }
        catch (MSS) {
            try {
                requestObject = new ActiveXObject("Microsoft.XMLHTTP");
            }
            catch (failed) {
                requestObject = null;
            }
        }
    }
    return requestObject;
}




var jasontest = {
    "results":
    {
        "next": "http://demo.places.nlp.nokia.com/places/v1/discover/search;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmb2Zmc2V0PTIw?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg&size=20&q=restaurant&at=38.277%2C-85.737",
        "items": [
            {
                "position": [
                    38.27598, -85.73868
                ],
                "distance": 186,
                "title": "Four Guys Pizza",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "334 E Court Ave<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-c22558ff80a34acd8be1bdb625afe781;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0w?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-c22558ff80a34acd8be1bdb625afe781"
            },
            {
                "position": [
                    38.275761, -85.738518
                ],
                "distance": 191,
                "title": "Jeff's Bakery",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "334 E Court Ave<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-0831c91257a64bb19d7284025531fedf;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0x?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-0831c91257a64bb19d7284025531fedf"
            },
            {
                "position": [
                    38.27569, -85.73899
                ],
                "distance": 227,
                "title": "North Pole",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "350 E Court Ave<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-c245db310f024937b0b7ecf7027fa357;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0y?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-c245db310f024937b0b7ecf7027fa357"
            },
            {
                "position": [
                    38.275551, -85.738953
                ],
                "distance": 235,
                "title": "Soup Line",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "320 E Court Avenue<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-af72a7e78373494b90fb06e570952ed1;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0z?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-af72a7e78373494b90fb06e570952ed1"
            },
            {
                "position": [
                    38.279709, -85.737396
                ],
                "distance": 303,
                "title": "China Connection",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "734 Meigs Ave<br/>Jeffersonville 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng1b-a47c240749f84d649840f215282bf82c;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz00?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng1b-a47c240749f84d649840f215282bf82c"
            },
            {
                "position": [
                    38.27368, -85.74014
                ],
                "distance": 460,
                "title": "Wall Street Cafe",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "401 Wall St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-b53b329247a14c42b2edbb75d348b6d0;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz01?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-b53b329247a14c42b2edbb75d348b6d0"
            },
            {
                "position": [
                    38.272499, -85.740478
                ],
                "distance": 585,
                "title": "Julie's of Jeffersonville",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "326 Spring St<br/>Jeffersonville IN 47130-3450<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-efd59f33a5804382962011698607d05f;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz02?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-efd59f33a5804382962011698607d05f"
            },
            {
                "position": [
                    38.273151, -85.741836
                ],
                "distance": 601,
                "title": "Come Back Inn",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "415 Spring Street<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-112254a222ca41d7a60ea9512e4f09d8;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz03?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-112254a222ca41d7a60ea9512e4f09d8"
            },
            {
                "position": [
                    38.27697, -85.73005
                ],
                "distance": 608,
                "title": "Slammer's Tavern Restaurant",
                "averageRating": 0,
                "category":
                {
                    "id": "bar-pub",
                    "title": "Bar/Pub",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/bar-pub?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/22.icon",
                "vicinity": "900 E Chestnut St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng1c-7d658abc1bf6467b9a56917a45706a92;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz04?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng1c-7d658abc1bf6467b9a56917a45706a92"
            },
            {
                "position": [
                    38.27241, -85.74088
                ],
                "distance": 612,
                "title": "Schimpff Confectionery",
                "averageRating": 0,
                "category":
                {
                    "id": "business-industry",
                    "title": "Business/Industry",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/business-industry?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon",
                "vicinity": "347 Spring St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-55135c8fadd6406f9fbc321364d60b54;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz05?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-55135c8fadd6406f9fbc321364d60b54"
            },
            {
                "position": [
                    38.271809, -85.73452
                ],
                "distance": 616,
                "title": "Widow's Walk",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "415 E Riverside Drive<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng19-e62bc4b29d184120917cea8ad29d4abc;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xMA?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng19-e62bc4b29d184120917cea8ad29d4abc"
            },
            {
                "position": [
                    38.272419, -85.741043
                ],
                "distance": 619,
                "title": "Cafe Chardeau",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "359 Spring St<br/>Jeffersonville IN 47130-3449<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-3de68c25f6f547c4af038a3f4e39cf8b;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xMQ?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-3de68c25f6f547c4af038a3f4e39cf8b"
            },
            {
                "position": [
                    38.272419, -85.741043
                ],
                "distance": 619,
                "title": "Perkfection",
                "averageRating": 0,
                "category":
                {
                    "id": "business-industry",
                    "title": "Business/Industry",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/business-industry?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/02.icon",
                "vicinity": "359 Spring Street<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-822fe311c6634262a8e3e7abb4c94b00;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xMg?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-822fe311c6634262a8e3e7abb4c94b00"
            },
            {
                "position": [
                    38.27356, -85.743111
                ],
                "distance": 657,
                "title": "Adrienne & Co Confectioners",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "129 W Court Ave<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-7c081da1902c4de2a3e9ea658f631f4c;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xMw?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-7c081da1902c4de2a3e9ea658f631f4c"
            },
            {
                "position": [
                    38.2832, -85.73801
                ],
                "distance": 694,
                "title": "El Ranchito",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "725 E 10th St<br/>Jeffersonville 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng1b-34f5798fd2c248d08bb1a5a2db240f78;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xNA?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng1b-34f5798fd2c248d08bb1a5a2db240f78"
            },
            {
                "position": [
                    38.27149, -85.74128
                ],
                "distance": 717,
                "title": "River Falls Motel & Lounge",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "124 W Chestnut St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-574f689fe9c2420da0c02f20d2cd463b;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xNQ?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-574f689fe9c2420da0c02f20d2cd463b"
            },
            {
                "position": [
                    38.27078, -85.73963
                ],
                "distance": 728,
                "title": "Et's Memphis Bar-B-Que",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "201 Spring St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-633ffd351ecc4a12adb971f4febd33fa;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xNg?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-633ffd351ecc4a12adb971f4febd33fa"
            },
            {
                "position": [
                    38.28018, -85.74431
                ],
                "distance": 731,
                "title": "Dairy Queen",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "213 E 10th St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng1b-af38a54e20b34dbbb23d62eedf45746e;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xNw?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng1b-af38a54e20b34dbbb23d62eedf45746e"
            },
            {
                "position": [
                    38.27075, -85.73959
                ],
                "distance": 730,
                "title": "Applebee's",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "201 Spring St<br/>Jeffersonville 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-b41ffe9576d04da1bb25803db1db0f99;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xOA?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-b41ffe9576d04da1bb25803db1db0f99"
            },
            {
                "position": [
                    38.271481, -85.741608
                ],
                "distance": 733,
                "title": "300 Pearl Apartments",
                "averageRating": 0,
                "category":
                {
                    "id": "restaurant",
                    "title": "Restaurant",
                    "href": "http://demo.places.nlp.nokia.com/places/v1/categories/places/restaurant?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                    "type": "urn:nlp-types:category"
                },
                "icon": "http://download.vcdn.nokia.com/p/d/places2/icons/categories/03.icon",
                "vicinity": "300 Pearl St<br/>Jeffersonville IN 47130<br/>USA",
                "having": [
                ],
                "type": "urn:nlp-types:place",
                "href": "http://demo.places.nlp.nokia.com/places/v1/places/840dng18-e08adcf084764ac1b043a9e9eab644cc;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQmcmFuaz0xOQ?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg",
                "id": "840dng18-e08adcf084764ac1b043a9e9eab644cc"
            }
        ]
    },
    "search":
    {
        "context":
        {
            "location":
            {
                "position": [
                    38.277, -85.737
                ],
                "address":
                {
                    "house": "531",
                    "street": "E Court Ave",
                    "postalCode": "47130",
                    "district": "Downtown Jeffersonville",
                    "city": "Jeffersonville",
                    "stateCode": "IN",
                    "county": "Clark",
                    "countryCode": "USA",
                    "country": "USA",
                    "text": "531 E Court Ave<br/>Jeffersonville IN 47130<br/>USA"
                }
            },
            "type": "urn:nlp-types:place",
            "href": "http://demo.places.nlp.nokia.com/places/v1/places/loc-dmVyc2lvbj0xO3RpdGxlPTUzMStFK0NvdXJ0K0F2ZTtsYXQ9MzguMjc3O2xvbj0tODUuNzM3O3N0cmVldD1FK0NvdXJ0K0F2ZTtob3VzZT01MzE7Y2l0eT1KZWZmZXJzb252aWxsZTtwb3N0YWxDb2RlPTQ3MTMwO2NvdW50cnk9VVNBO2Rpc3RyaWN0PURvd250b3duK0plZmZlcnNvbnZpbGxlO3N0YXRlQ29kZT1JTjtjb3VudHk9Q2xhcms7Y2F0ZWdvcnlJZD1idWlsZGluZw;context=Zmxvdy1pZD00N2E4Y2YwMi1mZTg0LTU5MTEtYTUxMC1mOTY2NmVhZTg1NTFfMTM2MDYyMzkwMjUwNV8wXzQyNzQ?app_id=4-oRAObtvVfXm2gltWk6&app_code=qyF8fWHB-SGnUyDV3B2xKg"
        }
    }
};

