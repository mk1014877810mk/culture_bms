<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>登录</title>
  <style>
    body {
      background-color: #222021;
      text-align: center;
      margin-top: 20vh;
    }

    img {
      width: 400px;
    }
  </style>
</head>

<body>
  <div class="loading">
    <img src="../../../images/loading2.gif" alt="">
  </div>
</body>
<script src='../../../assets/jquery/jquery.min.js'></script>
<script>
  $(function () {
    // var ajaxUrl = 'http://172.16.1.168/wenbo/frontend/web/';
    var ajaxUrl = 'https://wh.broadmesse.net/wenbo/frontend/web/';
    var login = {
      init: function () {
        var code = this.getParams('code');
        if (!code) {
          alert('登录失败！');
          return;
        }
        $.ajax({
          url: ajaxUrl + 'wxlogin',
          type: 'get',
          data: {
            code
          },
          success: function (res) {
            // console.log('传入code的结果：', res);
            if (res.status == 1000) {
              if (res.data.is_admin == 0) {
                alert('请先升级为管理员再登录！');
                window.location.href = 'http://wh.broadmesse.net/wx_bms-culture/web/template/login/loginTips.php';
              } else if (res.data.is_admin == 1) {
                var user_id = res.data.u_id;
                window.sessionStorage.setItem("user_id", user_id);
                window.location.href = '../platform/sort.php';
              }
            } else if (res.status == 1026) {
              alert('请先浏览小程序，以便升级为管理员!');
              window.location.href = 'http://wh.broadmesse.net/wx_bms-culture/web/template/login/loginTips.php';
            }

          },
          error: function (err) {
            console.log('传入code获取数据失败：', err);
          }
        })
      },
      getParams: function (name) { // 获取url参数
        var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
        var r = window.location.search.substr(1).match(reg);
        if (r != null) return unescape(r[2]); return null;
      }
    }
    login.init();
  })

</script>

</html>