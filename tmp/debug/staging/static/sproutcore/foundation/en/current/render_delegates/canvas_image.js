// ==========================================================================
// Project:   SproutCore - JavaScript Application Framework
// Copyright: ©2006-2009 Sprout Systems, Inc. and contributors.
//            Portions ©2010-2011 Strobe Inc. All rights reserved.
// License:   Licensed under MIT license (see license.js)
// ==========================================================================

sc_require('render_delegates/render_delegate');

/**
  @class
  Renders and updates DOM representations of an image.

  Parameters
  --------------------------
  Expects these properties on the data source:

  - image: An Image object which has completed loading

  If any of these are not present in the data source, the render delegate
  will throw an error.

  Optional Parameters:
  ---------------------------
  If present, these properties will be used.

  - width: Used on the canvas element. If not provided, 0 is used and the canvas
            will not be visible.
  - height: Used on the canvas element. If not provided, 0 is used and the canvas
            will not be visible.
  - scale: If provided, the image will maintain aspect ratio as specified by this
          property. One of
            - SC.SCALE_NONE
            - SC.FILL
            - SC.FILL_PROPORTIONALLY
            - SC.BEST_FIT
            - SC.BEST_FIT_DOWN_ONLY
            - percentage {Number}
          If not provided, SC.FILL will be the default (ie. expected image behaviour)
  - align: If provided, the image will align itself within its frame.  One of
            - SC.ALIGN_CENTER
            - SC.ALIGN_TOP_LEFT
            - SC.ALIGN_TOP
            - SC.ALIGN_TOP_RIGHT
            - SC.ALIGN_RIGHT
            - SC.ALIGN_BOTTOM_RIGHT
            - SC.ALIGN_BOTTOM
            - SC.ALIGN_BOTTOM_LEFT
            - SC.ALIGN_LEFT
  - backgroundColor: If provided, the canvas will render a backgroundColor
*/

SC.BaseTheme.canvasImageRenderDelegate = SC.RenderDelegate.create({
  name: 'canvasImage',

  /** @private
    We don't have an element yet, so we do the minimal necessary setup
    here.
  */
  render: function(dataSource, context) {
    var width = dataSource.get('width') || 0,
        height = dataSource.get('height') || 0;

    context.attr('width', width);
    context.attr('height', height);
  },

  update: function(dataSource, jquery) {
    var elem = jquery[0],
        image = dataSource.get('image'),
        frame = dataSource.get('frame'),
        backgroundColor = dataSource.get('backgroundColor'),
        midX = 0, midY = 0,
        context;

    if (elem && elem.getContext) {
      elem.height = frame.height;
      elem.width = frame.width;

      context = elem.getContext('2d');

      context.clearRect(0, 0, frame.width, frame.height);

      if (backgroundColor) {
        context.fillStyle = backgroundColor;
        context.fillRect(0, 0, frame.width, frame.height);
      }

      if (image && image.complete) {
        this.updateImage(context, image, dataSource);
      }
    }
  },

  updateImage: function(context, image, dataSource) {
    var frame = dataSource.get('innerFrame');
    context.drawImage(image, Math.floor(frame.x), Math.floor(frame.y), Math.floor(frame.width), Math.floor(frame.height));
  }

});
