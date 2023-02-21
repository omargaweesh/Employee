<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="ISO-8859-1">
<title>Insert title here</title>
<link rel="stylesheet" href="/css/general.css" /> 
<!--  <link rel="stylesheet" href="/css/forms.css" />  -->
<link rel="stylesheet" href="/css/text.css" /> 
<link rel="stylesheet" href="/css/class.css" /> 
<link rel="stylesheet" href="/css/jquery-ui-1.8.5.custom.css" type="text/css"/>
<link rel="stylesheet" type="text/css" href="/css/theme.blue.css" />
<style>
body{
font-size: 13px;
font-weight: bold;
color: #003749;
}

.boldtext{
font-size: 12px;
font-family: arial, helvetica, sans-serif;
color: #003749;
}
legend{
font-size: 13px;
font-weight: bold;
color: #003749;
}
input{
padding : 0px;
}
.sep{
min-width:49px; 
}
th {
text-align:left;
}

.list{
width:100%;
border-collapse: collapse;
}

.list thead{
background:#E1F1FC;
}
.list td{
border:1px solid #BBBBBB;
padding:5px;
}
.list thead th{
cursor:hand;
cursor:pointer;
text-decoration:none;
border:1px solid #BBBBBB;
padding:5px;
}
.list tbody tr{
	cursor:pointer;
}

.list tbody tr.selected{
	background-color : #4297D7;
	color : white;
}

th.header2 {
	background-image: url(/images/jq-custom-theme/images/bg.gif);
	background-repeat: no-repeat;
	background-position: center right;
	cursor: pointer;
	vertical-align: top;
	padding-right: 15px;
}

th.sortUp {
	background-image: url(/images/jq-custom-theme/images/asc.gif);
}
th.sortDown {
	background-image: url(/images/jq-custom-theme/images/desc.gif);
}
</style>
</head>
<body>		
<div id="body">
		<fieldset class="layout">
		<legend>Employee Form :</legend>	
	 <table cellspacing=0 cellpadding=0 border=0 width="100%">
	 						 <tr style=" margin-top:5px; float:left;">
                                <td style="width:116px;"><span  class="boldtext">Employee Code :</span></td>
                                <td> 
                                	<input  id="employeeCode" style="min-width:149px; max-width:149px; " name="Destination" value="" />
                                </td>
                                
                                <td class="sep"></td>
                                 <td style="width:116px;"><span  class="boldtext">Employee Name :</span></td>
                                <td >
	                            	<input  id="employeeName" style="min-width:149px;max-width:149px; " name="employeeName" value="" />
                                </td>
                                <td class="sep"></td>
                                <td style="width:116px;"><span  class="boldtext">Birth Date :</span></td>
                                
                                	   <td>
                                        <input style="min-width:149px; max-width:149px;"   id="birthDate" type="text" name="birthDate"
										  value="${param.dateFrom}" />
									   </td>
                            
                                <td class="sep"></td>
                                <td style="width:116px;"><span  class="boldtext">Birth City :</span></td>
            					<td>
	                            	<select id="birthCity" name="birthCity"   style="min-width:149px; max-width: 149px;" onchange="">
	                                    <option value="0" selected="selected">ALL</option>
	                                        <option value="1">Tanta</option>
	                                        <option value="2">Giza</option>
	                                </select>
	                            </td>
                            </tr>
                            
                              <td></td>
                              
                            <tr style=" margin-top:5px; float:left;">
								 <td style="width:116px;"><span  class="boldtext">Employee Id :</span></td>
                                <td> 
                                	<input  id="employeeId" style="max-width:149px; " name="employeeId" value="" />
                                </td>
                                <td class="sep"></td>
                                <td style="width:116px;"><span  class="boldtext">Department :</span></td>
            					<td>
	                            	<select id="department" name="department" size=1 style="width: 149px;" onchange="onChangeSourceType()">
	                                    <option value="0" selected="selected">ALL</option>
	                                        <option value="1">Tanta</option>
	                                        <option value="2">Giza</option>
	                                </select>
	                            </td>
                                <td class="sep"></td>
                                 <td style="width:116px;"><span  class="boldtext">Job Title :</span></td>
                                <td >
	                            	<input  id="jobTitle" style="max-width:149px; " name="jobTitle" value="" />
                                </td>
                                <td class="sep"></td>
            				    <td style="width:116px;"><span  class="boldtext">Direct Manager :</span></td>
                                <td >
	                            	<input  id="directManager" style="max-width:149px; " name="directManager" value="" />
                                </td>

                           </tr>
                     
                         <td></td>
                              
                            <tr style=" margin-top:5px; float:left;">
                                <td style="width:116px;"><span  class="boldtext">Contract Type :</span></td>
            					<td>
	                            	<select id="department" name="department" size=1 style="width: 149px;" onchange="onChangeSourceType()">
	                                    <option value="0" selected="selected">ALL</option>
	                                        <option value="1">Tanta</option>
	                                        <option value="2">Giza</option>
	                                </select>
	                            </td>  
	                            <td class="sep"></td>
           						
           					  <td style="width:116px;"><span  class="boldtext">Status :</span></td>
            					<td>
	                            	<select id="department" name="department" size=1 style="width: 149px;" onchange="onChangeSourceType()">
	                                    <option value="0" selected="selected">ALL</option>
	                                        <option value="1">Tanta</option>
	                                        <option value="2">Giza</option>
	                                </select>
	                            </td>
	
                           </tr>

 			 </table>
	 </fieldset>	
	 <fieldset class="layout">
	 	<table class="list">
	 		<thead>
	 			<th>Employee Code</th>
	 			<th>Employee Name</th>
	 			<th>Birth Date</th>
	 			<th>Birth City</th>
	 			<th>Employee ID</th>
	 			<th>Department</th>
	 			<th>Job Title</th>
	 			<th>Direct Manager</th>
	 			<th>Contract Type</th>
	 			<th>Status</th>
	 		</thead>
	 		<tbody>
	 			<tr>
	 			</tr>
	 		</tbody>
	 	
	 	
	 	</table>
	 
	 </fieldset>	  
</div>

           <script type="text/javascript" src="/js/jquery/jquery-1.6.2.min.js"></script>
           <script type="text/javascript" src="/js/jquery/jquery-ui-1.8.7.custom.min.js"></script>
           <script type="text/javascript" src="/js/jquery/jquery.ui.datepicker.js"></script>  
           <script type="text/javascript" src="/js/jquery/util.js"></script>  
           <script type="text/javascript" src="/js/outGoing.js?ver=1.6"></script>
</body>
</html>