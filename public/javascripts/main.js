$( "#toggle-event" ).change(function() {

    $( "#form-list" ).toggle();
    $( "#form-maps" ).toggle();

});

$(document).ready(function(){

  const sol = {
  lat: 40.417080,
  lng: -3.703612
  };

  // Create and Initialize Map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 30,
    center: sol
  });

  // Add restaurant markers to map
  let markers = [];
  console.log(myEvents);
  myEvents.forEach(function(event){
    let title = event.title;
    let position = {
      lat: event.address.latitude,
      lng: event.address.longitude
    };

    console.log(position);
    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
  });
});
