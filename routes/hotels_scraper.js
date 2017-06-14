var express = require('express');
var request = require('request');

/* GET hotels listing given a provider. */

module.exports = {
  getHotels : function (provider, cb) {
      const options = {
        method : 'GET',
          uri : 'http://localhost:9000/scrapers/'+provider,
          json : true,
      };
      request(options,function (error, response, body) {
          const hotels = body;
          cb(error,hotels);
      });
  }
};
