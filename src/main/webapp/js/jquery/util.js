;(function($) {
	var settings = {
        	'errorClass' : 'ui-state-error',
        	'showError' : true
        };
	
	function getSetting(setting){
		if(settings != null)
			if(!settings[setting])
				return $.fn.forceInput.defaults[setting];
			else
				return settings[setting];
	}
	
	//---------------------------------
	var methods = {
			dateOnChange:function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^0-9.\/\-,])/g, ""));
			},
			
			checkValidDate:function(input) {
				var value = $(input).val();
				if(!value)
					return false;
			    // Regular expression used to check if date is in correct format
			    var pattern = new RegExp('([0-3][0-9])[\/\.,-]?([0|1][0-9])[\/\.,-]?((19|20)?[0-9]{2})');
			    var source_date = null;
			    var day, month, year;
			    var retVal = true;
			    if(value.match(pattern))
			    {
			       day = value.replace(pattern, '$1');
			                // Attention! Javascript consider months in the range 0 - 11
			       month = value.replace(pattern, '$2');
			       year = value.replace(pattern, '$3');
			
			       year = parseInt(parseFloat(year));
			       if(year < 1900)
			    	   year = year > 80 ? year + 1900 : year + 2000;
			    	   
			       source_date = new Date(year,month-1,day);
			       
			       if(year != source_date.getFullYear())
			          retVal = false;
			
			       if((parseInt(parseFloat(month))-1) != source_date.getMonth())
			    	   retVal = false;
			
			       if(parseInt(parseFloat(day)) != source_date.getDate())
			    	   retVal = false;
			    }
			    else
			    	retVal = false;
			
			    if(retVal){
			    	if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
			    	return day + "." + month + "." + year;
			    }
			    else{
			    	if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
			    }
			    
			},
			//---------------------------------	
			intOnChange :function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^0-9\-])/g, ""));
			},
			
			checkValidInt: function(input){
				var value = $(input).val();
				var int = parseInt(parseFloat(value));
				if(int == value){
					if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
					return int;
				}
				else{
					if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
				}
			},
			//---------------------------------	
			percentOnChange :function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^0-9\-\.,])/g, ""));
			},
			
			checkValidPercent: function(input){
				var value = $(input).val();
				var parsedVal = parseFloat(value);
				if(parsedVal == value && parsedVal >= 0 && parsedVal <= 100){
					if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
					return parsedVal;
				}
				else{
					if(getSetting("showError")) if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
				}
			},

			//---------------------------------	
			doubleOnChange: function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^0-9\-\.,])/g, ""));
			},
			
			checkValidDouble:function(input){
				var value = $(input).val();
				var parsedVal = parseFloat(value);
				if(parsedVal == value){
					if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
					return parsedVal;
				}
				else{
					if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
				}
			},
			
			//---------------------------------
			timeOnChange:function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^0-9:])/g, ""));
			},
			
			checkValidTime:function(input){
				var value = $(input).val();
			    // Regular expression used to check if time is in correct format
			    var pattern = new RegExp('^([0-2]?[0-9])[:]?([0-6][0-9])$');
			    var source_date = null;
			    var hour, minute;
			    var retVal = true;
			    if(value.match(pattern))
			    {
			    	hour = value.replace(pattern, '$1');
			    	minute = value.replace(pattern, '$2');
			 
			    	if(parseInt(parseFloat(hour)) >= 24)
			    		retVal = false;
			
			    	if(parseInt(parseFloat(minute)) >= 60)
			    		retVal = false;
			
			    	if(parseInt(parseFloat(hour)) < 10)
			    		hour = '0' + parseInt(parseFloat(hour));
			    	
			    	if(parseInt(parseFloat(minute)) < 10)
			    		minute = '0' + parseInt(parseFloat(minute));    	
			    }
			    else
			    	retVal = false;
			
			    if(retVal){
			    	if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
			    	return hour + ":" + minute;
			    }
			    else{
			    	if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
			    }
			},
			//---------------------------------
			
			emailOnChange:function(input){
				var value = $(input).val();
				$(input).val(value.replace(/([^!#\$%&'\*\+\-\/=\?\^_`{\|}~\.@a-zA-Z0-9])/g, ""));
			},
			
			checkValidEmail:function(input){
				var value = $(input).val();
				var isValid = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i.test(value);
				if(isValid){
					if(getSetting("showError")) $(input).removeClass(getSetting("errorClass"));
					return value;
				}
				else{
					if(getSetting("showError")) $(input).addClass(getSetting("errorClass"));
			    	return false;
				}	
			}
			//---------------------------------			
	};

	$.fn.forceInput = function (options){
	    return this.each(function(options) {
	        if ( options ) { 
	        	$.extend(settings, options);
	        }

			$(this).find(".dateinput:not(:disabled)").live("keyup", function(inp){
				methods.dateOnChange(inp.target);
				methods.checkValidDate(inp.target);
			}).live("blur", function(inp){
				var ret = methods.checkValidDate(inp.target);
				if(ret)	$(inp.target).val(ret);
			}).live('click', function () {
				 var dt = false;
				 if($(this).hasClass("end")){
					 var prevItem = null;
					 var isIn = false;
					 var items = $(".dateinput.begin:visible, .dateinput.end:visible").toArray();
					 for(var i=0; i<items.length; i++){
						 if(items[i].id == this.id){
							 isIn = true;
							 break;
						 };
						 prevItem = items[i];
					 }
	
					 if(isIn && prevItem != null){
						 dt = methods.checkValidDate(prevItem);
					 }
				 }
		         $(this).datepicker('destroy').datepicker({
		        	 dateFormat : 'dd.mm.yy',
		        	 minDate : dt ? dt : null,
		             onSelect : function(selectedDate) {
		        	 	methods.dateOnChange(this, settings);
		        	 	methods.checkValidDate(this, settings);
		         	 }
		          }).focus();
			      var ret = methods.checkValidDate(this);
			      $(this).datepicker("setDate", ret ? ret : new Date());
		    });
		
			$(this).find(".percentinput:not(:disabled)").live("keyup", function(inp){
				methods.percentOnChange(inp.target);
				methods.checkValidPercent(inp.target);
			}).live("blur",function(inp){
				var ret = methods.checkValidPercent(inp.target);
				if(ret)	$(inp.target).val(ret);		
			});
			
			$(this).find(".doubleinput:not(:disabled)").live("keyup", function(inp){
				methods.doubleOnChange(inp.target);
				methods.checkValidDouble(inp.target);
			}).live("blur",function(inp){
				var ret = methods.checkValidDouble(inp.target);
				if(ret)	$(inp.target).val(ret);		
			});	
			
			$(this).find(".intinput:not(:disabled)").live("keyup", function(inp){
				methods.intOnChange(inp.target);
				methods.checkValidInt(inp.target);
			}).live("blur", function(inp){
				var ret = methods.checkValidInt(inp.target);
				if(ret)	$(inp.target).val(ret);		
			});
			
			$(this).find(".emailinput:not(:disabled)").live("keyup", function(inp){
				methods.emailOnChange(inp.target);
				methods.checkValidEmail(inp.target);
			}).live("blur", function(inp){
				var ret = methods.checkValidEmail(inp.target);
				if(ret)	$(inp.target).val(ret);		
			});	
			
			$(this).find(".timeinput:not(:disabled)").live("keyup", function(inp){
				methods.timeOnChange(inp.target);
				methods.checkValidTime(inp.target);
			}).live("blur", function(inp){
				var ret = methods.checkValidTime(inp.target);
				if(ret)	$(inp.target).val(ret);		
			});	
			
			$(".submit").click(function(){
				$(document.forms[0]).append('<input type="hidden" name="save" value="save"/>');
				document.forms[0].submit();
			});
	    });
	};
    
    $.fn.forceInput.defaults = {
        	'errorClass' : 'ui-state-error',
        	'showError' : true
        };	
    
})(jQuery);

jQuery.extend({
    getMessage : function(message){
		$.ajax({
			type:"post",
			data:"message=" + message,
			url:"/inoffice/message",
			success: function(data, textStatus, XMLHttpRequest){
				return data.message;
			},
			error:function(XMLHttpRequest, textStatus, errorThrown){
				alert(errorThrown);
			}
		});
	}	
});

function log(s){
	if(typeof console!="undefined" && typeof console.debug!="undefined"){
		console.log(s);
	} 
}

$(document).ready(function(){
	$(document).forceInput();
});