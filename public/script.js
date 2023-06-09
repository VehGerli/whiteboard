const buttons = [
     'select',
     'shapes',
     'draw',
     'line',
     'textbox',
     'upload',
     'background',
     'undo',
     'redo',
     'download',
     // 'clear'  //некретичная ошибка: удаление вместе с подложкой
];

var imgEditor = new ImageEditor('#image-editor-container', buttons, []);
console.log('initialize image editor');