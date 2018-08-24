$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var n_id, data_type;
  var detail = {
    init: function () {
      var that = this;
      var from = that.getParams('from');
      var show = that.getParams('show');
      n_id = that.getParams('n_id');
      data_type = that.getParams('type');
      if (from == 'title') {
        $('.audit-btn').css('display', 'none');
        $('.detail-page').css({ 'float': 'none' }).parent().css({ 'text-align': 'center' });
      }
      switch (show) { // 侧边栏显示
        case '01':
          $('.nav').html('平台管理 / 未发布 / 详情');
          $('.sidebar ul.sidebar-list > li:nth-child(1) li:nth-child(2) a').css({
            'background-color': '#555658'
          });
          if(from == 'audit'){
            $('.nav').html('内容管理 / 未发布 / 审核');
            $('.audit-btn').css('visibility', 'visible');
          }
          break;
        case '02':
          $('.nav').html('平台管理 / 已发布 / 详情');
          $('.sidebar ul.sidebar-list > li:nth-child(1) li:nth-child(3) a').css({
            'background-color': '#555658'
          })
          break;
        case '11':
          $('.nav').html('我的内容 / 未发布 / 详情');
          $('.sidebar ul.sidebar-list > li:nth-child(3) li:nth-child(1) a').css({
            'background-color': '#555658'
          })
          break;
        case '12':
          $('.nav').html('我的内容 / 已发布 / 详情');
          $('.sidebar ul.sidebar-list > li:nth-child(3) li:nth-child(2) a').css({
            'background-color': '#555658'
          })
          break;
      }
      $.ajax({
        url: ajaxUrl + 'release/find',
        type: 'get',
        data: {
          n_id
        },
        success: function (res) {
          // console.log(res);
          if (res.status == 1000) {
            var obj;
            $('.phone-title').html(res.data.data_title);
            if (data_type == 1) { // 文章
              var data = JSON.parse(res.data.data_video);
              obj = {
                type: data_type,
                ajaxUrl: ajaxUrl,
                data: data
              }

            } else {  // 视频
              obj = {
                ajaxUrl: ajaxUrl,
                data: res.data
              }
            }
            var html = template('phone_tpl', obj);
            $('.phone-content').html(html);
            that.clickEvent();
          }
        }
      })
    },
    // 按钮点击事件
    clickEvent: function () {
      // 通过
      $('.audit-btn input').on('click', function () {
        var btnType = $(this).data('type');
        $.ajax({
          url: ajaxUrl + 'release/review',
          type: 'get',
          data: {
            type: btnType,
            n_id
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
    // 获取url参数
    getParams: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
  }
  detail.init();
});