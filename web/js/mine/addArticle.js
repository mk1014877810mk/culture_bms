$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var phoneContentData = [];
  var nSort = 0;
  var n_id, status;
  var upload = {
    init: function () {
      n_id = this.getParams('n_id');
      status = this.getParams('status');
      if (status == 1) { // 编辑
        $('.nav').html('我的内容 / 编辑文章');
        $('.upload input[type="button"]').val('更换封面');
        $('#all_delete').val('返回');
        // 获取数据
        $.ajax({
          url: ajaxUrl + 'mine/findone',
          type: 'get',
          data: {
            n_id
          },
          success: function (res) {
            // console.log('编辑之前的数据：', res);
            if (res.status == 1000) {
              var resData = res.data;
              // console.log(resData);
              $('.top>img').attr('src', ajaxUrl + resData.data_image.slice(2));
              $('#phone_title').val(resData.data_title);
              $('#sort').val(resData.c_id);
              setTimeout(function () {
                $('#sort').val(resData.c_id);
              }, 500);
              var data = JSON.parse(resData.data_video);
              // console.log(data);
              var tempSort = [];
              for (var i = 0; i < data.length; i++) {
                var obj = {};
                if (data[i].type == 1) { // 图片
                  obj.src = ajaxUrl + data[i].content.slice(2);
                  obj.data_type = data[i].type;
                  obj.sort = data[i].sort;
                  obj.y_id = data[i].y_id;
                  tempSort.push(data[i].sort);
                } else if (data[i].type == 2) {
                  obj.content = data[i].content;
                  obj.data_type = data[i].type;
                  obj.sort = data[i].sort;
                  obj.y_id = data[i].y_id;
                  tempSort.push(data[i].sort);
                } else if (data[i].type == 3) {
                  obj.src = ajaxUrl + data[i].content.slice(2);
                  obj.data_type = data[i].type;
                  obj.sort = data[i].sort;
                  obj.y_id = data[i].y_id;
                  tempSort.push(data[i].sort);
                }
                phoneContentData.push(obj);
              };
              // console.log(phoneContentData);
              nSort = Math.max(...tempSort);
              if (phoneContentData.length > 0) {
                $('.phone-content-btn').css({
                  'display': 'block'
                });
              }
              var html = template('tpl_phoneContent', phoneContentData);
              $('.phone-bottom-content').html(html);

              // var detail = $('.detail-content');
              // for (let i = 0; i < detail.length; i++) {
              //   var height = (detail.eq(i).height());
              //   height = height > 100 ? height : 100;
              //   detail.eq(i).parent().height(height).parent().height(height);
              // };
            }
          }
        });

      } else if (status == 0) { // 新建
        $('.nav').html('我的内容 / 新建文章');
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
      var that = this;
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

      // 点击编辑title中取消按钮
      $('#cancel_title').on('click', function () {
        $('.phone-title-text').css({
          'display': 'none'
        });
      });

      // 点击修改文字
      $('.phone-content').on('click', '#edit_content_text', function () {
        var notEditText = $.trim($(this).parent().prev().text());
        var currentIndex = 0; // 当前点击的数据索引
        var currentSort = $(this).data('sort');
        $('.phone-content-text').show();
        $('#content_text').val(notEditText.split('<br/>').join('\n'));
        for (let i = 0; i < phoneContentData.length; i++) {
          if (phoneContentData[i].sort == currentSort) {
            currentIndex = i;
            break;
          }
        };
        var obj = {
          y_id: $(this).data('y_id'),
          data_type: 2
        };
        // 点击修改完成按钮
        $('#success').off('click').on('click', function () {
          var content = $.trim($('#content_text').val());
          if (content.length == 0) {
            alert('文章内容不能为空！');
            return;
          }
          if (content.indexOf('\n') != -1) {
            var textArr = content.split('\n');
            content = textArr.join('<br/>');
            $('#content_text').val(content);
          }
          var info = {
            index: currentIndex,
            content
          }
          that.editDetail(obj, $("#text"), info);
          $('.phone-content-text').hide();
        });
      });

      // 点击修改文字取消按钮
      $('#cancel').off('click').on('click', function () {
        $('#content_text').val("");
        $('.phone-content-text').hide();
      });


      // 修改视频或图片
      $('.phone-content').on('click', '.edit-content-detail input', function () {
        var currentSort = $(this).data('sort');
        var currentIndex = 0;
        var dom = '';
        for (let i = 0; i < phoneContentData.length; i++) {
          if (phoneContentData[i].sort == currentSort) {
            currentIndex = i;
            break;
          }
        };
        if ($(this).data('data_type') == 1) {
          dom = $('#changeImage');
        } else if ($(this).data('data_type') == 3) {
          dom = $('#changeVideo');
        }
        var obj = {
          y_id: $(this).data('y_id'),
          data_type: $(this).data('data_type')
        };
        $(this).off('change').on('change', function () {
          var src = window.URL.createObjectURL(this.files[0]);
          var info = {
            index: currentIndex,
            src
          }
          that.editDetail(obj, dom, info);
        });
      });


      // 删除单个内容
      $('.phone-content').on('click', '.detail-del>img', function () {
        if (!confirm('您确定删除此条内容吗？')) {
          return;
        }
        var yId = $(this).data('y_id');
        var currentSort = $(this).data('sort');
        var currentIndex = 0;
        for (let i = 0; i < phoneContentData.length; i++) {
          if (phoneContentData[i].sort == currentSort) {
            currentIndex = i;
          }
        };
        if (status == 1) { // 编辑删除
          $.ajax({
            url: ajaxUrl + 'prestored/editdel',
            type: 'get',
            data: {
              y_id: yId,
              n_id
            },
            success: function (res) {
              // console.log('编辑删除数据', res);
              if (res.status == 1000) {
                phoneContentData.splice(currentIndex, 1);
                var html = template('tpl_phoneContent', phoneContentData);
                $('.phone-bottom-content').html(html);
                if (phoneContentData.length == 0) {
                  $('.phone-content-btn').css({
                    'display': 'none'
                  });
                }
              }
            },
            error: function (err) {
              console.log('删除失败', err);
            }
          })
        } else { // 新建文章删除
          $.ajax({
            url: ajaxUrl + 'prestored/delone',
            type: 'get',
            data: {
              y_id: yId
            },
            success: function (res) {
              // console.log('新建删除数据', res);
              if (res.status == 1000) {
                phoneContentData.splice(currentIndex, 1);
                var html = template('tpl_phoneContent', phoneContentData);
                $('.phone-bottom-content').html(html);
                if (phoneContentData.length == 0) {
                  $('.phone-content-btn').css({
                    'display': 'none'
                  })
                }
              }
            },
            error: function (err) {
              console.log('删除失败', err);
            }
          })
        }

      });

      // 点击加号显示隐藏
      $('.phone-content').on('click', '.img-btn', function () {
        var show = $(this).next('.add-content').css('display');
        if (show == 'block') {
          $(this).next('.add-content').css('display', 'none');
        } else {
          $('.add-content').css('display', 'none');
          $(this).next('.add-content').css('display', 'block');
        }
      });

      // 点击选择文件
      $('.phone-content').on('click', '.add-content>div', function (e) {
        var index = $(this).data('index');
        var id = $(this).data('id');
        var flag = true;
        // console.log(index, id);
        if (id == 1) { // 将要上传图片
          $('.phone-content').off('change', '.choose-file #choose_img').on('change', '.choose-file #choose_img', function () {
            if (!flag) return;
            if (this.files[0].size / 1024 > 200) {
              alert('图片上传不能超过200k！');
              return;
            }
            flag = false;
            var obj = {
              'src': window.URL.createObjectURL(this.files[0]),
              'data_type': 1,
              'user_id': user_id,
              'sort': ++nSort,
              'that': $(this).parent().parent()
            }
            upload.uploadContent(obj, index);
          });
        } else if (id == 2) { // 将要上传文字
          if (!flag) return;
          flag = false;
          $('.phone-content-text').show();
          // 点击成功按钮
          var flagSubmit = true;
          $('#success').off('click').on('click', function () {
            if (!flagSubmit) return;
            flagSubmit = false;
            var val = $('#content_text').val();
            if ($.trim(val) == "") {
              alert("输入内容不能为空！");
              return;
            } else if (val.indexOf('\n') != -1) {// 手动换行
              var textArr = val.split('\n');
              val = textArr.join('<br/>');
              $('#content_text').val(val);
            }
            var obj = {
              'data_type': 2,
              'user_id': user_id,
              'sort': ++nSort,
              'content': val
            }
            console.log($('#content_text').val());
            // return;
            $("#text").ajaxSubmit({
              url: ajaxUrl + 'prestored',
              type: 'post',
              data: {
                data_type: 2,
                user_id: user_id,
                sort: obj.sort
              },
              success: function (res) {
                // console.log('文字上传', res, obj);
                if (res.status == 1000) {
                  $('#content_text').val("");
                  obj.y_id = res.data.y_id;
                  if (phoneContentData.length == index) {
                    phoneContentData.push(obj);
                  } else {
                    phoneContentData.splice(index, 1, obj, phoneContentData[index])
                  }
                  var html = template('tpl_phoneContent', phoneContentData);
                  $('.phone-bottom-content').html(html);
                  // console.log(phoneContentData)
                  if (phoneContentData.length > 0) {
                    $('.phone-content-btn').css({
                      'display': 'block'
                    })
                  }
                }
              },
              error: function (err) {
                console.log('文字上传失败', err)
              }
            })
            $('.phone-content-text').hide();
          });
          // 点击取消按钮
          $('#cancel').off('click').on('click', function () {
            $('#content_text').val("");
            $('.phone-content-text').hide();
          });

        } else {  // 上传视频
          $('.phone-content').off('change', '.choose-file #choose_video').on('change', '.choose-file #choose_video', function () {
            if (!flag) return;
            if ((this.files[0].size / 1024) / 1024 > 20) {
              alert('上传视频不能超过20M！');
              return;
            }
            flag = false;
            var obj = {
              'src': window.URL.createObjectURL(this.files[0]),
              'data_type': 3,
              'user_id': user_id,
              'sort': ++nSort,
              'that': $(this).parent().parent()
            }
            upload.uploadContent(obj, index);
          });
        }
        // console.log(phoneContentData)
        $('.add-content').css('display', 'none');
        flag = true;
        e.stopPropagation();
      });

      // 点击页面底端完成按钮 
      var successFlag = true;
      $('#all_success').on('click', function () {
        var idArr = [];
        for (var i = 0; i < phoneContentData.length; i++) {
          idArr.push(phoneContentData[i].y_id);
        };
        var phoneTitle = $.trim($('#phone_title').val()),
          selectSort = $('#sort').val(),
          fileBgi = $('input.file-btn-bgi').val();
        if (!phoneTitle) {
          alert('请输入标题！');
          return;
        } else if (!selectSort) {
          alert('请选择分类！');
          return;
        }
        if (status == 0) { // 新建提交
          if (!fileBgi) {
            alert('请选择背景！');
            return;
          } else if (!successFlag) {
            alert('操作中，请稍后...');
            return;
          }
          successFlag = false;
          $('#top_form').ajaxSubmit({
            url: ajaxUrl + 'data',
            type: 'post',
            data: {
              type: 1,
              source: 1,
              user_id: user_id,
              id: idArr.join(',')
            },
            success: function (res) {
              // console.log('点击完成按钮：', res);
              if (res.status == 1010) {
                alert('背景图片不能超过200k，请更换背景图片！');
                successFlag = true;
                return;
              } else if (res.status == 1000) {
                alert('新建成功！');
                window.location.href = './m-notSend.php';
              }
            },
            error: function (err) {
              console.log('新建提交失败', err);
            }
          });
        } else { // 编辑提交
          if (!successFlag) {
            alert('操作中，请稍后...');
            return;
          }
          successFlag = false;
          $('#top_form').ajaxSubmit({
            url: ajaxUrl + 'mine/modify',
            type: 'post',
            data: {
              type: 1,
              source: 1,
              user_id: user_id,
              id: idArr.join(','),
              n_id,
            },
            success: function (res) {
              // console.log('点击编辑按钮：', res);
              if (res.status == 1010) {
                alert('背景图片不能超过200k，请更换背景图片！');
                successFlag = true;
                return;
              } else if (res.status == 1000 || res.status == 1001) {
                alert('编辑成功！');
                window.location.href = './m-notSend.php';
              }
            },
            error: function (err) {
              console.log('修改提交失败', err);
            }
          });
        }
      });

      // 点击页面底端删除按钮
      $('#all_delete').on('click', function () {
        if (status == 0) {  // 删除
          if (confirm('您确认删除吗？')) {
            var yidsArr = [];
            for (var i = 0; i < phoneContentData.length; i++) {
              yidsArr.push(phoneContentData[i].y_id);
            };
            $.ajax({
              url: ajaxUrl + 'prestored/out',
              type: 'get',
              data: {
                yids: yidsArr.join(',')
              },
              success: function (res) {
                // console.log('删除资源表数据',res);
                if (res.status == 1000) {
                  window.history.go(-1);
                }
              },
              error: function (err) {
                console.log('删除失败', err);
              }
            })
          }
        } else { // 返回
          window.history.go(-1);
        }
      });
    },

    uploadContent: function (obj, index) {
      obj.that.ajaxSubmit({
        url: ajaxUrl + 'prestored',
        type: 'post',
        data: {
          data_type: obj.data_type,
          user_id: obj.user_id,
          sort: obj.sort,
        },
        success: function (res) {
          // console.log('上传成功数据：', res);
          if (res == '上传文件过大') {
            alert(res);
            return;
          } else if (res.status == 1000) {
            obj.y_id = res.data.y_id;
            if (phoneContentData.length == index) {
              phoneContentData.push(obj);
            } else {
              phoneContentData.splice(index, 1, obj, phoneContentData[index])
            }
            var html = template('tpl_phoneContent', phoneContentData);
            $('.phone-bottom-content').html(html);
            if (phoneContentData.length > 0) {
              $('.phone-content-btn').css({
                'display': 'block'
              })
            }
          } else if (res.status == 1010) {
            alert(res.msg);
          }
        },
        error: function (err) {
          console.log('图片资料上传失败', err);
        }
      });
    },

    // 单个修改内容
    editDetail: function (obj, dom, info) {
      dom.ajaxSubmit({
        url: ajaxUrl + 'prestored/modify',
        type: 'post',
        data: obj,
        success: function (res) {
          // console.log('修改成功', res, obj, info);
          if (res.status == 1000) {
            if (obj.data_type == 1 || obj.data_type == 3) {
              phoneContentData[info.index].src = info.src;
            } else if (obj.data_type == 2) {
              phoneContentData[info.index].content = info.content;
            }
            // console.log(phoneContentData);
            var html = template('tpl_phoneContent', phoneContentData);
            $('.phone-bottom-content').html(html);
            if (phoneContentData.length > 0) {
              $('.phone-content-btn').css({
                'display': 'block'
              })
            }
          } else if (res.status == 1010) {
            alert(res.msg);
            return;
          }
        },
        error: function (err) {
          console.log('修改失败', err);
        }
      })
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