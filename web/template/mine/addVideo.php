<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/mine/addVideo.css">
  <title>添加小视频</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
    <!-- title -->
  </div>
  <div class="content">
    <div class="phone">
      <form action="" id="top_form">
        <div class="top">
          <img src="../../../images/upload-img.png" alt="">
          <textarea name="title" id="phone_title" cols="30" rows="10" maxlength="30" placeholder="请输入30字以内的标题"></textarea>
          <select name="c_id" id="sort">
          <!-- 下拉框数据 -->
        </select>
          <div class="upload">
            <input type="file" class="file-btn-bgi" accept="image/*" name="image">
            <input type="button" value="上传封面">
          </div>
        </div>
      </form>
      <div class="phone-content">
        <div class="phone-bottom-content">
          <!-- 视频区域 -->
          <form action="" id="video_form">
            <div class="content-video">
              <div class="video">
                <video controls src="" poster="../../../images/upload-img.png"></video>
              </div>
              <div class="upload-video">
                <input type="file" name="video" accept="video/mp4" id="input_video">
              </div>
            </div>
          </form>
        </div>
        <div class="phone-content-btn">
          <input type="button" class="input-button" id="all_delete" value="">
          <input type="button" class="input-button blue" id="all_success" value="完成">
        </div>
      </div>
    </div>
    <!-- 编辑题目中的文字 -->
    <div class="phone-title-text">
      <div class="phone-title-modal">
        <span>请输入标题</span>
        <textarea id="title_text" autofocus cols="30" rows="10" maxlength="30" placeholder="请输入30字以内的标题"></textarea>
        <div class="btn">
          <input type="button" class="input-button blue" id="success_title" value="完成">
          <input type="button" class="input-button" id="cancel_title" value="取消">
        </div>
      </div>
    </div>
  </div>


</body>
<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/mine/addVideo.js"></script>

</html>