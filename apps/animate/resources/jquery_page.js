// ==========================================================================
// Project:   Animate - jqueryPage
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

// This page describes the main user interface for your application.  
Animate.jqueryPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'mainFrame'.w(),
    
    mainFrame:SC.View.design({
		    layout:{top:0,bottom:0,right:0,left:0},
		    childViews:'topBar bottomBar naviFrame naviImage hidden'.w(),
				
		topBar:SC.ToolbarView.design({
				  layout: { top: 0, left: 0, right: 0, height: 45 },  
				  childViews:'jqueryLabel navigate'.w(),
				
		navigate:SC.ButtonView.design({
					      layout: { height: 44, left: 12, width: 100 },
					      title:  "start",
								controlSize: SC.JUMBO_CONTROL_SIZE,
								target: "Animate.jqueryController",
								action: "navigtion",
					      }),
		jqueryLabel: SC.LabelView.design({
								    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
								    controlSize: SC.LARGE_CONTROL_SIZE,
								    fontWeight: SC.BOLD_WEIGHT,
					          escapeHTML: NO,
								    isTextSelectable: YES,
								    value:'jquery'
								  	}),
				}),//end top bar
			hidden:SC.View.design({
				    layout: { top:45, bottom:0, left:0, width:210 },
				    backgroundColor:'silver'
				}),
			naviImage:SC.ImageView.design({
							//classNames:['sprout'],
							layout: { top:45, left:210, bottom:0, width: 2 },
							useImageQueue: NO, 
							value: sc_static('/images/tab_bg.jpg'),
				    }),
			naviFrame:SC.View.design({
				    layout:{top:50,height:300,width:500,left:20},
				    childViews:'title link1 link2 link3 link4 link5'.w(),
						
			title:SC.LabelView.design({
						classNames:['links'],
						layout: { top: 0, height: 24, left: 0, width: 180 },
						fontWeight: SC.BOLD_WEIGHT,
						escapeHTML: NO,
						isTextSelectable: YES,
						value:'Navigation Title'
					 	}),
			link1:SC.LabelView.design({
									classNames:['links'],
									layout: { top: 30, height: 24, left: 0, width: 180 },
									fontWeight: SC.BOLD_WEIGHT,
									escapeHTML: NO,
									isTextSelectable: YES,
									value:'Link 1',
									mouseEntered: function(evt) {
										        this.animate('left',240,{duration:.2,timing:'ease-in-out'});
										        return YES
										    },
												mouseExited: function() {
													this.animate('left',200,{duration:.2,timing:'ease-in-out'});
									        return YES
													},
								 	}),
					link2:SC.LabelView.design({
											classNames:['links'],
											layout: { top: 60, height: 24, left: 0, width: 180 },
											fontWeight: SC.BOLD_WEIGHT,
											escapeHTML: NO,
											isTextSelectable: YES,
											value:'Link 2',
												mouseEntered: function(evt) {
													        this.animate('left',240,{duration:.2,timing:'ease-in-out'});
													        return YES
													    },
															mouseExited: function() {
																this.animate('left',200,{duration:.2,timing:'ease-in-out'});
												        return YES
																},
										 	}),
					link3:SC.LabelView.design({
											classNames:['links'],
											layout: { top: 90, height: 24, left: 0, width: 180 },
											fontWeight: SC.BOLD_WEIGHT,
											escapeHTML: NO,
											isTextSelectable: YES,
											value:'Link 3',
												mouseEntered: function(evt) {
													        this.animate('left',240,{duration:.2,timing:'ease-in-out'});
													        return YES
													    },
															mouseExited: function() {
																this.animate('left',200,{duration:.2,timing:'ease-in-out'});
												        return YES
																},
										 	}),
					link4:SC.LabelView.design({
											classNames:['links'],
											layout: { top: 120, height: 24, left: 0, width: 180 },
											fontWeight: SC.BOLD_WEIGHT,
											escapeHTML: NO,
											isTextSelectable: YES,
											value:'Link 4',
												mouseEntered: function(evt) {
													        this.animate('left',240,{duration:.2,timing:'ease-in-out'});
													        return YES
													    },
															mouseExited: function() {
																this.animate('left',200,{duration:.2,timing:'ease-in-out'});
												        return YES
																},
										 	}),
					link5:SC.LabelView.design({
											classNames:['links'],
											layout: { top: 150, height: 24, left: 0, width: 180 },
											fontWeight: SC.BOLD_WEIGHT,
											escapeHTML: NO,
											isTextSelectable: YES,
											value:'Link 5',
												mouseEntered: function(evt) {
													        this.animate('left',240,{duration:.2,timing:'ease-in-out'});
													        return YES
													    },
															mouseExited: function() {
																this.animate('left',200,{duration:.2,timing:'ease-in-out'});
												        return YES
																},
										 	}),
				}),
		bottomBar:SC.ToolbarView.design({
				  layout: { bottom: 0, left: 0, right: 0, height: 45 },  
				  //childViews:' '.w(),
				})//end bottom bar
		})//end mainFrame
  })

});
