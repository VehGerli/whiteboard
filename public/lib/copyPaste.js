(function () {
  'use strict';
  const copyPaste = (canvas) => {


    document.addEventListener('copy', (e) => {
      if (!canvas.getActiveObject()) return

     
      if (canvas.getActiveObject().type === 'image') {
        e.preventDefault()

        e.clipboardData.setData('text/plain', canvas.getActiveObject().toDataURL())
      }


      
      if (canvas.getActiveObject().type !== 'image') {
        e.preventDefault()
        canvas.getActiveObject().clone((cloned) => {
          e.clipboardData.setData('text/plain', JSON.stringify(cloned.toJSON()))
        })
      }
    })

   
    const isJSONObjectString = (s) => {
      try {
        const o = JSON.parse(s);
        return !!o && (typeof o === 'object') && !Array.isArray(o)
      } catch {
        return false
      }
    }

    
    const isBase64String = (str) => {
      try {
        str = str.split('base64,').pop()
        window.atob(str)
        return true
      } catch (e) {
        return false
      }
    }

   
    document.addEventListener('paste', (e) => {
      let pasteTextData = e.clipboardData.getData('text')

     
      if (pasteTextData && isBase64String(pasteTextData)) {
        fabric.Image.fromURL(pasteTextData, (img) => {
          img.set({
            left: 0,
            top: 0
          })
          img.scaleToHeight(100)
          img.scaleToWidth(100)
          canvas.add(img)
          canvas.setActiveObject(img)
          canvas.trigger('object:modified')
        })

        return
      }

      
      if (e.clipboardData.items.length > 0) {
        for (let i = 0; i < e.clipboardData.items.length; i++) {
          if (e.clipboardData.items[i].type.indexOf('image') === 0) {
            let blob = e.clipboardData.items[i].getAsFile()
            if (blob !== null) {
              let reader = new FileReader()
              reader.onload = (f) => {
                fabric.Image.fromURL(f.target.result, (img) => {
                  img.set({
                    left: 0,
                    top: 0
                  })
                  img.scaleToHeight(100)
                  img.scaleToWidth(100)
                  canvas.add(img)
                  canvas.setActiveObject(img)
                  canvas.trigger('object:modified')
                })
              }
              reader.readAsDataURL(blob)
            }
          }
        }
      }

      
      let validTypes = ['rect', 'circle', 'line', 'path', 'polygon', 'polyline', 'textbox', 'group']
      if (isJSONObjectString(pasteTextData)) {
        let obj = JSON.parse(pasteTextData)
        if (!validTypes.includes(obj.type)) return

        
        fabric.util.enlivenObjects([obj], function (objects) {
          objects.forEach(function (o) {
            o.set({
              left: 0,
              top: 0
            })
            canvas.add(o)
            o.setCoords()
            canvas.setActiveObject(o)
          })
          canvas.renderAll()
          canvas.trigger('object:modified')
        })
      }
    })
  }

  window.ImageEditor.prototype.initializeCopyPaste = copyPaste;
})()