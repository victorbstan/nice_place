// custom method to wrap an element around another element
// while keeping it within the display's width area
jQuery.fn.nice_place = function(focus_el) {
  // foscus_el is simply the element that,
  // the placed element (this) should be nearby, but not obscure;
  // while the placed element should try to be fully visible,
  // by never falling out of the right or left visible window area
  var $f_el = $(focus_el);
  var f_pos = $f_el.position();
  var f_ofs = $f_el.offset();
  var f_w = $f_el.outerWidth();
  var f_h = $f_el.outerHeight();
  // window
  var w_w = $(window).width();
  var w_h = $(window).height();
  // this
  var $that = $(this);

  var t_reach_x = function() {
    return $that.offset().left + $that.outerWidth();
  };

  var f_reach_x = function() {
    return $f_el.offset().left + f_w;
  };

  // reduce width on small screens

  if (this.outerWidth() > w_w) {
    this.outerWidth(w_w);
    this.css({
      "border-left":0,
      "border-right":0,
      "margin-left":0,
      "margin-right":0
    });
  }

  if (this.outerHeight() > w_h) {
    this.outerHeight(w_h);
    this.css({
      "border-top":0,
      "border-bottom":0,
      "margin-top":0,
      "margin-bottom":0
    });
  }

  // place within window width frame

  // align with focus element
  this.offset({
    "top":f_pos.top,
    "left":(f_pos.left + f_w)
  });

  // place left of focus element if right side extends beyond window frame
  // t_ = this
  if (t_reach_x() > w_w) {
    this.offset({
      "left":(this.offset().left - (t_reach_x() - w_w))
    });
  }

  // if focus_el is now overlaped,
  // move this to the left of it,
  // except if it extends beyond window frame,
  // ...
  if (
    f_reach_x() > this.offset().left &&
    this.outerWidth() < w_w
  ) {
    this.offset({
      "left":($f_el.offset().left - this.outerWidth())
    });

    // ... move it bellow
    if (
      $f_el.offset().left - this.outerWidth() <= 0
    ) {
      this.offset({
        "top":(f_ofs.top + f_h),
        "left":(this.offset().left + f_w)
      });

      // ... if it's still too far to the left,
      // then align with left edge of focus element
      if (
        this.offset().left <= 0
      ) {
        console.log($f_el.offset().left - this.outerWidth());
        this.offset({
          "left":f_ofs.left
        });
      }
    }
  }

  return this;
};
