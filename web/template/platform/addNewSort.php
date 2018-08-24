<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/platform/addNewSort.css">
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
    平台管理 / 分类管理 / 新建分类
  </div>
  <div class="content">
    <div class="contaner">
      <form action="">
        <div class="sort-name">
          <span>分类名称：</span>
          <input type="text" name="name" class="input-text" placeholder="请输入分类名">
        </div>
        <div class="sort-des">
          <span>分类描述：</span>
          <textarea name="description" class="textarea" cols="30" rows="10" placeholder="请输入描述"></textarea>
        </div>
        <div class="goal-open">
          <span>目标公开：</span>&nbsp;&nbsp;
          <input type="radio" id="open" name="is_show" checked value="1"> 公开&nbsp;&nbsp;
          <input type="radio" id="not_open" name="is_show" value="0"> 不公开
        </div>
        <div class="sort-index">
          <span>显示顺序：</span>
          <input type="number" min="0" class="input-text" placeholder="请输入大于0的数字">
        </div>
        <div class="submit-btn">
          <input type="button" class="input-button blue" id="submit_data" value="提交">
          <input type="reset" class="input-button red" value="重置" style='display:none;'>
          <input type="button" class="input-button red" value="取消" style='display:none;'>
        </div>
      </form>
    </div>

  </div>




</body>
<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/plarform/addNewSort.js"></script>

</html>