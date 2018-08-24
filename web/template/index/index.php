<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/index/index.css">
  <title>主页</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
    <span>首页</span>
  </div>
  <div class="content">
    <!-- 登录信息 -->
    <div class="login-info">
      <div class="login-title">
        <span>登录信息</span>
      </div>
      <div class="login-content">
        <ul>
          <li>
            <span>管理展馆：</span>
            <span>上海科技馆</span>
            <a href="../hall/hallInfo.php">展馆信息</a>
          </li>
          <li>
            <span>管理员：</span>
            <span>15858585858</span>
          </li>
          <li>
            <span>上次登录：</span>
            <span>2018/07/07</span>
          </li>
        </ul>
      </div>
    </div>
    <!-- 快捷功能 -->
    <div class="fast-ability">
      <div class="fast-title">
        <span>快捷功能</span>
      </div>
      <div class="fast-content">
        <div class="add-act">
          <img src="../../../images/add-activity.png" alt="">
          <span>添加活动</span>
        </div>
        <div class="explain-abil">
          <img src="../../../images/explain-ability.png" alt="">
          <span>讲解审核</span>
        </div>
      </div>
    </div>
  </div>




</body>
<?php include_once '../../../common/template/js.html' ?>

</html>