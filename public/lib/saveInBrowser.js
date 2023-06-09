window.saveInBrowser = {
     save: (name, value) => {
          if (value instanceof Object) {
               value = JSON.stringify(value);
          }

          localStorage.setItem(name, value);
     },
     load: (name) => {
          let value = localStorage.getItem(name);
          value = JSON.parse(value);

          return value;
     },
     remove: (name) => {

          localStorage.setItem(name, JSON.stringify({ "version": "3.6.3", "objects": [], "background": "white" }))

     }
}