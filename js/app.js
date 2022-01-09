
// NAVBAR BUTTON EFFECT
const buttons = document.querySelectorAll('a')

buttons.forEach(btn=> {
  btn.addEventListener('click', function(e){
    let x = e.clientX - e.target.offsetLeft;
    let y = e.clientY - e.target.offsetTop;

    let ripples = document.createElement('span');
    ripples.style.left = x +'px';
    ripples.style.top = y +'px';
    this.appendChild(ripples)

    setTimeout(()=> {
      ripples.remove()
    },1000);
  })
})


// SCROLL INDICATOR (MODIFIED FROM BAR TO CIRCLE)
$.fn.progressScroll = function(options) {

  var settings = $.extend({
      width: 50,
      height: 50,
      borderSize: 7,
      mainBgColor: "#000",
      darkBorderColor: "#2C2FE6",
      fontSize: "30px"
  }, options);

  var innerHeight, offsetHeight, netHeight,
      self = this,
      container = this.selector,
      borderContainer = "progressScroll-border",
      circleContainer = "progressScroll-circle",
      textContainer = "progressScroll-text";

  this.getHeight = function () {
      innerHeight = window.innerHeight;
      offsetHeight = document.body.offsetHeight;
      netHeight = offsetHeight - innerHeight;
  }

  this.addEvent = function () {
      var e = document.createEvent("Event");
      e.initEvent("scroll", false, false);
      window.dispatchEvent(e);
  }

  this.updateProgress = function (per) {
      var per = Math.round(100 * per);
      var deg = per * 360 / 100;
      if (deg <= 180) {
          $("." + borderContainer, container).css("background-image", "linear-gradient(" + (90 + deg) + "deg, transparent 50%, #000 50%),linear-gradient(90deg,  #000 50%, transparent 50%)");
      }
      else {
          $("." + borderContainer, container).css("background-image", "linear-gradient(" + (deg - 90) + "deg, transparent 50%, #2C2FE6 50%),linear-gradient(90deg,  #000 50%, transparent 50%)");
      }
      
  }

  this.prepare = function () {
      $(container).addClass("progressScroll");
      $(container).html("<div class='" + borderContainer + "'><div class='" + circleContainer + "'><span class='" + textContainer + "'></span></div></div>");
    
      $(".progressScroll").css({
          "width" : settings.width,
          "height" : settings.height,
          "position" : "fixed",
          "top" : "120px",
          "right" : "20px"
      });
      $("." + borderContainer, container).css({
          "position" : "relative",
          "text-align" : "center",
          "width" : "100%",
          "height" : "100%",
          "border-radius" : "50%",
          "background-color" : settings.darkBorderColor,
         
      });
      $("." + circleContainer, container).css({
          "position": "relative",
          "top" : "50%",
          "left" : "50%",
          "transform" : "translate(-50%, -50%)",
          "text-align" : "center",
          "width" : settings.width - settings.borderSize,
          "height" : settings.height - settings.borderSize,
          "border-radius" : "50%",
          "background-color" : settings.mainBgColor
      });
      $("." + textContainer, container).css({
          "top" : "50%",
          "left" : "50%",
          "transform" : "translate(-50%, -50%)",
          "position" : "absolute",
          "font-size" : settings.fontSize
      });
  }

  this.init = function () {

      self.prepare();

      $(window).bind("scroll", function () {
          var getOffset = window.pageYOffset || document.documentElement.scrollTop,
              per = Math.max(0, Math.min(1, getOffset / netHeight));
          self.updateProgress(per);
      });

      $(window).bind("resize", function () {
          self.getHeight();
          self.addEvent();
      });

      $(window).bind("load", function () {
          self.getHeight();
          self.addEvent();
      });
  }

  self.init();
}

// // SCROLL INDICATOR FADE
// $(document).scroll(function () {
//     var y = $(this).scrollTop();
//     if (y > 200) {
//         $('.progressCounter').fadeIn();
        
//     } else {
//         $('.progressCounter').fadeOut();
//     }
// });

// POST SLIDER (GLIDER.JS LIBRARY)
new Glider(document.querySelector('.glider'),{
  slidesToShow: 2,
  slidesToScroll: 1,
  arrows: {
    prev: '.glider-prev',
    next: '.glider-next'
  }
})

// POST SLIDER (GLIDER.JS LIBRARY) (on mobile screen)
new Glider(document.querySelector('.gliders'),{
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: {
      prev: '.gliders-prev',
      next: '.gliders-next'
    }
  })

//   menu bar
function show_hide(){
    var click = document.getElementById('drop-content');

    if(click.style.display ==="none"){
        click.style.display = "inline-block";

    } else { 
        click.style.display = "none";
    }
}


// draggable
$(".arrow").draggable();


window.onload = function () {
  //select the thing we wanna drag
  var mustachio = document.getElementById('arrow');
  //listen to the touchmove event, every time it fires, grab the location of the touch
  //then assign it to mustachio
  mustachio.addEventListener('touchmove', function (ev) {
      //grab the location of the touch
      var touchLocation = ev.targetTouches[0];
      //assign mustachio new coordinates based on the touch
      mustachio.style.left = touchLocation.pageX + 'px';
      mustachio.style.top = touchLocation.pageY + 'px';
  })
}

// blogs dropdown
function myfun(){
  var divs = document.getElementById('content');

  divs.classList.toggle('show')
}

window.onclick=function(event){
  if(!event.target.matches('#clicks')){
    var removeshow = document.getElementById('content')
    if(removeshow.classList.contains("show"))
    {
      removeshow.classList.remove("show")
    }
  }
}












