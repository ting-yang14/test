const device = checkDevice();
showDevice(device);
const accessBtn = document.getElementById("getAccess");
pageInit(device);
let recordingInterval;
let recordData = [];
let record = {
  startTime: null,
  data: [],
  endTime: null,
};
let currentData = {
  acc_X: null,
  acc_Y: null,
  acc_Z: null,
  ori_alpha: null,
  ori_beta: null,
  ori_gamma: null,
};
const recordStatus = document.getElementById("recordStatus");
const oriAlpha = document.getElementById("oriAlpha");
const oriBeta = document.getElementById("oriBeta");
const oriGamma = document.getElementById("oriGamma");
const accX = document.getElementById("accX");
const accY = document.getElementById("accY");
const accZ = document.getElementById("accZ");
const startRecordBtn = document.getElementById("startRecordBtn");
const stopRecordBtn = document.getElementById("stopRecordBtn");
const showRecordBtn = document.getElementById("showRecordBtn");

startRecordBtn.addEventListener("click", startRecording);
stopRecordBtn.addEventListener("click", stopRecording);
showRecordBtn.addEventListener("click", showRecordedData);

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

function pageInit(device) {
  if (device == "Android") {
    window.addEventListener("deviceorientation", deviceOrientationHandler);
    window.addEventListener("devicemotion", deviceMotionHandler);
  }
  if (device == "iPhone") {
    accessBtn.style.display = "block";
  }
  if (device == "notMobile") {
    const data = document.querySelector(".deviceData");
    data.innerHTML = `<p>此裝置不支援動作訊號收取</p>`;
  }
}

function getAccess() {
  DeviceMotionEvent.requestPermission()
    .then((response) => {
      if (response == "granted") {
        window.addEventListener("deviceorientation", deviceOrientationHandler);
        window.addEventListener("devicemotion", deviceMotionHandler);
        accessBtn.style.display = "none";
      }
    })
    .catch((err) => {
      console.log(err);
    });
}

function startRecording() {
  record.startTime = getCurrentISOTime();
  if (!recordingInterval) {
    recordingInterval = setInterval(function () {
      recordData.push(currentData);
    }, 33.3);
  }
  recordStatus.textContent = `mobile data is recording`;
}

function stopRecording() {
  clearInterval(recordingInterval);
  recordingInterval = null;
  record.data = recordData;
  record.endTime = getCurrentISOTime();
  recordStatus.textContent = `mobile data stop recording`;
}

function getCurrentISOTime() {
  const now = new Date();
  const nowISOString = now.toISOString();
  return nowISOString;
}

function showRecordedData(record) {
  const recordTable = document.getElementById("recordTable");
  record.data.forEach((rowData, index) => {
    insertRecordRow(recordTable, rowData, index);
  });
  recordTable.style.display = block;
}

function insertRecordRow(table, rowData, index) {
  const row = table.insertRow(-1);
  const cellIdx = row.insertCell(0);
  const cellAccX = row.insertCell(1);
  const cellAccY = row.insertCell(2);
  const cellAccZ = row.insertCell(3);
  const cellOriAlpha = row.insertCell(4);
  const cellOriBeta = row.insertCell(5);
  const cellOriGamma = row.insertCell(6);
  cellIdx.innerHTML = index;
  cellAccX.innerHTML = rowData.acc_X;
  cellAccY.innerHTML = rowData.acc_Y;
  cellAccZ.innerHTML = rowData.acc_Z;
  cellOriAlpha.innerHTML = rowData.ori_alpha;
  cellOriBeta.innerHTML = rowData.ori_beta;
  cellOriGamma.innerHTML = rowData.ori_gamma;
}

function deviceOrientationHandler(e) {
  const roundAlpha = Math.round(e.alpha * 10000) / 10000;
  const roundBeta = Math.round(e.beta * 10000) / 10000;
  const roundGamma = Math.round(e.gamma * 10000) / 10000;
  currentData.ori_alpha = roundAlpha;
  currentData.ori_beta = roundBeta;
  currentData.ori_gamma = roundGamma;
  oriAlpha.textContent = roundAlpha;
  oriBeta.textContent = roundBeta;
  oriGamma.textContent = roundGamma;
}

function deviceMotionHandler(e) {
  const { x, y, z } = e.acceleration;
  const roundX = Math.round(x * 10000) / 10000;
  const roundY = Math.round(y * 10000) / 10000;
  const roundZ = Math.round(z * 10000) / 10000;
  currentData.acc_X = roundX;
  currentData.acc_Y = roundY;
  currentData.acc_Z = roundZ;
  accX.textContent = roundX;
  accY.textContent = roundY;
  accZ.textContent = roundZ;
}
