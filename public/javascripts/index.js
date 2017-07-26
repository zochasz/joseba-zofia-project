
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

    events.forEach((event) => {
    const showEvents = `
     <div class="event-box">
       <a class="event-link" href="/event/${ event._id }">
         <p> <strong>${ event.title } </strong></p>
         <p> Product type: ${ event.products } %> </p>
       </a>
     </div>
   `
   $(".event-listing").append(showEvents);
    })
  })
})
