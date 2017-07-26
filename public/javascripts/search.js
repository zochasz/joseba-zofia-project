class Filter {

  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  handleResponse(res){
    console.log("RES=====")
    console.log(res)
  }

  handleError(err) {
    console.log("ERR=====")
    console.log(err)
  }

  filterEvents (prod_typ, where_find) {
    $.ajax({
      method: 'GET',
      url: `/search?product_types=${prod_typ}&where_find=${where_find}`,
      success: this.handleResponse,
      error: this.handleError
    });
  }
}
