class Filter {

  //handleResponse(res){
    //this.filteredList = res.events
  // }

  handleError(err) {
    console.log("ERR=====")
    console.log(err)
  }

  filterEvents (prod_typ, where_find) {
    $.ajax({
      method: 'GET',
      url: `/search?product_types=${prod_typ}&where_find=${where_find}`,
      success: handleResponse,
      error: this.handleError
    });

  }
}
