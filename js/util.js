//android禁止微信浏览器调整字体大小
if (
  typeof WeixinJSBridge == "object" &&
  typeof WeixinJSBridge.invoke == "function"
) {
  handleFontSize();
} else {
  if (document.addEventListener) {
    document.addEventListener("WeixinJSBridgeReady", handleFontSize, false);
  } else if (document.attachEvent) {
    document.attachEvent("WeixinJSBridgeReady", handleFontSize);
    document.attachEvent("onWeixinJSBridgeReady", handleFontSize);
  }
}
// 禁用双指放大
document.documentElement.addEventListener(
  "touchstart",
  function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  },
  {
    passive: false,
  }
);

// 禁用双击放大
var lastTouchEnd = 0;
document.documentElement.addEventListener(
  "touchend",
  function (event) {
    var now = Date.now();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  },
  {
    passive: false,
  }
);

var browserRule = /^.*((iPhone)|(iPad)|(Safari))+.*$/; //判断ios设备
if (browserRule.test(navigator.userAgent)) {
  window.onpageshow = function (event) {
    if (event.persisted) {
      window.location.reload();
    }
  };
}

(function () {
  if (
    typeof WeixinJSBridge === "object" &&
    typeof WeixinJSBridge.invoke === "function"
  ) {
    changeSize();
  } else {
    document.addEventListener("WeixinJSBridgeReady", changeSize, false);
  }
  function changeSize() {
    // 设置网页字体为默认大小
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    // 重写设置网页字体大小的事件
    WeixinJSBridge.on("menu:setfont", function () {
      WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
    });
  }
})();
function handleFontSize() {
  // 设置网页字体为默认大小
  WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
  // 重写设置网页字体大小的事件
  WeixinJSBridge.on("menu:setfont", function () {
    WeixinJSBridge.invoke("setFontSizeCallback", { fontSize: 0 });
  });
}
// 提示
function toast(msg, duration) {
  duration = isNaN(duration) ? 2000 : duration;

  if (document.getElementsByClassName("toast").length) {
    return false;
  }
  var m = document.createElement("div");
  m.innerHTML = msg;
  m.setAttribute("class", "toast");

  m.style.cssText =
    "font-family:siyuan;padding:0.15rem  0.4rem;color: rgb(255, 255, 255);line-height: 0.57306667rem;text-align: center;border-radius: 0.08730667rem;position: fixed;top: 40%;left: 50%;transform: translate(-50%, -50%);z-index: 999999;background: rgba(0, 0, 0,.7);font-size:  0.34922667rem;word-break:break-all;";
  if (msg.length > 10) {
    m.style.cssText += "min-width: 62%;";
  }
  document.body.appendChild(m);
  setTimeout(function () {
    var d = 0.5;
    m.style.webkitTransition =
      "-webkit-transform " + d + "s ease-in, opacity " + d + "s ease-in";
    m.style.opacity = "0";
    setTimeout(function () {
      document.body.removeChild(m);
    }, d * 1000);
  }, duration);
}

//校验手机号
function PhoneNumberVerify(tel) {
  var reg = /^0?1[3|4|5|6|7|8|9][0-9]\d{8}$/;
  return reg.test(tel);
}

//校验邮箱
function emailVerify(email) {
  var reg =
    /^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/;
  return reg.test(email);
}

//保留两位小数
function returnFloat(value) {
  var value = Math.round(parseFloat(value) * 100) / 100;
  var xsd = value.toString().split(".");
  if (xsd.length == 1) {
    value = value.toString() + ".00";
    return value;
  }
  if (xsd.length > 1) {
    if (xsd[1].length < 2) {
      value = value.toString() + "0";
    }
    return value;
  }
}
//获取url中"?"符后的参数
function getRequest() {
  var url = location.search; //获取url中"?"符后的字串
  var theRequest = new Object();
  if (url.indexOf("?") != -1) {
    var str = url.substr(1);
    strs = str.split("&");
    for (var i = 0; i < strs.length; i++) {
      theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
    }
  }
  return theRequest;
}

//加法
function add(arg1, arg2) {
  // var r1, r2, m;
  // try {
  //   r1 = arg1.toString().split(".")[1].length;
  // } catch (e) {
  //   r1 = 0;
  // }
  // try {
  //   r2 = arg2.toString().split(".")[1].length;
  // } catch (e) {
  //   r2 = 0;
  // }
  // m = Math.pow(10, Math.max(r1, r2));
  // return (arg1 * m + arg2 * m) / m;
  (arg1 = arg1.toString()), (arg2 = arg2.toString());
  var arg1Arr = arg1.split("."),
    arg2Arr = arg2.split("."),
    d1 = arg1Arr.length == 2 ? arg1Arr[1] : "",
    d2 = arg2Arr.length == 2 ? arg2Arr[1] : "";
  var maxLen = Math.max(d1.length, d2.length);
  var m = Math.pow(10, maxLen);
  var result = Number(((arg1 * m + arg2 * m) / m).toFixed(maxLen));
  var d = arguments[2];
  return typeof d === "number" ? Number(result.toFixed(d)) : result;
}

//减法
function sub(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length;
  } catch (e) {
    r1 = 0;
  }
  try {
    r2 = arg2.toString().split(".")[1].length;
  } catch (e) {
    r2 = 0;
  }
  m = Math.pow(10, Math.max(r1, r2));
  //动态控制精度长度
  n = r1 >= r2 ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}
//乘法
function mul(arg1, arg2) {
  var m = 0,
    s1 = arg1.toString(),
    s2 = arg2.toString();
  try {
    m += s1.split(".")[1].length;
  } catch (e) {}
  try {
    m += s2.split(".")[1].length;
  } catch (e) {}
  return (
    (Number(s1.replace(".", "")) * Number(s2.replace(".", ""))) /
    Math.pow(10, m)
  );
}
//除法
function div(arg1, arg2) {
  if (!arg1) return "";
  if (!arg2) return "";
  var t1 = 0,
    t2 = 0,
    r1,
    r2;
  try {
    t1 = arg1.toString().split(".")[1].length;
  } catch (e) {}
  try {
    t2 = arg2.toString().split(".")[1].length;
  } catch (e) {}
  r1 = Number(arg1.toString().replace(".", ""));
  r2 = Number(arg2.toString().replace(".", ""));
  return (r1 / r2) * Math.pow(10, t2 - t1);
}
function upFixed(num, fix = 2) {
  // num为原数字，fix是保留的小数位数
  let result = "0";
  if (Number(num) && fix > 0) {
    // 简单的做个判断
    fix = +fix || 2;
    num = num + "";
    if (/e/.test(num)) {
      // 如果是包含e字符的数字直接返回
      result = num;
    } else if (!/\./.test(num)) {
      // 如果没有小数点
      result = num + `.${Array(fix + 1).join("0")}`;
    } else {
      // 如果有小数点
      num = num + `${Array(fix + 1).join("0")}`;
      let reg = new RegExp(`-?\\d*\\.\\d{0,${fix}}`);
      let floorStr = reg.exec(num)[0];
      if (+floorStr >= +num) {
        result = floorStr;
      } else {
        let floorNumber = +floorStr + +`0.${Array(fix).join("0")}1`;
        let point = /\./.test(floorNumber + "") ? "" : ".";
        let floorStr2 = floorNumber + point + `${Array(fix + 1).join("0")}`;
        result = reg.exec(floorStr2)[0];
      }
    }
  }
  return result;
}
/**
 * 数字金额格式化（千分位）
 * @param {Number} money 要转换的金额数字
 * @param {Number} num 小数点后有效数字
 * @returns
 */
function moneyFormatter(money, num = 2) {
  num = num > 0 && num <= 20 ? num : 2;
  const moneyStr =
    parseFloat((money + "").replace(/[^\d.-]/g, "")).toFixed(num) + "";
  const l = moneyStr.split(".")[0].split("").reverse(),
    r = moneyStr.split(".")[1];
  let t = "";
  for (let i = 0; i < l.length; i++) {
    t += l[i] + ((i + 1) % 3 === 0 && i + 1 != l.length ? "," : "");
  }
  return t.split("").reverse().join("") + "." + r;
}
function delcommafy(num) {
  if (num && num != "undefined" && num != "null") {
    let numS = num;
    numS = numS.toString();
    numS = numS.replace(/,/gi, "");
    return Number(numS);
  } else {
    return Number(num);
  }
}
// 手机号中间隐藏

function geTel(tel) {
  const reg = /^(\d{3})\d{4}(\d{4})$/;
  return tel.replace(reg, "$1****$2");
}

// bae64转文件对象
function dataURLtoFileFun(dataurl, filename) {
  // 将base64转换为文件，dataurl为base64字符串，filename为文件名（必须带后缀名，如.jpg,.png）
  const arr = dataurl.split(",");
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new File([u8arr], filename, { type: mime });
}
/**
 * ajax封装
 * url 发送请求的地址
 * data 发送到服务器的数据，数组存储
 * isLoading 是否显示loading
 * dataType 预期服务器返回的数据类型，常用的如：xml、html、json、text
 * successfn 成功回调函数
 * errorfn 失败回调函数
 */
vant.Toast.allowMultiple();
var loading = null;
var loadNum = 0;
function ajaxpost(url, data, isLoading, successfn, errorfn) {
  console.log("发送", data);
  // var url = url.charAt(0) === "/" ? url.substring(1) : url;
  // console.log(url);


  $.ajax({
    type: "POST",
    data: data,
    url: "" + url,
    dataType: "json",
    beforeSend: function () {
      if (isLoading) {
        loadNum++;
        if (loading === null) {
          loading = vant.Toast.loading({
            message: "加载中...",
            forbidClick: true,
            duration: 0,
          });
        }
      }
    },
    success: function (res) {
      if (res.code == "000" || res.resultCode == "000") {
        successfn(res);
      } else {
        if (typeof errorfn === "function") {
          errorfn("success", res);
        } else {
          vant.Toast.fail(res.msg);
        }
      }
    },
    error: function (err) {
      if (typeof errorfn === "function") {
        errorfn("error", err);
      } else {
        vant.Toast.fail(err.statusText);
      }
    },
    complete: function (e) {
      if (isLoading) {
        loadNum--;
        if (loadNum === 0) {
          loading.clear();
          loading = null;
        }
      }
    },
  });
}
//数组排序
function bubbleSort(array) {
  const len = array.length;
  if (len < 2) return array;
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < i; j++) {
      if (Number(array[j]) > Number(array[i])) {
        const temp = array[j];
        array[j] = array[i];
        array[i] = temp;
      }
    }
  }
  return array;
}
function debounce(fn, delay, immediate = true, callback) {
  console.log(fn);
  let timer = null;
  let isInvoke = false; // 第一次是否已经调用
  return function _debounce(...args) {
    if (timer) clearTimeout(timer);
    // 立即执行且没执行过立即执行一次
    if (immediate && !isInvoke) {
      const result = fn.apply(this);
      isInvoke = true;
      if (callback) callback(result);
    } else {
      timer = setTimeout(() => {
        const result = fn.apply(this);
        isInvoke = false;
        if (callback) callback(result);
      }, delay);
    }
  };
}
// 清除对象里面的值为空
function clearObjectValues(obj) {
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      if (typeof obj[key] === "object" && obj[key] !== null) {
        clearObjectValues(obj[key]);
      } else {
        obj[key] = Array.isArray(obj[key])
          ? []
          : typeof obj[key] === "string"
          ? ""
          : 0;
      }
    }
  }
}
function splitEveryFourDigitsWithSpace(inputString) {
  const chunks = inputString.match(/.{1,4}/g); // 将字符串分割为每四位一组的数组
  const result = chunks.join(" "); // 使用空格连接数组元素并返回结果字符串
  return result;
}
//获取当前时间
function formatDate() {
  let date = new Date();
  let year = date.getFullYear();
  let month = ("0" + (date.getMonth() + 1)).slice(-2);
  let day = ("0" + date.getDate()).slice(-2);
  let hours = ("0" + date.getHours()).slice(-2);
  let minutes = ("0" + date.getMinutes()).slice(-2);
  let seconds = ("0" + date.getSeconds()).slice(-2);
  return (
    year + "-" + month + "-" + day //+ " " + hours + ":" + minutes + ":" + seconds
  );
}

//计算两个日期相差天数
function diffDays(date1, date2) {
  // 将字符串格式的日期转换为Date对象
  let date1Obj = new Date(date1);
  let date2Obj = new Date(date2);

  // 计算两个日期之间的毫秒数差
  let diffInMs = Math.abs(date2Obj - date1Obj);

  // 将毫秒数转换为天数
  let diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24)); // 1天 = 1000ms * 60s * 60m * 24h

  return diffInDays;
}
