$.fn.stairUp = function(options){
	var settings = $.extend({
		level:1
	},options);
	out=$(this);
	for(i=0;i<settings.level;i++){
		out=out.parent();
	}
	return out;
}
checkEmpty = obj => {
	if((obj.val()).trim()===""){
		return false
	}else{
		return true
	}
}
