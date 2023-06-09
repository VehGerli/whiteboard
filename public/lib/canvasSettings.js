(function () {
     'use strict';
     var canvasSettings = function () {
          const _self = this;
          $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="background-panel"><div class="content"><p class="title">Размер холста</p></div></div>`);

          (() => {
               $(`${this.containerSelector} .toolpanel#background-panel .content`).append(`
      <div class="canvas-size-setting">
        <div class="input-container">
          <label>Ширина холста</label>
          <div class="custom-number-input">
          <input type="number" min="100" max="5000" id="input-width" value="1680"/>
          </div>
        </div>
        <div class="input-container">
          <label>Высота холста</label>
          <div class="custom-number-input">
          <input type="number" min="100" max="5000" id="input-height" value="800"/>
          </div>
        </div>
      </div>
    `);

               const setDimension = () => {
                    try {
                         let width = $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).val();

                         if (width < 100) {
                              width = 1680;
                              alert('Должно быть не отрицательным!');
                         }

                         if (height < 100) {
                              height = 1680;
                              alert('Должно быть не отрицательным!');
                         }

                         let height = $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).val();
                         _self.canvas.setWidth(width)
                         _self.canvas.originalW = width
                         _self.canvas.setHeight(height)
                         _self.canvas.originalH = height
                         _self.canvas.renderAll()
                         _self.canvas.trigger('object:modified')
                    } catch (_) { }
               }

               $(`${this.containerSelector} .toolpanel#background-panel .content #input-width`).change(setDimension)
               $(`${this.containerSelector} .toolpanel#background-panel .content #input-height`).change(setDimension)
          })();

     }

     window.ImageEditor.prototype.initializeCanvasSettingPanel = canvasSettings;
})()