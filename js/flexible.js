(function flexible(window, document) {
  var docEl = document.documentElement;
  var dpr = window.devicePixelRatio || 1;

  // adjust body font size
  function setBodyFontSize() {
    if (document.body) {
      document.body.style.fontSize = 12 * dpr + "px";
    } else {
      document.addEventListener("DOMContentLoaded", setBodyFontSize);
    }
  }
  // setBodyFontSize();

  // set 1rem = viewWidth / 10
  function setRemUnit() {
    // // 设置缩放 主要是为了1像素
    // var viewport = document.querySelector("meta[name=viewport]");
    // var dpr = window.devicePixelRatio || 1;
    // var scale = 1 / dpr;
    // //下面是根据设备dpr设置viewport
    // viewport.setAttribute(
    //     "content",
    //     "width=device-width,initial-scale=" +
    //     scale +
    //     ", maximum-scale=" +
    //     scale +
    //     ", minimum-scale=" +
    //     scale +
    //     ", user-scalable=no"
    // );

    // //设置最大宽度设备独立像素
    // var maxWidthNum = 768;
    // var maxWidth = maxWidthNum*dpr;
    // var cWidth = docEl.clientWidth >= maxWidth ? maxWidth : docEl.clientWidth;
    // document.getElementsByTagName("html")[0].style.maxWidth = cWidth+'px';
    // var rem = cWidth / 10;

    var maxWidthNum = 820;
    var maxWidth = maxWidthNum;
    var cWidth = docEl.clientWidth >= maxWidth ? maxWidth : docEl.clientWidth;
    document.getElementsByTagName("html")[0].style.maxWidth = cWidth + "px";
    var rem = cWidth / 10;

    // var rem = docEl.clientWidth / 10
    docEl.style.fontSize = rem + "px";
  }

  setRemUnit();

  // reset rem unit on page resize
  window.addEventListener("resize", setRemUnit);
  window.addEventListener("pageshow", function (e) {
    if (e.persisted) {
      setRemUnit();
    }
  });

  // detect 0.5px supports
  if (dpr >= 2) {
    var fakeBody = document.createElement("body");
    var testElement = document.createElement("div");
    testElement.style.border = ".5px solid transparent";
    fakeBody.appendChild(testElement);
    docEl.appendChild(fakeBody);
    if (testElement.offsetHeight === 1) {
      docEl.classList.add("hairlines");
    }
    docEl.removeChild(fakeBody);
  }
})(window, document);
