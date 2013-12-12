
var MAP; //WHYYY? Sorry forgot about this.
var BOATS;

function main() {
    (function layers() {
        var container = document.createElement('div');
        var maincontent_wrap = document.createElement('div');
        var MapContainer = document.createElement('div');
        var Map_Canvas = document.createElement('div');
        container.id = 'container';
        maincontent_wrap.id = 'maincontent_wrap';    
        MapContainer.id = 'MapContainer';
        Map_Canvas.id = 'Map_Canvas';
        //Check if IE8 OR LESS and display warning
        if (navigator.userAgent.match(/MSIE\s(?!10.0)/)) {
            var warning = document.createElement('div');
            warning.id = 'warning';
            warning.setAttribute('style', 'font-size:large;border: solid;border-color:#ffea47; display:inline-block;width:99.5%; background-color: #fefcc1;    text-align:center;');
            warning.innerHTML = '*An outdated version of Internet Explorer is detected.  Consider using a newer version or another up-to-date browser.';
            container.appendChild(warning);
        }
        MapContainer.appendChild(Map_Canvas);
        maincontent_wrap.appendChild(MapContainer);
        container.appendChild(maincontent_wrap);
        document.body.appendChild(container);
    })();

    (function createMap() {
        //LoadMapbox

        MAP = new MapBox();
        MAP.createMap(
            'Map_Canvas',
             {
                 1: 'xxxx',
                 2: 'xxxx',
                 3: 'xxxx'
             }
            );
        MAP.centerDC({
            "Lat": 33.9053,
            "Lon": -88.1764,
            "Zoom": 6,
            "Animate": true
        });
        
        window.setTimeout('MAP.zoomRange(4, 16)', 2000);
        window.setTimeout('MAP.panRange([{ lat: 20, lon: -48 }, { lat: 50, lon: -135}])', 3000);
      
    })();

    BOATS = new boats();    
    BOATS.retriveBoats();
    setTimeout(function(){    
        var searchContainer = document.createElement('div');
        searchContainer.id = 'searchContainer';        
        searchContainer.innerHTML = 'Boat Listing';



        var list = document.createElement('ul');
        list.id = 'boats';
        var b = BOATS.getBoats();
        for (var i = 0; i < b.length; i++) {
            var li = document.createElement('li');
            list.appendChild(li);
            li.innerHTML = i  + ')   ' + b[i].BOAT_ID + ' - ' + b[i].BOAT_NAME;
            li.id = i;
            li.onclick = function (e) {
                //var b = BOATS.getBoats();
                MAP.centerDC({
                    "Lat": b[e.currentTarget.id].LATITUDE,
                    "Lon": b[e.currentTarget.id].LONGITUDE,
                    "Zoom": 16,
                    "Animate": true
                });
            }

        }
        searchContainer.appendChild(list);

        document.getElementById('maincontent_wrap').appendChild(searchContainer);
        
    }, 2000);
    
}
var ParseJson = function (string) {
    try {
        return JSON.parse(string);
    } catch (e) {
        try {
            return eval('(' + string + ')');
        }
        catch (e) {
            return null;
        }
    }
};

function boats() {
    var Boats =  [];
    var NewBoats = []; //New boats pulled from service. We will check for changes and update only the ones that need it.
    this.getBoats = function(){
        return Boats;
    }

    this.retriveBoats =  function () {
        var Ajax = new ajax();
        Ajax.getAjax({
            method: "POST",
            url: "xxxx", 
            parametersString: "",
            handler: this.update,
            async: true
        });
    };
    this.update= function (boats) {
        if (boats !== null) {        
            Boats = ParseJson(boats);
        }        
        draw();
    };
    var draw = function () {
        var north = 90;
        var east = 0;
        var east2 = 360;
        var west = 180;
        var south = 270;
        if (Boats.length > 0) {
            for (var i = 0; i < Boats.length; i++) {

                var Degree = parseInt(Boats[i].DEGREES);
                var Direction= Boats[i].DIRECTION;
                var image = ''; 
                if (Degree >= north - 1 && Degree <= north + 1) { image = 'images/up.png' }
                else if (Degree >= south - 1 && Degree <= south + 1) { image = 'images/down.png' }
                else if (Degree >= west - 1 && Degree <= west + 1) { image = 'images/left.png' }
                else if ((Degree >= east - 1 && Degree <= east + 1) || (Degree >= east2 - 1 && Degree <= east2)) { image = 'images/right.png' }
                else if (Degree > east + 1 && Degree < north - 1) { image = 'images/upright.png' }
                else if (Degree > north + 1 && Degree < west - 1) { image = 'images/upleft.png' }
                else if (Degree > west + 1 && Degree < south - 1) { image = 'images/downleft.png' }
                else if (Degree > south + 1 && Degree < east2 - 1) { image = 'images/downright.png' }
                else if (Direction == 'N') { image = 'images/up.png' }
                else if (Direction == 'S') { image = 'images/down.png' }
                else if (Direction == 'E') { image = 'images/right.png' }
                else if (Direction == 'W') { image = 'images/left.png' }
                else { image = 'images/up.png' }


                var t = {
                    "lat": Boats[i].LATITUDE,
                    "lon": Boats[i].LONGITUDE,
                    "imageURL": image,
                    "text": Boats[i].BOAT_ID,
                    "text2": Boats[i].DEGREES + '-' + Boats[i].DIRECTION

                };

                MAP.addMarker(t);
            }
            MAP.displayMarkers('mapbox-marker', 'mapbox-marker-text');
        }
    };
};

window.onload = function () {
    main();
};


function MapBox() {
    var Map;
    var MarkerLayer;
    var MarkerFeatures = [];
    var LoadedImageElement = [];
    this.createMap = function (elementID, mapBoxId) {
        Map = mapbox.map(elementID);
        for (var m in mapBoxId) {
            Map.addLayer(mapbox.layer().id(mapBoxId[m]));
        }
        var placeholder = document.createElement('div');
        placeholder.id = 'MapOptionsContainer';
        placeholder.className = 'MapOptionsContainer';

        var button = document.createElement('input');
        button.type = 'button';
        button.id = 'MapOptions';
        button.className = 'MapOptions';
        button.value = 'Map Options';
        button.onclick = function () {
            if (document.getElementById('MapOptionsInnerContainer')) {
                document.getElementById('MapOptionsContainer').removeChild(document.getElementById('MapOptionsInnerContainer'));
            } else {
                var maps = Map.getLayers();
                var p = document.createElement('div');
                p.id = 'MapOptionsInnerContainer';
                for (var x = 0; x < maps.length-1; x++) {
                    var b = document.createElement('input');
                    b.type = 'button';
                    b.id = maps[x].name;
                    b.className = 'MapOptionsInput';
                    b.value = maps[x]._tilejson.name;
                    b.onclick = function (e) {
                        var m = Map.getLayers();
                        for (var x = 0; x < m.length-1; x++) {
                            if (Map.getLayer(m[x].name).enabled) {
                                Map.getLayer(m[x].name).disable();
                            }
                        }
                        //hate u ie8            
                        var caller = e || window.event;
                        var id = caller.target || caller.srcElement;
                        Map.getLayer(id.id).enable();
                        Map.ui.refresh();

                    };
                    p.appendChild(b);
                }
                document.getElementById('MapOptionsContainer').appendChild(p);
            }
        };

        placeholder.appendChild(button);
        document.getElementById('Map_Canvas').appendChild(placeholder);

        //For some reasson mapbox has issues when changing layers if they dont get disabled once first 
        var m = Map.getLayers();
        for (var x = 0; x < m.length - 1; x++) {
            if (Map.getLayer(m[x].name).enabled) {
                Map.getLayer(m[x].name).disable();
            }
        }
        Map.ui.zoomer.add();
        Map.ui.zoombox.add();
        Map.ui.refresh();
    };
    this.centerDC = function (o) {
        Map.centerzoom(
            {
                lat: o.Lat,
                lon: o.Lon
            },
                o.Zoom,
                o.Animate
            );

    };
    this.addMarker = function (o) {
        MarkerFeatures.push({
            "geometry": {
                "type": "Point",
                "coordinates": [o.lon, o.lat]
            },
            "properties": {
                "image": o.imageURL,
                "text": o.text,
                "text2": o.text2

            }
        });

    };
    this.clearMarker = function () {
        MarkerFeatures = [];
    };
    this.displayMarkers = function (MarkerCssClassName,TextCssClassName) {
        MarkerLayer = mapbox.markers.layer().features(MarkerFeatures).factory(
                    function (f) {
                        var text = document.createElement('div');
                        text.innerHTML = '<p class=' + TextCssClassName + '>' + f.properties.text + ' - ' + f.properties.text2 + '</p>';                        
                        text.innerHTML += '<img  src="' + f.properties.image + '" class="' + MarkerCssClassName + '"></img>';       
                        return text;
                    }
                );
        Map.addLayer(MarkerLayer);
    };
    this.zoomRange = function (min, max) {
        Map.setZoomRange(min, max);
    }
    this.panRange = function (coords) {
        Map.setPanLimits(coords);
    };
}



function ajax() {
    var request;
    var response; //result string
    var getRequest = function () {
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
        request =  requestObject;
    };
    this.ParseJson = function (string) {
        try {
            return JSON.parse(string);
        } catch (e) {
            try {
                return eval('(' + string + ')');
            }
            catch (e) {
                return null;
            }
        }
    };
    this.getAjax = function (o) {
        getRequest();
        if (request !== null) {
            if (o.method == 'GET') {
                o.url = o.url + '?' + o.parametersString;
                request.open('GET', o.url, o.async);
            } else if (o.method == 'POST') {
                request.open('POST', o.url, o.async);
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            } else {
                request = null;                
            }
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        try {
                            response = request.responseText;
                            if (o.handler) {                                
                                o.handler(response);
                            }
                        } catch (e) {
                            request = null;
                        }                    
                    }
                }
            };
            if (o.method == 'GET') {
                request.send(null);
            } else if (o.method == 'POST') {
                request.send(o.parametersString);
            }
            else {
                request = null;                
            }
        }//
    };
}