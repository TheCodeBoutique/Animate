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
