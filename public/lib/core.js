(function () {
     'use strict';

     var ImageEditor = function (containerSelector, buttons, shapes) {
          this.containerSelector = containerSelector;
          this.containerEl = $(containerSelector);

          this.buttons = buttons;
          this.shapes = shapes;

          this.containerEl.addClass('default-container');
          this.canvas = null;
          this.activeTool = null;
          this.activeSelection = null;

          this.getCanvasJSON = () => {
               this.canvas.backgroundColor = 'white';
               return this.canvas.toJSON();
          }

          this.setCanvasJSON = (current) => {
               this.canvas.backgroundColor = 'white';
               current && this.canvas.loadFromJSON(JSON.parse(current), this.canvas.renderAll.bind(this.canvas))
          }

          this.setActiveTool = (id) => {
               this.activeTool = id;

               //убирает панель настройки этого инструмента, если этот инструмент не активен
               $(`${containerSelector} .toolpanel`).removeClass('visible');

               //если инструмент стрелка, то убрать панель этого инструмента
               if (id !== 'select' || (id == 'select' && this.activeSelection)) {
                    $(`${containerSelector} .toolpanel#${id}-panel`).addClass('visible');
                    if (id === 'select') {
                         console.log('selection')
                         $(`${containerSelector} .toolpanel#${id}-panel`).attr('class', `toolpanel visible type-${this.activeSelection.type}`)
                    }
               }

               if (id !== 'select') {
                    this.canvas.discardActiveObject();
                    this.canvas.renderAll();
                    this.activeSelection = null;
               }

               this.canvas.isDrawingLineMode = false;
               this.canvas.isDrawingPathMode = false;
               this.canvas.isDrawingMode = false;
               this.canvas.isDrawingTextMode = false;

               this.canvas.defaultCursor = 'default';
               this.canvas.selection = true;
               this.canvas.forEachObject(o => {
                    o.selectable = true;
                    o.evented = true;
               })

               switch (id) {
                    case 'draw':
                         this.canvas.isDrawingMode = true;
                         break;
                    case 'line':
                         this.canvas.isDrawingLineMode = true
                         this.canvas.defaultCursor = 'crosshair'
                         this.canvas.selection = false

                         //чтобы при пересечении с другим объектом они не выбирались и мы продолжали работать с этим инструментов
                         this.canvas.forEachObject(o => {
                              o.selectable = false
                              o.evented = false
                         });
                         break;
                    case 'textbox':
                         this.canvas.isDrawingTextMode = true
                         this.canvas.defaultCursor = 'crosshair'
                         this.canvas.selection = false
                         this.canvas.forEachObject(o => {
                              o.selectable = false
                              o.evented = false
                         });
                         break;
                    case 'upload':
                         this.openDragDropPanel();
                         break;
                    default:
                         break;
               }
          }

          this.undo = () => {
               console.log('undo')
               try {
                    let undoList = this.history.getValues().undo;
                    if (undoList.length) {
                         let current = undoList[undoList.length - 1];
                         this.history.undo();
                         current && this.canvas.loadFromJSON(JSON.parse(current), this.canvas.renderAll.bind(this.canvas))
                    }
               } catch (_) {
                    console.error("undo failed")
               }
          }

          this.redo = () => {
               console.log('redo')
               try {
                    let redoList = this.history.getValues().redo;
                    if (redoList.length) {
                         let current = redoList[redoList.length - 1];
                         this.history.redo();
                         current && this.canvas.loadFromJSON(JSON.parse(current), this.canvas.renderAll.bind(this.canvas))
                    }
               } catch (_) {
                    console.error("redo failed")
               }
          }

          this.setActiveSelection = (activeSelection) => {
               this.activeSelection = activeSelection;
               this.setActiveTool('select');
          }

          this.configUndoRedoStack = () => {
               this.history = window.UndoRedoStack();
               const ctrZY = (e) => {
                    const key = e.which || e.keyCode;

                    if (e.ctrlKey && document.querySelectorAll('textarea:focus, input:focus').length === 0) {
                         if (key === 90) this.undo()
                         if (key === 89) this.redo()
                    }
               }
               document.addEventListener('keydown', ctrZY)
          }

          this.init = () => {
               this.configUndoRedoStack();


               this.initializeMainPanel();
               this.initializeToolbar();
               this.initializeShapes();

               //в поле канва-обертка добавляется панель
               this.initializeFreeDrawSettings();
               this.initializeCanvasSettingPanel();
               this.initializeSelectionSettings();

               this.canvas = this.initializeCanvas();

               this.initializeLineDrawing(this.canvas);
               this.initializeTextBoxDrawing(this.canvas);
               this.initializeUpload(this.canvas);
               this.initializeCopyPaste(this.canvas);
          }

          this.initializeMainPanel = () => {
               $(`${containerSelector}`).append('<div class="main-panel"></div>');
          }

          this.init();
     }

     window.ImageEditor = ImageEditor;
})();


