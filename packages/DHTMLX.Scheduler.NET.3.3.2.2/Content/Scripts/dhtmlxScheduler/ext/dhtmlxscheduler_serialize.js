/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._get_serializable_data=function(){var e={};for(var t in this._events){var a=this._events[t];-1==a.id.toString().indexOf("#")&&(e[a.id]=a)}return e},e.data_attributes=function(){var t=[],a=e.templates.xml_format,n=this._get_serializable_data();for(var i in n){var r=n[i];for(var _ in r)"_"!=_.substr(0,1)&&t.push([_,"start_date"==_||"end_date"==_?a:null]);break}return t},e.toXML=function(e){var t=[],a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
var r=n[i];t.push("<event>");for(var _=0;_<a.length;_++)t.push("<"+a[_][0]+"><![CDATA["+(a[_][1]?a[_][1](r[a[_][0]]):r[a[_][0]])+"]]></"+a[_][0]+">");t.push("</event>")}return(e||"")+"<data>"+t.join("\n")+"</data>"},e._serialize_json_value=function(e){return null===e||"boolean"==typeof e?e=""+e:(e||0===e||(e=""),e='"'+e.toString().replace(/\n/g,"").replace(/\\/g,"\\\\").replace(/\"/g,'\\"')+'"'),e},e.toJSON=function(){var e=[],t="",a=this.data_attributes(),n=this._get_serializable_data();for(var i in n){
for(var r=n[i],_=[],d=0;d<a.length;d++)t=a[d][1]?a[d][1](r[a[d][0]]):r[a[d][0]],_.push(' "'+a[d][0]+'": '+this._serialize_json_value(t));e.push("{"+_.join(",")+"}")}return"["+e.join(",\n")+"]"},e.toICal=function(t){var a="BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//dhtmlXScheduler//NONSGML v2.2//EN\nDESCRIPTION:",n="END:VCALENDAR",i=e.date.date_to_str("%Y%m%dT%H%i%s"),r=e.date.date_to_str("%Y%m%d"),_=[],d=this._get_serializable_data();for(var o in d){var s=d[o];_.push("BEGIN:VEVENT"),_.push(s._timed&&(s.start_date.getHours()||s.start_date.getMinutes())?"DTSTART:"+i(s.start_date):"DTSTART:"+r(s.start_date)),
_.push(s._timed&&(s.end_date.getHours()||s.end_date.getMinutes())?"DTEND:"+i(s.end_date):"DTEND:"+r(s.end_date)),_.push("SUMMARY:"+s.text),_.push("END:VEVENT")}return a+(t||"")+"\n"+_.join("\n")+"\n"+n}});