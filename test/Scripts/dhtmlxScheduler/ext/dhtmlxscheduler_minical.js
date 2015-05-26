/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.templates.calendar_month=e.date.date_to_str("%F %Y"),e.templates.calendar_scale_date=e.date.date_to_str("%D"),e.templates.calendar_date=e.date.date_to_str("%d"),e.config.minicalendar={mark_events:!0},e._synced_minicalendars=[],e.renderCalendar=function(t,a,n){var i=null,d=t.date||e._currentDate();if("string"==typeof d&&(d=this.templates.api_date(d)),a)i=this._render_calendar(a.parentNode,d,t,a),e.unmarkCalendar(i);else{var r=t.container,_=t.position;if("string"==typeof r&&(r=document.getElementById(r)),
"string"==typeof _&&(_=document.getElementById(_)),_&&"undefined"==typeof _.left){var s=getOffset(_);_={top:s.top+_.offsetHeight,left:s.left}}r||(r=e._get_def_cont(_)),i=this._render_calendar(r,d,t),i.onclick=function(t){t=t||event;var a=t.target||t.srcElement;if(-1!=a.className.indexOf("dhx_month_head")){var n=a.parentNode.className;if(-1==n.indexOf("dhx_after")&&-1==n.indexOf("dhx_before")){var i=e.templates.xml_date(this.getAttribute("date"));i.setDate(parseInt(a.innerHTML,10)),e.unmarkCalendar(this),
e.markCalendar(this,i,"dhx_calendar_click"),this._last_date=i,this.conf.handler&&this.conf.handler.call(e,i,this)}}}}if(e.config.minicalendar.mark_events)for(var o=e.date.month_start(d),l=e.date.add(o,1,"month"),c=this.getEvents(o,l),h=this["filter_"+this._mode],u=0;u<c.length;u++){var v=c[u];if(!h||h(v.id,v)){var f=v.start_date;for(f.valueOf()<o.valueOf()&&(f=o),f=e.date.date_part(new Date(f.valueOf()));f<v.end_date&&(this.markCalendar(i,f,"dhx_year_event"),f=this.date.add(f,1,"day"),!(f.valueOf()>=l.valueOf())););
}}return this._markCalendarCurrentDate(i),i.conf=t,t.sync&&!n&&this._synced_minicalendars.push(i),i.conf._on_xle_handler||(i.conf._on_xle_handler=e.attachEvent("onXLE",function(){e.updateCalendar(i,i.conf.date)})),i},e._get_def_cont=function(e){return this._def_count||(this._def_count=document.createElement("DIV"),this._def_count.className="dhx_minical_popup",this._def_count.onclick=function(e){(e||event).cancelBubble=!0},document.body.appendChild(this._def_count)),this._def_count.style.left=e.left+"px",
this._def_count.style.top=e.top+"px",this._def_count._created=new Date,this._def_count},e._locateCalendar=function(t,a){if("string"==typeof a&&(a=e.templates.api_date(a)),+a>+t._max_date||+a<+t._min_date)return null;for(var n=t.childNodes[2].childNodes[0],i=0,d=new Date(t._min_date);+this.date.add(d,1,"week")<=+a;)d=this.date.add(d,1,"week"),i++;var r=e.config.start_on_monday,_=(a.getDay()||(r?7:0))-(r?1:0);return n.rows[i].cells[_].firstChild},e.markCalendar=function(e,t,a){var n=this._locateCalendar(e,t);

n&&(n.className+=" "+a)},e.unmarkCalendar=function(e,t,a){if(t=t||e._last_date,a=a||"dhx_calendar_click",t){var n=this._locateCalendar(e,t);n&&(n.className=(n.className||"").replace(RegExp(a,"g")))}},e._week_template=function(t){for(var a=t||250,n=0,i=document.createElement("div"),d=this.date.week_start(e._currentDate()),r=0;7>r;r++)this._cols[r]=Math.floor(a/(7-r)),this._render_x_header(r,n,d,i),d=this.date.add(d,1,"day"),a-=this._cols[r],n+=this._cols[r];return i.lastChild.className+=" dhx_scale_bar_last",
i},e.updateCalendar=function(e,t){e.conf.date=t,this.renderCalendar(e.conf,e,!0)},e._mini_cal_arrows=["&nbsp","&nbsp"],e._render_calendar=function(t,a,n,i){var d=e.templates,r=this._cols;this._cols=[];var _=this._mode;this._mode="calendar";var s=this._colsS;this._colsS={height:0};var o=new Date(this._min_date),l=new Date(this._max_date),c=new Date(e._date),h=d.month_day,u=this._ignores_detected;this._ignores_detected=0,d.month_day=d.calendar_date,a=this.date.month_start(a);var v,f=this._week_template(t.offsetWidth-1-this.config.minicalendar.padding);

if(i?v=i:(v=document.createElement("DIV"),v.className="dhx_cal_container dhx_mini_calendar"),v.setAttribute("date",this.templates.xml_format(a)),v.innerHTML="<div class='dhx_year_month'></div><div class='dhx_year_week'>"+f.innerHTML+"</div><div class='dhx_year_body'></div>",v.childNodes[0].innerHTML=this.templates.calendar_month(a),n.navigation)for(var g=function(t,a){var n=e.date.add(t._date,a,"month");e.updateCalendar(t,n),e._date.getMonth()==t._date.getMonth()&&e._date.getFullYear()==t._date.getFullYear()&&e._markCalendarCurrentDate(t);

},m=["dhx_cal_prev_button","dhx_cal_next_button"],p=["left:1px;top:2px;position:absolute;","left:auto; right:1px;top:2px;position:absolute;"],y=[-1,1],x=function(t){return function(){if(n.sync)for(var a=e._synced_minicalendars,i=0;i<a.length;i++)g(a[i],t);else g(v,t)}},w=0;2>w;w++){var b=document.createElement("DIV");b.className=m[w],b.style.cssText=p[w],b.innerHTML=this._mini_cal_arrows[w],v.firstChild.appendChild(b),b.onclick=x(y[w])}v._date=new Date(a),v.week_start=(a.getDay()-(this.config.start_on_monday?1:0)+7)%7;

var k=v._min_date=this.date.week_start(a);v._max_date=this.date.add(v._min_date,6,"week"),this._reset_month_scale(v.childNodes[2],a,k);for(var E=v.childNodes[2].firstChild.rows,C=E.length;6>C;C++){var D=E[E.length-1];E[0].parentNode.appendChild(D.cloneNode(!0));var N=parseInt(D.childNodes[D.childNodes.length-1].childNodes[0].innerHTML);N=10>N?N:0;for(var L=0;L<E[C].childNodes.length;L++)E[C].childNodes[L].className="dhx_after",E[C].childNodes[L].childNodes[0].innerHTML=e.date.to_fixed(++N)}return i||t.appendChild(v),
v.childNodes[1].style.height=v.childNodes[1].childNodes[0].offsetHeight-1+"px",this._cols=r,this._mode=_,this._colsS=s,this._min_date=o,this._max_date=l,e._date=c,d.month_day=h,this._ignores_detected=u,v},e.destroyCalendar=function(t,a){!t&&this._def_count&&this._def_count.firstChild&&(a||(new Date).valueOf()-this._def_count._created.valueOf()>500)&&(t=this._def_count.firstChild),t&&(t.onclick=null,t.innerHTML="",t.parentNode&&t.parentNode.removeChild(t),this._def_count&&(this._def_count.style.top="-1000px"),
t.conf&&t.conf._on_xle_handler&&e.detachEvent(t.conf._on_xle_handler))},e.isCalendarVisible=function(){return this._def_count&&parseInt(this._def_count.style.top,10)>0?this._def_count:!1},e._attach_minical_events=function(){dhtmlxEvent(document.body,"click",function(){e.destroyCalendar()}),e._attach_minical_events=function(){}},e.attachEvent("onTemplatesReady",function(){e._attach_minical_events()}),e.templates.calendar_time=e.date.date_to_str("%d-%m-%Y"),e.form_blocks.calendar_time={render:function(){
var t="<input class='dhx_readonly' type='text' readonly='true'>",a=e.config,n=this.date.date_part(e._currentDate()),i=1440,d=0;a.limit_time_select&&(d=60*a.first_hour,i=60*a.last_hour+1),n.setHours(d/60),t+=" <select>";for(var r=d;i>r;r+=1*this.config.time_step){var _=this.templates.time_picker(n);t+="<option value='"+r+"'>"+_+"</option>",n=this.date.add(n,this.config.time_step,"minute")}t+="</select>";e.config.full_day;return"<div style='height:30px;padding-top:0; font-size:inherit;' class='dhx_section_time'>"+t+"<span style='font-weight:normal; font-size:10pt;'> &nbsp;&ndash;&nbsp; </span>"+t+"</div>";

},set_value:function(t,a,n){function i(t,a,n){o(t,a,n),t.value=e.templates.calendar_time(a),t._date=e.date.date_part(new Date(a))}var d,r,_=t.getElementsByTagName("input"),s=t.getElementsByTagName("select"),o=function(t,a,n){t.onclick=function(){e.destroyCalendar(null,!0),e.renderCalendar({position:t,date:new Date(this._date),navigation:!0,handler:function(a){t.value=e.templates.calendar_time(a),t._date=new Date(a),e.destroyCalendar(),e.config.event_duration&&e.config.auto_end_date&&0===n&&u()}});

}};if(e.config.full_day){if(!t._full_day){var l="<label class='dhx_fullday'><input type='checkbox' name='full_day' value='true'> "+e.locale.labels.full_day+"&nbsp;</label></input>";e.config.wide_form||(l=t.previousSibling.innerHTML+l),t.previousSibling.innerHTML=l,t._full_day=!0}var c=t.previousSibling.getElementsByTagName("input")[0],h=0===e.date.time_part(n.start_date)&&0===e.date.time_part(n.end_date);c.checked=h,s[0].disabled=c.checked,s[1].disabled=c.checked,c.onclick=function(){if(c.checked===!0){
var a={};e.form_blocks.calendar_time.get_value(t,a),d=e.date.date_part(a.start_date),r=e.date.date_part(a.end_date),(+r==+d||+r>=+d&&(0!==n.end_date.getHours()||0!==n.end_date.getMinutes()))&&(r=e.date.add(r,1,"day"))}var o=d||n.start_date,l=r||n.end_date;i(_[0],o),i(_[1],l),s[0].value=60*o.getHours()+o.getMinutes(),s[1].value=60*l.getHours()+l.getMinutes(),s[0].disabled=c.checked,s[1].disabled=c.checked}}if(e.config.event_duration&&e.config.auto_end_date){var u=function(){d=e.date.add(_[0]._date,s[0].value,"minute"),
r=new Date(d.getTime()+60*e.config.event_duration*1e3),_[1].value=e.templates.calendar_time(r),_[1]._date=e.date.date_part(new Date(r)),s[1].value=60*r.getHours()+r.getMinutes()};s[0].onchange=u}i(_[0],n.start_date,0),i(_[1],n.end_date,1),o=function(){},s[0].value=60*n.start_date.getHours()+n.start_date.getMinutes(),s[1].value=60*n.end_date.getHours()+n.end_date.getMinutes()},get_value:function(t,a){var n=t.getElementsByTagName("input"),i=t.getElementsByTagName("select");return a.start_date=e.date.add(n[0]._date,i[0].value,"minute"),
a.end_date=e.date.add(n[1]._date,i[1].value,"minute"),a.end_date<=a.start_date&&(a.end_date=e.date.add(a.start_date,e.config.time_step,"minute")),{start_date:new Date(a.start_date),end_date:new Date(a.end_date)}},focus:function(e){}},e.linkCalendar=function(t,a){var n=function(){var n=e._date,i=new Date(n.valueOf());return a&&(i=a(i)),i.setDate(1),e.updateCalendar(t,i),!0};e.attachEvent("onViewChange",n),e.attachEvent("onXLE",n),e.attachEvent("onEventAdded",n),e.attachEvent("onEventChanged",n),e.attachEvent("onAfterEventDelete",n),
n()},e._markCalendarCurrentDate=function(t){var a=e._date,n=e._mode,i=e.date.month_start(new Date(t._date)),d=e.date.add(i,1,"month");if("day"==n||this._props&&this._props[n])i.valueOf()<=a.valueOf()&&d>a&&e.markCalendar(t,a,"dhx_calendar_click");else if("week"==n)for(var r=e.date.week_start(new Date(a.valueOf())),_=0;7>_;_++)i.valueOf()<=r.valueOf()&&d>r&&e.markCalendar(t,r,"dhx_calendar_click"),r=e.date.add(r,1,"day")},e.attachEvent("onEventCancel",function(){e.destroyCalendar(null,!0)})});