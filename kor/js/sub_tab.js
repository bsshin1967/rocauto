$(function(){
	$('.lnb li').each(function(){
		if($(this).text()==$('h3').text()){
			$(this).addClass('on');
		}
	});
});