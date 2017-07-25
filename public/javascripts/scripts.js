$( "#toggle-producer" ).change(function() {
    $( "#form-producer" ).toggle();
});

function getGeolocationCoordinates(id) {
  $.ajax({
    url: "http://pokeapi.co/api/v2/pokemon/" + id,
    method: "GET",
    success: function (response) {
      console.log(response);
    },
    error: function (err) {
      console.log(err);
    },
  })
}