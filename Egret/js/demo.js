$(()=>{
  //导航菜单
  $(".nav-icon").click(()=>{
    $(".drop").slideToggle(1000);
  })

  //切换背景
  var imgs=[
    'imgs/bg-slider/bg-1.jpg',
    'imgs/bg-slider/bg-2.jpg',
    'imgs/bg-slider/bg-3.jpg'
  ]
  var i=0;
  var str="";
  var timer=setInterval(function(){
    str="url('"+imgs[i]+"')";
    i++;
    $("#bg-slider").fadeOut(10,function(){$(this).css("backgroundImage",str)}).fadeIn(1000);
    //$("#bg-slider").animate({
    //  opacity:0
    //},500).animate({
    //  opacity:1
    //},1500,function(){
    //  $(this).css("backgroundImage",str)
    //});
    //$("#bg-slider").css("background-image",str);
    if(i==3)i=0;
  },3000);

  //移动slider 简化轮播
  $("#ol li").click(function () {
    $(this).addClass("active").siblings().removeClass("active");
    //console.log($(this).val());
    var w = parseInt($("#ul").parent().css("width"));
    var v = $(this).val();
    //console.log(w);
    $("#ul").animate({
      left: -w * v,
    }, 500);
  })

  //animate
  $(window).on("scroll", function () {
    var Top = $("body").scrollTop();
    var top = $("#sec2").offset().top;
    if ((Top - top) > -50) {
      $("#sec2 ul li:first-child").animate({
        opacity: 1,
      }, 100).addClass('animated fadeInDown');
      $("#sec2 ul li:nth-child(2)").animate({
        opacity: 1,
      }, 100).addClass('animated fadeInRight');
      $("#sec2 ul li:nth-child(3)").animate({
        opacity: 1,
      }, 100).addClass('animated fadeInLeft');
      $("#sec2 ul li:last-child").animate({
        opacity: 1,
      }, 100).addClass('animated fadeInUp');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec3").offset().top;
    if((Top-top)>-50){
      $("#sec3 div.cell").animate({
        opacity:1,
      },100).addClass('animated bounceInLeft');
      $("#sec3 img").animate({
        opacity:1,
      },100).addClass('animated bounceInLeft');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec4").offset().top;
    if((Top-top)>-50){
      $("#sec4 div.cell").animate({
        opacity:1,
      },100).addClass('animated bounceInRight');
      $("#sec4 img").animate({
        opacity:1,
      },100).addClass('animated bounceInRight');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec5").offset().top;
    if((Top-top)>-50){
      $("#v").animate({
        opacity:1,
      },100).addClass('animated fadeIn');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec7").offset().top;
    if((Top-top)>-50){
      $("#sec7 div").animate({
        opacity:1,
      },100).addClass('animated rotateIn');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec8").offset().top;
    if((Top-top)>-50){
      $("#sec8 .list2").animate({
        opacity:1,
      },100).addClass('animated rollIn');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec9").offset().top;
    if((Top-top)>-50){
      $("#sec9 input").animate({
        opacity:1,
      },100).addClass('animated flip');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec10").offset().top;
    if((Top-top)>-50){
      $("#sec10 ul").animate({
        opacity:1,
      },100).addClass('animated shake');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec11").offset().top;
    if((Top-top)>-50){
      $("#sec11 input").animate({
        opacity:1,
      },100).addClass('animated flipInY');
      $("#sec11 textarea").animate({
        opacity:1,
      },100).addClass('animated flipInY');
    }
  })

  $(window).on("scroll",function(){
    var Top=$("body").scrollTop();
    var top=$("#sec6").offset().top;
    if((Top-top)>-50){
      $("#sec6 li").animate({
        opacity:1
      },500)
      $("img.lazy").lazyload({
        placeholder:"imgs/load.GIF",
        effct:"fadeIn"
      })
    }
  })

  //切换图片
  $("#sec1 li").click(function(){
    $(this).css("z-index",1000).css("transform","rotate(0deg)").css("transform-origin","50% 50%");
    $(this).siblings().removeClass().css("transform","rotate(0deg)").css("transform-origin","50% 50%").css("opacity",0)
  })
  var $lis=$("#sec1 li");
  $("#btn1").click(function(){
    $lis.eq(0).css("transform","rotate(-60deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",10)
    $lis.eq(1).css("transform","rotate(-42.86deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",11)
    $lis.eq(2).css("transform","rotate(-25.71deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",12)
    $lis.eq(3).css("transform","rotate(-8.57deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",13)
    $lis.eq(4).css("transform","rotate(8.57deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",14)
    $lis.eq(5).css("transform","rotate(25.71deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",15)
    $lis.eq(6).css("transform","rotate(42.86deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",16)
    $lis.eq(7).css("transform","rotate(60deg)").css("transform-origin","50% 120%").css("opacity",1).css("z-index",17)
  })
  $("#btn2").click(function(){
    $lis.attr("style","");
  })
})
/*
* transform:rotate(-60deg);transform-origin:50% 120%;z-index:10;transition: all 1s linear; opacity: 1
 transform:rotate(-42.86deg);transform-origin:50% 120%;z-index:11;transition: all 1s linear;opacity: 1
transform:rotate(-25.71deg);transform-origin:50% 120%;z-index:12;transition: all 1s linear;opacity: 1
transform:rotate(-8.57deg);transform-origin:50% 120%;z-index:13;transition: all 1s linear;opacity: 1
transform:rotate(8.57deg);transform-origin:50% 120%;z-index:14;transition: all 1s linear;opacity: 1
transform:rotate(25.71deg);transform-origin:50% 120%;z-index:15;transition: all 1s linear;opacity: 1
transform:rotate(42.86deg);transform-origin:50% 120%;z-index:16;transition: all 1s linear;opacity: 1
 transform:rotate(60deg);transform-origin: 50% 120%;z-index:17;transition: all 1s linear;opacity: 1
*/
