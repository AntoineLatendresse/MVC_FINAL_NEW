/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e){var t=function(){};return t.prototype=e,t}var a=e._load;e._load=function(e,n){if(e=e||this._load_url,"object"==typeof e)for(var i=t(this._loaded),d=0;d<e.length;d++)this._loaded=new i,a.call(this,e[d],n);else a.apply(this,arguments)}}()});