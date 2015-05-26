/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){function t(e,t,n){var a=e+"="+n+(t?"; "+t:"");document.cookie=a}function n(e){var t=e+"=";if(document.cookie.length>0){var n=document.cookie.indexOf(t);if(-1!=n){n+=t.length;var a=document.cookie.indexOf(";",n);return-1==a&&(a=document.cookie.length),document.cookie.substring(n,a)}}return""}var a=!0;e.attachEvent("onBeforeViewChange",function(i,o,d,r){if(a&&e._get_url_nav){var _=e._get_url_nav();(_.date||_.mode||_.event)&&(a=!1)}var s=(e._obj.id||"scheduler")+"_settings";

if(a){a=!1;var l=n(s);if(l){e._min_date||(e._min_date=r),l=unescape(l).split("@"),l[0]=this.templates.xml_date(l[0]);var c=this.isViewExists(l[1])?l[1]:d,h=isNaN(+l[0])?r:l[0];return window.setTimeout(function(){e.setCurrentView(h,c)},1),!1}}var f=escape(this.templates.xml_format(r||o)+"@"+(d||i));return t(s,"expires=Sun, 31 Jan 9999 22:00:00 GMT",f),!0});var i=e._load;e._load=function(){var t=arguments;if(!e._date&&e._load_mode){var n=this;window.setTimeout(function(){i.apply(n,t)},1)}else i.apply(this,t);

}}()});