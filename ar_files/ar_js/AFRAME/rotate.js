/* global AFRAME */
AFRAME.registerComponent('rotateObject', {
    init: function () {
      var buttonEls = this.buttonEls = this.el.querySelectorAll('.menu-button');
      //var backgroundEl = document.querySelector('#background');
      this.onClick = this.onClick.bind(this);
      this.onMouseEnter = this.onMouseEnter.bind(this);
      this.onMouseLeave = this.onMouseLeave.bind(this);
      this.reset = this.reset.bind(this);
      //backgroundEl.addEventListener('click', this.reset);
      for (var i = 0; i < buttonEls.length; ++i) {
        buttonEls[i].addEventListener('mouseenter', this.onMouseEnter);
        buttonEls[i].addEventListener('mouseleave', this.onMouseLeave);
        buttonEls[i].addEventListener('click', this.onClick);
      }
    },
  
    onClick: function (evt) {
      evt.target.pause();
      console.log('coucouc');
      evt.target.setAttribute('property: object3D.rotation.y; to 360; dur 10000; loop: true; easing: linear');
      this.el.addState('clicked');
      evt.target.object3D.rotation.y(360);
    },
  
    onMouseEnter: function (evt) {
      var buttonEls = this.buttonEls;
      evt.target.setAttribute('material', 'color', '#046de7');
      for (var i = 0; i < buttonEls.length; ++i) {
        if (evt.target === buttonEls[i]) { continue; }
        buttonEls[i].setAttribute('material', 'color', 'white');
      }
    },
  
    onMouseLeave: function (evt) {
      if (this.el.is('clicked')) { return; }
      evt.target.setAttribute('material', 'color', 'white');
    },
  
    reset: function () {
      var buttonEls = this.buttonEls;
      for (var i = 0; i < buttonEls.length; ++i) {
        this.el.removeState('clicked');
        buttonEls[i].play();
        buttonEls[i].emit('mouseleave');
      }
    }
  });
  