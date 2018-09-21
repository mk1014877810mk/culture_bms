$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var status = 0;
  var url = '';
  var n_id = 0;
  var transfer = {
    init: function () {
      var that = this;
      that.getSort();
      that.setUrl();
      status = that.getParams('status');
      n_id = that.getParams('n_id');
      if (status == 1) {// 编辑
        $('.nav').html('我的内容 / 编辑转载文章');
        $.ajax({
          url: ajaxUrl + '/mine/findone',
          type: 'get',
          data: {
            n_id: n_id
          },
          success: function (res) {
            // console.log('修改前数据', res);
            if (res.status == 1000) {
              $("#bgimg").attr('src', ajaxUrl + res.data.data_image);
              $("#upload_img").val(res.data.data_image);
              $(".transfer-url input").val(res.data.data_video);
              $("#title").val(res.data.data_title);
              $(".transfer-des textarea").val(res.data.description);
              url = res.data.data_video;
              setTimeout(function () {
                $("#sort").val(res.data.c_id);
              }, 500);
            }
          },
          error: function (err) {
            console.log('修改前数据获取失败', err);
          }
        });
      } else {
        $('.nav').html('我的内容 / 新建转载文章');
      }
      $('#preview').on('click', that.preview.bind(that));
      $('#commit').on('click', that.submit.bind(that));
      $("#bgimg").on('click', function () {
        $('#upload_btn').click();
        $('#upload_btn').off('change').on('change', function () {
          var src = window.URL.createObjectURL(this.files[0]);
          if (this.files[0].size / 1024 > 200) {
            alert('图片上传不能超过200k！');
            return;
          }
          $("#bgimg").attr('src', src);
        });
      });
      $("#input_url").off('blur').on('blur', function () {
        that.validate(url);
      });
    },
    // 获取分类
    getSort: function () {
      $.ajax({
        url: ajaxUrl + 'class',
        type: 'get',
        success: function (res) {
          if (res.status == 1000) {
            var data = res.data;
            var html = '<option value="">请选择分类</option>'
            for (var i = 0; i < data.length; i++) {
              html += '<option value=' + data[i].c_id + '>' + data[i].class_name + '</option>'
            };
            $('#sort').html(html);
          }
        },
        error: function (err) {
          console.log('查询分类数据获取失败', err);
        }
      });
    },
    // 设置url
    setUrl: function () {
      $('.transfer-url input').on('input', function () {
        url = $(this).val();
      });
    },
    // 预览
    preview: function () {
      window.open(url);
    },
    // 提交
    submit: function () {
      if ($.trim($('#input_url').val()).length == 0) {
        alert('请输入转载地址！');
        return;
      } else if ($('#bgimg').attr('src')=='../../../images/upload-img.png'){
        alert('请上传背景图片！');
        return;
      } else if ($.trim($('#sort').val()).length == 0) {
        alert('请输入分类！');
        return;
      } else if ($.trim($('#des').val()).length == 0) {
        alert('请输入描述！');
        return;
      }
      if (status == 0) { // 新建提交
        $('#transfer_form').ajaxSubmit({
          url: ajaxUrl + 'data',
          type: 'post',
          data: {
            type: 3,
            source: 1,
            user_id: user_id
          },
          success: function (res) {
            // console.log('提交：', res);
            if (res.status == 1000) {
              alert('转载成功！');
              window.location.href = './m-notSend.php';
            }
          },
          error: function (err) {
            console.log('提交失败', err);
          }
        });
      } else { // 修改提交
        $('#transfer_form').ajaxSubmit({
          url: ajaxUrl + 'mine/address-modify',
          type: 'post',
          data: {
            n_id: n_id,
          },
          success: function (res) {
            // console.log('修改操作', res);
            if (res.status == 1000 || res.status == 1001) {
              alert('修改成功');
              window.location.href = './m-notSend.php';
            }
          },
          error: function (err) {
            console.log('修改提交获取失败', err);
          }
        });
      }
    },
    // 校验url的真实性
    validate: function (url, callback) {
      $.ajax({
        url: ajaxUrl + 'data/url',
        type: 'get',
        data: {
          url: url
        },
        success: function (res) {
          // console.log('地址真实性：', res);
          if (res.status == 1000) {
            $('#title').val(res.data.title);
            $('#upload_img').val(res.data.image_path);
            $("#bgimg").attr('src', ajaxUrl + res.data.image_path);
            callback && callback(url);
          } else if (res.status == 1070) {
            alert(res.msg);
            return;
          } else if (res.status == 1002) {
            alert('输入网址不可为空！');
          }
        },
        error: function (err) {
          console.log('地址真实性校验失败', err);
        }
      });
    },

    // 获取url参数
    getParams: function (name) {
      var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
      var r = window.location.search.substr(1).match(reg);
      if (r != null) return unescape(r[2]); return null;
    }
  }
  transfer.init();
});