"use strict";

var isIP = require("validator").isIP;
var Address = require("./lib/address");
var IP = require("./lib/ip");
var request = require("request");
var Result = require("./lib/result");

/*
 * callback: fn(err, result);
 */
var is = function(ipOrAddress, apikey, callback) {
  var locator;
  var opts;

  if (typeof apikey === "function") {
    throw "api Keys Required";
  }

  if (!ipOrAddress) {
    return callback(null, new Result());
  } else if (isIP(ipOrAddress)) {
    locator = new IP(ipOrAddress, apikey.ip);
  } else {
    locator = new Address(ipOrAddress, apikey.address);
  }

  opts = {
    method: "GET",
    url: locator.url,
    json: true
  };

  request(opts, function(err, res, body) {
    if (err) {
      return callback(err);
    }

    callback(null, locator.buildResult(body));
  });
};

module.exports = {
  is: is
};
