/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(t){!function(){t.config.all_timed="short";var e=function(t){return!((t.end_date-t.start_date)/36e5>=24)};t._safe_copy=function(e){var a=null,n=null;return e.event_pid&&(a=t.getEvent(e.event_pid)),a&&a.isPrototypeOf(e)?(n=t._copy_event(e),delete n.event_length,delete n.event_pid,delete n.rec_pattern,delete n.rec_type):n=t._lame_clone(e),n};var a=t._pre_render_events_line;t._pre_render_events_line=function(n,i){function d(t){var e=o(t.start_date);return+t.end_date>+e}function o(e){
var a=t.date.add(e,1,"day");return a=t.date.date_part(a)}function _(e,a){var n=t.date.date_part(new Date(e));return n.setHours(a),n}if(!this.config.all_timed)return a.call(this,n,i);for(var r=0;r<n.length;r++){var s=n[r];if(!s._timed)if("short"!=this.config.all_timed||e(s)){var l=this._safe_copy(s);l.start_date=new Date(l.start_date),d(s)?(l.end_date=o(l.start_date),24!=this.config.last_hour&&(l.end_date=_(l.start_date,this.config.last_hour))):l.end_date=new Date(s.end_date);var c=!1;l.start_date<this._max_date&&l.end_date>this._min_date&&l.start_date<l.end_date&&(n[r]=l,
c=!0);var h=this._safe_copy(s);if(h.end_date=new Date(h.end_date),h.start_date=h.start_date<this._min_date?_(this._min_date,this.config.first_hour):_(o(s.start_date),this.config.first_hour),h.start_date<this._max_date&&h.start_date<h.end_date){if(!c){n[r--]=h;continue}n.splice(r+1,0,h)}}else n.splice(r--,1)}var u="move"==this._drag_mode?!1:i;return a.call(this,n,u)};var n=t.get_visible_events;t.get_visible_events=function(t){return this.config.all_timed&&this.config.multi_day?n.call(this,!1):n.call(this,t);

},t.attachEvent("onBeforeViewChange",function(e,a,n,i){return t._allow_dnd="day"==n||"week"==n,!0}),t._is_main_area_event=function(t){return!!(t._timed||this.config.all_timed===!0||"short"==this.config.all_timed&&e(t))};var i=t.updateEvent;t.updateEvent=function(e){var a,n=t.config.all_timed&&!(t.isOneDayEvent(t._events[e])||t.getState().drag_id);n&&(a=t.config.update_render,t.config.update_render=!0),i.apply(t,arguments),n&&(t.config.update_render=a)}}()});