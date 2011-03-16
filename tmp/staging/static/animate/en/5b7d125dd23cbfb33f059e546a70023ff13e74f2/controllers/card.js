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
