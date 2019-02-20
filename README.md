# db_movie
🔍a responsive douban movie search site based on douban api

- 跨域

直接请求api地址会报错，因为同源限制。

解决：支持jsonp的跨域方式，datatype改为jsonp，在url后加上callback=xxx

- 拼接多行url的方法

1. 每一行结尾加转移符号`\`
2. 用`+`拼接字符串
3. 写成数组，每一项为字符串的形式，最后调用`join()`
4. 推荐：es6模版字符串

- 如何判断滚动到底部

需求：滚动到底部后加载count20-40的数据

- scrolltop的高度（滚动过的距离）+ main容器的高度 = 内容section高度，所以只要前者大于内容块高度，即可监测到滑动
  - 监听滚动事件
  - 请求成功后count+=20

- 页面最下面设置一个透明元素，在滚动时若下面的元素出现在视窗下，这时再去发请求，获取数据后，这个元素又被撑到最下。
  - 如何判断一个元素是否出现在视窗内

- 懒加载

1. 窗口的高度：滚动是在固定高度的窗口内滚动；
2. 滚动的距离

- 节流

1. 鼠标滚动到底的时候，避免😊的操作就会导致再次发起请求，给页面设置一个锁。
2. 函数节流

  ```javascript
  let timer
    $('main').on('scroll', function() {
      if(timer) clearTimeout(timer)
      timer = setTimeout(() => {
        if($('section').eq(0).height() - 10 <= $('main').scrollTop() + $('main').height()) {
          requestData()
          $('.loader').addClass('fired')
        }
      }, 300);
    })
  ```

- loading图

通过添加一段svg来实现

- 组织代码

1. init-初始化，选择元素等
2. bind-给元素绑定事件
3. start-一开始就要执行的东西
4. render-其它方法

- 关键值都在全局变量app上，防止命名污染；如果再有一个app2，里面定义的变量和app不会互相影响，方便维护；
- 用立即执行函数来封装，仅暴露init()方法；

```
<script>
    var app = {
      init: function() {
          this.a = 1,
          this.bind(),
          this.start()
      },
      bind: function() {
        console.log('bind')
      },
      start: function() {
        console.log('start')
      }
    }
    app.init()
    console.log(app.a)
    
    
    //分装，暴露出init接口
    var app = (function() {
      var index = 1
      function bind() {
        
      } 
      function setData() {
        
      }
      function getData() {
        
      }
      return {
        init: function() {
          bind()
          setData()
          getData()
        }
      }
    })()
  </script>
```

- parcel打包
