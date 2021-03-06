/**
 * Created by harikanukala on 6/14/17.
 */
var express = require('express');
var request = require('request');
var scraper = require('./hotels_scraper');
var async = require('async');
var providers = ['Expedia', 'Orbitz', 'Priceline', 'Travelocity', 'Hilton'];

const service = {
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
                    const output=service.combineResults(results);
                    resolve(output);
                }
            );
        });
    },
    /*
     Merge hotel results in to single object
     */
    combineResults:function (results) {
        console.log(results.length);
        var mergedRes = [];
        for(var i=0;i<results.length;i++){
            while(results[i].length>0){
                mergedRes.push(results[i].pop());
            }
        }
        return service.sortByEcstasy(mergedRes);
    },
    /*
     Sort the results by ecstasy
     */
    sortByEcstasy:function (results) {
        return results.sort((a, b) => {
            return b.ecstasy - a.ecstasy;
        });
    }
};
module.exports=service;

