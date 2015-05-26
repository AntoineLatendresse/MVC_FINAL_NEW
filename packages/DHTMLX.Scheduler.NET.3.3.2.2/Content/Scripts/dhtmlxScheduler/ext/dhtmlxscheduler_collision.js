/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(t){!function(){function e(e){var a=t._get_section_view();a&&e&&(n=t.getEvent(e)[t._get_section_property()])}var n,a;t.config.collision_limit=1,t.attachEvent("onBeforeDrag",function(t){return e(t),!0}),t.attachEvent("onBeforeLightbox",function(n){var i=t.getEvent(n);return a=[i.start_date,i.end_date],e(n),!0}),t.attachEvent("onEventChanged",function(e){if(!e||!t.getEvent(e))return!0;var n=t.getEvent(e);if(!t.checkCollision(n)){if(!a)return!1;n.start_date=a[0],n.end_date=a[1],
n._timed=this.isOneDayEvent(n)}return!0}),t.attachEvent("onBeforeEventChanged",function(e,n,a){return t.checkCollision(e)}),t.attachEvent("onEventAdded",function(e,n){var a=t.checkCollision(n);a||t.deleteEvent(e)}),t.attachEvent("onEventSave",function(e,n,a){if(n=t._lame_clone(n),n.id=e,!n.start_date||!n.end_date){var i=t.getEvent(e);n.start_date=new Date(i.start_date),n.end_date=new Date(i.end_date)}return n.rec_type&&t._roll_back_dates(n),t.checkCollision(n)}),t._check_sections_collision=function(e,n){
var a=t._get_section_property();return e[a]==n[a]&&e.id!=n.id?!0:!1},t.checkCollision=function(e){var a=[],i=t.config.collision_limit;if(e.rec_type)for(var d=t.getRecDates(e),o=0;o<d.length;o++)for(var r=t.getEvents(d[o].start_date,d[o].end_date),_=0;_<r.length;_++)(r[_].event_pid||r[_].id)!=e.id&&a.push(r[_]);else{a=t.getEvents(e.start_date,e.end_date);for(var s=0;s<a.length;s++)if(a[s].id==e.id){a.splice(s,1);break}}var l=t._get_section_view(),c=t._get_section_property(),h=!0;if(l){for(var u=0,s=0;s<a.length;s++)a[s].id!=e.id&&this._check_sections_collision(a[s],e)&&u++;

u>=i&&(h=!1)}else a.length>=i&&(h=!1);if(!h){var g=!t.callEvent("onEventCollision",[e,a]);return g||(e[c]=n||e[c]),g}return h}}()});