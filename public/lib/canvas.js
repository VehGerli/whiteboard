// документация http://fabricjs.com/fabric-intro-part-1

(function () {
     'use strict';
     var canvas = function () {
          try {

               //добавляем обертку в которую помещаем элемент канва на страницу
               $(`${this.containerSelector} .main-panel`).append(`<div class="canvas-holder" id="canvas-holder"><div class="content"><canvas id="c" style="backgroundColor: 'white'"></canvas></div></div>`);

               //ищем элемент с айди с (см. документацию), создаем новый объект Канвас и устанавливаем размеры
               const fabricCanvas = new fabric.Canvas('c').setDimensions({
                    width: 1680,
                    height: 800,
                    backgroundColor: 'white'
               })

               fabricCanvas.backgroundColor = 'white';
               fabricCanvas.originalW = fabricCanvas.width;
               fabricCanvas.originalH = fabricCanvas.height;

               //вешаем события на выбранный объект
               fabricCanvas.on('selection:created', (e) => this.setActiveSelection(e.target))
               fabricCanvas.on('selection:updated', (e) => this.setActiveSelection(e.target))
               fabricCanvas.on('selection:cleared', (e) => this.setActiveSelection(null))


               //запоминаем как изменялся объект (в том числе для операций отмены/повтора)
               fabricCanvas.on('object:modified', () => {
                    console.log('trigger: modified')
                    let currentState = this.canvas.toJSON();
                    this.history.push(JSON.stringify(currentState));
               })

               //загружаем
               const savedCanvas = saveInBrowser.load('canvasEditor');
               if (savedCanvas) {
                    fabricCanvas.loadFromJSON(savedCanvas, fabricCanvas.renderAll.bind(fabricCanvas));
               }

               //удаления на кнопку delete
               (() => {
                    document.addEventListener('keydown', (e) => {
                         const key = e.which || e.keyCode;
                         if (
                              key === 46 &&
                              document.querySelectorAll('textarea:focus, input:focus').length === 0
                         ) {

                              fabricCanvas.getActiveObjects().forEach(obj => {
                                   fabricCanvas.remove(obj);
                              });

                              fabricCanvas.discardActiveObject().requestRenderAll();
                              fabricCanvas.trigger('object:modified')
                         }
                    })
               })();

               setTimeout(() => {
                    let currentState = fabricCanvas.toJSON();
                    this.history.push(JSON.stringify(currentState));
               }, 1000);


               //сохраняем каждые 0.5 секунд
               setInterval(() => {
                    let currentState = fabricCanvas.toJSON();
                    let value = JSON.stringify(currentState);
                    localStorage.setItem('canvasEditor', value);
                    console.log("save every 0.5 sec!")
               }, 500);

               return fabricCanvas;

          } catch (_) {
               console.error("Ошибка. Фабрик.Канвас не был создан");
               return null;
          }
     }

     window.ImageEditor.prototype.initializeCanvas = canvas;
})();