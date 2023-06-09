(function () {
     'use strict';

     var freeDrawSettings = function () {
          let width = 1;
          let color = 'black';

          const _self = this;
          $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="draw-panel"><div class="content"><p class="title">Настройка</p></div></div>`);

          $(`${this.containerSelector} .toolpanel#draw-panel .content`).append(`
      <div>
        <div class="input-container">
          <label>Размер пера</label>
          <div class="custom-number-input">
          <input type="number" min="1" value="1" id="input-brush-width"/>
          </div>
        </div>
        <div class="input-container">
          <label>Цвет пера</label>
          <input id="color-picker" value='black'/>
        </div>
      </div>
    `);

          let updateBrush = () => {
               _self.canvas.freeDrawingBrush.width = width;
               _self.canvas.freeDrawingBrush.color = color;
          }

          $(`${this.containerSelector} .toolpanel#draw-panel .content #input-brush-width`).change(function () {
               width = parseInt($(this).val());
               updateBrush();
          })

          $(`${this.containerSelector} .toolpanel#draw-panel .content #color-picker`).spectrum({
               type: "color",
               showInput: "true",
          });

          $(`${this.containerSelector} .toolpanel#draw-panel .content #color-picker`).change(function () {
               color = $(this).val();
               updateBrush();
          })
     }

     window.ImageEditor.prototype.initializeFreeDrawSettings = freeDrawSettings;
})();