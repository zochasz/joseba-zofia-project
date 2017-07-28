
$(document).ready( () => {
  const filteredSearch = new Filter()

  $('#my-form').on('submit', (e) => {
    e.preventDefault();
    const formResults = $('#my-form').serializeArray();
    const productTypes = formResults[0].value;
    const radioOptions = formResults[1].value;
    console.log(productTypes, radioOptions);
    filteredSearch.filterEvents(productTypes, radioOptions);

    $ ( ".event-listing" ).empty();

  })
})

function handleResponse(res) {
  drawFilteredEvents(res)
  drawMap(res)
}

function drawFilteredEvents(list){
  if (list.events) {
    list.events.forEach((event) => {
    const showEvents = `
     <div class="event-box">
       <a class="event-link" href="/event/${ event._id }">
         <p> <strong>${ event.title } </strong></p>
         <p> Product type: ${ event.products } </p>
       </a>
     </div>
   `
   $(".event-listing").append(showEvents);
   })
 }
 else {
   list.users.forEach((user) => {
   const showEvents = `
    <div class="event-box">
      <a class="event-link" href="/producer/${ user._id }">
        <p> <strong>${ user.name } </strong></p>
        <p> Product type: ${ user.username } </p>
      </a>
    </div>
  `
  $(".event-listing").append(showEvents);
  })
 }
}

function drawMap(list) {
  if (list.events) {
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
    list.events.forEach(function(event){
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
    list.users.forEach(function(event){
      let title = event.title;
      let position = {
        lat: event.address.latitude,
        lng: event.address.longitude
      };

      var pin = new google.maps.Marker({ position, map, title  });
      markers.push(pin)
    });
  }
}
