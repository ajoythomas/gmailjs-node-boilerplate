"use strict";
(() => {
  // src/extension.js
  (() => {
    var __async = (__this, __arguments, generator) => {
      return new Promise((resolve, reject) => {
        var fulfilled = (value) => {
          try {
            step(generator.next(value));
          } catch (e) {
            reject(e);
          }
        };
        var rejected = (value) => {
          try {
            step(generator.throw(value));
          } catch (e) {
            reject(e);
          }
        };
        var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
        step((generator = generator.apply(__this, __arguments)).next());
      });
    };
    (() => {
      var loaderId = setInterval(() => {
        if (!window._gmailjs) {
          return;
        }
        clearInterval(loaderId);
        startExtension(window._gmailjs);
      }, 100);
      function startExtension(gmail) {
        console.log("Extension loading...");
        window.gmail = gmail;
        gmail.observe.on("load", () => {
          const userEmail = gmail.get.user_email();
          console.log("Hello, " + userEmail + ". This is your extension talking!");
          gmail.observe.on("view_email", (domEmail) => {
            console.log("Looking at email:", domEmail);
            const emailData = gmail.new.get.email_data(domEmail);
            console.log("Email data:", emailData);
          });

          gmail.observe.on("compose", function(compose, composeType) {
            console.log('Compose object:', compose, 'compose type:', composeType);
          });

          gmail.observe.on("compose", (compose) => {
            console.log("New compose window is opened!", compose);
            setTimeout(() => __async(this, null, function* () {
              const textInClippy = yield navigator.clipboard.readText();
              if (ValidURL(textInClippy)) {
                console.log(textInClippy.toUpperCase());
                console.log("valid URL in clipboard, do your thing");
                //yo finny finster, you see that :t7 id below? thats the dynamic id that is coded in. you can switch it to your id to see it work once or twice. 
                const target = document.getElementById(":t7");
                target.addEventListener("paste", (event) => {
                  event.preventDefault();
                  let paste = (event.clipboardData || window.clipboardData).getData("text");
                  paste = paste.toUpperCase() + "rickroll";
                  const selection = window.getSelection();
                  if (!selection.rangeCount)
                    return;
                  selection.deleteFromDocument();
                  selection.getRangeAt(0).insertNode(document.createTextNode(paste));
                  selection.collapseToEnd();
                  event.preventDefault();
                });
              };

              function ValidURL(str) {
                var regex = /(?:https?):\/\/(\w+:?\w*)?(\S+)(:\d+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
                if (!regex.test(str)) {
                  return false;
                } else {
                  return true;
                }
              }
            }), 2e3);
          });
        });
      }
    })();
  })();
})();
//# sourceMappingURL=extension.js.map
