<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/platform/notSend.css">
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
    平台管理 / 未发布文章管理
  </div>
  <div class="content">
    <div class="content-sort">
      <ul>
        <li class="type-select-first">
          <span>所属类型：</span>
          <span class="active" data-id="0">全部</span>
          <span data-id="1">文章</span>
          <span data-id="2">小视频</span>
          <!-- <span>转发文章</span> -->
        </li>
        <li class="type-select">
          <span class="type-name">所属类目：</span>
          <div id="type_detail">
            <span class="active" data-c_id="0">全部</span>
            <!-- <span>推荐</span> -->
          </div>
          <a class="up-or-down">展开</a>
        </li>
        <li class="type-select-input">
          <span>其他选项：</span>
          <div class="input-sel">
            <span>用户：</span>
            <input type="text" class="input-text" placeholder="不限">
            <span>创建时间：</span>
            <input type="text" maxlength="10" class="input-text" placeholder="输入时间格式：2018-01-01">
          </div>
        </li>
      </ul>
    </div>
    <div class="content-table">
      <div class="act-find">
        <div class="act-title">
          <span>内容列表</span>
        </div>
      </div>
      <div class="select-btn clearfix">
        <!-- <a class="dele-many">批量通过</a>
        <a class="dele-many">批量通过并推荐</a>
        <a class="dele-many">批量不通过</a> -->
      </div>
      <div class="select-table">
        <table>
          <thead>
            <tr>
              <!-- <th>
          <input type="checkbox">
        </th> -->
              <th>封面</th>
              <th>标题（点击标题查看）</th>
              <th>用户昵称</th>
              <th>创建时间</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="table_data">
            <!-- 表格数据 -->
          </tbody>
        </table>
      </div>
      <div class="data-page">
        <span id="prev">&lt;</span>
        <div class="page-detail">
          <!-- 页码内容 -->
        </div>
        <span id="next">&gt;</span>
        <span>
      跳至第<input id="insert_page" type="number">页
    </span>
      </div>
    </div>
  </div>
</body>

<script type="text/html" id="table_tpl">
  {{each data v i}}
  <tr>
    <!-- <td>
      <input type="checkbox">
    </td> -->
    <td><img src="{{ajaxUrl}}{{v.data_image}}" alt=""></td>
    <td><a href="./detail.php?n_id={{v.n_id}}&type={{v.data_type}}&from=title">{{v.data_title}}</a></td>
    <td>asg</td>
    <td>{{v.modify_time}}</td>
    <td>
      <a href="./detail.php?n_id={{v.n_id}}&type={{v.data_type}}&from=audit">审核推荐</a>
      <!-- <span>|</span>
        <a href="javascript:;">编辑</a> 
      -->
    </td>
  </tr>
  {{/each}}
</script>

<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/plarform/notSend.js"></script>

</html>