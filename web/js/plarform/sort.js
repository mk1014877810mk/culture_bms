$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var showCount = 10;  // 每页显示的数据条数
  var allCount = 1;
  var currentPage = 1;  // 当前页码
  var firstLoad = true;
  var allPage = 1;  // 总页码
  var sort = {
    init: function () {
      this.getData(currentPage);
      this.detailEdit();
    },
    getData: function (page) {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'class/show',
        type: 'get',
        data: {
          page: page
        },
        success: function (res) {
          // console.log('table数据：', res);
          if (res.status == 1000) {
            allCount = res.count;
            var html = template('table_tpl', res);
            $("#table_data").html(html);
            if (firstLoad) {
              that.loadPage(res.count);
              firstLoad = false;
            }
            // 加载判断勾选框是否存在
            if ($('th.many').hasClass('show')) {
              $('td.many').addClass('show');
            } else {
              $('td.many').removeClass('show');
            }
            $('th.many input').prop('checked', false);

          } else if (res.status == 1003) {
            var obj = {
              data: []
            }
            var html = template('table_tpl', obj);
            $("#table_data").html(html);
            that.loadPage(res.count);
          }
          $('.page-detail span').eq(currentPage - 1).addClass('active').siblings().removeClass('active');
        },
        error: function (err) {
          console.log('获取数据失败', err);
        }
      })
    },
    loadPage: function (count) {
      var that = this;
      var html = '<span class="active" data-page=' + 1 + '>';
      allPage = Math.ceil(count / showCount);
      if (isNaN(allPage)) {
        allPage = 1;
      }
      for (var i = 0; i < allPage; i++) {
        if (i == 0) {
          html += (i + 1) + '</span> ';
        } else {
          html += '<span data-page=' + (i + 1) + '>' + (i + 1) + '</span> '
        }
      };
      $('.data-page .page-detail').html(html);

      // 页码注册点击事件
      $('.data-page .page-detail').on('click', 'span', function () {
        currentPage = $(this).data('page');
        that.getData(currentPage);
      });

      // 上一页
      $('.data-page .prev').on('click', function () {
        currentPage = Math.max(1, --currentPage);
        that.getData(currentPage);
      });

      // 下一页
      $('.data-page .next').on('click', function () {
        currentPage = Math.min(allPage, ++currentPage);
        that.getData(currentPage);
      });

      // 输入框跳转
      $('#jump_page').on('input', function () {
        var inputVal = $(this).val();
        if (inputVal == '') return;
        inputVal = Math.max(1, inputVal);
        inputVal = Math.min(allPage, inputVal);
        currentPage = inputVal
        $(this).val(currentPage);
        that.getData(currentPage);
      });
      // 批量删除
      $('#delAll').on('click', function () {
        if ($(this).data('status') == 1) {
          $(this).data('status', 2).text('确认删除').siblings('.cancel-all').css('display', 'inline-block');
          $('.many').addClass('show');
        } else {
          var idArr = [], length = $('td.many input').length;
          for (var i = 0; i < length; i++) {
            if ($('td.many input').eq(i).prop('checked')) {
              idArr.push($('td.many input').eq(i).data('c_id'));
            }
          }
          if (idArr.length == 0) {
            alert('请选择要删除的分类！');
            return;
          }
          if (!confirm('您确定删除所选的分类吗？')) return;
          $.ajax({
            url: ajaxUrl + 'class/batchdel',
            method: 'get',
            data: {
              ids: idArr.join(',')
            },
            success: function (res) {
              // console.log('批量删除', res);
              if (res.status == 1000) {
                if (idArr.length >= length && currentPage != 1) {
                  currentPage--;
                  that.loadPage(allCount - idArr.length);
                }
                that.getData(currentPage);
              }
            }
          })
        }
      });
      // 取消批量删除
      $('.cancel-all').on('click', function () {
        $(this).css('display', 'none').prev().text('批量删除').data('status', 1);
        $('.many').removeClass('show').children('input').prop('checked', false);
      });

      // 批量删除勾选
      $('th.many input').off('click').on('click', function () {
        var allChecked = $(this).prop('checked');
        $('td.many input').prop('checked', allChecked);
      });
      $('#table_data').on('click', 'td.many input', function () {
        var checkedCount = 0, length = $('td.many input').length;
        for (var i = 0; i < length; i++) {
          if ($('td.many input').eq(i).prop('checked')) {
            checkedCount++;
          }
        };
        $('th.many input').prop('checked', checkedCount == length);
      })
    },
    detailEdit: function () {
      var that = this;
      $('.select-table').on('click', 'a', function () {
        var c_id = $(this).data('c_id');
        var editType = $(this).data('type');
        if (editType == 'del') { //删除
          if (confirm("您确认删除此分类？")) {
            $.ajax({
              url: ajaxUrl + 'class/out',
              type: 'get',
              data: {
                c_id: c_id
              },
              success: function (res) {
                // console.log('删除操作数据：', res);
                if (res.status == 1000) {
                  if (allCount % showCount == 1 && allCount != 1) {
                    --currentPage;
                    that.loadPage(--allCount);
                  }
                  that.getData(currentPage);
                }
              }
            })
          }
        } else { // 编辑
          window.location.href = './addNewSort.php?status=1&c_id=' + c_id;
        }
      });
    }
  }
  sort.init();
});