<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>登录</title>
  <style>
    #box{
      text-align: center;
      margin: 150px 0;
    }
  </style>
</head>

<body>
  <!-- 登录 -->
  <div id="box">

  </div>
</body>
<script src="http://res.wx.qq.com/connect/zh_CN/htmledition/js/wxLogin.js"></script>
<script>
  var random = Math.random().toString().slice(2);
  var obj = new WxLogin({
    self_redirect: false,
    id: "box",
    appid: "wx6401c9bb8f568938",
    scope: "snsapi_login",
    redirect_uri: "https://wh.broadmesse.net/wx_bms-culture/web/template/login/loginTemp.php",
    state: random,
    style: "",
    href: ""
  });

</script>

</html>