$( "#toggle-producer" ).change(function() {
    $( "#form-producer" ).toggle();
});

$(document).ready(function() {
   $( "#productTypes" ).multiselect();
   $( "#productTypes" ).multiselect('refresh');
});

