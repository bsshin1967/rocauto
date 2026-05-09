$(function(){
	/*
	$('.gnb li').mouseenter(function(){
		$('.gnb li > .snb').css('display','block');
	});

	$('header').mouseleave(function(){
		$('.snb').css('display','none');
	});*/

	$('.cur_lang').click(function(){
		$('.lang li').toggle();
	});

	$('.tab_wrap label').click(function(){
		var i=$(this).index();
		i+=1;
		
		$('.tab_wrap label').removeClass('on');
		$(this).addClass('on');

		$('article').css('display', 'none');
		$('.tab_content'+i).css('display','block');
	});
});