class Filter {

  constructor (baseUrl) {
    this.BASE_URL = baseUrl;
  }

  handleResponse(res){
    console.log(res)
  }

  handleError(err) {
    console.log(err)
  }

  filterEvents (my_param) {
    $.ajax({
      method: 'GET',
      url: `http://localhost:3000/search?param_1=${my_param}`,
      success: this.handleResponse,
      error: this.handleError
    });
  }
}
