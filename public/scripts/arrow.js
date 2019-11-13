$("#bouncingArrow").on('click', function () {
  $(".hide").slideToggle("slow", function() { 
  $("#text-field").focus();
  })
});