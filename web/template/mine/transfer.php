<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/mine/transfer.css">
  <title>转载</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
  </div>
  <div class="content">
    <div class="content-detail">
      <form action="" id="transfer_form">
        <div class="transfer-title" style="display:none;">
          <span>转载标题：</span>
          <input type="text" id="title" name="title" class="input-text">
        </div>
        <div class="transfer-url">
          <span>转载地址：</span>
          <input type="url" name="url" id="input_url" placeholder="例如：https://www.baidu.com" class="input-text">
        </div>
        <div class="transfer-img">
          <span>封面图片：</span>
          <img style="width:300px;height:166px;" src="../../../images/upload-img.png" id="bgimg" alt="">
          <div style="font-size:12px;color:#666;margin-left:-50px;margin-top:4px;">注：点击图片可更换封面</div>
          <input type="text" name="image_path" id="upload_img" style="display:none;">
          <input type="file" name="image" accept="image/*" id="upload_btn" style="display:none;">
        </div>
        <div class="transfer-classify">
          <span>转载分类：</span>
          <select name="c_id" id="sort" class="input-select">
          </select>
        </div>
        <div class="transfer-des">
          <span>描述：</span>
          <textarea name="description" id="des" placeholder="请对当前转载的文章进行描述"></textarea>
        </div>
        <div class="tranfer-btn">
          <input type="button" class="input-button blue" id="preview" value="预览">
          <input type="button" class="input-button blue" id="commit" value="提交">
        </div>
      </form>
    </div>
  </div>
</body>


<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/mine/transfer.js"></script>

</html>