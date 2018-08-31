<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <?php include_once '../../../common/template/css.html' ?>
  <link rel="stylesheet" href="../../css/setStep/setAdmin.css">
  <title>管理员设置</title>
</head>

<body>
  <div class="header">
    <?php include_once '../../../common/template/header.php'?>
  </div>
  <div class="sidebar">
    <?php include_once '../../../common/template/sidebar.php'?>
  </div>
  <div class="nav">
    平台设置 / 管理员设置
  </div>
  <div class="content">
    <div class="content-table">
      <div class="act-find">
        <div class="act-title">
          <span>内容列表</span>
        </div>
      </div>
      <div class="select-btn clearfix">
        <!-- <a class="dele-many show">批量提权</a>
        <a class="dele-many show">批量降级</a>
        <a class="dele-many show">确认删除</a>
        <a class="dele-many" id="delAll">批量操作</a> -->
      </div>
      <div class="check-name">
        <span>用户名：</span>
        <input type="text" class="input-text" id="input_select" placeholder="请输入用户名">
      </div>
      <div class="select-table">
        <table>
          <thead>
            <tr>
              <th class="many show">
                <input type="checkbox">
              </th>
              <th>账号</th>
              <th>权限</th>
              <th>操作</th>
            </tr>
          </thead>
          <tbody id="table_data">
            <!-- 表格数据 -->
          </tbody>
        </table>
      </div>
      <div class="data-page">
        <div class="page-detail pagination" id="Pagination">
          <!-- 页码位置 -->
        </div>
        <span>跳至第<input type="number" id="jump_page">页</span>
      </div>
    </div>
  </div>
</body>

<script type="text/html" id="table_tpl">
  {{each data v i}}
  <tr>
    <td class="many show">
      <input type="checkbox">
    </td>
    <td>{{v.user_name}}</td>
    <td>
      {{if v.is_admin==0}}user {{else}}admin {{/if}}
    </td>
    <td>
      {{if v.u_id!=user_id}}
      <a href="javascript:;" data-u_id={{v.u_id}} data-type="0" data-admin={{v.is_admin}}>
          {{if v.is_admin==0}} 提升{{else}} 降级{{/if}}</a>
      <span>|</span>
      <a href="javascript:;" data-u_id={{v.u_id}} data-type="1">删除</a> {{/if}}
    </td>
  </tr>
  {{/each}}
</script>

<?php include_once '../../../common/template/js.html' ?>
<script src="../../js/setStep/setAdmin.js"></script>

</html>