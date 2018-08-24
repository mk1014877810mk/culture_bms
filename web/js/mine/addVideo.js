$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var phoneContentData = {};
  var nSort = 0;
  var n_id, status;
  var upload = {
    init: function () {
      n_id = this.getParams('n_id');
      status = this.getParams('status');
      if (status == 1) {
        $('.nav').html('我的内容 / 编辑小视频');
        $('#all_delete').val('返回');
        // 获取修改前数据
        $.ajax({
          url: ajaxUrl + 'mine/findone',
          type: 'get',
          data: {
            n_id
          },
          success: function (res) {
            // console.log(res);
            if (res.status == 1000) {
              var data = res.data;
              phoneContentData.id = n_id
              $('.top>img').attr('src', ajaxUrl + data.data_image);
              $('#phone_title').val(data.data_title);
              $('.video video').attr('src', ajaxUrl + data.data_video);
              $('#sort').val(data.c_id);
              setTimeout(function() {
                $('#sort').val(data.c_id);
              }, 500);
            }
          }
        });
      } else {
        $('.nav').html('我的内容 / 新建小视频');
        $('#all_delete').val('删除');
      }
      // 查询分类列表信息
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


    uploadify: function () {
      // 点击上传封面
      $('.upload .file-btn-bgi').change(function () {
        if (this.files[0].size / 1024 > 200) {
          alert('封面大小不能超过200k！');
          return;
        }
        var src = window.URL.createObjectURL(this.files[0]);
        $('.top>img').attr('src', src);
        $('.upload input[type="button"]').val('更换封面');
      });


      // 编辑title
      $('#phone_title').off('focus').on('focus', function () {
        var originTitle = $(this).blur().val();
        $('#title_text').val(originTitle);
        $('.phone-title-text').css({
          'display': 'block'
        });
      });

      // 编辑title中完成按钮
      $('#success_title').on('click', function () {
        var titleText = $.trim($('#title_text').val());
        if (titleText.length == 0) {
          alert('标题不能为空！');
          return;
        }
        $('#phone_title').val(titleText);
        $('.phone-title-text').css({
          'display': 'none'
        });
      });

      // 编辑title中取消按钮
      $('#cancel_title').on('click', function () {
        $('.phone-title-text').css({
          'display': 'none'
        });
      });


      $('.upload-video').off('click').on('click', function () {
        var hasSrc = $('.video video').attr('src');
        if (!hasSrc) {  // 上传视频
          $('.upload-video #input_video').change(function () {
            if ((this.files[0].size / 1024) / 1024 > 20) {
              alert('上传视频不能超过20M！');
              return;
            }
            var src = window.URL.createObjectURL(this.files[0]);
            $('#video_form').ajaxSubmit({
              url: ajaxUrl + 'data/video',
              type: 'post',
              success: function (res) {
                // console.log('上传视频：', res);
                if (res == '上传文件过大') {
                  alert('上传文件过大');
                  return;
                } else if (res.status == 1000) {
                  $('.video video').attr({
                    'src': src,
                    'poster': ''
                  });
                  phoneContentData = res.data;
                }
              },
              error: function (err) {
                console.log('上传视频失败', err);
              }
            })
          })
        } else {  // 修改视频
          $('.upload-video #input_video').off('change').change(function () {
            if ((this.files[0].size / 1024) / 1024 > 20) {
              alert('上传视频不能超过20M！');
              return;
            }
            var src = window.URL.createObjectURL(this.files[0]);
            $('#video_form').ajaxSubmit({
              url: ajaxUrl + 'data/modifyvideo',
              type: 'post',
              data: {
                id: phoneContentData.id
              },
              success: function (res) {
                // console.log('修改视频', res);
                if (res == '上传文件过大') {
                  alert('上传文件过大');
                  return;
                } else if (res.status == 1000) {
                  // 修改成功
                  $('.video video').attr({
                    'src': src,
                    'poster': ''
                  });
                }
              },
              error: function (err) {
                console.log('修改视频失败', err);
              }
            })
          })
        }
      });

      // 点击页面底端完成按钮 
      var successFlag = true;
      $('#all_success').on('click', function () {
        var phoneTitle = $.trim($('#phone_title').val()),
          selectSort = $('#sort').val(),
          fileBgi = $('input.file-btn-bgi').val(),
          videoId = phoneContentData.id || 0;
        if (!phoneTitle) {
          alert('请输入标题！');
          return;
        } else if (!selectSort) {
          alert('请选择分类！');
          return;
        }
        if (status == 0) { // 新建
          if (!fileBgi) {
            alert('请选择背景！');
            return;
          } else if (!videoId) {
            alert('请选择视频！');
            return;
          }
        }
        if (!successFlag) {
          alert('操作中，请稍后...');
          return;
        }
        successFlag = false;
        $('#top_form').ajaxSubmit({
          url: ajaxUrl + 'data',
          type: 'post',
          data: {
            type: 2,
            source: 1,
            user_id: user_id,
            id: phoneContentData.id,
          },
          success: function (res) {
            // console.log('点击完成按钮：', res);
            if (res.status == 1010) {
              alert('背景图片不能超过200k，请更换背景图片！');
              successFlag = true;
              return;
            }
            if (res.status == 1000 || res.status == 1001) {
              if (status == 1) {
                alert('编辑成功！');
              } else {
                alert('新建成功！');
              }
              window.location.href = './m-notSend.php';
            }
          },
          error: function (err) {
            console.log('完成按钮点击失败', err);
          }
        });
      });
      // 点击页面底端删除按钮
      $('#all_delete').on('click', function () {
        // window.location.reload();
        if (confirm('您确认删除吗？')) {
          window.history.go(-1);
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
  upload.init();
  upload.uploadify();

});