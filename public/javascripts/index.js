
$(document).ready( () => {
  const filteredSearch = new Filter()

  $('#my-form').on('submit', (e) => {
    event.preventDefault();
    console.log('funciona')
    //filteredSearch.filterEvents("AQUI EL VALOR DEL INPUT SEARCH");
  })
})
