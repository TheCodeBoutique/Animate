/* >>>>>>>>>> BEGIN module_info.js */

/* >>>>>>>>>> BEGIN source/core.js */
// ==========================================================================
// Project:   Animate
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
Animate = SC.Application.create(
  /** @scope Animate.prototype */ {

  NAMESPACE: 'Animate',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures)
  
  // TODO: Add global constants or singleton objects needed by your app here.

}) ;

/* >>>>>>>>>> BEGIN source/controllers/ani_select.js */
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

/* >>>>>>>>>> BEGIN source/controllers/animation.js */
// ==========================================================================
// Project:   Animate.animationController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.Object

*/
Animate.animationController = SC.ArrayController.create({

  opacitySetting: 0,
  duration: 0,
  cssEffect: 'ease-in-out',

  callBack: false,
  ogLayout: null,

  animateSelect: null,

  fade: function() {

    Animate.mainPage.mainPane.labelView.animate(this.animateSelect, this.opacitySetting, {
      duration: this.duration,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.callBack, this.duration * 1000));
  },
  callBack: function() {
    var tmp = Animate.aniSelectController.get('callBack');

    if (tmp === true && this.animateSelect === 'opacity') {

      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 1, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'left') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'right') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'top') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'bottom') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'width') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 300, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'height') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 300, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'scale') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 1, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'rotateX') {

      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'rotateY') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }
    if (tmp === true && this.animateSelect === 'rotateZ') {
      Animate.animationController.set('ogLayout', 1);
      Animate.mainPage.mainPane.labelView.animate(this.animateSelect, 0, {
        duration: 1.5,
        timing: 'ease-in-out'
      });
    }

  },
  //create are selection pane
  picker: function(view) {

    var l = Animate.mainPage.mainPane.get('labelView').get('layout');
    this.ogLayout = l;
    var l = this.ogLayout.left;

    var pane = SC.PickerPane.create({
      layout: {
        top: 0,
        left: 0,
        width: 300,
        height: 400
      },
      contentView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        //Here is the original list view, which is bound to the tasksController
        contentView: SC.ListView.design({
          contentValueKey: "name",
          contentBinding: "Animate.animationController.arrangedObjects",
          selectionBinding: "Animate.animationController.selection",
          rowHeight: 20,
          actOnSelect: YES,
          action: "test",
          target: "Animate.animationController"
          //rowSpacing: 2,
        })
      }) //end of scroll view
    });
    pane.popup(view, SC.PICKER_MENU);
  },
  code: function(view) {
    var pane = SC.PickerPane.create({
      layout: {
        centerX: 0,
        centerY: 0,
        width: 600,
        height: 350
      },
      contentView: SC.ScrollView.design({
        hasHorizontalScroller: NO,
        layout: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
        },
        //Here is the original list view, which is bound to the tasksController
        contentView: SC.View.design({

          layout: {
            centerX: 0,
            centerY: 0,
            width: 600,
            height: 350
          },
          isVisible: true,
          childViews: 'code'.w(),
          code: SC.LabelView.design({
            classNames: ['code'],
            layout: {
              top: 0,
              top: 0,
              left: 0,
              right: 0
            },
            escapeHTML: NO,
            valueBinding: 'Animate.aniSelectController.description'
          })
        }),
      }) //end of scroll view
    });
    pane.popup(view, SC.PICKER_MENU);
  },

  test: function() {
    Animate.rocketController.fadOutRockets();
    Animate.cardController.fadeCardsOut();

    var tmp = Animate.mainPage.mainPane.topBar.get('selectionLabel');
    var sel = Animate.aniSelectController.get('contentBinding');
    var val = tmp.get('value');
    Animate.animationController.set('animateSelect', val);

    Animate.aniSelectController.invokeLater(this.set, 3, "callBack", false);

    Animate.animationController.set('duration', 0);
    Animate.animationController.set('opacitySetting', 0);

  },
navigation:function()
{
	Animate.getPath('mainPage.mainPane').remove();
	Animate.getPath('navigationPage.mainPane').append();
}
});

/* >>>>>>>>>> BEGIN source/controllers/card.js */
// ==========================================================================
// Project:   Animate.cardController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.Object
*/
Animate.cardController = SC.ObjectController.create({

  pane: null,

  backOfTen: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  backOfJack: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  backOfQueen: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  backOfKing: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  backOfAce: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',

  frontOfTen: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/hearts10.png',
  frontOfJack: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsj.png',
  frontOfQueen: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsq.png',
  frontOfKing: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsk.png',
  frontOfAce: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsa.png',

  preset: function() {

    Animate.aniSelectController.set('nowShowing', null);

    var l = Animate.mainPage.mainPane.get('labelView').get('layout');
    this.ogLayout = l;
    var l = this.ogLayout.left;

    var pane = SC.PanelPane.create({
      layout: {
        centerX: 0,
        centerY: 0,
        width: 500,
        height: 300
      },
      contentView: SC.View.design({
        layout: {
          centerX: 0,
          centerY: 0,
          width: 500,
          height: 300
        },
        childViews: 'card select rocket rocketSelect'.w(),
        card: SC.ImageView.design({
          layout: {
            left: 20,
            height: 150,
            width: 90,
            top: 20,
            bottom: 20
          },
          useImageQueue: NO,
          value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsa.png',
        }),
        select: SC.ButtonView.design({
          layout: {
            left: 20,
            height: 25,
            width: 90,
            bottom: 90
          },
          title: 'select',
          action: 'cards',
          cards: function() {
            Animate.mainPage.mainPane.labelView.animate('opacity', 0, {
              duration: .5,
              timing: 'ease-in-out'
            },
            this.invokeLater(Animate.cardController.remove, 600));
            Animate.mainPage.mainPane.bottomBar.SelectButton.set('isEnabled', NO);
          }

        }),
        rocket: SC.ImageView.design({
          layout: {
            left: 150,
            height: 150,
            width: 90,
            top: 20,
            bottom: 20
          },
          useImageQueue: NO,
          value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/rocket.png',
        }),
        rocketSelect: SC.ButtonView.design({
          layout: {
            left: 150,
            height: 25,
            width: 90,
            bottom: 90
          },
          title: 'select',
          action: 'cards',
          cards: function() {
            Animate.mainPage.mainPane.labelView.animate('opacity', 0, {
              duration: .5,
              timing: 'ease-in-out'
            },
            this.invokeLater(Animate.cardController.removeRocket, 600));
          }

        })
      }),
    });
    pane.append();
    this.set('pane', pane);
  },
  remove: function() {
    Animate.cardController.pane.remove();
    Animate.cardController.fadeCardsIn();
    Animate.rocketController.fadOutRockets();
    Animate.cardController.invokeLater(Animate.cardController.cardAnimation, 1000);
  },
  removeRocket: function() {
    Animate.cardController.pane.remove();
    Animate.cardController.invokeLater(Animate.rocketController.rocketAnimation, 1000);
  },
  cardAnimation: function() {
    Animate.mainPage.mainPane.cardAce.animate('left', 1000, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.goKing, 700));
  },
  goKing: function() {
    Animate.mainPage.mainPane.cardKing.animate('left', 800, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.goQueen, 700));
  },
  goQueen: function() {
    Animate.mainPage.mainPane.cardQueen.animate('left', 600, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.goJack, 700));
  },
  goJack: function() {
    Animate.mainPage.mainPane.cardJack.animate('left', 400, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.goTen, 700));
  },
  goTen: function() {
    Animate.mainPage.mainPane.card10.animate('left', 200, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.flip10, 1700));
  },
  flip10: function() {
    Animate.mainPage.mainPane.card10.animate('rotateY', -180, {
      duration: 1.5,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.showTen, 750));
  },
  showTen: function() {
    Animate.mainPage.mainPane.card10.set('value', this.frontOfTen),
    this.invokeLater(this.flipJack, 300);
  },
  flipJack: function() {
    Animate.mainPage.mainPane.cardJack.animate('rotateY', -180, {
      duration: 1.5,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.showJack, 750));
  },
  showJack: function() {
    Animate.mainPage.mainPane.cardJack.set('value', this.frontOfJack),
    this.invokeLater(this.flipQueen, 300);
  },
  flipQueen: function() {
    Animate.mainPage.mainPane.cardQueen.animate('rotateY', -180, {
      duration: 1.5,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.showQueen, 750));
  },
  showQueen: function() {
    Animate.mainPage.mainPane.cardQueen.set('value', this.frontOfQueen),
    this.invokeLater(this.flipKing, 300);
  },
  flipKing: function() {
    Animate.mainPage.mainPane.cardKing.animate('rotateY', -180, {
      duration: 1.5,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.showKing, 750));
  },
  showKing: function() {
    Animate.mainPage.mainPane.cardKing.set('value', this.frontOfKing),
    this.invokeLater(this.flipAce, 300);
  },
  flipAce: function() {
    Animate.mainPage.mainPane.cardAce.animate('rotateY', -180, {
      duration: 1.5,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.showAce, 750));
  },
  showAce: function() {
    Animate.mainPage.mainPane.cardAce.set('value', this.frontOfAce),
    this.invokeLater(this.royalFlush, 750);
  },
  royalFlush: function() {
    SC.AlertPane.info("Royal Flush!!!", "", "You win, collect your winnings!!", 'continue', ' Cancel ', Animate.cardController);
  },
  //This is custom ok button for the thank you alert
  alertPaneDidDismiss: function(pane, status) {
    switch (status) {
    case SC.BUTTON1_STATUS:
      this.exit();
      break;

    case SC.BUTTON2_STATUS:
      // do nothing
      break;

    case SC.BUTTON3_STATUS:
      // do nothing
      break;
    }
  },
  exit: function() {
    Animate.mainPage.mainPane.cardAce.animate('left', 0, {
      duration: .3,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardKing.animate('left', 0, {
      duration: .5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardQueen.animate('left', 0, {
      duration: .7,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardJack.animate('left', 0, {
      duration: .9,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.card10.animate('left', 0, {
      duration: 1,
      timing: 'ease-in-out'
    },
    this.invokeLater(this.fadeCardsOut, 1600));
  },
  fadeCardsIn: function() {
    Animate.mainPage.mainPane.cardAce.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardKing.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardQueen.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardJack.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.card10.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
  },
  fadeCardsOut: function() {
    Animate.mainPage.mainPane.bottomBar.SelectButton.set('isEnabled', YES);

    Animate.mainPage.mainPane.cardAce.animate('opacity', 0, {
      duration: .2,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardKing.animate('opacity', 0, {
      duration: .2,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardQueen.animate('opacity', 0, {
      duration: .2,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardJack.animate('opacity', 0, {
      duration: .2,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.card10.animate('opacity', 0, {
      duration: .2,
      timing: 'ease-in-out'
    });

    Animate.cardController.set('backOfTen', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png'");
    Animate.cardController.set('backOfJack', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png'");
    Animate.cardController.set('backOfQueen', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png'");
    Animate.cardController.set('backOfKing', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png'");
    Animate.cardController.set('backOfAce', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png'");

    Animate.cardController.set('frontOfTen', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/hearts10.png'");
    Animate.cardController.set('frontOfJack', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsj.png'");
    Animate.cardController.set('frontOfQueen', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsq.png'");
    Animate.cardController.set('frontOfKing', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsk.png'");
    Animate.cardController.set('frontOfAce', "'/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/heartsa.png'");

    Animate.mainPage.mainPane.cardAce.animate('rotateY', 0, {
      duration: 1.5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardKing.animate('rotateY', 0, {
      duration: 1.5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardQueen.animate('rotateY', 0, {
      duration: 1.5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.cardJack.animate('rotateY', 0, {
      duration: 1.5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.card10.animate('rotateY', 0, {
      duration: 1.5,
      timing: 'ease-in-out'
    });

    this.invokeLater(this.showMainImage, 400);
  },
  showMainImage: function() {
    Animate.mainPage.mainPane.labelView.animate('opacity', 1, {
      duration: .5,
      timing: 'ease-in-out'
    });
  }
});

/* >>>>>>>>>> BEGIN source/controllers/navigation.js */
// ==========================================================================
// Project:   Animate.navigationController
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

/** @class

  (Document Your Controller Here)

  @extends SC.ArrayController
	controls navigation animations
*/
Animate.navigationController = SC.ArrayController.create({

	topSelection: false,
	middleSelection: false,
	bottomSelection: false,
	
	flashSelection:false,
	
	labelChange:'Click Me'

}) ;

/* >>>>>>>>>> BEGIN source/controllers/rocket.js */
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

  rocketOne: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/rocket.png',
  rocketTwo: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/rocket.png',
  rocketThree: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/rocket.png',

  rocketAnimation: function() {
    Animate.mainPage.mainPane.rocketOne.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketTwo.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketThree.animate('opacity', 1, {
      duration: 1,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketText.animate('opacity', .3, {
      duration: 1,
      timing: 'ease-in-out'
    });
  },
  fadOutRockets: function() {
    Animate.mainPage.mainPane.rocketOne.animate('opacity', 0, {
      duration: .5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketTwo.animate('opacity', 0, {
      duration: .5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketThree.animate('opacity', 0, {
      duration: .5,
      timing: 'ease-in-out'
    });
    Animate.mainPage.mainPane.rocketText.animate('opacity', 0, {
      duration: .5,
      timing: 'ease-in-out'
    });
  }

});

/* >>>>>>>>>> BEGIN source/resources/animationSelect.js */
Animate.animation = [

SC.Object.create({
  name: 'opacity',
  preset: 'flip',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/hearts10.png',
  photo: '',
  description: 'Sample code for opacity change:<br><br>myApp.myView.animate("opacity", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("opacity", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.opacityView',
}),

SC.Object.create({
  name: 'left',
  preset: 'spin',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '',
  description: 'Sample code for left change:<br><br>myApp.myView.animate("left", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("left", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.leftView',
}),

SC.Object.create({
  name: 'right',
  preset: 'ease-in-out',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '',
  photo: '',
  description: 'Sample code for right change:<br><br>myApp.myView.animate("right", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("right", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.rightView',
}), SC.Object.create({
  name: 'top',
  preset: 'scale',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '',
  photo: '',
  description: 'Sample code for top change:<br><br>myApp.myView.animate("top", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("top", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.topView',
}), SC.Object.create({
  name: 'bottom',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '',
  photo: '',
  description: 'Sample code for bottom change:<br><br>myApp.myView.animate("bottom", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("bottom", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.bottomView',
}), SC.Object.create({
  name: 'width',
  back: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/back.png',
  front: '',
  photo: '',
  description: 'Sample code for width change:<br><br>myApp.myView.animate("with", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("width", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.widthView',
}), SC.Object.create({
  name: 'height',
  photo: '',
  description: 'Sample code for height change:<br><br>myApp.myView.animate("height", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("height", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.heightView',
}), SC.Object.create({
  name: 'scale',
  photo: '',
  description: 'Sample code for scale change:<br><br>myApp.myView.animate("scale", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("scale", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.scaleView',
}), SC.Object.create({
  name: 'rotateX',
  photo: '',
  description: 'Sample code for rotateX change:<br><br>myApp.myView.animate("rotateX", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateX", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.rotateXView',
}), SC.Object.create({
  name: 'rotateY',
  photo: '',
  description: 'Sample code for rotateY change:<br><br>myApp.myView.animate("rotateY", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateY", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.rotateYView',
}), SC.Object.create({
  name: 'rotateZ',
  photo: '',
  description: 'Sample code for rotateZ change:<br><br>myApp.myView.animate("rotateZ", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateZ", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
  setting: 'Animate.settingPage.rotateZView',
}),

];

/* >>>>>>>>>> BEGIN source/resources/navigation_content.js */
Animate.flash = [

		SC.Object.create({
				name: "Sproutcore",
				image: '',
			}),

		SC.Object.create({
				name: "Strobe",
				image: '',
				}),
		SC.Object.create({
			name: "States",
			image: '',
	  }),	
		SC.Object.create({
				name: "Animation",
				image: '',
				}),
		SC.Object.create({
				name: "Docs",
				image: '',
				}),
		SC.Object.create({
			name: "Guides",
			image: '',
	  }),
		SC.Object.create({
				name: "Sproutcore",
				image: '',
				}),

		SC.Object.create({
				name: "Strobe",
				image: '',
				}),

		SC.Object.create({
			name: "States",
			image: '',
	  }),	
		SC.Object.create({
				name: "Animation",
				image: '',
				}),

		SC.Object.create({
				name: "Docs",
				image: '',
				}),

		SC.Object.create({
			name: "Guides",
			image: '',
	  }),
];
/* >>>>>>>>>> BEGIN source/resources/settings.js */
Animate.settingPage = SC.Page.design({

  opacityView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    layerNeedsUpdate: YES,
    backgroundColor: 'silver',
    childViews: ' infoButton checkboxView opacityLabel opacitySetting opacityCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    opacitySetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1,
      step: .1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    opacityCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    opacityLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      emptyName: 'ease-in-out',
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.settingPage.opacityView.updateLayer();
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //This is the end of the setting
  //left settings
  leftView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView leftLabel leftSetting leftCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    leftSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    leftCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    leftLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  rightView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView rightLabel rightSetting rightCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    rightSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    rightCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    rightLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  // settings
  topView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView topLabel topSetting topCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    topSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    topCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    topLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //bottom settings
  bottomView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView bottomLabel bottomSetting bottomCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    bottomSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    bottomCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    bottomLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  widthView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView widthLabel widthSetting widthCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    widthSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    widthCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    widthLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  heightView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView heightLabel heightSetting heightCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    heightSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    heightCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    heightLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  centerXView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'centerXLabel centerXSetting centerXCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    centerXSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    centerXCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    centerXLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  centerYView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'centerYLabel centerYSetting centerYCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
    centerYSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 1000,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    centerYCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    centerYLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
        this.updateLayer();
      }
    })
  }),
  //right settings
  scaleView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView scaleLabel scaleSetting scaleCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    scaleSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 3,
      step: .5,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    scaleCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    scaleLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {

        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  rotateView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'rotateLabel rotateSetting rotateCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),
    rotateSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 360,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    rotateCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    rotateLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      objectsBindingDefault: 'ease-in-out',
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  rotateXView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView rotateXLabel rotateXSetting rotateXCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    rotateXSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 360,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    rotateXCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    rotateXLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  rotateYView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView rotateYLabel rotateYSetting rotateYCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    rotateYSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 360,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    rotateYCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    rotateYLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),
  //right settings
  rotateZView: SC.View.design({
    layout: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0
    },
    backgroundColor: 'silver',
    childViews: 'infoButton checkboxView rotateZLabel rotateZSetting rotateZCount durationLabel durationSetting durationCount cssEffect cssEffectLabel reset action'.w(),

    infoButton: SC.ImageView.design({
      layout: {
        bottom: 20,
        right: 10,
        width: 50,
        height: 50
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/info.png',
      mouseDown: function(evt) {
        Animate.animationController.code()
      },
      touchStart: function(touch) {},
      touchEnd: function(touch) {},
    }),
    checkboxView: SC.CheckboxView.design({
      layout: {
        bottom: 20,
        left: 10,
        width: 100,
        height: 18
      },
      title: "Call Back",
      valueBinding: "Animate.aniSelectController.callBack",
    }),

    rotateZSetting: SC.SliderView.design({
      layout: {
        top: 30,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 360,
      step: 1,
      valueBinding: "Animate.animationController.opacitySetting",
    }),
    rotateZCount: SC.LabelView.design({
      layout: {
        top: 30,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.opacitySetting',
    }),
    rotateZLabel: SC.LabelView.design({
      layout: {
        top: 30,
        left: 15,
        width: 50,
        height: 20
      },
      valueBinding: 'Animate.aniSelectController.name',
    }),
    //This is duration setting 
    durationSetting: SC.SliderView.design({
      layout: {
        top: 90,
        left: 80,
        right: 40,
        height: 20
      },
      minimum: 0,
      maximum: 10,
      step: .1,
      valueBinding: "Animate.animationController.duration",
    }),
    durationCount: SC.LabelView.design({
      layout: {
        top: 90,
        right: 0,
        width: 30,
        height: 20
      },
      valueBinding: 'Animate.animationController.duration',
    }),
    durationLabel: SC.LabelView.design({
      layout: {
        top: 90,
        left: 15,
        width: 50,
        height: 20
      },
      value: 'Duration',
    }),
    cssEffectLabel: SC.LabelView.design({
      layout: {
        top: 60,
        left: 15,
        width: 56,
        height: 20
      },
      value: 'CSS Effect',
    }),
    cssEffect: SC.SelectFieldView.design({
      layout: {
        top: 60,
        left: 80,
        right: 40,
        height: 20
      },
      objects: [{
        name: 'ease-in-out',
        value: 'ease-in-out'
      },
      {
        name: 'ease-out',
        value: 'ease-out'
      },
      {
        name: 'ease-in',
        value: 'ease-in'
      },
      {
        name: 'ease',
        value: 'ease'
      },
      {
        name: 'linear',
        value: 'linear'
      },
      ],
      nameKey: 'name',
      valueKey: 'value',
      valueBinding: 'Animate.animationController.cssEffect',
    }),
    action: SC.ButtonView.design({
      layout: {
        bottom: 90,
        right: 15,
        width: 100,
        height: 24
      },
      title: 'Action',
      target: 'Animate.animationController',
      action: 'fade'
    }),

    reset: SC.ButtonView.design({
      layout: {
        bottom: 90,
        left: 15,
        width: 100,
        height: 24
      },
      title: 'Reset',
      action: 'reset',
      reset: function() {
        Animate.mainPage.mainPane.get('labelView').set('layout', this.ogLayout);

        Animate.animationController.set('duration', 0);
        Animate.animationController.set('opacitySetting', 0);
      }
    })
  }),

});

/* >>>>>>>>>> BEGIN source/resources/main_page.js */
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

    rocketText: SC.LabelView.design({
      classNames: ['rocketText'],
      layout: {
        centerX: 0,
        centerY: 0,
        width: 350,
        height: 50
      },
      controlSize: SC.LARGE_CONTROL_SIZE,
      fontWeight: SC.BOLD_WEIGHT,
      value: 'Move your mouse over any rocket'
    }),

    settings: SC.ContainerView.design({
      nowShowingBinding: 'Animate.aniSelectController.nowShowing',
      layout: {
        right: 0,
        top: 36,
        width: 250,
        height: 250
      },
      valueBinding: 'Animate.aniSelectController.name'
    }),

    topBar: SC.ToolbarView.design({
      layout: {
        top: 0,
        left: 0,
        right: 0,
        height: 36
      },
      childViews: 'labelView selectionLabel'.w(),
      anchorLocation: SC.ANCHOR_TOP,

      selectionLabel: SC.LabelView.design({
        layout: {
          centerY: 0,
          height: 24,
          centerX: 0,
          width: 200
        },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        valueBinding: 'Animate.aniSelectController.name'
      }),

      labelView: SC.LabelView.design({
        layout: {
          centerY: 0,
          height: 24,
          left: 20,
          width: 200
        },
        controlSize: SC.LARGE_CONTROL_SIZE,
        fontWeight: SC.BOLD_WEIGHT,
        value: 'Animation'
      })
    }),

    labelView: SC.ImageView.design({
      //classNames:['sprout'],
      layout: {
        centerX: 0,
        centerY: 0,
        height: 300,
        width: 300
      },
      value: '/static/animate/en/5b7d125dd23cbfb33f059e546a70023ff13e74f2/resources/images/sprout.png',
    }),
    bottomBar: SC.ToolbarView.design({
      layout: {
        bottom: 0,
        left: 0,
        right: 0,
        height: 36
      },
      anchorLocation: SC.ANCHOR_BOTTOM,
      childViews: 'SelectButton presetButton navigationButton'.w(),

			navigationButton: SC.ButtonView.design({
        layout: {
          centerY: 0,
          height: 24,
          left: 120,
          width: 100
        },
        isEnabled: YES,
        title: "Navigation",
        target: 'Animate.animationController',
        action: 'navigation'
      }),


      SelectButton: SC.ButtonView.design({
        layout: {
          centerY: 0,
          height: 24,
          left: 12,
          width: 100
        },
        isEnabled: YES,
        title: "Select",
        target: 'Animate.animationController',
        action: 'picker'
      }),
      presetButton: SC.ButtonView.design({
        layout: {
          centerY: 0,
          height: 24,
          right: 12,
          width: 100
        },
        title: "Preset",
        target: 'Animate.cardController',
        action: 'preset'
      }),
    }),
    card10: SC.ImageView.design({
      layout: {
        left: 0,
        centerY: 0,
        height: 250,
        width: 175
      },
      classNames: ['cards'],
      isVisible: true,
      useImageQueue: NO,
      valueBinding: 'Animate.cardController.backOfTen'
    }),
    //cardJack cardQueen cardKing cardAce
    cardJack: SC.ImageView.design({
      layout: {
        left: 0,
        centerY: 0,
        height: 250,
        width: 175
      },
      classNames: ['cards'],
      useImageQueue: NO,
      valueBinding: 'Animate.cardController.backOfJack'
    }),
    cardQueen: SC.ImageView.design({
      layout: {
        left: 0,
        centerY: 0,
        height: 250,
        width: 175
      },
      classNames: ['cards'],
      useImageQueue: NO,
      valueBinding: 'Animate.cardController.backOfQueen'
    }),
    cardKing: SC.ImageView.design({
      layout: {
        left: 0,
        centerY: 0,
        height: 250,
        width: 175
      },
      useImageQueue: NO,
      classNames: ['cards'],
      valueBinding: 'Animate.cardController.backOfKing'
    }),
    cardAce: SC.ImageView.design({
      layout: {
        left: 0,
        centerY: 0,
        height: 250,
        width: 175
      },
      classNames: ['cards'],
      valueBinding: 'Animate.cardController.backOfAce'
    }),
    rocketOne: SC.ImageView.design({
      layout: {
        bottom: 0,
        centerX: -175,
        height: 175,
        width: 125
      },
      classNames: ['rocket'],
      valueBinding: 'Animate.rocketController.rocketOne',
      mouseEntered: function(evt) {
        this.animate('bottom', 550, {
          duration: .8,
          timing: 'ease-in-out'
        });
        return YES
      },
      mouseExited: function() {
        console.log('you leaving hovering');
        this.animate('bottom', 0, {
          duration: 1,
          timing: 'ease-in-out'
        });
        return YES
      },
    }),
    rocketTwo: SC.ImageView.design({
      layout: {
        bottom: 0,
        centerX: 0,
        height: 175,
        width: 125
      },
      classNames: ['rocket'],
      valueBinding: 'Animate.rocketController.rocketTwo',
      mouseEntered: function(evt) {
        this.animate('bottom', 550, {
          duration: .8,
          timing: 'ease-in-out'
        });
        return YES
      },
      mouseExited: function() {
        console.log('you leaving hovering');
        this.animate('bottom', 0, {
          duration: 1,
          timing: 'ease-in-out'
        });
        return YES
      },
    }),
    rocketThree: SC.ImageView.design({
      layout: {
        bottom: 0,
        centerX: 175,
        height: 175,
        width: 125
      },
      classNames: ['rocket'],
      valueBinding: 'Animate.rocketController.rocketThree',
      mouseEntered: function(evt) {
        this.animate('bottom', 550, {
          duration: .8,
          timing: 'ease-in-out'
        });
        return YES
      },
      mouseExited: function() {
        console.log('you leaving hovering');
        this.animate('bottom', 0, {
          duration: 1,
          timing: 'ease-in-out'
        });
        return YES
      },
    }),
  })

});

/* >>>>>>>>>> BEGIN source/resources/navigation_page.js */
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
/* >>>>>>>>>> BEGIN source/main.js */
// ==========================================================================
// Project:   Animate
// Copyright: ©2011 My Company, Inc.
// ==========================================================================
/*globals Animate */

// This is the function that will start your app running.  The default
// implementation will load any fixtures you have created then instantiate
// your controllers and awake the elements on your page.
//
// As you develop your application you will probably want to override this.
// See comments for some pointers on what to do next.
//
Animate.main = function main() {

  // Step 1: Instantiate Your Views
  // The default code here will make the mainPane for your application visible
  // on screen.  If you app gets any level of complexity, you will probably 
  // create multiple pages and panes.  
  Animate.getPath('mainPage.mainPane').append() ;



	//lets setup are controllers
	Animate.animationController.set("content", Animate.animation);
	
	Animate.navigationController.set("content", Animate.flash);

} ;

function main() { Animate.main(); }

