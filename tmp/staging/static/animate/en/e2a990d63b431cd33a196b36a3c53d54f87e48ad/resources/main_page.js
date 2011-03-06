// ==========================================================================
// Project:   Animate - mainPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

// This page describes the main user interface for your application.  
Animate.mainPage = SC.Page.design({
  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page  
  // load.
  mainPane: SC.MainPane.design({
    childViews: ' rocketText topBar labelView bottomBar settings card10 cardJack cardQueen cardKing cardAce rocketOne rocketTwo rocketThree'.w(),

	
		rocketText:SC.LabelView.design({
			classNames:['rocketText'],
			layout:{centerX:0,centerY:0,width:350, height:50},
			controlSize: SC.LARGE_CONTROL_SIZE,
	    fontWeight: SC.BOLD_WEIGHT,
			value:'Move your mouse over any rocket'
		}),
	
		settings:SC.ContainerView.design({
		nowShowingBinding: 'Animate.aniSelectController.nowShowing',
		layout:{right:0,top:36,width:250,height:250},
		valueBinding:'Animate.aniSelectController.name'
	}),
		
	topBar:SC.ToolbarView.design({
	      layout: { top: 0, left: 0, right: 0, height: 36 },
	      childViews: 'labelView selectionLabel'.w(),
		  	anchorLocation: SC.ANCHOR_TOP,
		
	selectionLabel:SC.LabelView.design({
			    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
			    controlSize: SC.LARGE_CONTROL_SIZE,
			    fontWeight: SC.BOLD_WEIGHT,
			    valueBinding:'Animate.aniSelectController.name'
			  	}),
    
		 labelView: SC.LabelView.design({
		    layout: { centerY: 0, height: 24, left: 20, width: 200 },
		    controlSize: SC.LARGE_CONTROL_SIZE,
		    fontWeight: SC.BOLD_WEIGHT,
		    value:   'Animation'
		  	})
		}),
		
    labelView: SC.ImageView.design({
			//classNames:['sprout'],
			layout: { centerX: 0, centerY:0, height:300, width: 300 },
			value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/sprout.png',
    }),
		bottomBar:SC.ToolbarView.design({
	      layout: { bottom: 0, left: 0, right: 0, height: 36 },
	      anchorLocation: SC.ANCHOR_BOTTOM,
				childViews: 'SelectButton presetButton'.w(),
				
 		SelectButton: SC.ButtonView.design({
       layout: { centerY: 0, height: 24, left: 12, width: 100 },
			 isEnabled:YES,
       title:  "Select",
 				target:'Animate.animationController',
 				action:'picker'
     		}),
				presetButton: SC.ButtonView.design({
		       layout: { centerY: 0, height: 24, right: 12, width: 100 },
		       title:  "Preset",
		 			 target:'Animate.cardController',
		 			 action:'preset'
		     		}),
	    }),
			card10:SC.ImageView.design({
				layout: { left:0, centerY:0, height:250, width: 175 },
				classNames:['cards'],
				isVisible:true,
				useImageQueue: NO, 
				valueBinding: 'Animate.cardController.backOfTen'
			   }),
			//cardJack cardQueen cardKing cardAce
				cardJack:SC.ImageView.design({
					layout: { left:0, centerY:0, height:250, width: 175 },
					classNames:['cards'],					
					useImageQueue: NO, 
					valueBinding: 'Animate.cardController.backOfJack'
				   }),
				cardQueen:SC.ImageView.design({
						layout: { left:0, centerY:0, height:250, width: 175 },
						classNames:['cards'],
						useImageQueue: NO, 
						valueBinding: 'Animate.cardController.backOfQueen'
					   }),
				cardKing:SC.ImageView.design({
						layout: { left:0, centerY:0, height:250, width: 175 },
						useImageQueue: NO, 
						classNames:['cards'],
						valueBinding: 'Animate.cardController.backOfKing'
						   }),
				cardAce:SC.ImageView.design({
							layout: { left:0, centerY:0, height:250, width: 175 },
							classNames:['cards'],
						valueBinding: 'Animate.cardController.backOfAce'
				   }),
				rocketOne:SC.ImageView.design({
							layout: { bottom:0, centerX:-175, height:175, width: 125 },
							classNames:['rocket'],
							valueBinding: 'Animate.rocketController.rocketOne',
							mouseEntered: function(evt) {
						        this.animate('bottom',550,{duration:.8,timing:'ease-in-out'});
						        return YES
						    },
								mouseExited: function() {
					        console.log('you leaving hovering');
						        this.animate('bottom',0,{duration:1,timing:'ease-in-out'});
					        return YES
									},
					   }),
						rocketTwo:SC.ImageView.design({
									layout: { bottom:0, centerX:0, height:175, width: 125 },
									classNames:['rocket'],
									valueBinding: 'Animate.rocketController.rocketTwo',
									mouseEntered: function(evt) {
								        this.animate('bottom',550,{duration:.8,timing:'ease-in-out'});
								        return YES
								    },
										mouseExited: function() {
							        console.log('you leaving hovering');
								        this.animate('bottom',0,{duration:1,timing:'ease-in-out'});
							        return YES
											},
							   }),
								rocketThree:SC.ImageView.design({
											layout: { bottom:0, centerX:175, height:175, width: 125 },
											classNames:['rocket'],
											valueBinding: 'Animate.rocketController.rocketThree',
											mouseEntered: function(evt) {
										        this.animate('bottom',550,{duration:.8,timing:'ease-in-out'});
										        return YES
										    },
												mouseExited: function() {
									        console.log('you leaving hovering');
										        this.animate('bottom',0,{duration:1,timing:'ease-in-out'});
									        return YES
													},
									   }),
  })

});
