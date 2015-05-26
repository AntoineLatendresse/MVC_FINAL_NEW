/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(t){!function(){t.config.container_autoresize=!0,t.config.month_day_min_height=90;var e=t._pre_render_events,n=!0;t._pre_render_events=function(a,i){if(!t.config.container_autoresize||!n)return e.apply(this,arguments);var o=this.xy.bar_height,d=this._colsS.heights,_=this._colsS.heights=[0,0,0,0,0,0,0],r=this._els.dhx_cal_data[0];if(a=this._table_view?this._pre_render_events_table(a,i):this._pre_render_events_line(a,i),this._table_view)if(i)this._colsS.heights=d;else{var s=r.firstChild;

if(s.rows){for(var l=0;l<s.rows.length;l++){if(_[l]++,_[l]*o>this._colsS.height-this.xy.month_head_height){var c=s.rows[l].cells,h=this._colsS.height-this.xy.month_head_height;1*this.config.max_month_events!==this.config.max_month_events||_[l]<=this.config.max_month_events?h=_[l]*o:(this.config.max_month_events+1)*o>this._colsS.height-this.xy.month_head_height&&(h=(this.config.max_month_events+1)*o);for(var g=0;g<c.length;g++)c[g].childNodes[1].style.height=h+"px";_[l]=(_[l-1]||0)+c[0].offsetHeight;

}_[l]=(_[l-1]||0)+s.rows[l].cells[0].offsetHeight}_.unshift(0),s.parentNode.offsetHeight<s.parentNode.scrollHeight&&!s._h_fix}else if(a.length||"visible"!=this._els.dhx_multi_day[0].style.visibility||(_[0]=-1),a.length||-1==_[0]){var f=(s.parentNode.childNodes,(_[0]+1)*o+1+"px");r.style.top=this._els.dhx_cal_navline[0].offsetHeight+this._els.dhx_cal_header[0].offsetHeight+parseInt(f,10)+"px",r.style.height=this._obj.offsetHeight-parseInt(r.style.top,10)-(this.xy.margin_top||0)+"px";var v=this._els.dhx_multi_day[0];

v.style.height=f,v.style.visibility=-1==_[0]?"hidden":"visible",v=this._els.dhx_multi_day[1],v.style.height=f,v.style.visibility=-1==_[0]?"hidden":"visible",v.className=_[0]?"dhx_multi_day_icon":"dhx_multi_day_icon_small",this._dy_shift=(_[0]+1)*o,_[0]=0}}return a};var a=["dhx_cal_navline","dhx_cal_header","dhx_multi_day","dhx_cal_data"],i=function(e){for(var n=0,i=0;i<a.length;i++){var o=a[i],d=t._els[o]?t._els[o][0]:null,_=0;switch(o){case"dhx_cal_navline":case"dhx_cal_header":_=parseInt(d.style.height,10);

break;case"dhx_multi_day":_=d?d.offsetHeight:0,1==_&&(_=0);break;case"dhx_cal_data":var r=t.getState().mode;if(_=d.childNodes[1]&&"month"!=r?d.childNodes[1].offsetHeight:Math.max(d.offsetHeight-1,d.scrollHeight),"month"==r){if(t.config.month_day_min_height&&!e){var s=d.getElementsByTagName("tr").length;_=s*t.config.month_day_min_height}e&&(d.style.height=_+"px")}if(t.matrix&&t.matrix[r])if(e)_+=2,d.style.height=_+"px";else{_=2;for(var l=t.matrix[r],c=l.y_unit,h=0;h<c.length;h++)_+=c[h].children?l.folder_dy||l.dy:l.dy;

}("day"==r||"week"==r)&&(_+=2)}n+=_}t._obj.style.height=n+"px",e||t.updateView()},o=function(){if(!t.config.container_autoresize||!n)return!0;var e=t.getState().mode;i(),(t.matrix&&t.matrix[e]||"month"==e)&&window.setTimeout(function(){i(!0)},1)};t.attachEvent("onViewChange",o),t.attachEvent("onXLE",o),t.attachEvent("onEventChanged",o),t.attachEvent("onEventCreated",o),t.attachEvent("onEventAdded",o),t.attachEvent("onEventDeleted",o),t.attachEvent("onAfterSchedulerResize",o),t.attachEvent("onClearAll",o),
t.attachEvent("onBeforeExpand",function(){return n=!1,!0}),t.attachEvent("onBeforeCollapse",function(){return n=!0,!0})}()});