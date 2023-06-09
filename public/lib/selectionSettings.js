(function () {
     'use strict';

     var selectionSettings = function () {
          const _self = this;
          $(`${this.containerSelector} .main-panel`).append(`<div class="toolpanel" id="select-panel"><div class="content"><p class="title">Настройки</p></div></div>`);

          // шрифт
          (() => {
               $(`${this.containerSelector} .toolpanel#select-panel .content`).append(`
        <div class="text-section">
          <h4>Стили шрифта</h4>
          <div class="style">
            <button id="bold"><svg id="Capa_1" x="0px" y="0px" viewBox="-70 -70 450 450" xml:space="preserve"><path d="M218.133,144.853c20.587-14.4,35.2-37.653,35.2-59.52C253.333,37.227,216.107,0,168,0H34.667v298.667h150.187 c44.693,0,79.147-36.267,79.147-80.853C264,185.387,245.547,157.76,218.133,144.853z M98.667,53.333h64c17.707,0,32,14.293,32,32 s-14.293,32-32,32h-64V53.333z M173.333,245.333H98.667v-64h74.667c17.707,0,32,14.293,32,32S191.04,245.333,173.333,245.333z"></path></svg></button>
            <button id="italic"><svg id="Capa_1" x="0px" y="0px" viewBox="-70 -70 450 450" xml:space="preserve"><polygon points="106.667,0 106.667,64 153.92,64 80.747,234.667 21.333,234.667 21.333,298.667 192,298.667 192,234.667 144.747,234.667 217.92,64 277.333,64 277.333,0  "></polygon></svg></button>
            <button id="underline"><svg id="Capa_1" x="0px" y="0px" viewBox="-70 -70 450 450" xml:space="preserve"><path d="M192,298.667c70.72,0,128-57.28,128-128V0h-53.333v170.667c0,41.28-33.387,74.667-74.667,74.667 s-74.667-33.387-74.667-74.667V0H64v170.667C64,241.387,121.28,298.667,192,298.667z"></path><rect x="42.667" y="341.333" width="298.667" height="42.667"></rect></svg></button>
            <button id="linethrough"><svg id="Capa_1" x="0px" y="0px" viewBox="-70 -70 450 450" xml:space="preserve"><polygon points="149.333,160 234.667,160 234.667,96 341.333,96 341.333,32 42.667,32 42.667,96 149.333,96"></polygon><rect x="149.333" y="288" width="85.333" height="64"></rect><rect x="0" y="202.667" width="384" height="42.667"></rect></svg></button>
          </div>
          <div class="family">
            <div class="input-container">
            <label>Семейство шрифтов</label>
            <select id="font-family">
              <option value=""></option>
              <option value="'Open Sans', sans-serif">Open Sans</option>
              <option value="'Oswald', sans-serif">Oswald</option>
              <option value="'Playfair Display', serif">Playfair Display</option>
              <option value="'Cormorant Garamond', serif">Cormorant Garamond</option>
              <option value="Impact, Charcoal, sans-serif">Impact</option>
              <option value="'Lucida Console', Monaco, monospace">Lucida Console</option>
              <option value="'Comic Sans MS', 'Comic Sans', cursive, sans-serif">Comic Sans</option>
              <option value="'Dancing Script', cursive">Dancing Script</option>
              <option value="'Indie Flower', cursive">Indie Flower</option>
              <option value="'Amatic SC', cursive">Amatic SC</option>
              <option value="'Permanent Marker', cursive">Permanent Marker</option>
            </select>
            </div>
          </div>
          <div class="sizes">
            <div class="input-container"><label>Размер шрифта</label>
              <div class="custom-number-input">
              <input type="number" min="1" value="20" id="fontSize">  
              </div>
            </div>
            
          <div class="align">
            <div class="input-container">
            <label>Выравнивание текста</label>
            <select id="text-align">
              <option value="left">Слева</option>
              <option value="center">По центру</option>
              <option value="right">Справа</option>
              <option value="justify">По ширине</option>
            </select>
            </div>
          </div>
          <div class="color">
            <div class="input-container">
            <label>Цвет текста</label>
            <input id="color-picker" value="black">
            </div>
          </div>
          <hr>
        </div>
      `);
               $(`${this.containerSelector} .toolpanel#select-panel .style button`).click(function () {
                    let type = $(this).attr('id');
                    switch (type) {
                         case 'bold':
                              setActiveFontStyle(_self.activeSelection, 'fontWeight', getActiveFontStyle(_self.activeSelection, 'fontWeight') === 'bold' ? '' : 'bold')
                              break;
                         case 'italic':
                              setActiveFontStyle(_self.activeSelection, 'fontStyle', getActiveFontStyle(_self.activeSelection, 'fontStyle') === 'italic' ? '' : 'italic')
                              break;
                         case 'underline':
                              setActiveFontStyle(_self.activeSelection, 'underline', !getActiveFontStyle(_self.activeSelection, 'underline'))
                              break;
                         case 'linethrough':
                              setActiveFontStyle(_self.activeSelection, 'linethrough', !getActiveFontStyle(_self.activeSelection, 'linethrough'))
                              break;
                         default:
                              break;
                    }
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified');
               })

               $(`${this.containerSelector} .toolpanel#select-panel .family #font-family`).change(function () {
                    let family = $(this).val();
                    setActiveFontStyle(_self.activeSelection, 'fontFamily', family)
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified');
               })

               $(`${this.containerSelector} .toolpanel#select-panel .sizes input`).change(function () {
                    let value = parseFloat($(this).val());
                    let type = $(this).attr('id');
                    setActiveFontStyle(_self.activeSelection, type, value);
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified');
               })

               $(`${this.containerSelector} .toolpanel#select-panel .align #text-align`).change(function () {
                    let mode = $(this).val();
                    setActiveFontStyle(_self.activeSelection, 'textAlign', mode);
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified');
               })

               $(`${this.containerSelector} .toolpanel#select-panel .color #color-picker`).spectrum({
                    type: "color",
                    showInput: "true",
                    allowEmpty: "false"
               });

               $(`${this.containerSelector} .toolpanel#select-panel .color #color-picker`).change(function () {
                    let color = $(this).val();
                    setActiveFontStyle(_self.activeSelection, 'fill', color)
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified');
               })
          })();
          // end font section

          // Цвет границ
          (() => {
               $(`${this.containerSelector} .toolpanel#select-panel .content`).append(`
             <div class="border-section">
               <h4>Границы</h4>

               <div class="input-container"><label>Color</label><input id="color-picker" value="black"></div>
               <hr>
             </div>
           `);

               $(`${this.containerSelector} .toolpanel#select-panel .border-section #color-picker`).spectrum({
                    showButtons: false,
                    type: "color",
                    showInput: "true",
                    allowEmpty: "false",
                    move: function (color) {
                         let hex = 'transparent';
                         color && (hex = color.toRgbString()); // #ff0000
                         _self.canvas.getActiveObjects().forEach(obj => obj.set('stroke', hex))
                         _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
                    }
               });

               $(`${this.containerSelector} .toolpanel#select-panel .border-section #input-border-width`).change(function () {
                    let width = parseInt($(this).val());
                    _self.canvas.getActiveObjects().forEach(obj => obj.set({
                         strokeUniform: true,
                         strokeWidth: width
                    }))
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
               })

               $(`${this.containerSelector} .toolpanel#select-panel .border-section #input-border-style`).change(function () {
                    try {
                         let style = JSON.parse($(this).val());
                         _self.canvas.getActiveObjects().forEach(obj => obj.set({
                              strokeUniform: true,
                              strokeDashArray: style.strokeDashArray,
                              strokeLineCap: style.strokeLineCap
                         }))
                         _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
                    } catch (_) { }
               })

               $(`${this.containerSelector} .toolpanel#select-panel .border-section #input-corner-type`).change(function () {
                    let corner = $(this).val();
                    _self.canvas.getActiveObjects().forEach(obj => obj.set('strokeLineJoin', corner))
                    _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
               })
          })();
          //

          // Цвет заполнения
          (() => {
               $(`${this.containerSelector} .toolpanel#select-panel .content`).append(`
        <div class="fill-section">
          <div class="tab-container">
          <div class="tabs">
            <div class="tab-label" data-value="color-fill">Color Fill</div>
          </div>
          <div class="tab-content" data-value="color-fill">
            <input id="color-picker" value='black'/><br>
          </div>

          <div class="tab-content" data-value="gradient-fill">
            <div id="gradient-picker"></div>
            </div>
          </div>
        </div>
        </div>
      `);

               $(`${this.containerSelector} .toolpanel#select-panel .content .tab-label`).click(function () {
                    $(`${_self.containerSelector} .toolpanel#select-panel .content .tab-label`).removeClass('active');
                    $(this).addClass('active');
                    let target = $(this).data('value');
                    $(this).closest('.tab-container').find('.tab-content').hide();
                    $(this).closest('.tab-container').find(`.tab-content[data-value=${target}]`).show();
                    if (target === 'color-fill') {
                         let color = $(`${_self.containerSelector} .toolpanel#select-panel .fill-section #color-picker`).val();
                         try {
                              _self.canvas.getActiveObjects().forEach(obj => obj.set('fill', color))
                              _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
                         } catch (_) {
                              console.log("can't update background color (ok 1)")
                         }
                    } else {
                         updateGradientFill();
                    }
               })

               $(`${_self.containerSelector} .toolpanel#select-panel .content .tab-label[data-value=color-fill]`).click();

               $(`${this.containerSelector} .toolpanel#select-panel .fill-section #color-picker`).spectrum({
                    flat: true,
                    showPalette: false,
                    showButtons: false,
                    type: "color",
                    showInput: "true",
                    allowEmpty: "false",
                    move: function (color) {
                         let hex = 'transparent';
                         color && (hex = color.toRgbString()); // #ff0000
                         _self.canvas.getActiveObjects().forEach(obj => obj.set('fill', hex))
                         _self.canvas.renderAll(), _self.canvas.trigger('object:modified')
                    }
               });


               $(`${this.containerSelector} .toolpanel#select-panel .content .gradient-orientation-container #select-orientation`).change(function () {
                    let type = $(this).val();
                    console.log('orientation', type)
                    if (type === 'radial') {
                         $(this).closest('.gradient-orientation-container').find('#angle-input-container').hide();
                    } else {
                         $(this).closest('.gradient-orientation-container').find('#angle-input-container').show();
                    }
                    updateGradientFill();
               })

               $(`${this.containerSelector} .toolpanel#select-panel .content .gradient-orientation-container #input-angle`).change(function () {
                    updateGradientFill();
               })

          })();
          // 

     }

     window.ImageEditor.prototype.initializeSelectionSettings = selectionSettings;
})()