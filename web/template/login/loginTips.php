<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <title>无权限访问</title>
  <style>
    .box {
      text-align: center;
      margin: 20vh auto 0;
    }

    img {
      width: 500px;
      height: 280px;
    }
  </style>
</head>

<body>
  <div class="box">
    <img src="../../../images/notGo.jpg" alt="">
  </div>
</body>
<script>
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', function () {
    history.pushState(null, null, document.URL);
  });

</script>

</html>