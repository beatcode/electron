
// This file is required by the index.html file and will
// be executed in the renderer process for that window.
// All of the Node.js APIs are available in this process.
'use strict';
const SimpleJsonStore = require('simple-json-store');
const store = new SimpleJsonStore('../data/Data.json', {});

// Events
document.querySelector('#btn_TableExport').addEventListener('click', fncExport);


// Objekte
var obj_table1 = document.querySelector('#tbl_main');

function fncEdit1(){
  alert("obj.rowIndex");
};

  // Tabelle anzeigen
  fncShowTable();




function fncExport() {
  exportTableToCSV();
};

function fncShowTable()  {

var obj_table1 = document.querySelector('#tbl_main');
obj_table1.tableEditor('json', '[["1","2","3","4","5"],["6","7","8","9","0"]]')

  // var tableheader =  "<table class='table-striped' id='table_exp'>" +
  // '<thead>' +
  // '<tr>' +
  // '<th>PSP</th>' +
  // '<th>CODE</th> ' +
  // '<th>Datum</th>' +
  // '<th>Dauer</th> ' +
  // '<th>Start</th>' +
  // '<th>Ende</th>' +
  // '</tr>' +
  // '</thead>';
  //
  // for (var key in store.all) {
  //   var  tablebody = tablebody +
  //   '<tr>' +
  //   '<td>'+ '<button class="clsActionButton" id='+ store.all[key].PSP +' onclick="fncEdit1()" >Add</button></td> ' +
  //   '<td>'+ store.all[key].PSP +
  //   '<td>'+ store.all[key].CODE + '</td>' +
  //   '<td>'+ store.all[key].Datum + '</td>' +
  //   '<td>'+ store.all[key].Zeit + '</td>' +
  //   '<td>'+ store.all[key].Start + '</td>' +
  //   '<td>'+ store.all[key].Ende + '</td>'
  //   '</tr>';
  // }
  // obj_table1.innerHTML = tableheader + '<tbody>' + tablebody + '</tbody></table>';
  //

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
  now = new Date();
  year = "" + now.getFullYear();
  month = "" + (now.getMonth() + 1); if (month.length == 1) { month = "0" + month; }
  day = "" + now.getDate(); if (day.length == 1) { day = "0" + day; }
  hour = "" + now.getHours(); if (hour.length == 1) { hour = "0" + hour; }
  minute = "" + now.getMinutes(); if (minute.length == 1) { minute = "0" + minute; }
  second = "" + now.getSeconds(); if (second.length == 1) { second = "0" + second; }
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



function exportTableToCSV() {

    var uri = 'data:application/vnd.ms-excel;base64,',
      template = '<html xmlns:o="urn:schemas-microsoft-com:office:office" xmlns:x="urn:schemas-microsoft-com:office:excel" xmlns="http://www.w3.org/TR/REC-html40"><head><!--[if gte mso 9]><xml><x:ExcelWorkbook><x:ExcelWorksheets><x:ExcelWorksheet><x:Name>{worksheet}</x:Name><x:WorksheetOptions><x:DisplayGridlines/></x:WorksheetOptions></x:ExcelWorksheet></x:ExcelWorksheets></x:ExcelWorkbook></xml><![endif]--></head><body><table>{table}</table></body></html>',
      base64 = function(s) {
        return window.btoa(unescape(encodeURIComponent(s)))
      },
      format = function(s, c) {
        return s.replace(/{(\w+)}/g, function(m, p) {
          return c[p];
        })
      }
    var toExcel = document.getElementById("table_exp").innerHTML;
    var ctx = {
      worksheet: name || '',
      table: toExcel
    };
    var link = document.createElement("a");
    link.download = "export.xls";
    link.href = uri + base64(format(template, ctx))
    link.click();
  }
