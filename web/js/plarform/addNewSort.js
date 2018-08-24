$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var status = '';
  var addNewSort = {
    init: function () {
      var that = this;
      status = this.getParams('status');
      if (status == 0) { // 新建分类
        $('.submit-btn input[type="reset"]').css({
          'display': 'inline-block'
        })
      } else { // 编辑分类
        $('.nav').html('平台管理 / 分类管理 / 编辑分类');
        $('.submit-btn input[type="reset"]').next().css({
          'display': 'inline-block'
        }).on('click', function () {
          window.history.go(-1);
        });
        that.editInit();
      }
      that.submitData();
    },
    editInit: function () { // 编辑页面获取数据
      var c_id = this.getParams('c_id');
      $.ajax({
        url: ajaxUrl + 'class/one',
        type: 'get',
        data: {
          c_id
        },
        success: function (res) {
          // console.log('获取编辑数据：',res);
          if (res.status == 1000) {
            var data = res.data;
            $('.sort-name input').val(data.class_name);
            $('.sort-des textarea').val(data.class_description);
            $('.sort-index input').val(data.class_sort);
            if (data.is_show == 0) {
              $('[name="is_show"]').eq(1).attr('checked', true);
            }else{
              $('[name="is_show"]').eq(0).attr('checked', true);
            }
          }
        },
        error: function (err) {
          console.log('编辑页面数据获取失败', err);
        }
      })
    },
    submitData: function () {
      var that = this;
      $('#submit_data').click(function () {
        var sortName = $('.sort-name input').val();
        var description = $('.sort-des textarea').val();
        var isShow = $('[name="is_show"]:checked').val();
        var sortIndex = $('.sort-index input').val();
        if (!sortName || !description || !sortIndex) {
          alert('请输入分类的相关信息！');
          return;
        } else if (sortIndex < 1) {
          alert('显示顺序不符合规范！');
          return;
        } else {
          if (status == 0) { // 新建分类提交数据
            $.ajax({
              url: ajaxUrl + 'class/create',
              type: 'post',
              data: {
                name: sortName,
                description: description,
                is_show: isShow,
                sort: sortIndex
              },
              success: function (res) {
                alert('创建分类成功！');
                window.location.href = './sort.php';
              }
            })
          } else { // 编辑分类提交数据
            var c_id = that.getParams('c_id');
            $.ajax({
              url: ajaxUrl + 'class/up',
              type: 'post',
              data: {
                name: sortName,
                description: description,
                is_show: isShow,
                sort: sortIndex,
                c_id
              },
              success: function (res) {
                alert('编辑分类成功！');
                window.location.href = './sort.php';
              }
            })
          }
        }
      })
    },
    getParams: function (name) { // 获取url参数
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
  }
  addNewSort.init();
});