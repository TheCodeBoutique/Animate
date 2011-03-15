Animate.navigationPage = SC.Page.design({

  // The main pane is made visible on screen as soon as your app is loaded.
  // Add childViews to this pane for views to display immediately on page 
  // load.
  mainPane: SC.MainPane.design({
    childViews: 'mainFrame title secondFrame secondTitle flashBar flashView'.w(),
    

		title:SC.LabelView.design({
					    layout: { left:40, height: 24, top: 7, width: 300 },
					    controlSize: SC.LARGE_CONTROL_SIZE,
					    fontWeight: SC.BOLD_WEIGHT,
					    value:"Here's to the crazy one's...."
					  	}),
    mainFrame:SC.View.design({
				layout:{top:40,left:40,width:300,height:350},
				childViews:'topFrame middleFrame bottomBar bottomContent'.w(),
				
				topFrame: SC.View.design({
					childViews:'topBar topContent'.w(),
					mouseEntered: function(evt) {
		        Animate.navigationPage.mainPane.mainFrame.topFrame.topContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
			        Animate.navigationPage.mainPane.mainFrame.middleFrame.middleBar.animate('top',145,{duration:.3,timing:'ease-in-out'});
			        Animate.navigationPage.mainPane.mainFrame.bottomBar.animate('top',190,{duration:.3,timing:'ease-in-out'});
			        return YES
			    },
					mouseExited: function() {
		        Animate.navigationPage.mainPane.mainFrame.topFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
		        		Animate.navigationPage.mainPane.mainFrame.middleFrame.middleBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
		        		Animate.navigationPage.mainPane.mainFrame.bottomBar.animate('top',90,{duration:.3,timing:'ease-in-out'});
		        		return YES
						},
				topBar:SC.ToolbarView.design({
				  layout: { top: 0, left: 0, right: 0, height: 45 }, 
				 	childViews:'title'.w(),
					title: SC.LabelView.design({
								    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
								    fontWeight: SC.BOLD_WEIGHT,
								    value:'Developers'
								  	}),
				}),
				topContent:SC.SourceListView.design({
					classNames:['content-list'],
					layout:{top:40,left:0,width:330,height:0},
				  content: ["Charles Jolley", "Geoffrey Donaldson", "Peter Wagenet"]
				}),
			}),
			middleFrame: SC.View.design({
				childViews:'middleBar middleContent'.w(),
				mouseEntered: function(evt) {
				        Animate.navigationPage.mainPane.mainFrame.middleFrame.middleContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
				        Animate.navigationPage.mainPane.mainFrame.bottomBar.animate('top',190,{duration:.3,timing:'ease-in-out'});
					        return YES
					    },
				mouseExited: function() {
					      Animate.navigationPage.mainPane.mainFrame.middleFrame.middleContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
					      Animate.navigationPage.mainPane.mainFrame.bottomBar.animate('top',90,{duration:.3,timing:'ease-in-out'});
				        return YES
								},
				middleBar:SC.ToolbarView.design({
				  layout: { top: 45, left: 0, right: 0, height: 45 },  
					childViews:'title'.w(),
					title: SC.LabelView.design({
								    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
								    fontWeight: SC.BOLD_WEIGHT,
								    value:'Developers'
								  	}),
				}),
				middleContent:SC.SourceListView.design({
					classNames:['content-list'],
					layout:{top:90,left:0,width:330,height:0},
				  content: ["Tom Dale", "Yehuda Katz", "Alex Iskander"]
				}),
			}),
				bottomBar:SC.ToolbarView.design({
				  layout: { top: 90, left: 0, right: 0, height: 45 },
					mouseEntered: function(evt) {
		        			Animate.navigationPage.mainPane.mainFrame.bottomContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
					        //this.animate('top',190,{duration:.3,timing:'ease-in-out'});
					        return YES
						    },
					mouseExited: function() {
						      Animate.navigationPage.mainPane.mainFrame.bottomContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
					        //this.animate('top',90,{duration:.3,timing:'ease-in-out'});
					        return YES
									},
					childViews:'title'.w(),
					title: SC.LabelView.design({
								    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
								    fontWeight: SC.BOLD_WEIGHT,
								    value:'Developers'
								  	}), 
				
				}),
				bottomContent:SC.SourceListView.design({
					classNames:['content-list'],
					layout:{top:136,left:0,width:330,height:0},
				  content: ["Evin Grano", "Jason Gignac", "Erich Ocean"]
				}),
		}),//End if the first list
		secondTitle: SC.LabelView.design({
	    				layout: { left:500, height: 24, top: 7, width: 300 },
					    controlSize: SC.LARGE_CONTROL_SIZE,
					    fontWeight: SC.BOLD_WEIGHT,
		          escapeHTML: NO,
					    value:'Mouse Down Events..'
					  	}),
				
//Start of the next listView..					
		secondFrame: SC.View.design({
								layout:{top:40,left:500,width:300,height:600},
								childViews:'topBar topContent middleContent secondBar bottomBar bottomContent'.w(),
//1'st Bar.....			
			topBar:SC.ToolbarView.design({
			  layout: { top: 0, left: 0, right: 0, height: 45 }, 
			 	childViews:'title'.w(),
//1'st bar Animate...
									mouseDown: function(evt) {
					        var top = Animate.navigationController.get('topSelection');
									var middle = Animate.navigationController.get('middleSelection');
									var bottom = Animate.navigationController.get('bottomSelection');
									
									//if closed then open 
								 if(top === false && middle === false && bottom === false)
									{
										
										//slide down second bar, bottom bar, middle content and bottom content
						        Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',145,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',190,{duration:.5,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',190,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',235,{duration:.5,timing:'ease-in-out'});
										//show top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
										//set the value of selection to open by setting is ture
										top = Animate.navigationController.set('topSelection',true);
									}
									//if open then closed
									else if(top === true && middle === false && bottom === false)
									{
										
										//slide up second bar, bottom bar, middle content and bottom content
						        Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',90,{duration:.5,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',90,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',135,{duration:.5,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',false);
									}
									else if(top === true && middle === true && bottom === true)
									{
										console.log('now');
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',90,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',180,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',225,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',false);  	
									}
									else if(top === false && middle === true && bottom === true)
									{
										console.log('now');
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',135,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',180,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',275,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',317,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',1,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',true);  	
									}
									else if(top === true && middle === true && bottom === false)
									{	
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',90,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',180,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',225,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',false);  	
									}
									else if(top === false && middle === true && bottom === false)
									{	
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',135,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',180,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',275,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',317,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',1,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',true);  	
									}
									else if(top === true && middle === true && bottom === false)
									{	
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',90,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',135,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',180,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',false);  	
									}
									else if(top === false && middle === false && bottom === true)
									{	
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',135,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',180,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',180,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',225,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',1,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',true);  	
									}
									else if(top === true && middle === false && bottom === true)
									{	
									  Animate.navigationPage.mainPane.secondFrame.secondBar.animate('top',45,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('top',90,{duration:.3,timing:'ease-in-out'});
										//bottom Bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',90,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',135,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.topContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('topSelection',false);  	
									}
									
					        
					    		},
									mouseUp: function() {},
				title: SC.LabelView.design({
							    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
							    fontWeight: SC.BOLD_WEIGHT,
							    value:'Developers'
							  	}),
							}),//end of top toolbar...
				topContent:SC.SourceListView.design({
								classNames:['content-list'],
								layout:{top:40,left:0,width:330,height:0},
				  			content: ["Charles Jolley", "Geoffrey Donaldson", "Peter Wagenet"]
				}),
//2nd Bar...
				secondBar:SC.ToolbarView.design({
				 layout: { top: 45, left: 0, right: 0, height: 45 }, 
				 childViews:'title'.w(),
//2'st bar Animate...
									mouseDown: function(evt) {
					        var top = Animate.navigationController.get('topSelection');
									var middle = Animate.navigationController.get('middleSelection');
									var bottom = Animate.navigationController.get('bottomSelection');
									
									console.log('top = ' + top);
									console.log('middle = ' + middle);
									console.log('bottom = ' + bottom);

									if(middle === false && top === false)
									{
										//slide down bottom bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',190,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',235,{duration:.3,timing:'ease-in-out'});
										//show top content..
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
										//set the value of selection to open by setting is ture
										Animate.navigationController.set('middleSelection',true);
									}
									else if(middle === true && top ===false)
									{
										//slide up bottom bar..
						        Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',90,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',135,{duration:.3,timing:'ease-in-out'});
										//hide top content..
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										Animate.navigationController.set('middleSelection',false);
									}else if(top === true && middle === false)
									{
										//show content for middle..
										Animate.navigationPage.mainPane.secondFrame.middleContent.animate('opacity',1,{duration:.3,timing:'ease-in-out'});
										// top is open slide down bottom bar and content
										Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',280,{duration:.3,timing:'ease-in-out'});
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',325,{duration:.3,timing:'ease-in-out'});						        
										Animate.navigationController.set('middleSelection',true);				        
									}	else if(top === true && middle === true)
										{
											//show content for middle..
											Animate.navigationPage.mainPane.secondFrame.middleContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
											// top is open slide down bottom bar and content
											Animate.navigationPage.mainPane.secondFrame.bottomBar.animate('top',190,{duration:.3,timing:'ease-in-out'});
											Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('top',235,{duration:.3,timing:'ease-in-out'});						        
											Animate.navigationController.set('middleSelection',false);				        
										}

					    		},
									mouseUp: function() {},
				 title:SC.LabelView.design({
							    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
							    fontWeight: SC.BOLD_WEIGHT,
							    value:'Developers'
							  	}),
				}),//end of second toolbar
				middleContent:SC.SourceListView.design({
								classNames:['content-list'],
								layout:{top:90,left:0,width:330,height:0},
				  			content: ["Tom Dale", "Yehuda Katz", "Alex Iskander"]
				}),
//3rd Bar...
				bottomBar:SC.ToolbarView.design({
				 layout: { top: 90, left: 0, right: 0, height: 45 }, 
				 childViews:'title'.w(),
//3rd bar Animate...
									mouseDown: function(evt) {
					        var top = Animate.navigationController.get('topSelection');
									var middle = Animate.navigationController.get('middleSelection');
									var bottom = Animate.navigationController.get('bottomSelection');

									if(bottom === false)
									{
										//just show bottom content..
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('opacity',1,{duration:.5,timing:'ease-in-out'});
										//set the value of selection to open by setting is ture
										top = Animate.navigationController.set('bottomSelection',true);
									}
									else if(bottom === true)
									{
										//hide bottom content..
										Animate.navigationPage.mainPane.secondFrame.bottomContent.animate('opacity',0,{duration:.1,timing:'ease-in-out'});
										//set the value of selection to closed by setting is false
										top = Animate.navigationController.set('bottomSelection',false);
									}

					    		},
									mouseUp: function() {},
				 title:SC.LabelView.design({
							    layout: { centerY: 0, height: 24, centerX: 0, width: 200 },
							    fontWeight: SC.BOLD_WEIGHT,
							    value:'Developers'
							  	}),
				}),//end of second toolbar
				bottomContent:SC.SourceListView.design({
								classNames:['content-list'],
								layout:{top:135,left:0,width:330,height:0},
				  			content: ["Tom Dale", "Yehuda Katz", "Alex Iskander"]
				}),
		}),
//recreation of Flash Animate				
			flashBar:SC.ToolbarView.design({
				 			layout: { top:300, left: 0, right: 0, height: 45 }, 
				 			childViews:'title'.w(),
							mouseDown: function(evt) {
												var open = Animate.navigationController.get('flashSelection');
												
												Animate.navigationController.set('labelChange','Click to Close');

												if(open === false)
												{
												Animate.navigationController.set('flashSelection', true);
												Animate.navigationPage.mainPane.flashView.animate('height',250,{duration:.5,timing:'ease-in-out'},this.invokeLater(this.open,1000));
								        return YES
												
												}
												else if(open === true)
												{
												Animate.navigationController.set('flashSelection', false);
												Animate.navigationPage.mainPane.flashView.animate('width',5,{duration:.5,timing:'ease-in-out'},this.invokeLater(this.close,1000));
								        return YES
												}
								    },
							open:function()
							{
										Animate.navigationPage.mainPane.flashView.animate('width',900,{duration:.5,timing:'ease-in-out'});
							},
							close:function()
							{
									Animate.navigationController.set('labelChange','Click Me');
										Animate.navigationPage.mainPane.flashView.animate('height',1,{duration:.5,timing:'ease-in-out'});
							},
										mouseUp: function() {	},
			title:SC.LabelView.design({
						  layout: { left: 40, height: 24, centerY: 0, width: 200 },
						  fontWeight: SC.BOLD_WEIGHT,
						  valueBinding:'Animate.navigationController.labelChange'
						 	}),
				}),//end of Frame
//Flash Animate...
			flashView:SC.View.design({
				    layout:{top:345,left:50,height:1,width:1},
						backgroundColor:'gray',
				    childViews:'flashContent'.w(),
						flashContent: SC.GridView.design({
										layout:{height:200,width:800},
							 			contentBinding: 'Animate.navigationController.arrangedObjects',     
							 			selectionBinding: 'Animate.navigationController.selection', 
										contentValueKey: 'name',    
							 			rowHeight:50,
										columnWidth:100,
										})
				})
		
		
  })

});