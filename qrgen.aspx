<%@ Page MasterPageFile="master.master" %>

<asp:Content ContentPlaceHolderId="head" runat="server">
<script type="text/javascript"><!--
	function setqr() {
		var strText = document.getElementById("texttoencode").value;
		var intSize = document.getElementById('imagesize').value;
		var strEncoding = document.getElementById('charencoding').value;
		var strErrorCorrection = document.getElementById('errorcorrlvl').value;
		var intMarginSize = document.getElementById('marginsize').value;
		document.getElementById('qrimg').src='http://chart.apis.google.com/chart?cht=qr&chs='+intSize+'&chl='+strText+'&choe='+strEncoding+'&chld='+strErrorCorrection+'|'+intMarginSize;
	}
//--></script>
</asp:Content>

<asp:Content ContentPlaceHolderId="bodytag" runat="server">
onload="setqr();"
</asp:Content>

<asp:Content ContentPlaceHolderId="maincontent" runat="server">

                     <h1>QR Code Generator</h1>

						<img src="" id="qrimg"></img>
						<form action="javascript:setqr();" onload="javascript:setqr();">
							<input type="text" id="texttoencode" value="Text to encode.">
							<input type="number" id="imagesize" value="300">
							<select id="charencoding">
								<option value="UTF-8" selected="selected">UTF-8 (Default)</option>
								<option value="Shift_JIS">Shift_JIS</option>
								<option value="ISO-8859-1">ISO-8859-1</option>
							</select>
							<select id="errorcorrlvl">
								<option value="L">7% Redundancy</option>
								<option selected="selected" value="M">15% Redundancy (Default)</option>
								<option value="Q">25% Redundancy</option>
								<option value="H">30% Redundancy</option>
							</select>
							<input type="number" id="marginsize" value ="4">
							<input type="submit" value="Submit" onclick="setqr();">							
						</form>


</asp:Content>