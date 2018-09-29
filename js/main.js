$(function () {
    //初始化页面，读取localstorage
    loadList()

    // 监听form的submit事件，获取输入值，调用addToList（）
    $('.todo-add').on('submit', function (e) {
      var $input = $('.todo-add > input'); // 获取输入框
      var text = $input.val();
      if (text.length) {
        addToList(text, $('.doing')); // 向未完列表添加项目
      }
      $input.val('').focus(); // 清空输入框，获取焦点
      e.preventDefault();
    })

    // 监听checkbox，移入done或doing
    $('.list-wrapper').on('click', 'input[type=checkbox]', function (e) {
      // var target = e.target;
      // var text = $(this).next().text();
      if (this.checked) {
        console.log('done');
        $(this).parent().remove().prependTo('.done');
      }else{
        console.log('undone');
        $(this).parent().remove().appendTo('.doing');
      }
    })

    // 监听delete，删除项目
    $('.list-wrapper').on('click', '.delete', function (e) {
      $(this).parent().remove();
    })

    // 添加项目
    function addToList(text, list) {
      list.prepend('<li class="item"><input type="checkbox"><span class="text">'+
      text+'</span><span class="delete">删除</span></li>');
    }

    // 页面关闭或刷新时进行存储
    window.onbeforeunload = function () {
      let data = {
        doing:{},
        done:{}
      };
      let list = document.querySelectorAll('.item');
      // console.log(list);
      if(list.length){
        for (let i = 0; i < list.length; i++) {
          if(!list[i].children[0].checked){
            data.doing[list.length-i]=list[i].children[1].innerHTML;
          }else{
            data.done[list.length-i]=list[i].children[1].innerHTML;
          }
        }
      }else{
        return;
      }
      var storage = window.localStorage;
      storage.list = JSON.stringify(data);
    }

    // 初始化页面，读取localstorage
    function loadList() {
      let dataFromStorage = JSON.parse(window.localStorage.list);
      for (let key in dataFromStorage) {
        for (let index in dataFromStorage[key]){
          let text = dataFromStorage[key][index];
          if (key === 'doing') {
            addToList(text, $('.doing'));
          }else if(key === 'done'){
            addToList(text, $('.done'));
          }
        }
      }
      let checkBoxList = $('.done > .item > input');
      checkBoxList.attr('checked', 'checked');

    }
})