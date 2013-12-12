var _Mapping = {
    Barges: []
};
var _Main = {
    mTableExpanded: false,
    Init: function () {
        //CREATE SOME CONTAINERS 

        var container = document.createElement('div');
        var maincontent_wrap = document.createElement('div');
        var MapContainer = document.createElement('div');
        var Map_Canvas = document.createElement('div');
        var Results_Container = document.createElement('div');

        container.id = 'container';
        maincontent_wrap.id = 'maincontent_wrap';
        MapContainer.id = 'MapContainer';
        Map_Canvas.id = 'Map_Canvas';
        Results_Container.id = 'Results_Container';

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
        maincontent_wrap.appendChild(Results_Container);
        container.appendChild(maincontent_wrap);
        document.body.appendChild(container);
        //Call Ajax Service
        var mappingServiceURL = "xxxx";
        var parameters = location.search.substring(1); //Get or Post parameters ex: 'report=xxx&name=yyy'        
        _GlobalUtilities.CallAjax(mappingServiceURL, parameters, 'POST', true, null, _Main.Main);
    },
    Main: function () {
        _Mapping.Barges = _GlobalUtilities.JsonToObject(_AjaxResponseHandler.AjaxResponseString);
        _Main.DisplayMap();

        if (navigator.userAgent.match(/MSIE 7.0/)) {
            _Main.DisplayIE7Table();
        } else {
            _Main.DisplayTable();
            _GlobalUtilities.AddEventHandler(document.getElementById('lnkExpandTable'), 'click', _Main.ExpandTable);
        }  
    },
    DisplayTable: function () {
        //Display Infor contraint. Must match order of json.
        var DisplayItems = ['BARGE', 'STATUS', 'STATUSDATETIME', 'LOCATIONMILE', 'COMMODITY'];
        var Results_Container = document.getElementById('Results_Container');
        var fragment = document.createDocumentFragment();
        var counter = 0;
        //Barges on the same boat or fleet are group together. We get this number in json file
        var max = _Mapping.Barges[_Mapping.Barges.length - 1].COUNTER;

        var lnkExpandTable = document.createElement('a');
        lnkExpandTable.setAttribute('id', 'lnkExpandTable');

        lnkExpandTable.href = 'javascript:void(0)';
        if (_Main.mTableExpanded) {
            lnkExpandTable.appendChild(document.createTextNode('Collapse'));
            Results_Container.setAttribute('class', 'Results_Container_Expand');
            _Main.mTableExpanded = false;
        } else {
            lnkExpandTable.appendChild(document.createTextNode('Expand'));
            Results_Container.setAttribute('class', 'Results_Container_Collapse');
            _Main.mTableExpanded = true;
        }
        fragment.appendChild(lnkExpandTable);

        while (counter <= max) {
            //Holds each group elements
            var rowContainer = document.createElement('div');
            rowContainer.setAttribute('class', 'RowContainer');
            //Display group number
            var left = document.createElement('div');
            left.setAttribute('class', 'LeftInnerContainer');
            //Cannot get event listener to work correctly.
            left.setAttribute('onclick', '_Main.CenterBarge(this.innerHTML);scrollToTop();');
            left.setAttribute('ondblclick', '_ServiceMap.MapBox.CenterDeviceContext(33.9053, -88.1764, 5, true)');
            left.setAttribute('title', 'Click to zoom on barge group, double click to zoom out');
            left.innerHTML = counter;
            //Holds group data
            rowContainer.appendChild(left);
            var table = document.createElement('table');
            table.setAttribute('class', 'RightInnerContainer');

            //HEADER TEXT
            var header = document.createElement('tr');
            header.setAttribute('class', 'RightInnerTableHeader');
            for (var z = 0; z < DisplayItems.length; z++) {
                var cell = document.createElement('td');
                cell.appendChild(document.createTextNode(DisplayItems[z]));
                header.appendChild(cell);
            }
            table.appendChild(header);

            //Adds barge info
            for (var i = 0; i < _Mapping.Barges.length; i++) {
                if (counter == _Mapping.Barges[i].COUNTER) {
                    var row = document.createElement('tr');
                    row.setAttribute('ondblclick', '_Main.CallBargeInfoPanel("' + _Mapping.Barges[i].BARGE + '","' + _Mapping.Barges[i].STATUS + '")');
                    for (var item in _Mapping.Barges[i]) {
                        for (var x = 0; x < DisplayItems.length; x++) {
                            if (item === DisplayItems[x]) {
                                var cell = document.createElement('td');
                                cell.appendChild(document.createTextNode(_Mapping.Barges[i][item]));
                                cell.setAttribute('title', 'Double Click for more information');
                                row.appendChild(cell);
                            }
                        }
                    }
                    table.appendChild(row);
                }
            }
            rowContainer.appendChild(table);
            fragment.appendChild(rowContainer);
            counter++;
        }
        Results_Container.appendChild(fragment);
    },
    DisplayIE7Table: function () {
        var DisplayItems = [ 'STATUS', 'STATUSDATETIME', 'LOCATIONMILE', 'COMMODITY' ,'BARGE','COUNTER'];
        var Results_Container = document.getElementById('Results_Container');      
        var table;
        table = '<table class="ie7" >';
        table += '<tr>';
        table += '<td> ' + 'GROUP NUMBER' + ' </td>';
        for (var z = 0; z < DisplayItems.length; z++) {            
            if (DisplayItems[z] !== 'COUNTER') {
                table = table + '<td> ' + DisplayItems[z] + ' </td>';
            }
        }
        table += '</tr>';
        for (var i = 0; i < _Mapping.Barges.length; i++) {
            table += '<tr><td> ' + _Mapping.Barges[i].COUNTER + ' </td>';
            for (var item in _Mapping.Barges[i]) { 
                for (var x = 0; x < DisplayItems.length; x++) {                    
                    if (item === DisplayItems[x] && item !== 'COUNTER') {
                        table = table + '<td> ' + _Mapping.Barges[i][item] + ' </td>';
                    }                   
                }
            }
            table += '</tr>';
        }
        table += '</table>';
        Results_Container.innerHTML = table;
    },
    DisplayMap: function () {
        //LoadMapbox
        // _ServiceMap.MapBox.CreateMap('Map_Canvas', 'xxx');
        // _ServiceMap.MapBox.CreateMap('Map_Canvas', 'xxx2');
        _ServiceMap.MapBox.CreateMap('Map_Canvas', { 1: 'xxx', 2: 'xxxx2', 3: 'xxx3' });
        //load Markers
        for (var i = 0; i < _Mapping.Barges.length; i++) {
            var image = '//xxx/image/markers/chart(' + _Mapping.Barges[i].COUNTER + ').png';
            _ServiceMap.MapBox.AddMarker(
                _Mapping.Barges[i].LATITUDE,
                _Mapping.Barges[i].LONGITUDE,
                _Mapping.Barges[i].COUNTER,
                image
            );
        }
        _ServiceMap.MapBox.DisplayMarkers('mapbox-marker');
        _ServiceMap.MapBox.CenterDeviceContext(33.9053, -88.1764, 5, true);
        window.setTimeout('_ServiceMap.MapBox.ZoomRange(4, 16)', 2000);
        window.setTimeout('_ServiceMap.MapBox.PanRange([{ lat: 20, lon: -48 }, { lat: 50, lon: -135}])', 3000);

    },
    ExpandTable: function () {
        var Results_Container = document.getElementById('Results_Container');
        while (Results_Container.firstChild) {
            Results_Container.removeChild(Results_Container.firstChild);
        }
        _Main.DisplayTable();
        _GlobalUtilities.AddEventHandler(document.getElementById('lnkExpandTable'), 'click', _Main.ExpandTable);
        return false;
    },
    CenterBarge: function (counter) {
        for (var i = 0; i < _Mapping.Barges.length; i++) {
            if (counter == _Mapping.Barges[i].COUNTER) {
                _ServiceMap.MapBox.CenterDeviceContext(
                    _Mapping.Barges[i].LATITUDE,
                    _Mapping.Barges[i].LONGITUDE,
                    12,
                    true);
                return false;
            }
        }
    },
    CallBargeInfoPanel: function (BARGE, STATUS) {
        //Call Ajax Service
        var mappingServiceURL = 'xxxx';
        var parameters = 'BargeID=' + BARGE + '&' + 'Status=' + STATUS;
        _GlobalUtilities.CallAjax(mappingServiceURL, parameters, 'GET', true, null, _Main.ShowBargeInfoPanel);
    },
    ShowBargeInfoPanel: function () {
        if (document.getElementById('floating')) {
            document.getElementById('container').removeChild(document.getElementById('floating'));
        }
        var maincontent_wrap = document.getElementById('maincontent_wrap');
        maincontent_wrap.setAttribute('style', 'width:54%; float:left;');
        var lnkCloseBargeInfo = document.createElement('a');
        lnkCloseBargeInfo.setAttribute('id', 'lnkCloseBargeInfo');
        lnkCloseBargeInfo.setAttribute('style', 'float:left;font-weight:900;');
        lnkCloseBargeInfo.href = 'javascript:void(0)';
        lnkCloseBargeInfo.setAttribute('onclick', '_Main.CloseBargeInfoPanel()');
        lnkCloseBargeInfo.appendChild(document.createTextNode('Close'));

        var floating = document.createElement('div');
        floating.setAttribute('id', 'floating');
        floating.appendChild(lnkCloseBargeInfo);

        floating.innerHTML += _AjaxResponseHandler.AjaxResponseString;
        document.getElementById('container').appendChild(floating);
    },
    CloseBargeInfoPanel: function () {
        if (document.getElementById('floating')) {
            document.getElementById('container').removeChild(document.getElementById('floating'));
            var maincontent_wrap = document.getElementById('maincontent_wrap');
            maincontent_wrap.setAttribute('style', 'width:97%;');
        }
        return false;
    }

};

//*******************************************************************************************************************
//GIANAREAS 
var _GlobalUtilities = {
    //GetS an Ajax obj ()
    AjaxObject: (function () {
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
    }),
    AddEventHandler: function (obj, eventName, handler) {
        if (document.attachEvent) {
            eventName = "on" + eventName.toLowerCase();
            obj.attachEvent(eventName, handler);
        } else if (document.addEventListener) {
            obj.addEventListener(eventName.toLowerCase(), handler, false);
        }
    },
    JsonToObject: function (j) {
        try {
            return JSON.parse(j);
        } catch (e) {
            try {
                return eval('(' + j + ')');
            }
            catch (e) {
                return null;
            }
        }
    },
    GetElement: function (id) {
        return document.getElementById(id);
    },
    //PRE: Param1(url>0), Param2(Passing Data, string > 0 && HTTP Format), param3 (Type of request, Get or Post), Param4 (boolean, Async),Param5(Custom AjaxHandler, function pointer), Param6 (jump to method after getting response, Function Pointer)
    //POST: Will populate _AjaxResponseHandler class as default, Note: Async calls will not stop execution. 
    //Description: Calls a service or resource using ajax. 
    CallAjax: function (url, Parameters, RequestMethod, bAsync, AjaxResponseHandler, AfterAjaxHandler) {
        var request = this.AjaxObject();
        if (request !== null) {
            if (RequestMethod == 'GET') {
                url = url + '?' + Parameters;
                request.open('GET', url, bAsync);
            } else if (RequestMethod == 'POST') {
                request.open('POST', url, bAsync);
                request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
            } else {
                request = null;
                return null;
            }
            request.onreadystatechange = function () {
                if (request.readyState == 4) {
                    if (request.status == 200) {
                        try {
                            if (AjaxResponseHandler) {
                                AjaxResponseHandler(request.responseText);
                            } else {
                                _AjaxResponseHandler.AjaxResponse(request.responseText)
                            }
                            request = null;
                            if (AfterAjaxHandler) {
                                AfterAjaxHandler();
                            }
                        } catch (e) {
                            request = null;
                        }
                    }
                } else {
                    if (AjaxResponseHandler) {
                        AjaxResponseHandler.AjaxStatus = 'Loading';
                    } else {
                        _AjaxResponseHandler.AjaxStatus = 'Loading';
                    }
                }
            };
            if (RequestMethod == 'GET') {
                request.send(null);
            } else if (RequestMethod == 'POST') {
                request.send(Parameters);
            }
            else {
                request = null;
                return null;
            }
        }
    }
};
var _AjaxResponseHandler = {
    AjaxResponse: function (ajaxResponse) {
        this.AjaxResponseString = ajaxResponse;
    },
    AjaxResponseString: ' ',
    AjaxStatus: ' '

};

//***********************************************************************************************************************
//  Mapping

var _MappingSolutionAddresses = {
    MapBox: {
        JavaScript: 'http://api.tiles.mapbox.com/mapbox.js/v0.6.7/mapbox.js',
        CSS: 'http://api.tiles.mapbox.com/mapbox.js/v0.6.7/mapbox.css'
    }
};

var _ServiceMap = {
    MapBox: {
        Map: '',
        MarkerLayer: {},
        MarkerFeatures: [],
        LoadedImageElement: [],
        CreateMap: function (elementID, mapBoxId) {
            _ServiceMap.MapBox.Map = mapbox.map(elementID);
            for (var map in mapBoxId) {
                _ServiceMap.MapBox.Map.addLayer(
                     mapbox.layer().id(mapBoxId[map])
                );
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
                    var maps = _ServiceMap.MapBox.Map.getLayers();

                    var p = document.createElement('div');
                    p.id = 'MapOptionsInnerContainer';
                    for (var x = 0; x < maps.length - 1; x++) {
                        var b = document.createElement('input');
                        b.type = 'button';
                        b.id = maps[x].name;
                        b.className = 'MapOptionsInput';
                        b.value = maps[x]._tilejson.name;
                        b.onclick = function (e) {_ServiceMap.MapBox.ChangeMapLayout(e); };
                        p.appendChild(b);
                    }
                    document.getElementById('MapOptionsContainer').appendChild(p);
                }
            };
            placeholder.appendChild(button);
            document.getElementById('Map_Canvas').appendChild(placeholder);

            //For some reasson mapbox has issues when changing layers if they dont get disabled once first 
            var map = _ServiceMap.MapBox.Map.getLayers();
            for (var x = 0; x < map.length - 1; x++) {
                if (_ServiceMap.MapBox.Map.getLayer(map[x].name).enabled) {
                    _ServiceMap.MapBox.Map.getLayer(map[x].name).disable();
                }
            }

            _ServiceMap.MapBox.Map.ui.zoomer.add();
            _ServiceMap.MapBox.Map.ui.zoombox.add();
            _ServiceMap.MapBox.Map.ui.refresh();
            
        },
        ChangeMapLayout: function (e) {
            var map = _ServiceMap.MapBox.Map.getLayers();
            for (var x = 0; x < map.length - 1; x++) {
                if (_ServiceMap.MapBox.Map.getLayer(map[x].name).enabled) {
                    _ServiceMap.MapBox.Map.getLayer(map[x].name).disable();
                }
            }
            //hate u ie8            
            var caller = e || window.event;
            var id = caller.target || caller.srcElement;
            _ServiceMap.MapBox.Map.getLayer(id.id).enable();
            _ServiceMap.MapBox.Map.ui.refresh();
        },
        FlipMapLayout: function () {
            var maps = _ServiceMap.MapBox.Map.getLayers();
            for (var x = 0; x < maps.length - 1; x++) {
                if (_ServiceMap.MapBox.Map.getLayer(maps[x].name).enabled) {
                    _ServiceMap.MapBox.Map.getLayer(maps[x].name).disable();
                }
            }
            if (CurrentLayer < _ServiceMap.MapBox.Map.getLayers().length - 2) {
                CurrentLayer++;
            } else {
                CurrentLayer = 0;
            }
            _ServiceMap.MapBox.Map.getLayer(maps[CurrentLayer].name).enable();

            this.value = maps[CurrentLayer]._tilejson.name;
            //  _ServiceMap.MapBox.DisplayMarkers('mapbox-marker');
            _ServiceMap.MapBox.Map.ui.refresh();
        },
        CenterDeviceContext: function (Lat, Lon, zoomLevel, animate) {
            _ServiceMap.MapBox.Map.centerzoom(
                    {
                        lat: Lat,
                        lon: Lon
                    },
                    zoomLevel,
                    animate
                );
        },
        AddMarker: function (lat, lon, group, imageURL) {
            _ServiceMap.MapBox.MarkerFeatures.push({
                "geometry": {
                    "type": "Point",
                    "coordinates": [lon, lat]
                },
                "properties": {
                    "image": imageURL,
                    "group": group
                }
            });
        },
        DisplayMarkers: function (MarkerCssClassName) {
            var counter = -1;
            _ServiceMap.MapBox.MarkerLayer = mapbox.markers.layer().features(_ServiceMap.MapBox.MarkerFeatures).factory(
                    function (f) {
                        if (counter != f.properties.group) {
                            var img = document.createElement('img');
                            img.className = MarkerCssClassName;
                            img.setAttribute('src', f.properties.image);
                            counter = f.properties.group;
                            _ServiceMap.MapBox.LoadedImageElement.push(img);
                            return img;
                        }
                    }
                );
            _ServiceMap.MapBox.Map.addLayer(_ServiceMap.MapBox.MarkerLayer);
        },
        ZoomRange: function (min, max) {
            _ServiceMap.MapBox.Map.setZoomRange(min, max);
        },
        PanRange: function (coords) {
            _ServiceMap.MapBox.Map.setPanLimits(coords);
        }
    }
};

function scrollToTop() {    
    var inter = setInterval(
        function () {
            var currentPosition = document.body.scrollTop || document.documentElement.scrollTop;
            var decreaseBy = currentPosition - (currentPosition / 1.2);
            currentPosition -= decreaseBy;
            if (currentPosition > 4) {
                document.body.scrollTop = document.documentElement.scrollTop = currentPosition;
            }
            else {
                var stopInterval = function (inter) {
                    clearInterval(inter);
                };
                stopInterval(inter);
                document.body.scrollTop = 0;
                currentPosition = 0;
            }
        }
        , 2);
}


function delayExecute() {
    window.setTimeout(_Main.Init, 100);
}
//Global Handlers


_GlobalUtilities.AddEventHandler(window, 'load', delayExecute);
