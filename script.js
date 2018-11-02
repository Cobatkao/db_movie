$(function() {
  let $tab = $('footer > .bt-tab')
  let $section = $('main > section')
  let mvNum = 0
  let isLoading = false

  $tab.on('click', function() {
    let index = $(this).index()
    $(this).addClass('fired').siblings().removeClass('fired')
    $section.eq(index).addClass('fired').siblings().removeClass('fired')
  })

  requestData()
  function requestData() {
    if (isLoading) return
    //数据已发出，未到达
    isLoading = true
    $.ajax({
      url: 'https://api.douban.com/v2/movie/top250',
      type: 'GET',
      dataType: 'jsonp',
      data: {
        start: mvNum,
        count: 20
      }
    }).done(function(data) {
      console.log(data)
      setData(data)
    }).fail(function() {
      console.log('err:' + err)
    }).always(function() {
      //数据到达后，重置为false
      isLoading = false
    })
  }

  $('main').on('scroll', function() {
    if($('section').eq(0).height() - 10 <= $('main').scrollTop + $('main').height()) {
      requestData()
    }
  })

  // 生成数据
  function setData(data) {
    mvNum += 20
    data.subjects.forEach(ele => {
      let template = `
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
            导演：<span class="director"></span>
          </div>
          <div class="extra">
            主演：<span class="casting"></span>
          </div>
        </div>
      </a>
    `
    var $node = $(template)
    $node.find('.cover img').attr("src", ele.images.small)
    $node.find('.detail h2').text(ele.title)
    $node.find('.extra .score').text(ele.rating.average)
    $node.find('.extra .collect').text(ele.collect_count)
    $node.find('.extra .year').text(ele.year)
    $node.find('.extra .genres').text(ele.genres.join(' / '))

    $node.find('.extra .director').text(function() {
      var director = []
      ele.directors.forEach((j)=>{
        director.push(j.name)
      })
      return director.join('、')
    })
    $node.find('.extra .casting').text(function() {
      var casting = []
      ele.casts.forEach((m)=>{
        casting.push(m.name)
      })
      return casting.join('、')
    })
    $('section').eq(0).append($node)
    })
  }

})