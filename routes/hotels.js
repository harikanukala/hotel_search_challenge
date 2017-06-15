/**
 * Created by harikanukala on 6/14/17.
 */
var express = require('express');
var request = require('request');
var scraper = require('./hotels_scraper');
var async = require('async');
var providers = ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'Hilton'];

module.exports = {
    /*
        Get results from all the providers
     */
    getAllHotels : function () {
        return new Promise(function (resolve, reject) {
            async.map(providers, function (provider, cb) {
                    scraper.getHotels(provider, function (error, results) {
                        cb(error, results);
                    })
                }, function (err, results) {
                    const output=combineResults(results);
                    resolve(output);
                }
            );
        });
    }
};

/*
    Merge hotel results in to single object
 */
function combineResults(results) {
     console.log(results.length);
    var mergedRes = [];
    for(var i=0;i<results.length;i++){
        while(results[i].length>0){
            mergedRes.push(results[i].pop());
        }
    }
    return sortByEcstasy(mergedRes);
}

/*
    Sort the results by ecstasy
 */
function sortByEcstasy(results) {
    return results.sort((a, b) => {
        return b.ecstasy - a.ecstasy;
    });
}