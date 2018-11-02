# db_movie
🔍a responsive douban movie search site based on douban api

- 跨域

直接请求api地址会报错，因为同源限制。

解决：支持jsonp的跨域方式，datatype改为jsonp，在url后加上callback=xxx

- 拼接多行url

1. 每一行结尾加转移符号`\`
2. 用`+`拼接字符串
3. 写成数组，每一项为字符串的形式，最后调用`join()`
4. **推荐：**es6模版字符串

- 如何判断滚动到底部

需求：滚动到底部后加载count20-40的数据

- scrolltop的高度（滚动过的距离）+ main容器的高度 = 内容section高度
  - 监听滚动事件
  - 请求成功后count+=20

- 页面最下面设置一个透明元素，在滚动时若下面的元素出现在视窗下，这时再去发请求，获取数据后，这个元素又被撑到最下。
  - 如何判断一个元素是否出现在视窗内

- loading状态

- 好看的tab切换栏