$(function () {
  load()
  // 给输入框绑定，enter键盘抬起事件
  $("#title").on('keydown', function (event) {
    if (event.keyCode === 13) {
      if ($(this).val() === '') {
        alert('请输入待办事项')
        return false
      }
      var local = getData()
      // 将输入框里的值，保存到local
      local.push({
        title: $(this).val(),
        done: false
      })
      // 将local数据保存到本地存储
      saveData(local)
      $(this).val('')
      // 把local里的数据渲染到页面 
      load()
    }
  })
  // 删除todoList列表数据
  $('ol').on('click', 'a', function () {
    // 先获取本地存储
    var data = getData()
    // 修改数据
    var index = $(this).attr('id')
    data.splice(index, 1)
    // console.log(data);
    // 保存到本地存储
    saveData(data)
    // 重新渲染页面
    load()
  })
  // 点击完成将数据添加到doneList
  $('ol,ul').on('click', 'input', function () {
    // 获取数据
    var data = getData()
    // 修改数据
    var index = $(this).siblings('a').attr('id')
    data[index].done = $(this).prop('checked')
    // console.log(data)
    // 保存数据到本地存储
    saveData(data)
    // 重新渲染到页面
    load()
  })
  // 从本地存储获取数据
  function getData() {
    var data = localStorage.getItem('todoList')
    if (data !== null) {
      return JSON.parse(data)
    } else {
      return []
    }
  }
  // 保存数据到本地存储
  function saveData(data) {
    var dataString = JSON.stringify(data)
    localStorage.setItem('todoList', dataString)
  }
  // 渲染本地存储的是数据到页面
  function load() {
    var data = getData()
    console.log(data)
    // 未完成个数
    var todoCount = 0
    // 已完成个数
    var doneCount = 0
    $('ul,ol').empty()
    $.each(data, function (i, obj) {
      if (!obj.done) {
        $('ol').prepend(
          `<li>
            <input type='checkbox'/>
            <p>${obj.title}</p>
            <a href='javascript:;' id='${i}'></a>
        </li>`)
        todoCount++
      } else {
        $('ul').prepend(`
          <li>
            <input type='checkbox' checked='true'/>
            <p>${obj.title}</p>
            <a href='javascript:;' id='${i}'></a>
          </li>
        `)
        doneCount++
      }
    })
    // 把总数渲染到页面
    $('#todoCount').text(todoCount)
    $('#doneCount').text(doneCount)
  }
})