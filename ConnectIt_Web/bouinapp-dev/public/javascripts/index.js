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

function init() {

  loadSliderImages();
  $.get( "http://www.bouineurs3-0.fr/users/images", function( data ) {
    $("img#fromWS").attr("src",data[0]);
    $("img#fromWS1").attr("src",data[1]);
    $("img#fromWS2").attr("src",data[2]);
  });

}

function loadSliderImages(){

  var images = [];
  var carouselindicators = $("#carouselindicators");
  var carouselinner = $("#carouselinner");

  <!-- Call api images -->
  $.get( "http://localhost/api/images/highlights", function( data ) {

    if(data !== null || data.length === 0){
      addOneImageToSlider(carouselindicators, carouselinner, title, desc, srcImage, itemNumber);
      images = data;
    }
    else{
       /*$.get("http://localhost/api/images/getDefault", function (data) {
          images = [];
       });*/
    }

    // KBT : bloc incorrecte, fait planter le scroll jquery
    //$.foreach(images){
    //  addOneImageToSlider(carouselindicators, carouselinner, title, desc, srcImage);
    //});

  });
}

function addOneImageToSlider(carouselindicators, carouselinner, title, desc, srcImage, itemNumber){
  // Build indicator child
  var indicatorsChild = '<li data-target="#carousel" data-slide-to="' +itemNumber + '"></li>';

  // Build inner child
  var innerChild = '<div id="carousel' +itemNumber+ '" class="item"><a href="#"><img src="'+srcImage+'"></a>';
  innerChild += '<div class="container">';
  innerChild += '<div class="carousel-caption">';

  if(title !== null || title !== ""){
    innerChild += '<h1>' + title + '</h1>';
  }

  if(desc !== null || desc !== ""){
    innerChild += '<p>' + desc + '</^p>';
  }

  // Add children to indicators and inner
  $(carouselindicators).addChild();
  $(carouselinner).addChild(innerChild);
};
