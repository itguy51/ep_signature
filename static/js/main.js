$(document).ready(function (){
	$('#insertSignature a').on("click", function(e){
		if(!pad.getUserName() || pad.getUserName() == "undefined"){
			$("#myusernameedit").val(prompt("Please enter your name, then try again.",""));
			e = jQuery.Event("keypress");
			e.which = 13;
    		$("#myusernameedit").keypress().trigger(e)​;
		}else{
			var d = new Date();
			var offset = (d.getTimezoneOffset()/60)*(-1);
			if(offset == 0){
				offset = "";
			}
			var signature = "-- " + pad.getUserName() + " " + d.getFullYear() + "-" + ("0" + d.getMonth()).slice(-2) + "-" + ("0" + d.getDay()).slice(-2) + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2) + " UTC" + offset;

			var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;

			return padeditor.ace.callWithAce(function (ace) {
				rep = ace.ace_getRep();
				ace.ace_replaceRange(rep.selStart, rep.selEnd, signature);
			}, "addSignature");
		}
	});
});