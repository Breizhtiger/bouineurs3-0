$(document).ready(function(){
	var now = new Date();
	$("#dateList").find("li").each(function(){
		var li = $(this);
		if(new Date(li.attr("data-date")) > now) {
			li.addClass("disabled");
		}
	});
});