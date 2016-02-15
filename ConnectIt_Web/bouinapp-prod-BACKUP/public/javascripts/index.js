/*!
 * Start Bootstrap - Grayscale Bootstrap Theme (http://startbootstrap.com)
 * Code licensed under the Apache License v2.0.
 * For details, see http://www.apache.org/licenses/LICENSE-2.0.
 */

// jQuery to collapse the navbar on scroll
$(window).scroll(function() {
    if ($(".navbar").offset().top > 50) {
        $(".navbar-fixed-top").addClass("top-nav-collapse");
    } else {
        $(".navbar-fixed-top").removeClass("top-nav-collapse");
    }
});

// jQuery for page scrolling feature - requires jQuery Easing plugin
$(function() {
    $('a.page-scroll').bind('click', function(event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });
});

// Closes the Responsive Menu on Menu Item Click
$('.navbar-collapse ul li a').click(function() {
    $('.navbar-toggle:visible').click();
});

init();

function init() {

  loadSliderImages();

}

function loadSliderImages(){  
  // Cloning currents objects
  var images = [];
  var carouselindicators = $("#carouselindicators").clone();
  var carouselinner = $("#carouselinner").clone();

  // Call api images
  $.get( "http://www.bouineurs3-0.fr/api/images/highlights", function( data ) {

    $(carouselindicators).empty();
    $(carouselinner).empty();

    if(data !== null && data.length !== 0){
      indicatorWidth = (100/data.length) - 1;

      data.forEach( function(image, index){
        addOneImageToSlider(carouselindicators, carouselinner, image.datetime, null, image.localPath, index, indicatorWidth);
      });

      // Replace old carousel with new elements
      $("#carouselinner").replaceWith(carouselinner);
      $("#carouselindicators").replaceWith(carouselindicators);
      $("#carousel0").addClass('active');

      // Set current postion to first image
      $("#carousel").carousel(0);

      
    }
    
    // Reveal and start slider
    $('#carouselLoader').hide();
    $('#carousel').show();
    $('#carousel').carousel('cycle');
  })
  .error(function (){
      $('#carouselLoader').hide();
      $('#carousel').show();
  });
}

function addOneImageToSlider(carouselindicators, carouselinner, title, desc, srcImage, itemNumber, indicatorWidth){
  // Build indicator child
  var indicatorsChild = '<li data-target="#carousel" data-slide-to="' +itemNumber + '" style="width:'+indicatorWidth+'% !important"></li>';

  // Build inner child
  var innerChild = '<div id="carousel' +itemNumber+ '" class="item"><a href="#"><img style="max-height:350px;" src="'+srcImage+'"></a>';
  innerChild += '<div class="container">';
  innerChild += '<div class="carousel-caption">';

  if(title !== null && title !== ""){
    // Original date (unix timestamp)
    var date = new Date(title);
    // Date conversion
    var day = date.getUTCDate();
    var month = date.getUTCMonth()+1;
    var year = date.getUTCFullYear();
    var hours = date.getUTCHours();
    var minutes = "0" + date.getUTCMinutes();
    var seconds = "0" + date.getUTCSeconds();
    var formattedTime = day + '/0' + month + '/' + year + ' ' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    
    innerChild += '<h1>' + formattedTime + '</h1>';
  }

  if(desc !== null && desc !== ""){
    innerChild += '<p>' + desc + '</^p>';
  }

  // Add children to indicators and inner
  $(carouselindicators).append(indicatorsChild);
  $(carouselinner).append(innerChild);
};
