$(document).ready(function(){

  // Create and Initialize Map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {
            lat: 40.417080,
            lng: -3.703612
            }
  });

  // Add restaurant markers to map
  let markers = [];
  console.log(myEvent);

    let title = myEvent.title;
    let position = {
      lat: myEvent.address.latitude,
      lng: myEvent.address.longitude
    };

    console.log(position);
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
});
