
Animate.animation = [
	
SC.Object.create({
name: 'opacity',
preset:'flip',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'/static/animate/en/current/resources/images/hearts10.png?1148790092',
photo:'',
description:'Sample code for opacity change:<br><br>myApp.myView.animate("opacity", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("opacity", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.opacityView',
}),

SC.Object.create({
name: 'left',
preset:'spin',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'',
description:'Sample code for left change:<br><br>myApp.myView.animate("left", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("left", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.leftView',
}),

SC.Object.create({
name: 'right',
preset:'ease-in-out',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'',
photo:'',
description:'Sample code for right change:<br><br>myApp.myView.animate("right", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("right", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.rightView',
}),
SC.Object.create({
name: 'top',
preset:'scale',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'',
photo:'',
description:'Sample code for top change:<br><br>myApp.myView.animate("top", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("top", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.topView',
}),	
SC.Object.create({
name: 'bottom',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'',
photo:'',
description:'Sample code for bottom change:<br><br>myApp.myView.animate("bottom", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("bottom", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.bottomView',
}),
SC.Object.create({
name: 'width',
back:'/static/animate/en/current/resources/images/back.png?1150424459',
front:'',
photo:'',
description:'Sample code for width change:<br><br>myApp.myView.animate("with", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("width", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.widthView',
}),
SC.Object.create({
name: 'height',
photo:'',
description:'Sample code for height change:<br><br>myApp.myView.animate("height", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("height", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.heightView',
}),
SC.Object.create({
name: 'scale',
photo:'',
description:'Sample code for scale change:<br><br>myApp.myView.animate("scale", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("scale", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.scaleView',
}),
SC.Object.create({
name: 'rotateX',
photo:'',
description:'Sample code for rotateX change:<br><br>myApp.myView.animate("rotateX", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateX", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.rotateXView',
}),
SC.Object.create({
name: 'rotateY',
photo:'',
description:'Sample code for rotateY change:<br><br>myApp.myView.animate("rotateY", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateY", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.rotateYView',
}),
SC.Object.create({
name: 'rotateZ',
photo:'',
description:'Sample code for rotateZ change:<br><br>myApp.myView.animate("rotateZ", 0, { duration: 1, timing: "ease-in-out"});</br></br> <br><br>There are 3 paramters that can be passed when using animate(key, value, optionsOrCallback, callback)</br></br><br>Takes a key, value and either a duration, or a hash of options. The options hash has the following parameters - duration: Duration of animation in seconds - callback: Callback method to run when animation completes - timing: Animation timing function</br><br><br>You can use the call back option in cases where you want your animation to reurn.  One example of this is the invokeLater() call back </br</br><br><br>myApp.myView.animate("rotateZ", 0, { duration: 1, timing: "ease-in-out"}, this.invokeLater(someFunction,durationTime));',
setting:'Animate.settingPage.rotateZView',
}),
	
	
];; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('animate');