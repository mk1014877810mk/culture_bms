$(function () {
  var login = {
    init: function () {
      var winHeight = $(window).height();
      $('form').css({
        'margin-top': winHeight * .14
      })
    },
    validate: function () {
      // 验证用户名
      $('.user-name>input').on('blur', function () {
        var userName = $(this).val().trim();
        if (userName == '') {
          $('.vali-username').css({
            'display': 'block'
          })
        } else {
          $('.vali-username').css({
            'display': 'none'
          })
        }
      });
      // 验证密码
      $('.user-pwd>input').on('blur', function () {
        var userPwd = $(this).val().trim();
        if (userPwd.length < 6) {
          $('.vali-pwd').css({
            'display': 'block'
          })
        } else {
          $('.vali-pwd').css({
            'display': 'none'
          })
        }
      });
      $('.user-pwd>input').on('input', function () {
        var userPwd = $(this).val().trim();
        if (userPwd.length > 0) {
          $('.tips').css({
            'display': 'block'
          });
        } else {
          $('.tips').css({
            'display': 'none'
          });
        }
        var textObj = {
          '1': '弱',
          '2': '中',
          '3': '强'
        }
        var index = 1;
        if (userPwd.length < 6 && userPwd.length > 0) {
          index = 1;
          $('.tips-progress-step').addClass('w3').removeClass('w6').removeClass('w10');
        } else if (userPwd.length >= 6 && userPwd.length < 12) {
          index = 2;
          $('.tips-progress-step').addClass('w6').removeClass('w3').removeClass('w10');
        } else if (userPwd.length >= 12) {
          index = 3;
          $('.tips-progress-step').addClass('w10').removeClass('w6').removeClass('w3');
        }
        $('.pwd-text').html(textObj[index])
      });
      // 验证确认密码长度
      $('.user-repwd>input').on('blur', function () {
        var userPwd = $('.user-pwd>input').val().trim();
        var reUserPwd = $(this).val().trim();
        if (userPwd != reUserPwd) {
          $('.vali-repwd').css({
            'display': 'block'
          });
        } else {
          $('.vali-repwd').css({
            'display': 'none'
          });
        }
      });
    }
  }
  login.init();
  login.validate();
});