$(function () {
  var ajaxUrl = 'http://172.16.1.168/wenbo/frontend/web/';
  // var ajaxUrl = 'https://wh.broadmesse.net/wenbo/frontend/web/';
  window.sessionStorage.setItem("ajaxUrl", ajaxUrl);
  // 头部功能
  var header = {

  };
  // nav功能
  var nav = {
    init: function () {
      $('.sidebar-list>li').on('click', this.showOrHide);
      $('.sidebar-list>li>ul').on('click', function (e) {
        e.stopPropagation();
      });
    },
    showOrHide: function () {
      if ($(this).children('ul').length > 0) {
        $(this).children('ul').slideToggle().end().children('a').children('img').eq(1).toggleClass('rotate180');
        return false;
      }
    }
  }
  // 获取用户信息
  var getUserInfo = {
    init: function () {
      var user_id = window.sessionStorage.getItem("user_id");
      if (!user_id) {
        window.location.href = 'http://wh.broadmesse.net/wx_bms-culture/web/template/login/login.php';
        return;
      }
      $.ajax({
        url: ajaxUrl + 'adminlogin/info',
        type: 'get',
        data: {
          user_id
        },
        success: function (res) {
          // console.log('获取用户信息：', res);
          if (res.status == 1000) {
            if (res.data.is_admin != 1) {
              window.location.href = 'http://wh.broadmesse.net/wx_bms-culture/web/template/login/loginTips.php';
              return;
            }
            $('.head .pic').html('<img src=' + res.data.user_img + ' alt="用户头像" title="用户头像">');
            $('.head .head-right span').text(res.data.user_name);
          }
        },
        error: function (err) {
          console.log('获取用户信息失败', err);
        }
      })
    }
  }
  nav.init();
  getUserInfo.init();
});