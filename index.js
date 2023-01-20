//检查手机是否支持
if (window.DeviceOrientationEvent) {
  window.addEventListener("deviceorientation", DeviceOrientationHandler, true);
} else {
  alert("您的浏览器不支持DeviceOrientation！");
}
(function permission() {
  if (location.protocol != "https:") {
    location.href =
      "https:" +
      window.location.href.substring(window.location.protocol.length);
  }
  if (isIosOrAndroid === 2) {
    // 仅 ios 需要获取用户允许
    if (
      typeof window.DeviceMotionEvent !== "undefined" &&
      typeof window.DeviceMotionEvent.requestPermission === "function"
    ) {
      window.DeviceMotionEvent.requestPermission()
        .then((response) => {
          if (response == "granted") {
            let body = document.querySelector(".iphone");
            body.innerHTML=navigator.userAgent+"aaas";
            console.log("request");
          }
        })
        .catch(console.error);
    } else {
      alert("DeviceMotionEvent is not defined");
    }
  } else {
    let body = document.querySelector(".iphone");
    body.innerHTML=navigator.userAgent+"ffff";
    console.log("request++++");
  }
})();

function isIosOrAndroid() {
  const u = navigator.userAgent;
  console.log(u);
  const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  if (isAndroid) {
    console.log("return 1");
    return 1;
  }
  // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  const isiOS = u.includes("Mac")
  console.log(isiOS);
  if (isiOS) {
    console.log("return 2");
    return 2;
    
  }
  console.log("return 0");
  return 0;
}

function $(id) {
  return document.getElementById(id);
}

// 获得陀螺仪相关信息
function DeviceOrientationHandler(e) {
  const a = `<p>alpha: ${e.alpha}</p>`;
  const b = `<p>beta: ${e.beta}</p>`;
  const g = `<p>gamma: ${e.gamma}</p>`;
  const abs = `<p>absolute: ${e.absolute}</p>`;
  $("show-info").innerHTML = a + b + g + abs;

  const style = `
      -webkit-transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
      transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
    `;
  $("container").setAttribute("style", style);
}
