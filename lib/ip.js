"use strict";

var _ = require("lodash");
var Result = require("./result");

function IP(ip, apikey) {
  this.ip = ip;
  this.url = `https://api.ipstack.com/${this.ip}?access_key=${
    this.apikey
  }&output=json&legacy=1`;
}

_.extend(IP.prototype, {
  buildResult: function(body) {
    body = body || {};

    return new Result({
      countryCode: body.country_code,
      country: body.country_name,
      regionCode: body.region_code,
      region: body.region_name,
      city: body.city,
      postalCode: body.zip_code,
      lat: body.latitude,
      lng: body.longitude
    });
  }
});

module.exports = IP;
