
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
console.log(event.datetime);
console.log(new Date(event.datetime.toString()));
    const showEvents = `
    <div class="event-box">
      <a class="event-link" href="/event/${ event._id }">
      <img src="/images/${ event.products[0].image600 }" alt="Product Image">
        <div class="event-date">
          <p class="date">${ new Date(event.datetime).toString().substring(4, 11) } </p>
          <p class="hour">${ event.datetime.toString().substring(11, 16) } h.</p>
        </div>
        <p> <strong>${ event.title } </strong></p>
        <p> Product type: ${ event.products[0].name }
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
        <img src="/images/${ user.products[0].image600 }" alt="Product Image">
        <p> <strong>${ user.name } </strong></p>
        <p> Product type: ${ user.products[0].name } </p>
      </a>
    </div>
  `
  $(".event-listing").append(showEvents);
  })
 }
}

function drawMap(list) {
  myEvents = list.events;
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
