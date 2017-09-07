#!/usr/bin/env node
var program = require('commander');
var csv = require('fast-csv');
var fs = require('fs');
var moment = require('moment');
var moment = require('moment-timezone');

moment.tz.setDefault("America/New_York");

program
  .version('1.0.0')
  .option('-c, --csv [name]', "Add the file name you'd like to process")
  .parse(process.argv);

function processData(data) {
  var date = moment(new Date(data.Timestamp));

  var zip = data.ZIP;
  while (zip.length < 5) {
    zip = '0' + zip;
  }

  var fullName = data.FullName.toUpperCase();

  var fooDuration = data.FooDuration;
  console.log('FooDuration', fooDuration);

  // var barDuration = data.BarDuration;
  // console.log('BarDuration', barDuration);

  // var totalDuration = data.TotalDuration;
  // console.log('TotalDuration', totalDuration);

  // var notes = data.Notes;
  // console.log('Notes', notes);
};

var stream = fs.createReadStream(program.csv);

csv.fromStream(stream, {headers : true})
  .on("data", function(data){
    processData(data);
  })
  .on("end", function(){

  });
