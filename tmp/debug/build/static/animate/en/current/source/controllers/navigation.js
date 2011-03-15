// ==========================================================================
// Project:   Animate.navigationController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
*/
Animate.navigationController = SC.ArrayController.create({

	topSelection: false,
	middleSelection: false,
	bottomSelection: false,
	
	flashSelection:false,
	
	labelChange:'Click Me'

}) ;
; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('animate');