const paging = {
  init: function () {
    this.$tab = $('footer > .bt-tab')
    this.$panel = $('main > section')
    this.bind()
  },

  bind: function () {
    var _this = this //or arrow function
    this.$tab.on('click', function () {
      var index = $(this).index()
      $(this).addClass('fired').siblings().removeClass('fired')
      _this.$panel.eq(index).addClass('fired').siblings().removeClass('fired')
    })
  }
}

//模板
 tpl = {
  isToBottom: function($Viewport, $Content) {
    return $Viewport.height() + $Viewport.scrollTop() + 30 > $Content.height()
  },

  insertTpl: function (ele) {
    var $node = $(`
      <div class="item">
        <a href="#">
          <div class="cover">
            <img src="" alt="">
          </div>
          <div class="detail">
            <h2></h2>
            <div class="extra">
              <span class="score"></span>  / <span class="collect"></span>收藏
            </div>
            <div class="extra">
              <span class="year"> / <span class="genres"></span> 
            </div>
            <div class="extra">
              <span class="director"></span>
            </div>
            <div class="extra">
              <span class="casting"></span>
            </div>
          </div>
        </a>
      </div>
    `)
    $node.find('a').attr('href', ele.alt)
    $node.find('.cover img').attr("src", ele.images.small)
    $node.find('.detail h2').text(ele.title)
    $node.find('.extra .score').text(ele.rating.average)
    $node.find('.extra .collect').text(ele.collect_count)
    $node.find('.extra .year').text(ele.year)
    $node.find('.extra .genres').text(ele.genres.join(' / '))
    $node.find('.extra .director').text(`导演：${ele.directors.map(i=>i.name).join('、')}`)
    $node.find('.extra .casting').text(`演员：${ele.casts.map(m=>m.name).join('、')}`)

    return $node
  }
}

//top250页面
var top250Page = {
  init: function () {
    var _this = this
    this.$element = $('#top-250')
    this.$content = this.$element.find('.container')
    //是否数据正在加载
    this.isLoading = false
    //是否载入完所有数据
    this.isFinished = false
    this.page = 0
    this.count = 20
    this.bind()
    //data参数即数据到达后的ret
    this.getData(function (data) {
      _this.render(data)
      _this.page++
    })
  },

  bind: function () {
    var _this = this
    if(_this.clock) {
      clearTimeout(_this.clock)
    } 
    _this.clock = setTimeout(function() {
      _this.$element.on('scroll', function () {
        console.log(_this.isLoading)
        //每次滚动判断 0.是否滚动到最底部 1.数据没有加载完 2.数据是否正在加载
        if (tpl.isToBottom(_this.$element, _this.$content) && !_this.isLoading && !_this.isFinished) {
          console.log('reach bottom and ready to send data!')
          _this.getData(function (data) {
            _this.render(data)
            _this.page++
            if (_this.count * _this.page >= data.total) {
              _this.isFinished = true
            }
          })
        }
      })
    }, 300)
  },

  getData: function (callback) {
    var _this = this
    _this.isLoading = true

    console.log(_this.page)
    console.log(_this.count)

    //数据已发出，未到达
    _this.$element.find('.loader').addClass('fired')
    $.ajax({
      url: 'https://douban.uieee.com/v2/movie/top250',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        start: this.count * this.page,
        count: this.count //20
      }
    }).done(function (ret) {
      console.log(ret)
      //数据已到达
      _this.isLoading = false
      _this.$element.find('.loader').removeClass('fired')
      //执行回调
      callback(ret)
    }).fail(function (err) {
      console.log('数据异常:' + err)
    })
  },

  render: function (data) {
    var _this = this
    data.subjects.forEach(function (item) {
      var $node = tpl.insertTpl(item)
      _this.$content.append($node)
    })
  }
}

var usBoardPage = {
  init: function() {
    var _this = this
    this.$element = $('#beimei')
    this.$content = this.$element.find('.container')
    this.getData(function(data){
      _this.render(data)
    })
  },

  getData: function(callback) {
    $.ajax({
      url : 'https://douban.uieee.com/v2/movie/us_box',
      data : {
          start : 0,
          count : 10
      },
      dataType : 'jsonp'
    }).done(function(ret){
      console.log(ret)
      callback(ret)
    })
  },

  render: function(data) {
    var _this = this
    data.subjects.forEach(function(item){
        var $node = tpl.insertTpl(item.subject)
        _this.$content.append($node)
    })
  }
}


var app = {
  init: function () {
    //初始化页面
    paging.init()
    top250Page.init()
    usBoardPage.init()
  }
}
//初始化
app.init()