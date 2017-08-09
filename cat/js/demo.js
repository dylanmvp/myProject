//#es6 arrow function
$(()=>{
	//#drop toggle menu fn
	$("#dropdown").click(()=>$(".drop_menu").slideToggle(1000))
	//#slider js
	var $s=$("#slider"),
		  $u=$("#uImgs"),
		  $i=$("#uIdx"),
			timer=null,
			Interval=500,
			Wait=3500,
			LIWIDTH=0,
			moved=0;
	//console.log(getComputedStyle($s[0]).width);
	//console.log(parseInt($s.css("width")));
	function play(){
		timer=setInterval(()=>{
			moved++;
			LIWIDTH=parseInt($s.css("width"));
			$u.animate({
				left:-moved*LIWIDTH	
			},Interval,()=>{
					if(moved==3){
						moved=0;
						$u.css("left",0);
					}
					$i.find("li:nth("+moved+")").addClass("active").siblings().removeClass("active");
				})
		},Wait);
	}
	play();
	$s.hover(
		()=>{clearInterval(timer);timer=null;},
		()=>play()
	)
	$i.on("click","li",e=>{
		var $tar=$(e.target);
		moved=$tar.index();
		LIWIDTH=parseInt($s.css("width"));
		//console.log(moved);
		$u.stop(true).animate({
			left:-moved*LIWIDTH,
		},Interval,()=>$tar.addClass("active").siblings().removeClass("active"))
	})
	//#call the js TweenMax 
	$(window).on("scroll",function(){
		//*section two animation
		var Top=$("body").scrollTop();
		//console.log(scrollTop);})
		var top=$("#intro").offset().top;
	  //console.log(top);
		var h=parseInt($("#intro").css("height"));
		//console.log(h);
		if((Top-top)<100){
      var t = new TimelineMax();
			t.to("#intro h1", 1, {bottom:h/4*3,opacity:1},0.5);
    //move together
      t.to("#intro p", 1, {bottom:h/8,opacity:1},0.5);
		}
		//*section three animation
		var top_1=$("#content").offset().top;
	  //console.log(top);
		var w=parseInt($("#content").css("width"));
		//console.log(h);
		if((Top-top_1)<200){
      var t = new TimelineMax();
			t.to("#content h1", 1, {left:w/2,opacity:1},0.5);
    //move together
      t.to("#content .list", 1, {right:w/2,opacity:1},0.5);
		// cat img animation
			$("#list_content li").animate({opacity:1},1000);
		//lazyload 
			$("img.lazy").lazyload({
				placeholder:"imgs/loading.gif",
				effct:"fadeIn",
			})
		}
	})
	//#ajax json
	var lis=$(".list li");
	var ul=$("#list_content");
	//console.log(lis);
	lis.click(function(){
		$(this).addClass("selected").siblings().removeClass("selected");
		var r=$(this).html();
		var str="",str1="",str2="";
		$.getJSON("data/cate.json",function(data){
			//console.log(data[0].title);
		  $.each(data,function(key,val){
					//console.log(key);
					//console.log(val);
					//console.log(val['cate'].length);
				var len=val['cate'].length;
				if(r=="all"){
					if(len!=1){
						str2+=`<li><img src="imgs/${val['thumb']}"><h4>${val['title']}</h4><p>${val['description']}</p><span>${val['cate'][0]}</span><span>${val['cate'][1]}</span></li>`;
					}else{
						str1+=`<li><img src="imgs/${val['thumb']}"><h4>${val['title']}</h4><p>${val['description']}</p><span>${val['cate'][0]}</span></li>`;
					}
					ul.empty().html(str2+str1);
				  ul.find("li").animate({opacity:1},1000);
				}else{
					for(var i=0;i<len;i++){
						if(val['cate'][i]==r){
							str+=`<li><img src="imgs/${val['thumb']}"><h4>${val['title']}</h4><p>${val['description']}</p><span>${r}</span></li>`;
						}
					}
          ul.empty().html(str);
				  ul.find("li").animate({opacity:1},1000);
				}
			})
		})
	})
})