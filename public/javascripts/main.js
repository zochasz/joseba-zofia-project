$("input[name='radioListMap']").change(function()
{
    $( "#form-list" ).toggle();
    $( "#form-maps" ).toggle();
    initializeGoogleMap();

});

function initializeGoogleMap(){

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
};
