const device = checkDevice();
showDevice(device);
function checkDevice() {
  const userAgent = navigator.userAgent;
  if (userAgent.indexOf("Android") > -1) {
    return "Android";
  }
  if (userAgent.indexOf("iPhone") > -1) {
    return "iPhone";
  }
  return "notMobile";
}
function showDevice(device) {
  const deviceDiv = document.getElementById("device");
  deviceDiv.innerHTML = device;
}
pageInit(device);
async function pageInit(device) {
  if (device == "Android") {
    window.addEventListener("deviceorientation", deviceOrientationHandler);
    window.addEventListener("devicemotion", deviceMotionHandler);
  }
  if (device == "iPhone") {
    await getAccess();
  }
  if (device == "notMobile") {
    const data = document.querySelector(".data");
    data.innerHTML = `<p>此裝置不支援動作訊號收取</p>`;
  }
}
function getAccess() {
  DeviceMotionEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        window.addEventListener("deviceorientation", deviceOrientationHandler);
        window.addEventListener("devicemotion", deviceMotionHandler);
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

// if (window.DeviceOrientationEvent) {
//   alert("裝置支援感測器擷取");
// } else {
//   alert("您的浏览器不支持DeviceOrientation！");
// }
// (function permission() {
//   if (location.protocol != "https:") {
//     location.href =
//       "https:" +
//       window.location.href.substring(window.location.protocol.length);
//   }
//   let phone = isIosOrAndroid();
//   if (phone === 2) {
//     // 仅 ios 需要获取用户允许
//     if (
//       typeof window.DeviceMotionEvent !== "undefined" &&
//       typeof window.DeviceMotionEvent.requestPermission === "function"
//     ) {
//       window.DeviceMotionEvent.requestPermission()
//         .then((response) => {
//           if (response == "granted") {
//             let body = document.querySelector(".iphone");
//             body.innerHTML = navigator.userAgent + "aaas";
//             console.log("request");
//           }
//         })
//         .catch(console.error);
//     } else {
//       alert("DeviceMotionEvent is not defined");
//     }
//   } else {
//     let body = document.querySelector(".iphone");
//     body.innerHTML = navigator.userAgent + "ffff";
//     console.log("request++++");
//   }
// })();

// function isIosOrAndroid() {
//   const u = navigator.userAgent;
//   console.log(u);
//   const isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
//   if (isAndroid) {
//     console.log("return 1");
//     return 1;
//   }
//   // const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
//   const isiOS = u.includes("Mac");
//   console.log(isiOS);
//   if (isiOS) {
//     console.log("return 2");
//     return 2;
//   }
//   console.log("return 0");
//   return 0;
// }

// function $(id) {
//   return document.getElementById(id);
// }
const gyrAlpha = document.getElementById("gyrAlpha");
const gyrBeta = document.getElementById("gyrBeta");
const gyrGamma = document.getElementById("gyrGamma");
function deviceOrientationHandler(e) {
  const roundAlpha = Math.round(e.alpha * 10000) / 10000;
  const roundBeta = Math.round(e.beta * 10000) / 10000;
  const roundGamma = Math.round(e.gamma * 10000) / 10000;
  gyrAlpha.textContent = roundAlpha;
  gyrBeta.textContent = roundBeta;
  gyrGamma.textContent = roundGamma;
}
const accX = document.getElementById("accX");
const accY = document.getElementById("accY");
const accZ = document.getElementById("accZ");
function deviceMotionHandler(e) {
  const { x, y, z } = e.acceleration;
  const roundX = Math.round(x * 10000) / 10000;
  const roundY = Math.round(y * 10000) / 10000;
  const roundZ = Math.round(z * 10000) / 10000;
  accX.textContent = roundX;
  accY.textContent = roundY;
  accZ.textContent = roundZ;
}
// // 获得陀螺仪相关信息
// function DeviceOrientationHandler(e) {
//   const a = `<p>alpha: ${e.alpha}</p>`;
//   const b = `<p>beta: ${e.beta}</p>`;
//   const g = `<p>gamma: ${e.gamma}</p>`;
//   const abs = `<p>absolute: ${e.absolute}</p>`;
//   $("show-info").innerHTML = a + b + g + abs;

//   const style = `
//       -webkit-transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
//       transform:rotateX(${e.beta}deg) rotateY(${e.gamma}deg) rotateZ(${e.alpha}deg);
//     `;
//   $("container").setAttribute("style", style);
// }
