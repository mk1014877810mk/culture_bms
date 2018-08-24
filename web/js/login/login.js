$(function () {
  var login = {
    init: function () {
      var winHeight = $(window).height();
      $('form').css({
        'margin-top': winHeight * .17
      })

      $('.method span').on('click', function () {
        var index = ($(this).data('index'));
        $(this).addClass('current').parent().siblings().children('span').removeClass('current');
        if (index == 1) {
          $('.login').removeClass('current');
        } else {
          $('.login').addClass('current');
        }
      });
    }
  }
  login.init();
});