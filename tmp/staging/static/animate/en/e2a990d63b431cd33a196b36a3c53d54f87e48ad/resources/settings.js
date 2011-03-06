Animate.settingPage = SC.Page.design({
	
	opacityView:SC.View.design({ 
		layout:{left:0,right:0,top:0, bottom:0 },
		layerNeedsUpdate:YES,
		backgroundColor:'silver',
		childViews: ' infoButton checkboxView opacityLabel opacitySetting opacityCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
		
		infoButton:SC.ImageView.design({
			layout: { bottom: 20, right: 10, width:50, height: 50 },
			value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
			mouseDown:function(evt){Animate.animationController.code()},
			touchStart: function(touch) {},
			touchEnd: function(touch){},
		}),
		checkboxView: SC.CheckboxView.design({
		  layout: { bottom: 20, left: 10, width: 100, height: 18 },
		  title: "Call Back",
		  valueBinding: "Animate.aniSelectController.callBack",
		}),
		
		opacitySetting:SC.SliderView.design({
      layout: { top: 30, left: 80, right: 40, height: 20 },
      minimum: 0,
      maximum: 1,
      step: .1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
		opacityCount:SC.LabelView.design({
			layout: { top: 30, right:0, width:30, height: 20 },
			valueBinding:'Animate.animationController.opacitySetting',
		}),
		opacityLabel:SC.LabelView.design({
			layout: { top: 30, left: 15, width:50, height: 20 },
			valueBinding:'Animate.aniSelectController.name',
		}),
		//This is duration setting 
		durationSetting:SC.SliderView.design({
      layout: { top: 90, left: 80, right: 40, height: 20 },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
		durationCount:SC.LabelView.design({
			layout: { top: 90, right:0, width:30, height: 20 },
			valueBinding:'Animate.animationController.duration',
		}),
		durationLabel:SC.LabelView.design({
			layout: { top: 90, left: 15, width:50, height: 20 },
			value:'Duration',
		}),
		cssEffectLabel:SC.LabelView.design({
			layout: { top: 60, left: 15, width: 56, height: 20 },
			value:'CSS Effect',
		}),
		cssEffect:SC.SelectFieldView.design({
			layout: { top: 60, left: 80, right: 40, height: 20 },
			objects: [
			{name:'ease-in-out', value:'ease-in-out'},			
			{name:'ease-out', value:'ease-out'},
			{name:'ease-in', value:'ease-in'},
			{name:'ease', value:'ease'},
			{name:'linear', value:'linear'},
			],
			emptyName:'ease-in-out',
			nameKey:'name',
			valueKey:'value',
			valueBinding: 'Animate.animationController.cssEffect',
		}),
			action:SC.ButtonView.design({
				layout: { bottom: 90, right: 15, width:100, height: 24 },
				title:'Action',
				target:'Animate.animationController',
				action:'fade'
			}),
		
		reset:SC.ButtonView.design({
			layout: { bottom: 90, left: 15, width:100, height: 24 },
			title:'Reset',
			action:'reset',
			reset:function()
			{
				Animate.settingPage.opacityView.updateLayer();
			 Animate.animationController.set('duration',0);
			Animate.animationController.set('opacitySetting',0);
			}
		})
		}),
		//This is the end of the setting
		//left settings
		leftView:SC.View.design({ 
			layout:{left:0,right:0,top:0, bottom:0 },
			backgroundColor:'silver',
			childViews: 'infoButton checkboxView leftLabel leftSetting leftCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
			
				infoButton:SC.ImageView.design({
					layout: { bottom: 20, right: 10, width:50, height: 50 },
					value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
					mouseDown:function(evt){Animate.animationController.code()},
					touchStart: function(touch) {},
					touchEnd: function(touch){},
				}),
				checkboxView: SC.CheckboxView.design({
				  layout: { bottom: 20, left: 10, width: 100, height: 18 },
				  title: "Call Back",
				  valueBinding: "Animate.aniSelectController.callBack",
				}),
			
			leftSetting:SC.SliderView.design({
	      layout: { top: 30, left: 80, right: 40, height: 20 },
	      minimum: 0,
	      maximum: 1000,
	      step: 1,
	      valueBinding: "Animate.animationController.opacitySetting",
	    }),
			leftCount:SC.LabelView.design({
				layout: { top: 30, right:0, width:30, height: 20 },
				valueBinding:'Animate.animationController.opacitySetting',
			}),
			leftLabel:SC.LabelView.design({
				layout: { top: 30, left: 15, width:50, height: 20 },
				valueBinding:'Animate.aniSelectController.name',
			}),
			//This is duration setting 
			durationSetting:SC.SliderView.design({
	      layout: { top: 90, left: 80, right: 40, height: 20 },
	      minimum: 0,
	      maximum: 10,
	      step: .1,
	      valueBinding: "Animate.animationController.duration",
	    }),
			durationCount:SC.LabelView.design({
				layout: { top: 90, right:0, width:30, height: 20 },
				valueBinding:'Animate.animationController.duration',
			}),
			durationLabel:SC.LabelView.design({
				layout: { top: 90, left: 15, width:50, height: 20 },
				value:'Duration',
			}),
			cssEffectLabel:SC.LabelView.design({
				layout: { top: 60, left: 15, width: 56, height: 20 },
				value:'CSS Effect',
			}),
			cssEffect:SC.SelectFieldView.design({
				layout: { top: 60, left: 80, right: 40, height: 20 },
				objects: [
				{name:'ease-in-out', value:'ease-in-out'},			
				{name:'ease-out', value:'ease-out'},
				{name:'ease-in', value:'ease-in'},
				{name:'ease', value:'ease'},
				{name:'linear', value:'linear'},
				],
				nameKey:'name',
				valueKey:'value',
				valueBinding: 'Animate.animationController.cssEffect',
			}),
				action:SC.ButtonView.design({
					layout: { bottom: 90, right: 15, width:100, height: 24 },
					title:'Action',
					target:'Animate.animationController',
					action:'fade'
				}),

			reset:SC.ButtonView.design({
				layout: { bottom: 90, left: 15, width:100, height: 24 },
				title:'Reset',
				action:'reset',
				reset:function()
				{
				 Animate.animationController.set('duration',0);
				Animate.animationController.set('opacitySetting',0);
				}
			})
			}),
			//right settings
				rightView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView rightLabel rightSetting rightCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
				
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
				
				
					rightSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					rightCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					rightLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			// settings
				topView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView topLabel topSetting topCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					topSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					topCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					topLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//bottom settings
				bottomView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView bottomLabel bottomSetting bottomCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
				
				infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
				
				
					bottomSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					bottomCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					bottomLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				widthView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView widthLabel widthSetting widthCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					widthSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					widthCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					widthLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				heightView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView heightLabel heightSetting heightCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					heightSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					heightCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					heightLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				centerXView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'centerXLabel centerXSetting centerXCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					centerXSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					centerXCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					centerXLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				centerYView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'centerYLabel centerYSetting centerYCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					centerYSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 1000,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					centerYCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					centerYLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						this.updateLayer();
						}
					})
			}),
			//right settings
				scaleView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView scaleLabel scaleSetting scaleCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					scaleSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 3,
			      step: .5,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					scaleCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					scaleLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
							
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				rotateView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'rotateLabel rotateSetting rotateCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					rotateSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 360,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					rotateCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					rotateLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						objectsBindingDefault:'ease-in-out',
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
					action:SC.ButtonView.design({
						layout: { bottom: 90, right: 15, width:100, height: 24 },
						title:'Action',
						target:'Animate.animationController',
						action:'fade'
					}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				rotateXView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView rotateXLabel rotateXSetting rotateXCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					rotateXSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 360,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					rotateXCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					rotateXLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				rotateYView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView rotateYLabel rotateYSetting rotateYCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					rotateYSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 360,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					rotateYCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					rotateYLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
			//right settings
				rotateZView:SC.View.design({ 
					layout:{left:0,right:0,top:0, bottom:0 },
					backgroundColor:'silver',
					childViews: 'infoButton checkboxView rotateZLabel rotateZSetting rotateZCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
					
					infoButton:SC.ImageView.design({
						layout: { bottom: 20, right: 10, width:50, height: 50 },
						value: '/static/animate/en/e2a990d63b431cd33a196b36a3c53d54f87e48ad/resources/images/info.png',
						mouseDown:function(evt){Animate.animationController.code()},
						touchStart: function(touch) {},
						touchEnd: function(touch){},
					}),
					checkboxView: SC.CheckboxView.design({
					  layout: { bottom: 20, left: 10, width: 100, height: 18 },
					  title: "Call Back",
					  valueBinding: "Animate.aniSelectController.callBack",
					}),
					
					rotateZSetting:SC.SliderView.design({
			      layout: { top: 30, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 360,
			      step: 1,
			      valueBinding: "Animate.animationController.opacitySetting",
			    }),
					rotateZCount:SC.LabelView.design({
						layout: { top: 30, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.opacitySetting',
					}),
					rotateZLabel:SC.LabelView.design({
						layout: { top: 30, left: 15, width:50, height: 20 },
						valueBinding:'Animate.aniSelectController.name',
					}),
					//This is duration setting 
					durationSetting:SC.SliderView.design({
			      layout: { top: 90, left: 80, right: 40, height: 20 },
			      minimum: 0,
			      maximum: 10,
			      step: .1,
			      valueBinding: "Animate.animationController.duration",
			    }),
					durationCount:SC.LabelView.design({
						layout: { top: 90, right:0, width:30, height: 20 },
						valueBinding:'Animate.animationController.duration',
					}),
					durationLabel:SC.LabelView.design({
						layout: { top: 90, left: 15, width:50, height: 20 },
						value:'Duration',
					}),
					cssEffectLabel:SC.LabelView.design({
						layout: { top: 60, left: 15, width: 56, height: 20 },
						value:'CSS Effect',
					}),
					cssEffect:SC.SelectFieldView.design({
						layout: { top: 60, left: 80, right: 40, height: 20 },
						objects: [
						{name:'ease-in-out', value:'ease-in-out'},			
						{name:'ease-out', value:'ease-out'},
						{name:'ease-in', value:'ease-in'},
						{name:'ease', value:'ease'},
						{name:'linear', value:'linear'},
						],
						nameKey:'name',
						valueKey:'value',
						valueBinding: 'Animate.animationController.cssEffect',
					}),
						action:SC.ButtonView.design({
							layout: { bottom: 90, right: 15, width:100, height: 24 },
							title:'Action',
							target:'Animate.animationController',
							action:'fade'
						}),

					reset:SC.ButtonView.design({
						layout: { bottom: 90, left: 15, width:100, height: 24 },
						title:'Reset',
						action:'reset',
						reset:function()
						{
							Animate.mainPage.mainPane.get('labelView').set('layout',this.ogLayout);
							
						 Animate.animationController.set('duration',0);
						Animate.animationController.set('opacitySetting',0);
						}
					})
			}),
		
});