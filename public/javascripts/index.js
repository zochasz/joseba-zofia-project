
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
      <a class="event-link" href="/event/${ user._id }">
        <p> <strong>${ user.name } </strong></p>
        <p> Product type: ${ user.username } </p>
      </a>
    </div>
  `
  $(".event-listing").append(showEvents);
  })
 }
}
