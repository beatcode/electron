
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict';

// const
const Stopwatch = require("ts-stopwatch").Stopwatch;
const stopwatch = new Stopwatch();
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('assets/data/Data.json', {});
const storeCombo = new SimpleJsonStore('assets/data/combo1.json', {});
const storeCombo2 = new SimpleJsonStore('assets/data/combo2.json', {});
const $ = require('jquery');

// var
var btn = document.querySelector('#start');
var timer = document.querySelector('#timer');
var select1 = document.querySelector('#dropdown');
var select2 = document.querySelector('#dropdown2');
var table1 = document.querySelector('#table1');
var startTime = '';
var endTime = '';
var selectbox = document.getElementById("Selectbox");
var selectbox2 = document.getElementById("Selectbox2");
var txtweek = document.getElementById("btn_Week");

// Events
document.querySelector('#start').addEventListener('click', fncstart);
document.querySelector('#save').addEventListener('click', fncsave);
document.querySelector('#reset').addEventListener('click', fncreset);
document.querySelector('#table').addEventListener('click', fnctable);
// Menu
document.querySelector('#item1').addEventListener('click', fncItem1);
document.querySelector('#item2').addEventListener('click', fncItem2);
document.querySelector('#item3').addEventListener('click', fncItem3);

const start = datepicker('.start', {
  id: 1,
  onSelect: (instance, date) => {
    instance.setMin(date)
  }
})

const end = datepicker('.end', {
  id: 1,
  onSelect: (instance, date) => {
    instance.setMax(date)
  }
})


var d = new Date();

txtweek.innerText = week(d);
txtweek.value = d;

// ComboFill
setSelect(selectbox, storeCombo.all);
setSelect(selectbox2, storeCombo2.all);


function fncItem1() {

  const {BrowserWindow} = require('electron').remote
  let win = new BrowserWindow({ width: 800, height: 600, show: false })

  win.loadURL(`file://${__dirname}/assets/view/edit.html`)

  win.once('ready-to-show', () => {
    win.show()
  })
}

function fncItem2() {

}

function fncItem3() {

}

function fncstart() {

  startTime = timestamp();
  setInterval(fncshow, 1000);
  if (btn.innerText == "Start") {
    btn.innerText = "Stop";
    btn.classList.remove('btn-success');
    btn.classList.add('btn-danger');
    stopwatch.start();
    Selectbox.disabled = true;
  }  else if (btn.innerText == "Stop") {
    stopwatch.stop();
    btn.innerText = "Weiter";
    btn.classList.remove('btn-danger');
    btn.classList.add('btn-warning');

  } else if (btn.innerText == "Weiter") {
    stopwatch.start();
    btn.innerText = "Stop";
    btn.classList.remove('btn-warning');
    btn.classList.add('btn-danger');
  }
}

function fncshow() {
  timer.innerHTML = getTime() ;
}

function fncCombo() {

  var arr = '[';

  for (var key in storeCombo.all) {
    arr = arr + ',' + [key][0] +','
  }
  arr = arr + ']';
  return arr;
}

function fncsave() {
  stopwatch.stop();
  endTime = timestamp();
  var key = timestamp();
  var json =  {
    [key]: {
      'Datum':  getDate(),
      'Start': startTime,
      'Ende':  endTime,
      'PSP': selectbox.value,
      'CODE': selectbox2.value,
      'Zeit':  getTime(),
    }
  };

  store.set(json) ;
  stopwatch.reset();
  btn.innerText = 'Start';
  Selectbox.disabled = false;
  btn.classList.remove('btn-warning');
  btn.classList.remove('btn-danger');
  btn.classList.add('btn-success');

  alert("gespeichert.");
}


function fnctable()  {

  const {BrowserWindow} = require('electron').remote
  let win = new BrowserWindow({ width: 800, height: 600, show: false })

  win.loadURL(`file://${__dirname}/assets/table.html`)

  win.once('ready-to-show', () => {
    win.show()
  })

}

function fncreset() {
  stopwatch.stop();
  stopwatch.reset();
  btn.innterText = "Start";
  select1.disabled = false;
  btn.classList.remove('btn-warning');
  btn.classList.remove('btn-danger');
  btn.classList.add('btn-success');
}

function getDate() {
  var today = new Date();
  var dd = today.getDate();
  var mm = today.getMonth()+1;
  var yyyy = today.getFullYear();
  if(dd<10)
  {  dd='0'+dd; }
  if(mm<10) { mm='0'+mm; }
  today = mm+'-'+dd+'-'+yyyy;
  return today;
}

function timestamp () {
  var now = new Date();
  var year = "" + now.getFullYear();
  var month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  var day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  var hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  var minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  var second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
  return year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;
}

function getTime() {

  var tm = stopwatch.getTime();
  var hours = Math.floor(tm / 1000 / 60 / 60);
  var minutes = Math.floor(tm / 60000) % 60;
  var seconds =  ((tm / 1000) % 60);
  // saca los decimales ej 2 d{0,2}
  var seconds = seconds.toString().match(/^-?\d+(?:\.\d{0,-1})?/)[0];
  var miliseconds = ("00" + tm).slice(-3);
  var centiseconds;

  centiseconds = miliseconds/10;
  centiseconds = (centiseconds).toString().match(/^-?\d+(?:\.\d{0,-1})?/)[0];

  minutes = (minutes < 10 ? '0' : '') + minutes;
  seconds = (seconds < 10 ? '0' : '') + seconds;
  centiseconds = (centiseconds < 10 ? '0' : '') + centiseconds;
  hours = hours + (hours > 0 ? ':' : '');
  if (hours==0){
    hours='';
  }

  return hours + minutes + ':' + seconds ;
}

function setSelect(selectbox, json)  {
  $.each(json, function(i, optgroups) {
    $.each(optgroups, function(groupName, options) {
      var $optgroup = $("<optgroup>", {label: groupName});
      $optgroup.appendTo(selectbox);

      $.each(options, function(j, option) {
        var $option = $("<option>", {text: option.name, value: option.id});
        $option.appendTo($optgroup);
      });
    });
  });
}

function week(dt) {
  var tdt = new Date(dt.valueOf());
  var dayn = (dt.getDay() + 6) % 7;
  tdt.setDate(tdt.getDate() - dayn + 3);
  var firstThursday = tdt.valueOf();
  tdt.setMonth(0, 1);
  if (tdt.getDay() !== 4)
  {
    tdt.setMonth(0, 1 + ((4 - tdt.getDay()) + 7) % 7);
  }
  return 1 + Math.ceil((firstThursday - tdt) / 604800000);
}
