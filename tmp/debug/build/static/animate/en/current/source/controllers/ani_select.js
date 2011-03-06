// ==========================================================================
// Project:   Animate.aniSelectController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/

Animate.aniSelectController = SC.ObjectController.create({
	contentBinding: "Animate.animationController.selection",
		
	nowShowing:'',
	callBack:false,

	
	contentBindingDefault: SC.Binding.single('Animate.aniSelectController.selection'),

delayShow: function() {
	    // wait a moment before loading to let things finish...
	    this.invokeLater(this.set, 10, "nowShowing", this.get("setting"));
	  }.observes("setting")

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('animate');