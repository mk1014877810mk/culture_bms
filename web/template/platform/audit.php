<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/platform/audit.css">
  <title>未发布</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
    平台管理 / 审核转载文章
  </div>
  <div class="content">
    <div class="content-detail">
      <div class="content-list">
        <div class="bgi">
          <span>背景图片：</span>
          <div class="img">
            <img src="" alt="">
          </div>
        </div>
        <div class="title">
          <span>标题：</span>
          <div class="title-html one-txt-cut"></div>
        </div>
        <div class="sort">
          <span>分类：</span>
          <div class="sort-html one-txt-cut"></div>
        </div>
        <div class="url">
          <span>地址：</span>
          <div class="url-html one-txt-cut"></div>
        </div>
        <div class="des">
          <span>描述：</span>
          <div class="des-html one-txt-cut"></div>
        </div>
        <div class="submit">
          <input type="button" data-type="2" class="input-button blue" value="通过">
          <input type="button" data-type="1" class="input-button blue" value="通过并推荐">
          <input type="button" data-type="3" class="input-button blue" value="驳回">
        </div>
      </div>
    </div>
  </div>
</body>

<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/plarform/audit.js"></script>

</html>