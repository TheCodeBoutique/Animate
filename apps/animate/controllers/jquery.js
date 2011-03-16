// ==========================================================================
// Project:   Animate.jqueryController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Animate.jqueryController = SC.ArrayController.create(
/** @scope Animate.jqueryController.prototype */ {

	navigtion:function()
	{
		this.link1();
		this.link2();
		this.link3();
		this.link4();
		this.link5();
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.title.animate('left',200,{duration:.3, timing:'ease-in-out'});


	},
	link1:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link1.animate('left',240,{duration:.3, timing:'ease-in-out'},this.invokeLater(this.back,350));

	},
	link2:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link2.animate('left',240,{duration:.4, timing:'ease-in-out'},this.invokeLater(this.back2,450));	

	},
	link3:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link3.animate('left',240,{duration:.5, timing:'ease-in-out'},this.invokeLater(this.back3,550));

	},
	link4:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link4.animate('left',240,{duration:.6, timing:'ease-in-out'},this.invokeLater(this.back4,650));	

	},
	link5:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link5.animate('left',240,{duration:.7, timing:'ease-in-out'},this.invokeLater(this.back5,750));	

	},
	back:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link1.animate('left',200,{duration:.1, timing:'ease-in-out'});

	},
	back2:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link2.animate('left',200,{duration:.1, timing:'ease-in-out'});
	},
	back3:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link3.animate('left',200,{duration:.1, timing:'ease-in-out'});
	},
	back4:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link4.animate('left',200,{duration:.1, timing:'ease-in-out'});
	},
	back5:function()
	{
		Animate.jqueryPage.mainPane.mainFrame.naviFrame.link5.animate('left',200,{duration:.1, timing:'ease-in-out'});
	}

}) ;
