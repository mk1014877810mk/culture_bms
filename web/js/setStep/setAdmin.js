$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var showCount = 10;  // 每页显示的数据条数
  var allCount = 1;
  var currentPage = 1;  // 当前页码
  var allPage = 1;  // 总页码
  var firstLoad = true;
  var stopRequest = false;
  var setAdmin = {
    init: function () {
      this.getData(currentPage);
      this.upOrDownOrDelAdmin();
    },
    // 获取table数据
    getData: function (page) {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'adminlogin',
        type: 'get',
        data: {
          page: page
        },
        success: function (res) {
          // console.log('table数据：', res);
          if (res.status == 1000) {
            res.user_id = user_id;
            allCount = res.count;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].u_id == user_id) {
                var temp = res.data.splice(i, 1);
                // console.log(temp);
                res.data.unshift(temp[0]);
                break;
              }
            };
            var adminArr = [], userArr = [];
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].is_admin == 1) {
                adminArr.push(res.data[i]);
              } else {
                userArr.push(res.data[i]);
              }
            };
            res.data = adminArr.concat(userArr);
            var html = template('table_tpl', res);
            $("#table_data").html(html);
            if (firstLoad) {
              that.loadPage(res.count);
              firstLoad = false;
            }

          } else if (res.status == 1003) {
            var obj = {
              data: []
            }
            var html = template('table_tpl', obj);
            $("#table_data").html(html);
            that.loadPage(res.count);
          }
        },
        error: function (err) {
          console.log('获取数据失败', err);
        }
      })
    },
    // 加载页码并添加事件
    loadPage: function (count) {
      var that = this;
      allPage = Math.ceil(count / showCount);
      $("#Pagination").pagination(allPage, {
        num_edge_entries: 2,
        num_display_entries: 4,
        prev_text: '<',
        next_text: '>',
        callback: pageselectCallback,
        items_per_page: 1
      });
      function pageselectCallback(page) {
        currentPage = page + 1;
        that.getSelectData(currentPage, stopRequest);
      }

      // 输入框跳转
      $('#jump_page').off('input').on('input', function () {
        var inputVal = $(this).val();
        if (inputVal == '') return;
        inputVal = Math.max(1, inputVal);
        inputVal = Math.min(allPage, inputVal);
        currentPage = inputVal
        $(this).val(currentPage);
        $("#Pagination").pagination(allPage, {
          num_edge_entries: 2,
          num_display_entries: 4,
          prev_text: '<',
          next_text: '>',
          current_page: currentPage - 1,
          callback: pageselectCallback,
          items_per_page: 1
        });
      });


      // 用户名模糊查询
      $('#input_select').off('input').on('input', function () {
        currentPage = 1;
        firstLoad = true;
        stopRequest = !stopRequest;
        that.getSelectData(currentPage, stopRequest);
      });

      //   // 批量删除按钮
      //   $('#delAll').on('click', function () {
      //     if ($(this).text() == '批量操作') {
      //       $(this).text('取消').siblings().removeClass('show');
      //       $('th.many,td.many').removeClass('show');
      //     } else {
      //       $(this).text('批量操作').siblings().addClass('show');
      //       $('th.many,td.many').addClass('show').children('input').prop('checked', false);
      //     }
      //   })

      //    // 批量删除勾选
      //    $('th.many input').off('click').on('click', function () {
      //     var allChecked = $(this).prop('checked');
      //     $('td.many input').prop('checked', allChecked);
      //   });
      //   $('#table_data').on('click', 'td.many input', function () {
      //     var checkedCount = 0, length = $('td.many input').length;
      //     for (var i = 0; i < length; i++) {
      //       if ($('td.many input').eq(i).prop('checked')) {
      //         checkedCount++;
      //       }
      //     };
      //     $('th.many input').prop('checked', checkedCount == length);
      //   })
    },

    getSelectData: function (page, flag) {
      var that = this;
      var val = $('#input_select').val();
      if ($.trim(val).length == 0) {
        this.getData(currentPage);
        return;
      }
      $.ajax({
        url: ajaxUrl + 'adminlogin/search-user',
        type: 'post',
        data: {
          user_name: val,
          page: page
        },
        success: function (res) {
          // console.log('模糊查询数据', res);
          if (res.status == 1000) {
            res.user_id = user_id;
            allCount = res.count;
            for (let i = 0; i < res.data.length; i++) {
              if (res.data[i].u_id == user_id) {
                var temp = res.data.splice(i, 1);
                res.data.unshift(temp[0]);
                break;
              }
            };
            var adminArr = [], userArr = [];
            for (var i = 0; i < res.data.length; i++) {
              if (res.data[i].is_admin == 1) {
                adminArr.push(res.data[i]);
              } else {
                userArr.push(res.data[i]);
              }
            };
            res.data = adminArr.concat(userArr);
            var html = template('table_tpl', res);
            $("#table_data").html(html);
          } else if (res.status == 1003) {
            var obj = {
              data: []
            }
            var html = template('table_tpl', obj);
            $("#table_data").html(html);
          }
          if (firstLoad && flag == stopRequest) {
            that.loadPage(res.count);
            firstLoad = false;
          }
        },
        error: function (err) {
          console.log('模糊查询数据获取失败', err);
        }
      });
    },

    // 提升、降级、删除管理员
    upOrDownOrDelAdmin: function () {
      var that = this;
      $('#table_data').off('click').on('click', 'a', function () {
        var u_id = $(this).data('u_id');
        var type = $(this).data('type');
        var admin = $(this).data('admin') == 0 ? 1 : 0;
        if (type == 0) {  // 提升或降级
          $.ajax({
            url: ajaxUrl + 'adminlogin/prom',
            type: 'get',
            data: {
              u_id,
              status: admin
            },
            success: function (res) {
              // console.log('提升或降级', res);
              if (res.status == 1000) {
                that.getSelectData(currentPage, stopRequest);
              }
            },
            error: function (err) {
              console.log('提升或降级操作失败', err);
            }
          });
        } else {  // 删除
          if (confirm('您确定要删除此用户信息吗？')) {
            $.ajax({
              url: ajaxUrl + 'adminlogin/del',
              type: 'get',
              data: {
                u_id
              },
              success: function (res) {
                // console.log('删除用户信息', res);
                if (res.status == 1000) {
                  if (allCount % showCount == 1 && allCount != 1) {
                    --currentPage;
                    that.loadPage(--allCount);
                  }
                  that.getSelectData(currentPage, stopRequest);
                }
              },
              error: function (err) {
                console.log('删除用户信息操作失败', err);
              }
            })
          }
        }

      });
    }
  }
  setAdmin.init();
});