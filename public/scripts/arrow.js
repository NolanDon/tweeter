$("#bouncingArrow").on('click', function () {
  $(".hideOnClick").slideToggle("slow", function() { 
  $("#text-field").focus();
  })
});