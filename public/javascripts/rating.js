class Rating {

  handleError(err) {
    console.log("ERR=====")
    console.log(err)
  }

  ratingEvent (stars) {
    $.ajax({
      method: 'GET',
      url: `/producer/:id/rating?stars=${stars}`,
      success: handleResponse,
      error: this.handleError
    });

  }
}
