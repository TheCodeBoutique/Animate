SC.mixin(Animate, {

  toggleImage: function() {

    Animate.cardController.toggleProperty('showingLarge') ;

  }

}) ;; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('animate');