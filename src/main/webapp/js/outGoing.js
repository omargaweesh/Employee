$().ready(function(){
	$("#tabs").tabs();
	$('<div id="loading"><p style="background: url(/images/loading.gif) no-repeat;'
	+'padding-left:35px; line-height:32px;">Loading... Please Wait</p></div>').dialog({
	modal:true, autoOpen:false}).ajaxStart(function() {
		$(this).dialog("open");
	})
	.ajaxStop(function() {
		$(this).dialog("close");
	});
});
function onChangeSourceType(){
	var sourceType=$("#RequestType").val();
	if(sourceType == 1)
		ShowForm();
	else
		hideForm();	
	$.ajax({
		type : 'post',
		url : '/tezerp/Outgoing/fillSource',
		data : {
			sourceType :sourceType ,
			sourceId :"source"
		},
    	success:function(o) {
		        if (o !== undefined) {
		            try {
		                eval(o);
		            } catch (e) {
		                alert('Problem :'+e+'\n text:'+o);
		            }			
		        }
		    },
	    failure: function(o) {
	        alert('Failure :'+o);		
	    }
		
	});
}
function calculateProfit(){
	var sellingPrice=$("#sellingPrice").val();
	var netPrice=$("#netPrice").val();
    $("#Profit").val(sellingPrice-netPrice);
}
function calculateProfitAndRatio()
{
	var sellingPrice=$("#selPrice1").val();
	var netPrice=$("#netPrice1").val();
    $("#Profit1").val(sellingPrice-netPrice);
	$("#Prof1").val((sellingPrice-netPrice)/sellingPrice+"%");
}

function show(){
if($("#Status").val() === "Confirmed" )
	$(".table1").css("display","block");
else
	$(".table1").css("display","none");
	
}
function ShowForm(){
	var elements=$(".forIndividual").css("display","block");
}
function hideForm(){
	var elements=$(".forIndividual").css("display","none");
}
function showTable(){
	$("#distbl").css("display","inline-table");
}
function displayData(){
	var dateFrom=$("#loadTxtDateFrom").val();
	var dateTo=$("#loadTxtDateTo").val();
		$.ajax({
		type : 'post',
		url : '/tezerp/Outgoing/table',
		dataType : "json", 
		data : {
			dateFrom :dateFrom ,
			dateTo :dateTo
		},
		
    	success:function(d) {
		  		var rows = '';
				var type='';
		     	$(d.requests).each(function(i,g){	
				
					if(g.sourceType == 1 )
						type='Individual';
					else 
						type='Corporate';
							
					rows += '<tr requestId="' +g.requestId + '" ;  >'
							 +  '<td>' + type + '</td>'
							 +  '<td>' + g.destination + '</td>'
							 +  '<td>' + g.status+ '</td>'
							 +  '<td>' + g.numberOfPax+ '</td>'
							 +  '<td>' + g.sourceName + '</td>'
							 +  '<td>' + g.flightTicket + '</td>'
							 +  '<td>' + g.hotelBooking + '</td>'
							 +  '<td>' + g.visa + '</td>'
							 +  '<td>' +g.transfer + '</td>'
							 +  '<td>'+ g.meetAndAssist +'</td>'
							
							 +  '</tr>';	
				});	
				$('#requestTable tbody').html(rows);
				$('#requestTable tbody tr').click(function(){
				$('#requestTable tbody tr').removeClass('selected');
				$(this).addClass('selected');
				$('#editButton').attr('disabled',false);
			});
			$('#requestTable tbody tr').dblclick(editRequest);
		  
		    },
	    failure: function(o) {
	        alert('Failure :'+o);		
	    }
		
	});
}

function editRequest(){
	var request = $('#requestTable tbody tr.selected')[0];
	var requestId= $(request).attr('requestId');
	
	if(request == null)
		return;
		
	$.ajax({
		type : 'post',
		url : '/tezerp/Outgoing/getRequestById',
		data : {		
			requestId :requestId
		},
		dataType:"json",
		success: function(d){
			var req = $(d.requests)[0];
				console.log(req);
			if(req != undefined || req != null)
			{
				$(".forIndividual").css("display","block");
				if(req.status ==="Confirmed")
				$(".table1").css("display","block");
				else
				$(".table1").css("display","none");
 				$("#source option[value]").remove();
				$(d.Sources).each(function(i,s){
					  $('#source')
            				 .append($("<option></option>")
                        .attr("value",s.source)
                        .text(s.source)); 
					
				});
				$('#RequestType option[value="' + req.sourceType + '"]').attr('selected',true);
				if(req.dateFrom.length == 0)
				{
					$('#txtDateFrom').val('');
				}else{
					$('#txtDateFrom').datepicker("setDate", getDate(req.dateFrom) );
				}
				if(req.dateTo.length == 0)
				{
					$('#txtDateTo').val('');
				}else{
					$('#txtDateTo').datepicker("setDate", getDate(req.dateTo) );
				}
				$('#destination').val(req.destination);
				$('#NoPax').val(req.numberOfPax);
				$('#Status option[value="' + req.status + '"]').attr('selected',true);
				$('#source').val(req.sourceName);
				$('#clientName').val(req.clientName);
				$('#mobileNo').val(req.mobileNumber);
				$('#email').val(req.email);
				$('#flTicket').attr('checked',(req.flightTicket == 1 ? true : false));
				$('#hotelBooking').attr('checked',(req.hotelBooking == 1 ? true : false));
				$('#visa').attr('checked',(req.visa == 1 ? true : false));
				$('#trans').attr('checked',(req.transfer == 1 ? true : false));
				$('#meet').attr('checked',(req.meetAndAssist == 1 ? true : false));
				$('#ticket').val(req.ticketNumber);
				if(req.issueDate.length == 0)
				{
					$('#issueDate').val('');
				}else
				{
					$('#issueDate').datepicker("setDate", getDate(req.issueDate) );
				}
				
				$('#z').val(req.z);
				$('#sellingPrice').val(req.sellingPrice);
				$('#Profit').val(req.profit);
				$('#netPrice').val(req.netPrice);
				$('#Issue option[value="' + req.issueBy + '"]').attr('selected',true);
				$('#TStatus option[value="' + req.ticketStatus + '"]').attr('selected',true);
				$('#fileType option[value="' + req.fileType + '"]').attr('selected',true);
				if(req.issueDateFrom.length == 0)
				{
					$('#txtDateFrom1').val('');
				}else{
					$('#txtDateFrom1').datepicker("setDate", getDate(req.issueDateFrom) );
				}
			
				if(req.issueDateto.length == 0)
				{
					$('#txtDateTo1').val('');
				}else{
					$('#txtDateTo1').datepicker("setDate", getDate(req.issueDateto) );
				}
				
				//$('#txtDateTo1').val( getDate(req.issueDateto) );
				$('#zz').val(req.zIssue);
				$('#file').val(req.fileNumber);
				$('#selPrice1').val(req.sellingPriceIsuue);
				$('#netPrice1').val(req.netPriceIsuue);
				$('#Profit1').val(req.profitPriceIsuue);
				$('#Prof1').val(req.profitRatioPriceIsuue +"%");
				$('#reqId').val(req.requestId);
				$('#savebtn').attr("disabled","true");
				$('#updatebtn').removeAttr("disabled");
				$('#tabs').tabs('select',1);
		
			}	
			
		},
		error:function(){
			alert('Response Error!!!');
		}
	});
}
function getDate(date){
	let dateForm= date.split("-");
	let year=dateForm[0];
	let month=dateForm[1];
	let day=dateForm[2];
	var date = day+"."+month+"."+year ;
	return date;
}

$(function(){

	 $("#txtDateFrom").datepicker({
	  dateFormat: "dd.mm.yy",
	  
	});
	$("#txtDateTo").datepicker({
	  dateFormat: "dd.mm.yy",
	  
	});
	$("#issueDate").datepicker({
	  dateFormat: "dd.mm.yy",
	  
	});
	$("#txtDateFrom1").datepicker({
	  dateFormat: "dd.mm.yy",
	  
	});
	$("#txtDateTo1").datepicker({
	  dateFormat: "dd.mm.yy",
	  
	});
});