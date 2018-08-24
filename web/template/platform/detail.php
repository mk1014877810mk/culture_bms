<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/platform/detail.css">
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
    <!-- title -->
  </div>
  <div class="content">
    <div class="detail clearfix">
      <div class="detail-page">
        <div class="phone">
          <div class="phone-detail">
            <div class="phone-title">
              <!-- 标题 -->
            </div>
            <div class="phone-content">
              <!-- 内容 -->
            </div>
          </div>
        </div>
      </div>
      <div class="audit-btn">
        <input type="button" class="input-button blue" data-type="2" value="通过"><br>
        <input type="button" class="input-button blue" data-type="1" value="通过并推荐"><br>
        <input type="button" class="input-button blue" data-type="3" value="驳回">
      </div>
    </div>
  </div>
</body>

<script type="text/html" id="phone_tpl">
  {{if type==1}} {{each data v i}} {{if v.type==1}}
  <img src="{{ajaxUrl}}{{v.content}}" alt=""> {{else if v.type==2}}
  <div class="phone-text">
    {{v.content}}
  </div>
  {{else if v.type==3}}
  <div class="phone-video">
    <video src="{{ajaxUrl}}{{v.content}}" controls></video>
  </div>
  {{/if}} {{/each}} {{else}}
  <div class="phone-video">
    <video src="{{ajaxUrl}}{{data.data_video}}" controls></video>
  </div>
  {{/if}}
</script>

<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/plarform/detail.js"></script>

</html>