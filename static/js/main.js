$(document).ready(function (){
	$('#insertSignature a').on("click", function(e){
		if(!pad.getUserName() || pad.getUserName() == "undefined" || pad.getUserName() == "unnamed"){
			$("#myusernameedit").val(prompt("Please enter your name, then try again.",""));
			e = jQuery.Event("keypress");
			e.which = 13;
			$("#myusernameedit").keypress().trigger(e);
		}else{
			var d = new Date();
			var offset = (d.getTimezoneOffset()/60)*(-1);
			//Modified for the UTC+(Number) so that we get UTC-(Number) instead of UTC+-(Number)
			//Offset now contains a prefix (+/-)
			if(offset > 0){
				offset = "+" + offset;
			}
			/* As it sits, this is the current key for the replacer:
			 * %u% - The Username of the current person
			 * %Y% - The Year of the current timezone
			 * %M% - The Month of the current timezone
			 * %D% - The Day of the current timezone
			 * %h% - The Hour of the current timezone
			 * %m% - The Minutes of the current timezone
			 * %s% - The Seconds of the current timezone
			 * %o% - The current timezone offset of UTC
			 */
			//EDIT THE BELOW LINE FOLLOWING THE ABOVE KEY FOR SIGNATURE FORMATTING.
			var signature = "-- %u% %Y%-%M%-%D% %h%:%m% UTC%o%";
			//Notes - Is regexing the fastest method here? Opera and FF seem to go faster on a mystring.split('.').join(' ');
			//But the performance increase is minor, so no more work unless it becomes more proven.
			//Not sure if there is a better way to do the following.
			signature = signature.replace(/%u%/g, pad.getUserName());
			signature = signature.replace(/%Y%/g, d.getFullYear());
			signature = signature.replace(/%M%/g, ("0" + (d.getMonth()+1)).slice(-2));
			signature = signature.replace(/%D%/g, ("0" + d.getDate()).slice(-2));
			signature = signature.replace(/%h%/g, ("0" + d.getHours()).slice(-2));
			signature = signature.replace(/%m%/g, ("0" + d.getMinutes()).slice(-2));
			signature = signature.replace(/%s%/g, ("0" + d.getSeconds()).slice(-2));
			signature = signature.replace(/%o%/g, offset);

			var padeditor = require('ep_etherpad-lite/static/js/pad_editor').padeditor;

			return padeditor.ace.callWithAce(function (ace) {
				rep = ace.ace_getRep();
				ace.ace_replaceRange(rep.selStart, rep.selEnd, signature);
			}, "addSignature");
		}
	});
});