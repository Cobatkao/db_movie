parcelRequire=function(e,r,n,t){var i="function"==typeof parcelRequire&&parcelRequire,o="function"==typeof require&&require;function u(n,t){if(!r[n]){if(!e[n]){var f="function"==typeof parcelRequire&&parcelRequire;if(!t&&f)return f(n,!0);if(i)return i(n,!0);if(o&&"string"==typeof n)return o(n);var c=new Error("Cannot find module '"+n+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[n][1][r]||r},p.cache={};var l=r[n]=new u.Module(n);e[n][0].call(l.exports,p,l,l.exports,this)}return r[n].exports;function p(e){return u(p.resolve(e))}}u.isParcelRequire=!0,u.Module=function(e){this.id=e,this.bundle=u,this.exports={}},u.modules=e,u.cache=r,u.parent=i,u.register=function(r,n){e[r]=[function(e,r){r.exports=n},{}]};for(var f=0;f<n.length;f++)u(n[f]);if(n.length){var c=u(n[n.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=c:"function"==typeof define&&define.amd?define(function(){return c}):t&&(this[t]=c)}return u}({"mpVp":[function(require,module,exports) {
var n={init:function(){this.$tab=$("footer > .bt-tab"),this.$panel=$("main > section"),this.bind()},bind:function(){var n=this;this.$tab.on("click",function(){var t=$(this).index();$(this).addClass("fired").siblings().removeClass("fired"),n.$panel.eq(t).addClass("fired").siblings().removeClass("fired")})}},t={isToBottom:function(n,t){return n.height()+n.scrollTop()+30>t.height()},insertTpl:function(n){var t=$('\n      <div class="item">\n        <a href="#">\n          <div class="cover">\n            <img src="" alt="">\n          </div>\n          <div class="detail">\n            <h2></h2>\n            <div class="extra">\n              <span class="score"></span>  / <span class="collect"></span>收藏\n            </div>\n            <div class="extra">\n              <span class="year"> / <span class="genres"></span> \n            </div>\n            <div class="extra">\n              <span class="director"></span>\n            </div>\n            <div class="extra">\n              <span class="casting"></span>\n            </div>\n          </div>\n        </a>\n      </div>\n    ');return t.find("a").attr("href",n.alt),t.find(".cover img").attr("src",n.images.small),t.find(".detail h2").text(n.title),t.find(".extra .score").text(n.rating.average),t.find(".extra .collect").text(n.collect_count),t.find(".extra .year").text(n.year),t.find(".extra .genres").text(n.genres.join(" / ")),t.find(".extra .director").text("导演：".concat(n.directors.map(function(n){return n.name}).join("、"))),t.find(".extra .casting").text("演员：".concat(n.casts.map(function(n){return n.name}).join("、"))),t}},i={init:function(){var n=this;this.$element=$("#top-250"),this.$content=this.$element.find(".container"),this.isLoading=!1,this.isFinished=!1,this.page=0,this.count=20,this.bind(),this.getData(function(t){n.render(t),n.page++})},bind:function(){var n=this;n.clock&&clearTimeout(n.clock),n.clock=setTimeout(function(){n.$element.on("scroll",function(){console.log(n.isLoading),!t.isToBottom(n.$element,n.$content)||n.isLoading||n.isFinished||(console.log("reach bottom and ready to send data!"),n.getData(function(t){n.render(t),n.page++,n.count*n.page>=t.total&&(n.isFinished=!0)}))})},300)},getData:function(n){var t=this;t.isLoading=!0,console.log(t.page),console.log(t.count),t.$element.find(".loader").addClass("fired"),$.ajax({url:"https://douban.uieee.com/v2/movie/top250",type:"GET",dataType:"jsonp",data:{start:this.count*this.page,count:this.count}}).done(function(i){console.log(i),t.isLoading=!1,t.$element.find(".loader").removeClass("fired"),n(i)}).fail(function(n){console.log("数据异常:"+n)})},render:function(n){var i=this;n.subjects.forEach(function(n){var e=t.insertTpl(n);i.$content.append(e)})}},e={init:function(){var n=this;this.$element=$("#beimei"),this.$content=this.$element.find(".container"),this.getData(function(t){n.render(t)})},getData:function(n){$.ajax({url:"https://douban.uieee.com/v2/movie/us_box",data:{start:0,count:10},dataType:"jsonp"}).done(function(t){console.log(t),n(t)})},render:function(n){var i=this;n.subjects.forEach(function(n){var e=t.insertTpl(n.subject);i.$content.append(e)})}},a={init:function(){var n=this;this.$container=$("#Search"),this.$content=this.$container.find(".search-result .container"),this.page=0,this.count=10,this.isLoading=!1,this.isFinished=!1,this.isToBottom=function(n,t,i){return n.height()+n.scrollTop()+30>t.height()+i.height()},this.bind(),this.getData(function(t){n.render(t),n.page++})},bind:function(){var n=this;this.$container.find(".search-area .button").on("click",function(){console.log("click!"),n.getData(function(t){n.render(t)})}),this.$container.find(".search-area input").on("keyup",function(t){13===t.keyCode&&n.getData(function(t){n.render(t)})}),n.clock&&clearTimeout(n.clock),n.clock=setTimeout(function(){n.$container.on("scroll",function(){console.log(n.isLoading),!n.isToBottom(n.$container,n.$container.find(".search-result"),n.$container.find(".search-area"))||n.isLoading||n.isFinished||(console.log("reach bottom and ready to send data!"),n.getData(function(t){n.render(t),n.page++,n.count*n.page>=t.total&&(n.isFinished=!0)}))})},300)},getData:function(n){var t=this;t.$container.find(".loader").addClass("fired");var i=this.$container.find(".search-area input").val();this.isLoading=!0,$.ajax({url:"https://douban.uieee.com/v2/movie/search",data:{q:i,start:this.count*this.page,count:this.count},dataType:"jsonp"}).done(function(i){t.isLoading=!1,t.$container.find(".loader").removeClass("fired"),n(i)})},render:function(n){var i=this;n.subjects.forEach(function(n){var e=t.insertTpl(n);i.$content.append(e)})}},o={init:function(){n.init(),i.init(),e.init(),a.init()}};o.init();
},{}]},{},["mpVp"], null)
//# sourceMappingURL=/script.ea13e400.map