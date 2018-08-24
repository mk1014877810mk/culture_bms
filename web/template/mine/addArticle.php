<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/mine/addArticle.css">
  <title>添加文章</title>
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
      <div class="phone-detail">
        <form action="" id="top_form">
          <div class="top">
            <img src="../../../images/upload-img.png" alt="">
            <textarea name="title" id="phone_title" cols="30" rows="10" maxlength="30" placeholder="请输入30字以内的标题"></textarea>
            <select name="c_id" id="sort">
            <!-- 挖个坑 -->
          </select>
            <div class="upload">
              <input type="file" class="file-btn-bgi" accept="image/*" name="image">
              <input type="button" value="上传封面">
            </div>
          </div>
        </form>
        <div class="phone-content">
          <!-- 最上边的添加按钮 -->
          <div class="add-btn">
            <!-- <form action="" id="origin"> -->
            <div class="img-btn">
              <img src="../../../images/add.png" data-id="0" alt="">
            </div>
            <div class="add-content">
              <div class="pic" data-id="1" data-index="0">
                <form action="" class="origin-img">
                  <div class="choose-file">
                    <input type="file" id="choose_img" name="image" accept="image/*">
                  </div>
                  <img src="../../../images/add-img.png" alt="">
                </form>
              </div>
              <div class="text" data-id="2" data-index="0">
                <img src="../../../images/add-img.png" alt="">
              </div>
              <div class="video" data-id="3" data-index="0">
                <form action="" class="origin-video">
                  <div class="choose-file">
                    <input type="file" id="choose_video" name="video" accept="video/mp4">
                  </div>
                  <img src="../../../images/add-img.png" alt="">
                </form>
              </div>
              <div class="three"></div>
            </div>
          </div>
          <div class="phone-bottom-content">
            <!-- 挖坑 -->

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
        <!-- 编辑文章中的文字 -->
        <div class="phone-content-text">
          <div class="phone-text-bgc">
            <form action="" id="text">
              <textarea name="content" id="content_text" cols="30" rows="10" placeholder="请输入文章内容"></textarea>
            </form>
            <div class="btn">
              <input type="button" class="input-button blue" id="success" value="完成">
              <input type="button" class="input-button" id="cancel" value="取消">
            </div>
          </div>
        </div>
      </div>
      <!-- 提交按钮 -->
      <div class="phone-content-btn">
        <input type="button" class="input-button" id="all_delete" value="">
        <input type="button" class="input-button blue" id="all_success" value="完成">
      </div>
    </div>
  </div>


  <script type="text/template" id="tpl_phoneContent">
    {{each $data v i}}
    <div class="article">
      <!-- 内容 -->
      {{if v.data_type==1}}
      <div class="content-pic">
        <img src="{{v.src}}" alt="">
        <div class="edit-content-detail">
          <img src="../../../images/edit.png" alt="">
          <form action="" id="changeImage">
            <input type="file" name='image' accept="image/*" data-data_type={{v.data_type}} data-y_id={{v.y_id}} data-sort={{v.sort}}>
          </form>
        </div>
        <div class="detail-del">
          <img src="../../../images/delete.png" alt="" data-y_id={{v.y_id}} data-sort={{v.sort}}>
        </div>
      </div>
      {{else if v.data_type==2}}
      <div class="content-text">
        <div class="detail-content txt-cut-5">
          {{v.content}}
        </div>
        <div class="edit-content-detail">
          <img src="../../../images/edit.png" id="edit_content_text" data-data_type={{v.data_type}} data-y_id={{v.y_id}}  data-sort={{v.sort}} alt="">
        </div>
        <div class="detail-del">
          <img src="../../../images/delete.png" alt="" data-y_id={{v.y_id}} data-sort={{v.sort}}>
        </div>
      </div>
      {{else}}
      <div class="content-video">
        <video controls src="{{v.src}}"></video>
        <div class="edit-content-detail">
          <img src="../../../images/edit.png" alt="">
          <form action="" id="changeVideo">
            <input type="file" name='video' accept="video/mp4"  data-data_type={{v.data_type}} data-y_id={{v.y_id}} data-sort={{v.sort}}>
          </form>
        </div>
        <div class="detail-del">
          <img src="../../../images/delete.png" alt="" data-y_id={{v.y_id}} data-sort={{v.sort}}>
        </div>
      </div>
      {{/if}}
      <div class="add-btn">
        <div class="img-btn">
          <img src="../../../images/add.png" data-id="{{i+1}}" alt="">
        </div>
        <div class="add-content">
          <div class="pic" data-id="1" data-index="{{i+1}}">
            <form action="">
              <div class="choose-file">
                <input type="file" id="choose_img" accept="image/*" name="image">
              </div>
              <img src="../../../images/add-img.png" alt="">
            </form>
          </div>
          <div class="text" data-id="2" data-index="{{i+1}}">
            <img src="../../../images/add-img.png" alt="">
          </div>
          <div class="video" data-id="3" data-index="{{i+1}}">
            <form action="">
              <div class="choose-file">
                <input type="file" id="choose_video" accept="video/mp4" name="video">
              </div>
              <img src="../../../images/add-img.png" alt="">
            </form>
          </div>
          <div class="three"></div>
        </div>
      </div>
    </div>
    {{/each}}
  </script>
</body>
<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/mine/addArticle.js"></script>

</html>