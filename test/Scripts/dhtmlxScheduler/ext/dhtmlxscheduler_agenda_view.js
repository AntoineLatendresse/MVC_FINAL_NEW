/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(t){t.date.add_agenda=function(e){return t.date.add(e,1,"year")},t.templates.agenda_time=function(e,a,n){return n._timed?this.day_date(n.start_date,n.end_date,n)+" "+this.event_date(e):t.templates.day_date(e)+" &ndash; "+t.templates.day_date(a)},t.templates.agenda_text=function(t,e,a){return a.text},t.templates.agenda_date=function(){return""},t.date.agenda_start=function(){return t.date.date_part(t._currentDate())},t.attachEvent("onTemplatesReady",function(){function e(e){
if(e){var a=t.locale.labels;t._els.dhx_cal_header[0].innerHTML="<div class='dhx_agenda_line'><div>"+a.date+"</div><span style='padding-left:25px'>"+a.description+"</span></div>",t._table_view=!0,t.set_sizes()}}function a(){var e=(t._date,t.get_visible_events());e.sort(function(t,e){return t.start_date>e.start_date?1:-1});for(var a="<div class='dhx_agenda_area'>",n=0;n<e.length;n++){var i=e[n],o=i.color?"background:"+i.color+";":"",d=i.textColor?"color:"+i.textColor+";":"",r=t.templates.event_class(i.start_date,i.end_date,i);

a+="<div class='dhx_agenda_line"+(r?" "+r:"")+"' event_id='"+i.id+"' style='"+d+o+(i._text_style||"")+"'><div class='dhx_agenda_event_time'>"+t.templates.agenda_time(i.start_date,i.end_date,i)+"</div>",a+="<div class='dhx_event_icon icon_details'>&nbsp</div>",a+="<span>"+t.templates.agenda_text(i.start_date,i.end_date,i)+"</span></div>"}a+="<div class='dhx_v_border'></div></div>",t._els.dhx_cal_data[0].innerHTML=a,t._els.dhx_cal_data[0].childNodes[0].scrollTop=t._agendaScrollTop||0;var _=t._els.dhx_cal_data[0].childNodes[0],l=_.childNodes[_.childNodes.length-1];

l.style.height=_.offsetHeight<t._els.dhx_cal_data[0].offsetHeight?"100%":_.offsetHeight+"px";var s=t._els.dhx_cal_data[0].firstChild.childNodes;t._els.dhx_cal_date[0].innerHTML=t.templates.agenda_date(t._min_date,t._max_date,t._mode),t._rendered=[];for(var n=0;n<s.length-1;n++)t._rendered[n]=s[n]}var n=t.dblclick_dhx_cal_data;t.dblclick_dhx_cal_data=function(){if("agenda"==this._mode)!this.config.readonly&&this.config.dblclick_create&&this.addEventNow();else if(n)return n.apply(this,arguments)},t.attachEvent("onSchedulerResize",function(){
return"agenda"==this._mode?(this.agenda_view(!0),!1):!0});var i=t.render_data;t.render_data=function(t){return"agenda"!=this._mode?i.apply(this,arguments):void a()};var o=t.render_view_data;t.render_view_data=function(){return"agenda"==this._mode&&(t._agendaScrollTop=t._els.dhx_cal_data[0].childNodes[0].scrollTop,t._els.dhx_cal_data[0].childNodes[0].scrollTop=0),o.apply(this,arguments)},t.agenda_view=function(n){t._min_date=t.config.agenda_start||t.date.agenda_start(t._date),t._max_date=t.config.agenda_end||t.date.add_agenda(t._min_date,1),
t._table_view=!0,e(n),n&&a()}})});