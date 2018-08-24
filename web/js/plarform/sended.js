$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var allPage = 0;
  var showCount = 10;
  var currentPage = 1;
  var tableData = {};
  var tempData = [];  // 当前表格渲染的数据
  var sended = {
    init: function () {
      var that = this;
      that.getType();
      that.getInitData();
    },
    // 获取初始化表格数据
    getInitData: function () {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'platform',
        type: 'get',
        success: function (res) {
          // console.log('表格数据', res);
          if (res.status == 1000) {
            res.ajaxUrl = ajaxUrl;
            tableData = res;
            that.paging(tableData.data);
            that.setPaging(currentPage);
          } else if (res.status == 1003) {
            res.ajaxUrl = ajaxUrl;
            res.data = [];
            tableData = res;
            that.setPaging(currentPage);
            that.paging(tableData.data);
          }
        },
        error: function (err) {
          console.log('获取初始化数据失败：', err)
        }
      })
    },
    // 获取类目
    getType: function () {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'class',
        type: 'get',
        success: function (res) {
          // console.log('所属类目数据',res);
          if (res.status == 1000) {
            var data = res.data;
            var html = $('#type_detail').html();
            for (let i = 0; i < data.length; i++) {
              html += '<span data-c_id=' + data[i].c_id + '>' + data[i].class_name + '</span>'
            };
            $('#type_detail').html(html);
            var boxHeight = $('#type_detail').height();
            if (boxHeight > 100) {
              $('.up-or-down').css('display', 'inline-block')
            }
            that.clickEvent();
            that.checkType();
            that.inputType();
          }
        }
      });
    },
    // 点击按钮-组合查询功能
    checkType: function () {
      var that = this;
      $('.type-select-first,.type-select #type_detail').off('click').on('click', 'span', function () {
        if ($(this).hasClass('select-type')) {
          return;
        }
        $(this).addClass('active').siblings().removeClass('active');
        var sFirst = $('.type-select-first span.active').data('id');
        var sSecond = $('.type-select span.active').data('c_id');
        var sThird = $('.type-select-input input').val('');
        var obj = {};
        if (sFirst == 0 && sSecond == 0) {
          currentPage = 1;
          that.getInitData()
        } else if (sFirst == 0 && sSecond != 0) {
          obj = {
            own_cate: 2,
            cate_type: sSecond
          }
        } else if (sFirst != 0 && sSecond == 0) {
          obj = {
            own_cate: 1,
            data_type: sFirst
          }
        } else if (sFirst != 0 && sSecond != 0) {
          obj = {
            own_cate: '1,2',
            data_type: sFirst,
            cate_type: sSecond
          }
        }
        that.queryGroup(obj);
      });
    },
    // input输入-组合查询
    inputType: function () {
      var that = this;
      $('.type-select-input input').off('input').on('input', function () {
        $('.type-select-first span').eq(1).addClass('active').siblings().removeClass('active');
        $('.type-select #type_detail span').eq(0).addClass('active').siblings().removeClass('active');
        var iFirst = $.trim($('.type-select-input input').eq(0).val());
        var iSecond = $.trim($('.type-select-input input').eq(1).val());
        var goNext = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9]{3}/.test(iSecond);
        if (goNext) {
          iSecond = that.formatTime(iSecond);
        }
        var obj = {};
        if (iFirst == '' && iSecond == '') {
          currentPage = 1;
          that.getInitData()
        } else if (iFirst == '' && iSecond != '') {
          obj = {
            own_cate: 3,
            date_time: iSecond
          }
        } else if (iFirst != '' && iSecond == '') {
          obj = {
            own_cate: 3,
            user_name: iFirst
          }
        } else if (iFirst != '' && iSecond != '') {
          obj = {
            own_cate: 3,
            user_name: iFirst,
            date_time: iSecond
          }
        }
        that.queryGroup(obj);
      })
    },
    // 点击事件
    clickEvent: function () {
      var that = this;
      // 展开收起
      $('.up-or-down').off('click').on('click', function () {
        var status = $('.up-or-down').data('status');
        if (status == 1) {
          var height = $('#type_detail').height();
          $('.type-select').animate({ height });
          $('.up-or-down').html('收起 <img class="rotate180" style="width:16px;margin-top:-4px;" src="../../../images/arrow-down.png" alt="">').data('status', '2');
        } else {
          $('.type-select').animate({ height: 60 });
          $('.up-or-down').html('展开 <img class="" style="width:16px;margin-top:-4px;" src="../../../images/arrow-down.png" alt="">').data('status', '1');
        }
      });

      // 点击页码
      $('.page-detail').on('click', 'span', function () {
        var tempPage = $(this).data('page');
        if (!tempPage) return;
        currentPage = tempPage;
        $(this).addClass('active').siblings().removeClass('active');
        that.setPaging(currentPage);
      });

      // 点击上一页
      $('#prev').on('click', function () {
        currentPage--;
        currentPage = Math.max(currentPage, 1);
        that.setPaging(currentPage);
      });

      // 点击下一页
      $('#next').on('click', function () {
        currentPage++;
        currentPage = Math.min(currentPage, allPage);
        that.setPaging(currentPage);
      });

      // 输入页码
      $('#insert_page').on('input', function () {
        var inputVal = $(this).val();
        if (inputVal == '') return;
        inputVal = Math.max(1, inputVal);
        inputVal = Math.min(allPage, inputVal);
        currentPage = inputVal;
        $(this).val(currentPage);
        that.setPaging(currentPage);
      });

      // 删除单条数据
      $('#table_data').off('click').on('click', 'a', function () {
        var n_id = $(this).data('n_id');
        if (n_id) {
          if (confirm('您确定删除此内容？')) {
            $.ajax({
              url: ajaxUrl + 'platform/del',
              type: 'get',
              data: {
                n_id,
              },
              success: function (res) {
                // console.log('删除数据成功数据：', res);
                if (res.status == 1000) {
                  that.getInitData();
                }
              },
              error: function (err) {
                console.log('删除数据失败', err);
              }
            })
          }
        }
      });

      // 批量删除按钮
      $('#delAll').on('click', function () {
        if ($(this).text() == '批量操作') {
          $(this).text('取消').siblings().removeClass('show');
          $('th.many,td.many').removeClass('show');
        } else {
          $(this).text('批量操作').siblings().addClass('show');
          $('th.many,td.many').addClass('show').children('input').prop('checked', false);
        }
      })

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
      });

      // 确认批量删除按钮操作
      $('#del_sure').on('click', function () {
        var idArr = [], length = tempData.length;
        for (var i = 0; i < length; i++) {
          if ($('td.many input').eq(i).prop('checked')) {
            idArr.push(tempData[i].n_id)
          }
        };
        if (idArr.length == 0) {
          alert('请选择要删除的内容！');
          return;
        }
        if (!confirm('您确认删除所选的内容吗？')) return;
        $.ajax({
          url: ajaxUrl + 'platform/batch',
          type: 'get',
          data: {
            ids: idArr.join(',')
          },
          success: function (res) {
            // console.log('批量删除', res);
            if (res.status == 1000) {
              that.getInitData();
            }
          }
        })
      });
    },
    // 分页
    paging: function (tableData) {
      var that = this;
      var html = '<span class="active" data-page=1>';
      allPage = Math.ceil(tableData.length / showCount);
      if (allPage == 0 || isNaN(allPage)) {
        $('.page-detail').html('<span class="active">1</span>');
        allPage = 1;
        return
      }
      for (let i = 0; i < allPage; i++) {
        if (i == 0) {
          html += (i + 1) + '</span>';
        } else {
          html += ' <span data-page=' + (i + 1) + '>' + (i + 1) + '</span> '
        }
      };
      $('.page-detail').html(html);
    },
    // 设置对应页码的表格数据
    setPaging: function (page, del) {
      var that = this;
      var beginNum = (page - 1) * showCount;
      var endNum = Math.min((beginNum + showCount), tableData.data.length);
      tempData = [];
      for (let i = beginNum; i < endNum; i++) {
        tempData.push(tableData.data[i]);
      };
      if (page != 1 && tempData.length == 0) { // 删除到最后一条数据
        page = --currentPage;
        beginNum = (page - 1) * showCount;
        endNum = Math.min((beginNum + showCount), tableData.data.length);
        for (let i = beginNum; i < endNum; i++) {
          tempData.push(tableData.data[i]);
        };
      }
      var res = {
        ajaxUrl: tableData.ajaxUrl,
        data: tempData
      }
      var tableHtml = template('table_tpl', res);
      $('#table_data').html(tableHtml);
      $('.page-detail span').eq(page - 1).addClass('active').siblings().removeClass('active');
      if ($('th.many').hasClass('show')) {
        $('td.many').addClass('show');
      } else {
        $('td.many').removeClass('show');
      }
      $('th.many input').prop('checked', false);
    },
    // 组合查询数据
    queryGroup: function (obj) {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'platform/search',
        type: 'post',
        data: obj,
        success: function (res) {
          // console.log('按钮组合查询结果：', res)
          if (res.status == 1000) {
            res.ajaxUrl = ajaxUrl;
            tableData = res;
            that.setPaging(currentPage);
            that.paging(tableData.data);
          } else if (res.status == 1003) {
            res.ajaxUrl = ajaxUrl;
            res.data = [];
            tableData = res;
            that.setPaging(currentPage);
            that.paging(tableData.data);
          }
        },
        error: function (err) {
          console.log('按钮组合查询数据获取失败', err);
        }
      })
    },
    // 格式化时间
    formatTime: function (date) {
      var tempArr = date.split('-');
      tempArr.forEach(function (el, i) {
        tempArr[i] = el < 10 && el.length < 2 ? '0' + el : el
      });
      return tempArr.join('-');
    }
  }
  sended.init();
});