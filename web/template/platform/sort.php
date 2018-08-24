<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/platform/sort.css">
  <title>分类管理</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
    平台管理 / 分类管理
  </div>
  <div class="content">
    <div class="content-table">
      <div class="act-find">
        <div class="act-title">
          <span>内容列表</span>
        </div>
      </div>
      <div class="select-btn clearfix">
        <a class="dele-many" id="delAll" data-status="1">批量操作</a>
        <a class="dele-many cancel-all">取消</a>
        <a class="dele-many blue" href="./addNewSort.php?status=0">+ 新建分类</a>
      </div>
      <div class="select-table">
        <table>
          <thead>
            <tr>
              <th class="many">
                <input type="checkbox">
              </th>
              <th>分类</th>
              <th>已发表文章数</th>
              <th>阅读</th>
              <th>收藏</th>
              <th>评论</th>
              <th>点赞</th>
              <!-- <th>转发</th> -->
              <th>状态</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="table_data">
            <!-- 表格数据 -->
          </tbody>
        </table>
      </div>
      <div class="data-page">
        <span class="prev">&lt;</span>
        <div class="page-detail">
          <!-- 页码位置 -->
        </div>
        <span class="next">&gt;</span>
        <span>跳至第<input type="number" id="jump_page">页</span>
      </div>
    </div>
  </div>
</body>

<script type="text/html" id="table_tpl">
  {{each data v i}}
  <tr>
    <td class="many">
      <input type="checkbox" data-c_id="{{v.c_id}}">
    </td>
    <td>{{v.class_name}}</td>
    <td>{{if !v.data_count}}0 {{else}}{{v.data_count}}{{/if}}</td>
    <td>{{if !v.play_volume}}0 {{else}}{{v.play_volume}}{{/if}}</td>
    <td>{{if !v.collection_number}}0 {{else}}{{v.collection_number}}{{/if}}</td>
    <td>{{if !v.comment_number}}0 {{else}}{{v.comment_number}}{{/if}}</td>
    <td>{{if !v.like_number}}0 {{else}}{{v.like_number}}{{/if}}</td>
    <!-- <td>100</td> -->
    <td>{{v.is_show}}</td>
    <td>
      <a href="javascript:;" data-type='edit' data-c_id="{{v.c_id}}">编辑</a>
      <span>|</span>
      <a href="javascript:;" data-type='del' data-c_id="{{v.c_id}}">删除</a>
    </td>
  </tr>
  {{/each}}
</script>
<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/plarform/sort.js"></script>

</html>