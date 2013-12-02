<%@ Page MasterPageFile="master.master" %>

<asp:Content ContentPlaceHolderId="head" runat="server">
	
	<link rel='stylesheet'  href='/includes/css/imageblock.css' type='text/css' media='all' />
	
</asp:Content>

<asp:Content ContentPlaceHolderId="maincontent" runat="server">

	<h1>Placeholder Blocks</h1>
	
	<p class="overspace">
		Just a little CSS hack to make placeholder blocks for images - I'd probably not have it as
		the dimensions of the image on hover if I was actually using it in production. The same technique
		can be used for rollovers on images, for example - or maybe as a fallback for externally
		linked images.
	</p>
	
	<img class='imageblock' width='200px' height='200px' title='Placeholder'/>
	
</asp:Content>