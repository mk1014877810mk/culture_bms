$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var n_id;
  var audit = {
    init: function () {
      n_id = this.getParams('n_id');
      this.getData();
      this.clickEvent();
    },
    getData: function () {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'mine/findone',
        type: 'get',
        data: {
          n_id: n_id
        },
        success: function (res) {
          // console.log('获取数据：', res);
          if (res.status == 1000) {
            $('.bgi img').attr('src', ajaxUrl + res.data.data_image);
            $('.title-html').html(res.data.data_title);
            $('.url-html').html('<a href="' + res.data.data_video + '" target="_blank" title="点击可查看" style="color:#09f;">' + res.data.data_video + '</a>');
            $('.des-html').html(res.data.description);
            that.getSort(res.data.c_id);
          }
        },
        error: function (err) {
          console.log('获取数据失败',err);
        }
      })
    },

    // 获取分类
    getSort: function (c_id) {
      $.ajax({
        url: ajaxUrl + 'class',
        type: 'get',
        success: function (res) {
          if (res.status == 1000) {
            var tempArr = res.data;
            tempArr.forEach(function (el) {
              if (el.c_id == c_id) {
                $('.sort-html').html(el.class_name);
                return;
              }
            });
          }
        },
        error: function (err) {
          console.log('查询分类数据获取失败', err);
        }
      });
    },

    // 点击事件
    clickEvent: function () {
      $('.submit input').on('click', function () {
        var btnType = $(this).data('type');
        $.ajax({
          url: ajaxUrl + 'release/review',
          type: 'get',
          data: {
            type: btnType,
            n_id: n_id
          },
          success: function (res) {
            // console.log(res);
            if (res.status == 1000) {
              alert('操作成功');
              window.location.href = './notSend.php';
            }
          },
          error: function (err) {
            console.log('按钮事件操作失败：', err)
          }
        })
      });
    },
    getParams: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
  }
  audit.init();
});