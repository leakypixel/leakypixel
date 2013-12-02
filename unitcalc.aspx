<%@ Page MasterPageFile="master.master" %>

<asp:Content ContentPlaceHolderId="head" runat="server">
    <script language="javascript">
    
        function addRow(tableID) {
            var table = document.getElementById(tableID);
 
            var rowCount = table.rows.length;
            var row = table.insertRow(rowCount);
 
            var cell = row.insertCell(0);
			var field = "desc";
			addTextbox(cell, rowCount, field);
			
			cell = row.insertCell(1);
            cellNum = 1;
			var field = "number";
            addTextbox(cell, rowCount, field);
			
			cell = row.insertCell(2);
            cellNum = 2;
			var field = "size";
            addTextbox(cell, rowCount, field);
			
			cell = row.insertCell(3);
            cellNum = 3;
			var field = "percentage";
            addTextbox(cell, rowCount, field);
			
			cell = row.insertCell(4);
            cellNum = 4;
			var field = "units";
            addTextbox(cell, rowCount, field);
			
        }
        
        function addTextbox(cell, rowCount, field) {
            var txt = document.createElement("input");
            txt.type = "text";
            txt.id = field + rowCount;
						
			switch(field)
				{
					case "desc":
					  txt.value = "Lager";
					  break;
					case "number":
					  txt.value = "1";
					  break;
					case "size":
					  txt.value = "440";
					  break;
					case "percentage":
					  txt.value = "4";
					  break;
					case "units":
					  txt.value = "1.76";
					  break;
					default:
					  txt.value = field;
				}
			
			txt.className = field;
            cell.appendChild(txt);
			txt.setAttribute("onchange", "calcUnits(" + rowCount + ")" );
        }
        
        function calcUnits(row) {
			var num = document.getElementById("number" + row).value;
			var volume = document.getElementById("size" + row).value;
			var percentage = document.getElementById("percentage" + row).value;
			var units = document.getElementById("units" + row);
			
			volume = volume / 1000;
			volume = volume * num;
			units.value = volume * percentage;

        }        

    </script>
    <style type="text/css">
	#table {text-align:center}
    .desc {width:200px}
	.number {width:40px}
	.size {width:40px}
	.percentage {width:40px}
	.units {width:40px}
    </style>
</asp:Content>

<asp:Content ContentPlaceHolderId="bodytag" runat="server">
onload="addRow('table')"
</asp:Content>

<asp:Content ContentPlaceHolderId="maincontent" runat="server">
 
 <h1>Alcohol Unit Calculator</h1>
 
 <p class="overspace">
	Just a quick alcoholic units calculator - put in how many of whatever you're drinking
	and it'll work out how many units that is. Really simple, but I'll be hopefully updating
	this to use a data source from another site (I just have to find one!).
</p>
 
    <table id="table" class="overspace">
    <th class="desc">Description</th>
    <th>Number</th>
    <th>Size</th>
    <th>Percentage</th>
    <th>Units</th>
    </table>
 
 <input type="button" value="Add Row" onclick="addRow('table')" />
 
</asp:Content>