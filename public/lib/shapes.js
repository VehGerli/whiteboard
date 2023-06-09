/**
 * Define action to add shape to canvas
 */
(function () {
     'use strict';
     const defaultShapes = [
          `<svg viewBox="-10 -10 120 120"><polygon points="0 0, 0 100, 100 100, 100 0" stroke-width="8" stroke="#000" fill="none"></polygon></svg>`,
          `<svg viewBox="-8 -8 120 120"><polygon fill="none" stroke-width="8" stroke="black" points="50 0, 85 50, 50 100, 15 50"></polygon></svg>`,
          `<svg viewBox="-10 -10 120 120"><polygon points="25 0, 0 100, 75 100, 100 0" stroke-width="8" stroke="#000" fill="none"></polygon></svg>`,
          `<svg viewBox="-8 -8 120 120"><polygon points="0,100 30,10 70,10 100,100" stroke-width="8" stroke="#000" fill="none"></polygon></svg>`,
          `<svg viewBox="-10 -10 120 120"><polygon points="50 15, 100 100, 0 100" stroke-width="8" stroke="#000" fill="none"></polygon></svg>`,
          `<svg viewBox="-10 -10 120 120"><polygon points="0 0, 100 100, 0 100" stroke-width="8" stroke="#000" fill="none"></polygon></svg>`,
          `<svg viewBox="-2 -2 100 100"><circle cx="50" cy="50" r="40" stroke="#000" stroke-width="8" fill="none"></circle></svg>`,

     ]

     var shapes = function () {
          const _self = this;

          let ShapeList = defaultShapes;
          if (Array.isArray(this.shapes) && this.shapes.length) ShapeList = this.shapes;
          $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="shapes-panel"><div class="content"><p class="title">Shapes</p></div></div>`);

          ShapeList.forEach(svg => {
               $(`${this.containerSelector} .toolpanel#shapes-panel .content`).append(`<div class="button">${svg}</div>`)
          })

          $(`${this.containerSelector} .toolpanel#shapes-panel .content .button`).click(function () {
               let svg = $(this).html();

               try {
                    fabric.loadSVGFromString(
                         svg,
                         (objects, options) => {
                              var obj = fabric.util.groupSVGElements(objects, options)
                              obj.strokeUniform = true
                              obj.strokeLineJoin = 'miter'
                              obj.scaleToWidth(100)
                              obj.scaleToHeight(100)
                              obj.set({
                                   left: 0,
                                   top: 0
                              })
                              _self.canvas.add(obj).renderAll()
                              _self.canvas.trigger('object:modified')
                         }
                    )
               } catch (_) {
                    console.error("can't add shape");
               }
          })
     }

     window.ImageEditor.prototype.initializeShapes = shapes;
})();