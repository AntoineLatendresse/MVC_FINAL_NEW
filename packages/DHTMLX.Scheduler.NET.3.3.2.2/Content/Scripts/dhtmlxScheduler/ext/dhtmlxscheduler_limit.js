/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){e.config.limit_start=null,e.config.limit_end=null,e.config.limit_view=!1,e.config.check_limits=!0,e.config.mark_now=!0,e.config.display_marked_timespans=!0,e._temp_limit_scope=function(){function t(t,a,n,i,r){var d=e,_=[],s={_props:"map_to",matrix:"y_property"};for(var o in s){var l=s[o];if(d[o])for(var c in d[o]){var h=d[o][c],u=h[l];t[u]&&(_=d._add_timespan_zones(_,e._get_blocked_zones(a[c],t[u],n,i,r)))}}return _=d._add_timespan_zones(_,e._get_blocked_zones(a,"global",n,i,r));

}var a=null,n="dhx_time_block",i="default",r=function(e,t,a){return t instanceof Date&&a instanceof Date?(e.start_date=t,e.end_date=a):(e.days=t,e.zones=a),e},d=function(e,t,a){var i="object"==typeof e?e:{days:e};return i.type=n,i.css="",t&&(a&&(i.sections=a),i=r(i,e,t)),i};e.blockTime=function(t,a,n){var i=d(t,a,n);return e.addMarkedTimespan(i)},e.unblockTime=function(t,a,n){a=a||"fullday";var i=d(t,a,n);return e.deleteMarkedTimespan(i)},e.attachEvent("onBeforeViewChange",function(t,a,n,i){function r(t,a){
var n=e.config.limit_start,i=e.config.limit_end,r=e.date.add(t,1,a);return t.valueOf()>i.valueOf()||r<=n.valueOf()}return e.config.limit_view&&(i=i||a,n=n||t,r(i,n)&&a.valueOf()!=i.valueOf())?(setTimeout(function(){var t=r(a,n)?e.config.limit_start:a;e.setCurrentView(r(t,n)?null:t,n)},1),!1):!0}),e.checkInMarkedTimespan=function(a,n,r){n=n||i;for(var d=!0,_=new Date(a.start_date.valueOf()),s=e.date.add(_,1,"day"),o=e._marked_timespans;_<a.end_date;_=e.date.date_part(s),s=e.date.add(_,1,"day")){var l=+e.date.date_part(new Date(_)),c=_.getDay(),h=t(a,o,c,l,n);

if(h)for(var u=0;u<h.length;u+=2){var v=e._get_zone_minutes(_),f=a.end_date>s||a.end_date.getDate()!=_.getDate()?1440:e._get_zone_minutes(a.end_date),g=h[u],p=h[u+1];if(f>g&&p>v&&(d="function"==typeof r?r(a,v,f,g,p):!1,!d))break}}return!d};var _=e.checkLimitViolation=function(t){if(!t)return!0;if(!e.config.check_limits)return!0;var a=e,i=a.config,r=[];if(t.rec_type)for(var d=e.getRecDates(t),_=0;_<d.length;_++){var s=e._copy_event(t);e._lame_copy(s,d[_]),r.push(s)}else r=[t];for(var o=!0,l=0;l<r.length;l++){
var c=!0,s=r[l];s._timed=e.isOneDayEvent(s),c=i.limit_start&&i.limit_end?s.start_date.valueOf()>=i.limit_start.valueOf()&&s.end_date.valueOf()<=i.limit_end.valueOf():!0,c&&(c=!e.checkInMarkedTimespan(s,n,function(e,t,n,i,r){var d=!0;return r>=t&&t>=i&&((1440==r||r>n)&&(d=!1),e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.start_date.setHours(0),e.start_date.setMinutes(r)):d=!1),(n>=i&&r>n||i>t&&n>r)&&(e._timed&&a._drag_id&&"new-size"==a._drag_mode?(e.end_date.setHours(0),e.end_date.setMinutes(i)):d=!1),
d})),c||(c=a.checkEvent("onLimitViolation")?a.callEvent("onLimitViolation",[s.id,s]):c),o=o&&c}return o||(a._drag_id=null,a._drag_mode=null),o};e._get_blocked_zones=function(e,t,a,n,i){var r=[];if(e&&e[t])for(var d=e[t],_=this._get_relevant_blocked_zones(a,n,d,i),s=0;s<_.length;s++)r=this._add_timespan_zones(r,_[s].zones);return r},e._get_relevant_blocked_zones=function(e,t,a,n){var i=a[t]&&a[t][n]?a[t][n]:a[e]&&a[e][n]?a[e][n]:[];return i},e.attachEvent("onMouseDown",function(e){return!(e==n)}),
e.attachEvent("onBeforeDrag",function(t){return t?_(e.getEvent(t)):!0}),e.attachEvent("onClick",function(t,a){return _(e.getEvent(t))}),e.attachEvent("onBeforeLightbox",function(t){var n=e.getEvent(t);return a=[n.start_date,n.end_date],_(n)}),e.attachEvent("onEventSave",function(t,a,n){if(!a.start_date||!a.end_date){var i=e.getEvent(t);a.start_date=new Date(i.start_date),a.end_date=new Date(i.end_date)}if(a.rec_type){var r=e._lame_clone(a);return e._roll_back_dates(r),_(r)}return _(a)}),e.attachEvent("onEventAdded",function(t){
if(!t)return!0;var a=e.getEvent(t);return!_(a)&&e.config.limit_start&&e.config.limit_end&&(a.start_date<e.config.limit_start&&(a.start_date=new Date(e.config.limit_start)),a.start_date.valueOf()>=e.config.limit_end.valueOf()&&(a.start_date=this.date.add(e.config.limit_end,-1,"day")),a.end_date<e.config.limit_start&&(a.end_date=new Date(e.config.limit_start)),a.end_date.valueOf()>=e.config.limit_end.valueOf()&&(a.end_date=this.date.add(e.config.limit_end,-1,"day")),a.start_date.valueOf()>=a.end_date.valueOf()&&(a.end_date=this.date.add(a.start_date,this.config.event_duration||this.config.time_step,"minute")),
a._timed=this.isOneDayEvent(a)),!0}),e.attachEvent("onEventChanged",function(t){if(!t)return!0;var n=e.getEvent(t);if(!_(n)){if(!a)return!1;n.start_date=a[0],n.end_date=a[1],n._timed=this.isOneDayEvent(n)}return!0}),e.attachEvent("onBeforeEventChanged",function(e,t,a){return _(e)}),e.attachEvent("onBeforeEventCreated",function(t){var a=e.getActionData(t).date,n={_timed:!0,start_date:a,end_date:e.date.add(a,e.config.time_step,"minute")};return _(n)}),e.attachEvent("onViewChange",function(){e._mark_now();

}),e.attachEvent("onSchedulerResize",function(){return window.setTimeout(function(){e._mark_now()},1),!0}),e.attachEvent("onTemplatesReady",function(){e._mark_now_timer=window.setInterval(function(){e._is_initialized()&&e._mark_now()},6e4)}),e._mark_now=function(t){var a="dhx_now_time";this._els[a]||(this._els[a]=[]);var n=e._currentDate(),i=this.config;if(e._remove_mark_now(),!t&&i.mark_now&&n<this._max_date&&n>this._min_date&&n.getHours()>=i.first_hour&&n.getHours()<i.last_hour){var r=this.locate_holder_day(n);

this._els[a]=e._append_mark_now(r,n)}},e._append_mark_now=function(t,a){var n="dhx_now_time",i=e._get_zone_minutes(a),r={zones:[i,i+1],css:n,type:n};if(!this._table_view){if(this._props&&this._props[this._mode]){for(var d=this._props[this._mode],_=d.size||d.options.length,s=t*_,o=(t+1)*_,l=(this._els.dhx_cal_data[0].childNodes,[]),c=s;o>c;c++){var h=c;r.days=h;var u=e._render_marked_timespan(r,null,h)[0];l.push(u)}return l}return r.days=t,e._render_marked_timespan(r,null,t)}return"month"==this._mode?(r.days=+e.date.date_part(a),
e._render_marked_timespan(r,null,null)):void 0},e._remove_mark_now=function(){for(var e="dhx_now_time",t=this._els[e],a=0;a<t.length;a++){var n=t[a],i=n.parentNode;i&&i.removeChild(n)}this._els[e]=[]},e._marked_timespans={global:{}},e._get_zone_minutes=function(e){return 60*e.getHours()+e.getMinutes()},e._prepare_timespan_options=function(t){var a=[],n=[];if("fullweek"==t.days&&(t.days=[0,1,2,3,4,5,6]),t.days instanceof Array){for(var r=t.days.slice(),d=0;d<r.length;d++){var _=e._lame_clone(t);_.days=r[d],
a.push.apply(a,e._prepare_timespan_options(_))}return a}if(!t||!(t.start_date&&t.end_date&&t.end_date>t.start_date||void 0!==t.days&&t.zones))return a;var s=0,o=1440;"fullday"==t.zones&&(t.zones=[s,o]),t.zones&&t.invert_zones&&(t.zones=e.invertZones(t.zones)),t.id=e.uid(),t.css=t.css||"",t.type=t.type||i;var l=t.sections;if(l){for(var c in l)if(l.hasOwnProperty(c)){var h=l[c];h instanceof Array||(h=[h]);for(var d=0;d<h.length;d++){var u=e._lame_copy({},t);u.sections={},u.sections[c]=h[d],n.push(u);

}}}else n.push(t);for(var v=0;v<n.length;v++){var f=n[v],g=f.start_date,p=f.end_date;if(g&&p)for(var m=e.date.date_part(new Date(g)),y=e.date.add(m,1,"day");p>m;){var u=e._lame_copy({},f);delete u.start_date,delete u.end_date,u.days=m.valueOf();var x=g>m?e._get_zone_minutes(g):s,b=p>y||p.getDate()!=m.getDate()?o:e._get_zone_minutes(p);u.zones=[x,b],a.push(u),m=y,y=e.date.add(y,1,"day")}else f.days instanceof Date&&(f.days=e.date.date_part(f.days).valueOf()),f.zones=t.zones.slice(),a.push(f)}return a;

},e._get_dates_by_index=function(t,a,n){var i=[];a=e.date.date_part(new Date(a||e._min_date)),n=new Date(n||e._max_date);for(var r=a.getDay(),d=t-r>=0?t-r:7-a.getDay()+t,_=e.date.add(a,d,"day");n>_;_=e.date.add(_,1,"week"))i.push(_);return i},e._get_css_classes_by_config=function(e){var t=[];return e.type==n&&(t.push(n),e.css&&t.push(n+"_reset")),t.push("dhx_marked_timespan",e.css),t.join(" ")},e._get_block_by_config=function(e){var t=document.createElement("DIV");return e.html&&("string"==typeof e.html?t.innerHTML=e.html:t.appendChild(e.html)),
t},e._render_marked_timespan=function(t,a,n){var i=[],r=e.config,d=this._min_date,_=this._max_date,s=!1;if(!r.display_marked_timespans)return i;if(!n&&0!==n){if(t.days<7)n=t.days;else{var o=new Date(t.days);if(s=+o,!(+_>+o&&+o>=+d))return i;n=o.getDay()}var l=d.getDay();l>n?n=7-(l-n):n-=l}var c=t.zones,h=e._get_css_classes_by_config(t);if(e._table_view&&"month"==e._mode){var u=[],v=[];if(a)u.push(a),v.push(n);else{v=s?[s]:e._get_dates_by_index(n);for(var f=0;f<v.length;f++)u.push(this._scales[v[f]]);

}for(var f=0;f<u.length;f++){a=u[f],n=v[f];var g=Math.floor((this._correct_shift(n,1)-d.valueOf())/(864e5*this._cols.length)),p=this.locate_holder_day(n,!1)%this._cols.length;if(!this._ignores[p]){var m=e._get_block_by_config(t),y=Math.max(a.offsetHeight-1,0),x=Math.max(a.offsetWidth-1,0),b=this._colsS[p],w=this._colsS.heights[g]+(this._colsS.height?this.xy.month_scale_height+2:2)-1;m.className=h,m.style.top=w+"px",m.style.lineHeight=m.style.height=y+"px";for(var k=0;k<c.length;k+=2){var E=c[f],D=c[f+1];

if(E>=D)return[];var C=m.cloneNode(!0);C.style.left=b+Math.round(E/1440*x)+"px",C.style.width=Math.round((D-E)/1440*x)+"px",a.appendChild(C),i.push(C)}}}}else{var z=n;if(this._ignores[this.locate_holder_day(n,!1)])return i;if(this._props&&this._props[this._mode]&&t.sections&&t.sections[this._mode]){var N=this._props[this._mode];z=N.order[t.sections[this._mode]];var T=N.order[t.sections[this._mode]];if(N.days>1){var O=N.size||N.options.length;z=z*O+T}else z=T,N.size&&z>N.position+N.size&&(z=0)}a=a?a:e.locate_holder(z);

for(var f=0;f<c.length;f+=2){var E=Math.max(c[f],60*r.first_hour),D=Math.min(c[f+1],60*r.last_hour);if(E>=D){if(f+2<c.length)continue;return[]}var C=e._get_block_by_config(t);C.className=h;var M=24*this.config.hour_size_px+1,L=36e5;C.style.top=Math.round((60*E*1e3-this.config.first_hour*L)*this.config.hour_size_px/L)%M+"px",C.style.lineHeight=C.style.height=Math.max(Math.round(60*(D-E)*1e3*this.config.hour_size_px/L)%M,1)+"px",a.appendChild(C),i.push(C)}}return i},e.markTimespan=function(t){var a=[],n=!1;

this._els.dhx_cal_data||(e.get_elements(),n=!0);var i=this._els.dhx_cal_data[0],r=e._marked_timespans_ids,d=e._marked_timespans_types,_=e._marked_timespans;e.deleteMarkedTimespan(),e.addMarkedTimespan(t);for(var s=new Date(e._min_date),o=0,l=i.childNodes.length;l>o;o++){var c=i.childNodes[o];c.firstChild&&(c.firstChild.className||"").indexOf("dhx_scale_hour")>-1||(a.push.apply(a,e._on_scale_add_marker(c,s)),s=e.date.add(s,1,"day"))}return n&&(e._els=[]),e._marked_timespans_ids=r,e._marked_timespans_types=d,
e._marked_timespans=_,a},e.unmarkTimespan=function(e){if(e)for(var t=0;t<e.length;t++){var a=e[t];a.parentNode&&a.parentNode.removeChild(a)}},e._marked_timespans_ids={},e.addMarkedTimespan=function(t){var a=e._prepare_timespan_options(t),n="global";if(a.length){var i=a[0].id,r=e._marked_timespans,d=e._marked_timespans_ids;d[i]||(d[i]=[]);for(var _=0;_<a.length;_++){var s=a[_],o=s.days,l=(s.zones,s.css,s.sections),c=s.type;if(s.id=i,l){for(var h in l)if(l.hasOwnProperty(h)){r[h]||(r[h]={});var u=l[h],v=r[h];

v[u]||(v[u]={}),v[u][o]||(v[u][o]={}),v[u][o][c]||(v[u][o][c]=[],e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[c]||(e._marked_timespans_types[c]=!0));var f=v[u][o][c];s._array=f,f.push(s),d[i].push(s)}}else{r[n][o]||(r[n][o]={}),r[n][o][c]||(r[n][o][c]=[]),e._marked_timespans_types||(e._marked_timespans_types={}),e._marked_timespans_types[c]||(e._marked_timespans_types[c]=!0);var f=r[n][o][c];s._array=f,f.push(s),d[i].push(s)}}return i}},e._add_timespan_zones=function(e,t){
var a=e.slice();if(t=t.slice(),!a.length)return t;for(var n=0;n<a.length;n+=2)for(var i=a[n],r=a[n+1],d=n+2==a.length,_=0;_<t.length;_+=2){var s=t[_],o=t[_+1];if(o>r&&r>=s||i>s&&o>=i)a[n]=Math.min(i,s),a[n+1]=Math.max(r,o),n-=2;else{if(!d)continue;var l=i>s?0:2;a.splice(n+l,0,s,o)}t.splice(_--,2);break}return a},e._subtract_timespan_zones=function(e,t){for(var a=e.slice(),n=0;n<a.length;n+=2)for(var i=a[n],r=a[n+1],d=0;d<t.length;d+=2){var _=t[d],s=t[d+1];if(s>i&&r>_){var o=!1;i>=_&&s>=r&&a.splice(n,2),
_>i&&(a.splice(n,2,i,_),o=!0),r>s&&a.splice(o?n+2:n,o?0:2,s,r),n-=2;break}}return a},e.invertZones=function(t){return e._subtract_timespan_zones([0,1440],t.slice())},e._delete_marked_timespan_by_id=function(t){var a=e._marked_timespans_ids[t];if(a)for(var n=0;n<a.length;n++)for(var i=a[n],r=i._array,d=0;d<r.length;d++)if(r[d]==i){r.splice(d,1);break}},e._delete_marked_timespan_by_config=function(t){var a=e._marked_timespans,n=t.sections,r=t.days,d=t.type||i,_=[];if(n){for(var s in n)if(n.hasOwnProperty(s)&&a[s]){
var o=n[s];a[s][o]&&a[s][o][r]&&a[s][o][r][d]&&(_=a[s][o][r][d])}}else a.global[r]&&a.global[r][d]&&(_=a.global[r][d]);for(var l=0;l<_.length;l++){var c=_[l],h=e._subtract_timespan_zones(c.zones,t.zones);if(h.length)c.zones=h;else{_.splice(l,1),l--;for(var u=e._marked_timespans_ids[c.id],v=0;v<u.length;v++)if(u[v]==c){u.splice(v,1);break}}}for(var l in e._marked_timespans.timeline)for(var f in e._marked_timespans.timeline[l])for(var v in e._marked_timespans.timeline[l][f])v===d&&delete e._marked_timespans.timeline[l][f][v];

},e.deleteMarkedTimespan=function(t){if(arguments.length||(e._marked_timespans={global:{}},e._marked_timespans_ids={},e._marked_timespans_types={}),"object"!=typeof t)e._delete_marked_timespan_by_id(t);else{t.start_date&&t.end_date||(t.days||(t.days="fullweek"),t.zones||(t.zones="fullday"));var a=[];if(t.type)a.push(t.type);else for(var n in e._marked_timespans_types)a.push(n);for(var i=e._prepare_timespan_options(t),r=0;r<i.length;r++)for(var d=i[r],_=0;_<a.length;_++){var s=e._lame_clone(d);s.type=a[_],
e._delete_marked_timespan_by_config(s)}}},e._get_types_to_render=function(e,t){var a=e?e:{};for(var n in t||{})t.hasOwnProperty(n)&&(a[n]=t[n]);return a},e._get_configs_to_render=function(e){var t=[];for(var a in e)e.hasOwnProperty(a)&&t.push.apply(t,e[a]);return t},e._on_scale_add_marker=function(t,a){if(!e._table_view||"month"==e._mode){var n=a.getDay(),i=a.valueOf(),r=this._mode,d=e._marked_timespans,_=[],s=[];if(this._props&&this._props[r]){var o=this._props[r],l=o.options,c=e._get_unit_index(o,a),h=l[c];

if(o.days>1){var u=864e5,v=Math.floor((a-e._min_date)/u);a=e.date.add(e._min_date,Math.floor(v/l.length),"day"),a=e.date.date_part(a)}else a=e.date.date_part(new Date(this._date));if(n=a.getDay(),i=a.valueOf(),d[r]&&d[r][h.key]){var f=d[r][h.key],g=e._get_types_to_render(f[n],f[i]);_.push.apply(_,e._get_configs_to_render(g))}}var p=d.global,m=p[i]||p[n];_.push.apply(_,e._get_configs_to_render(m));for(var y=0;y<_.length;y++)s.push.apply(s,e._render_marked_timespan(_[y],t,a));return s}},e.attachEvent("onScaleAdd",e._on_scale_add_marker),
e.dblclick_dhx_marked_timespan=function(t,a){e.config.dblclick_create||e.callEvent("onScaleDblClick",[e.getActionData(t).date,a,t]),e.addEventNow(e.getActionData(t).date,null,t)}},e._temp_limit_scope()});