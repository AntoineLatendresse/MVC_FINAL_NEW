/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e._temp_key_scope=function(){function t(e){delete e.rec_type,delete e.rec_pattern,delete e.event_pid,delete e.event_length}e.config.key_nav=!0;var n,a,i=null;e.attachEvent("onMouseMove",function(t,i){n=e.getActionData(i).date,a=e.getActionData(i).section}),e._make_pasted_event=function(i){var d=i.end_date-i.start_date,r=e._lame_copy({},i);if(t(r),r.start_date=new Date(n),r.end_date=new Date(r.start_date.valueOf()+d),a){var _=e._get_section_property();r[_]=e.config.multisection?i[_]:a;

}return r},e._do_paste=function(t,n,a){e.addEvent(n),e.callEvent("onEventPasted",[t,n,a])},e._is_key_nav_active=function(){return this._is_initialized()&&!this._is_lightbox_open()&&this.config.key_nav?!0:!1},dhtmlxEvent(document,_isOpera?"keypress":"keydown",function(t){if(!e._is_key_nav_active())return!0;if(t=t||event,37==t.keyCode||39==t.keyCode){t.cancelBubble=!0;var n=e.date.add(e._date,37==t.keyCode?-1:1,e._mode);return e.setCurrentView(n),!0}var a=e._select_id;if(t.ctrlKey&&67==t.keyCode)return a&&(e._buffer_id=a,
i=!0,e.callEvent("onEventCopied",[e.getEvent(a)])),!0;if(t.ctrlKey&&88==t.keyCode&&a){i=!1,e._buffer_id=a;var d=e.getEvent(a);e.updateEvent(d.id),e.callEvent("onEventCut",[d])}if(t.ctrlKey&&86==t.keyCode){var d=e.getEvent(e._buffer_id);if(d){var r=e._make_pasted_event(d);if(i)r.id=e.uid(),e._do_paste(i,r,d);else{var _=e.callEvent("onBeforeEventChanged",[r,t,!1,d]);_&&(e._do_paste(i,r,d),i=!0)}}return!0}})},e._temp_key_scope()});