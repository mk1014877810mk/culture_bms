$(function () {
  var ajaxUrl = window.sessionStorage.getItem('ajaxUrl');
  var user_id = window.sessionStorage.getItem('user_id');
  var allPage = 0;
  var showCount = 10;
  var currentPage = 1;
  var tableData = {};
  var firstLoad = true;
  var notSend = {
    init: function () {
      var that = this;
      that.getType();
      that.getInitData();
    },
    // 获取初始化表格数据
    getInitData: function () {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'release',
        type: 'get',
        success: function (res) {
          // console.log('表格数据', res);
          if (res.status == 1000) {
            res.ajaxUrl = ajaxUrl;
            tableData = res;
            that.paging(tableData.data);
            // that.setPaging(currentPage);
          } else if (res.status == 1003) {
            res.ajaxUrl = ajaxUrl;
            res.data = [];
            tableData = res;
            // that.setPaging(currentPage);
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
        var iFirst = $.trim($('.type-select-input input').eq(0).val());
        var iSecond = $.trim($('.type-select-input input').eq(1).val());
        var goNext = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9]{3}/.test(iSecond);
        if (goNext) {
          iSecond = that.formatTime(iSecond);
        }
        var obj = {};
        currentPage = 1;
        if (sFirst == '' && sSecond == '' && iFirst == '' && iSecond == '') {
          that.getInitData();
          return;
        } else {
          obj = {
            data_type: sFirst,
            cate_type: sSecond,
            user_name: iFirst,
            date_time: iSecond,
            is_review: 0
          }
        }
        that.queryGroup(obj);
      });
    },
    // input输入-组合查询
    inputType: function () {
      var that = this;
      $('.type-select-input input').off('input').on('input', function () {
        var sFirst = $('.type-select-first span.active').data('id');
        var sSecond = $('.type-select span.active').data('c_id');
        var iFirst = $.trim($('.type-select-input input').eq(0).val());
        var iSecond = $.trim($('.type-select-input input').eq(1).val());
        var goNext = /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]-[0-3]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9][0-9][0-9]-[0-1]{0,1}[0-9]$/.test(iSecond) || /^[1-2][0-9]{3}/.test(iSecond);
        if (goNext) {
          iSecond = that.formatTime(iSecond);
        }
        var obj = {};
        currentPage = 1;
        if (sFirst == '' && sSecond == '' && iFirst == '' && iSecond == '') {
          that.getInitData();
          return;
        } else {
          obj = {
            data_type: sFirst,
            cate_type: sSecond,
            user_name: iFirst,
            date_time: iSecond,
            is_review: 0
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
    },
    // 分页
    paging: function (tableData) {
      this.loadPage(tableData.length);
    },
    // 设置对应页码的表格数据
    setPaging: function (page) {
      var that = this;
      var beginNum = (page - 1) * showCount;
      var endNum = Math.min((beginNum + showCount), tableData.data.length);
      var tempData = [];
      for (let i = beginNum; i < endNum; i++) {
        tempData.push(tableData.data[i]);
      };
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
    },


    // 加载页码并添加事件
    loadPage: function (count) {
      var that = this;
      allPage = Math.max(Math.ceil(count / showCount), 1);
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
        that.setPaging(currentPage);
        $('#Pagination').children('span').removeClass('active');
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
    },


    // 组合查询数据
    queryGroup: function (obj) {
      var that = this;
      $.ajax({
        url: ajaxUrl + 'platform/search',
        type: 'post',
        data: obj,
        success: function (res) {
          // console.log('按钮组合查询结果：', res);
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
  notSend.init();
});