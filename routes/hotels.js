/**
 * Created by harikanukala on 6/14/17.
 */
var express = require('express');
var request = require('request');
var scraper = require('./hotels_scraper');
var async = require('async');
var array = [];

module.exports = {

    providers : ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'Hilton'],

    getAllHotels : function () {
        async.map(this.providers,function (provider,cb) {
            scraper.getHotels(provider, function (error, results) {
                cb(error, results);
            })
        }, function (err,results) {
            array.push(results);
            }
        )
    }
}