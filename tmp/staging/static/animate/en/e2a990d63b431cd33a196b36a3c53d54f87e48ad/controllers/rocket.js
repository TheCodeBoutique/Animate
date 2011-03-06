// ==========================================================================
// Project:   Animate.rocketController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Animate.rocketController = SC.ObjectController.create({

rocketOne:'/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/rocket.png',
rocketTwo:'/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/rocket.png',
rocketThree:'/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/rocket.png',

rocketAnimation:function()
{
	Animate.mainPage.mainPane.rocketOne.animate('opacity',1,{duration:1, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketTwo.animate('opacity',1,{duration:1, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketThree.animate('opacity',1,{duration:1, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketText.animate('opacity',.3,{duration:1, timing:'ease-in-out'});
},
fadOutRockets:function()
{
	Animate.mainPage.mainPane.rocketOne.animate('opacity',0,{duration:.5, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketTwo.animate('opacity',0,{duration:.5, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketThree.animate('opacity',0,{duration:.5, timing:'ease-in-out'});
	Animate.mainPage.mainPane.rocketText.animate('opacity',0,{duration:.5, timing:'ease-in-out'});
}

}) ;
