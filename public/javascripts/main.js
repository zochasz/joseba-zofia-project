$("input[name='radioListMap']").change(function()
{
    $( "#form-list" ).toggle();
    $( "#form-maps" ).toggle();

    initializeGoogleMap();

});

$("input[name='radioOptions']").change(function()
{
    $( "#event-listing" ).toggle();
    $( "#producer-listing" ).toggle();

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
 if ($("input#radio1").is(":checked")) {
  // Add events markers to map
  let markers = [];
  myEvents.forEach(function(event){
    let title = event.title;
    let position = {
      lat: event.address.latitude,
      lng: event.address.longitude
    };

    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)
  });
}
else {
 // Add producers markers to map
 let markers = [];
 myProducers.forEach(function(user){
   let title = user.username;
   let position = {
     lat: user.address.latitude,
     lng: user.address.longitude
   };

   var pin = new google.maps.Marker({ position, map, title  });
   markers.push(pin)
 });
}
};
