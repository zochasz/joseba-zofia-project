$(document).ready(function(){

  // Create and Initialize Map
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 11,
    center: {
            lat: 40.417080,
            lng: -3.703612
            }
  });

  // Add event/producer markers to map
  let markers = [];

    let title = myEvent.title;
    let position = {
      lat: myEvent.address.latitude,
      lng: myEvent.address.longitude
    };

    var pin = new google.maps.Marker({ position, map, title  });
    markers.push(pin)

    // Rate
    const addRating = new Rating()
    $('#input-id').on('rating.change', function(event, value, caption) {
      console.log(value);
      console.log(caption);
      e.preventDefault();
      const stars = value;
      console.log(stars);
      addRating.ratingEvent(stars);
    });
});

$('#input-id').on('rating.clear', function(event) {
    console.log("rating.clear");
});


// $( "#favorite-button" ).click(function() {
//   console.log("favorite")
//
// });
