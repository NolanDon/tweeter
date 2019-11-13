$( document ).ready(function() {

  $(".new-tweet #text-field").keyup(function () {
    let count = 140;
    let length = $(this).val().length;

    if (length >= 140) {
      $('#counter').css('color', 'red');
    } else if (length > 100) {
      $('#counter').css('color', 'orange'); 
    } else if (length > 80 || length === 0) {
      $('#counter').css('color', 'orange');
    }
    let remainingChar = count - length;
    $('#counter').text(remainingChar);
  })
});

