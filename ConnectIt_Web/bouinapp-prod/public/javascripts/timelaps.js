var day = window.location.href.substring(window.location.href.lastIndexOf('/') + 1);
var fullDomain = location.protocol+'//'+location.hostname+(location.port ? ':'+location.port: '');

$(document).ready(function () {
	$.get(fullDomain+"/api/images/checkExistenceVideoOfTheDay/"+day, function(data) {
		if(data != null && data.video != null){
			if(data.video == "OK"){
				$('#content').show();
			}
			else{
				$('#notAvailable').show();
			}

			$('#loader-global').hide();
		}
		else{
			$('#notAvailable').show();
			$('#loader-global').hide();
		}
	}).fail(function() {
		$('#notAvailable').show();
		$('#loader-global').hide();
	});
});