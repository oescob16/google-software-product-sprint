// Copyright 2020 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0;
let marker;

async function quotes() {
  const responseFromServer = await fetch('/quotes');
  const quotes = await responseFromServer.json();

  const quoteText = quotes[Math.floor(Math.random() * quotes.length)];

  const quotesContainer = document.getElementById('quotes-container');
  quotesContainer.innerText = quoteText;
}

async function loadMapLibrary() {
  const responseFromServer = await fetch('/api-key');
  const keyText = await responseFromServer.text();

  // Create the script tag, set the appropriate attributes
  var script = document.createElement('script');
  script.src = 'https://maps.googleapis.com/maps/api/js?key='+keyText+'&callback=initMap';
  script.async = true;

  // Attach your callback function to the `window` object
  window.initMap = function() {
    // JS API is loaded and available
  };

  // Append the 'script' element to 'head'
  document.head.appendChild(script);

  window.location.href = script.src
}

function createMap() {
  const myLatLng = new google.maps.LatLng(31.69, -106.42);
  const mapOptions = {
    zoom: 11,
    center: myLatLng,
    mapTypeControlOptions: {
      mapTypeIds: ['roadmap', 'terrain', 'styled_map'],
    },
  };

  const styledMapType = new google.maps.StyledMapType (
    [
      { elementType: 'geometry.stroke', stylers: [{ color: '#666666' }] },
      { elementType: 'geometry.fill', stylers: [{ color: '#fff5ea' }] },
      { elementType: 'labels.icon', stylers: [{ color: '#a3785e' }, { visibility: 'simplified' }] },
      { elementType: 'labels.text.stroke', stylers: [{ color: '#ffffff' }] },
      { elementType: "labels.text.fill", stylers: [{ color: "#523735" }] },
      { 
        featureType: 'landscape.natural.terrain',
        elementType: 'geometry',
        stylers: [{ color: '#7b7b7b'}],
      },
      { 
        featureType: 'poi.park',
        elementType: 'geometry',
        stylers: [{ color: '#80d561' }],
      },
      { 
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{ color: '#77a1ff' }],
      },
    ],
    { name: 'Styled Map' },
  );

  const map = new google.maps.Map(document.getElementById('map'), mapOptions);

  map.mapTypes.set('styled_map', styledMapType);
  map.setMapTypeId('styled_map');

  google.maps.event.addListener(map, 'click', (event) => {
    addMarker(event.LatLng, map)
  });

  const pictureSpot1 = new google.maps.LatLng(31.7414412, -106.4837855);
  const pictureSpot2 = new google.maps.LatLng(31.762481, -106.457501);
  const pictureSpot3 = new google.maps.LatLng(31.6591463,-106.4399946);
  const pictureSpot4 = new google.maps.LatLng(31.742862, -106.450607);

  const contentPicSpot1 = 
  '<div id="content">' +
  '<div id="spotInfo1">' + 
  '</div>' +
  '<h1 id="title1">El subterraneo</h1>' +
  '<div id="picContent1">' +
  '<p><b>El subterraneo</b> es llamado asi debido a que, aparte de que hay un edificio sin terminar ' +
  'se encuentra un estacionamiento subterraneo que jamas se termino de construir. ' +
  'Dicho subterraneo desciende 2 niveles, en donde el ultimo casi no llega luz y, por ende, ' +
  'un lugar excelente para tomar fotos. Lo especial de este lugar es que la profundidad de la escenografia ' + 
  'gracias a los grafitis creativos que se encuentran en el lugar.'

  addMarker(pictureSpot1, map, 'Las palmas', 'En construccion...');
  addMarker(pictureSpot2, map, 'El refugio', 'En construccion...');
  addMarker(pictureSpot3, map, 'El palacio', 'En construccion...');
  addMarker(pictureSpot4, map, 'El subterraneo', contentPicSpot1);

  marker.setMap(map)
}

function addMarker(location, map, title, contentPic) {
  const infoPicWindow = new google.maps.InfoWindow({
    content: contentPic,
  })
  marker = new google.maps.Marker({
    position: location,
    map: map,
    label: labels[labelIndex++ % labels.length],
    animation: google.maps.Animation.DROP,
    title: title,
  });
  marker.addListener('click', () => {
    infoPicWindow.open(map, marker);
  });
  marker.addListener('click', toggleBounce);
}

function toggleBounce() {
  if (marker.getAnimation() !== null) {
    marker.setAnimation(null);
  } else {
    marker.setAnimation(google.maps.Animation.BOUNCE);
  }
}
