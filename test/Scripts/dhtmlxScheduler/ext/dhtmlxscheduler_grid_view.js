/*
@license
dhtmlxScheduler.Net v.3.3.2 

This software is covered by DHTMLX Evaluation License. Contact sales@dhtmlx.com to get Commercial or Enterprise license. Usage without proper license is prohibited.

(c) Dinamenta, UAB.
*/
Scheduler.plugin(function(e){!function(){e._grid={sort_rules:{"int":function(e,t,n){return 1*n(e)<1*n(t)?1:-1},str:function(e,t,n){return n(e)<n(t)?1:-1},date:function(e,t,n){return new Date(n(e))<new Date(n(t))?1:-1}},_getObjName:function(e){return"grid_"+e},_getViewName:function(e){return e.replace(/^grid_/,"")}}}(),e.createGridView=function(t){function n(e){return!(void 0!==e&&(1*e!=e||0>e))}var a=t.name||"grid",i=e._grid._getObjName(a);e.config[a+"_start"]=t.from||new Date(0),e.config[a+"_end"]=t.to||new Date(9999,1,1),
e[i]=t,e[i].defPadding=8,e[i].columns=e[i].fields,e[i].unit=t.unit||"month",e[i].step=t.step||1,delete e[i].fields;for(var d=e[i].columns,r=0;r<d.length;r++)n(d[r].width)&&(d[r].initialWidth=d[r].width),n(d[r].paddingLeft)||delete d[r].paddingLeft,n(d[r].paddingRight)||delete d[r].paddingRight;e[i].select=void 0===t.select?!0:t.select,void 0===e.locale.labels[a+"_tab"]&&(e.locale.labels[a+"_tab"]=e[i].label||e.locale.labels.grid_tab),e[i]._selected_divs=[],e.date[a+"_start"]=function(n){return e.date[t.unit+"_start"]?e.date[t.unit+"_start"](n):n;

},e.date["add_"+a]=function(t,n){return e.date.add(t,n*e[i].step,e[i].unit)},e.templates[a+"_date"]=function(t,n){return e.templates.day_date(t)+" - "+e.templates.day_date(n)},e.templates[a+"_full_date"]=function(t,n,i){return e.isOneDayEvent(i)?this[a+"_single_date"](t):e.templates.day_date(t)+" &ndash; "+e.templates.day_date(n)},e.templates[a+"_single_date"]=function(t){return e.templates.day_date(t)+" "+this.event_date(t)},e.templates[a+"_field"]=function(e,t){return t[e]},e.attachEvent("onTemplatesReady",function(){
e.attachEvent("onDblClick",function(t,n){return this._mode==a?(e._click.buttons.details(t),!1):!0}),e.attachEvent("onClick",function(t,n){return this._mode==a&&e[i].select?(e._grid.unselectEvent("",a),e._grid.selectEvent(t,a,n),!1):!0});var t=e.render_data;e.render_data=function(n){return this._mode!=a?t.apply(this,arguments):void e._grid._fill_grid_tab(i)};var n=e.render_view_data;e.render_view_data=function(){var t=e._els.dhx_cal_data[0].lastChild;return this._mode==a&&t&&(e._grid._gridScrollTop=t.scrollTop),
n.apply(this,arguments)}}),e[a+"_view"]=function(t){if(e._grid._sort_marker=null,delete e._gridView,e._grid._gridScrollTop=0,e._rendered=[],e[i]._selected_divs=[],t){var n=null,d=null,r=e[i];r.paging?(n=e.date[a+"_start"](new Date(e._date)),d=e.date["add_"+a](n,1)):(n=e.config[a+"_start"],d=e.config[a+"_end"]),e._min_date=n,e._max_date=d,e._grid.set_full_view(i);var _="";+n>+new Date(0)&&+d<+new Date(9999,1,1)&&(_=e.templates[a+"_date"](n,d)),e._els.dhx_cal_date[0].innerHTML=_,e._gridView=i}}},e.dblclick_dhx_grid_area=function(){
!this.config.readonly&&this.config.dblclick_create&&this.addEventNow()},e._click.dhx_cal_header&&(e._old_header_click=e._click.dhx_cal_header),e._click.dhx_cal_header=function(t){if(e._gridView){var n=t||window.event,a=e._grid.get_sort_params(n,e._gridView);e._grid.draw_sort_marker(n.originalTarget||n.srcElement,a.dir),e.clear_view(),e._grid._fill_grid_tab(e._gridView,a)}else if(e._old_header_click)return e._old_header_click.apply(this,arguments)},e._grid.selectEvent=function(t,n,a){if(e.callEvent("onBeforeRowSelect",[t,a])){
var i=e._grid._getObjName(n);e.for_rendered(t,function(t){t.className+=" dhx_grid_event_selected",e[i]._selected_divs.push(t)}),e._select_id=t}},e._grid._unselectDiv=function(e){e.className=e.className.replace(/ dhx_grid_event_selected/,"")},e._grid.unselectEvent=function(t,n){var a=e._grid._getObjName(n);if(a&&e[a]._selected_divs)if(t){for(var i=0;i<e[a]._selected_divs.length;i++)if(e[a]._selected_divs[i].getAttribute("event_id")==t){e._grid._unselectDiv(e[a]._selected_divs[i]),e[a]._selected_divs.slice(i,1);

break}}else{for(var i=0;i<e[a]._selected_divs.length;i++)e._grid._unselectDiv(e[a]._selected_divs[i]);e[a]._selected_divs=[]}},e._grid.get_sort_params=function(t,n){var a=t.originalTarget||t.srcElement,i="desc";"dhx_grid_view_sort"==a.className&&(a=a.parentNode),a.className&&-1!=a.className.indexOf("dhx_grid_sort_asc")||(i="asc");for(var d=0,r=0;r<a.parentNode.childNodes.length;r++)if(a.parentNode.childNodes[r]==a){d=r;break}var _=null;if(e[n].columns[d].template){var o=e[n].columns[d].template;_=function(e){
return o(e.start_date,e.end_date,e)}}else{var l=e[n].columns[d].id;"date"==l&&(l="start_date"),_=function(e){return e[l]}}var s=e[n].columns[d].sort;return"function"!=typeof s&&(s=e._grid.sort_rules[s]||e._grid.sort_rules.str),{dir:i,value:_,rule:s}},e._grid.draw_sort_marker=function(t,n){"dhx_grid_view_sort"==t.className&&(t=t.parentNode),e._grid._sort_marker&&(e._grid._sort_marker.className=e._grid._sort_marker.className.replace(/( )?dhx_grid_sort_(asc|desc)/,""),e._grid._sort_marker.removeChild(e._grid._sort_marker.lastChild)),
t.className+=" dhx_grid_sort_"+n,e._grid._sort_marker=t;var a="<div class='dhx_grid_view_sort' style='left:"+(+t.style.width.replace("px","")-15+t.offsetLeft)+"px'>&nbsp;</div>";t.innerHTML+=a},e._grid.sort_grid=function(t){var t=t||{dir:"desc",value:function(e){return e.start_date},rule:e._grid.sort_rules.date},n=e.get_visible_events();return n.sort("desc"==t.dir?function(e,n){return t.rule(e,n,t.value)}:function(e,n){return-t.rule(e,n,t.value)}),n},e._grid.set_full_view=function(t){if(t){var n=(e.locale.labels,
e._grid._print_grid_header(t));e._els.dhx_cal_header[0].innerHTML=n,e._table_view=!0,e.set_sizes()}},e._grid._calcPadding=function(t,n){var a=(void 0!==t.paddingLeft?1*t.paddingLeft:e[n].defPadding)+(void 0!==t.paddingRight?1*t.paddingRight:e[n].defPadding);return a},e._grid._getStyles=function(e,t){for(var n=[],a="",i=0;t[i];i++)switch(a=t[i]+":",t[i]){case"text-align":e.align&&n.push(a+e.align);break;case"vertical-align":e.valign&&n.push(a+e.valign);break;case"padding-left":void 0!==e.paddingLeft&&n.push(a+(e.paddingLeft||"0")+"px");

break;case"padding-right":void 0!==e.paddingRight&&n.push(a+(e.paddingRight||"0")+"px")}return n},e._grid._fill_grid_tab=function(t,n){for(var a=(e._date,e._grid.sort_grid(n)),i=e[t].columns,d="<div>",r=-2,_=0;_<i.length;_++){var o=e._grid._calcPadding(i[_],t);r+=i[_].width+o,_<i.length-1&&(d+="<div class='dhx_grid_v_border' style='left:"+r+"px'></div>")}d+="</div>",d+="<div class='dhx_grid_area'><table>";for(var _=0;_<a.length;_++)d+=e._grid._print_event_row(a[_],t);d+="</table></div>",e._els.dhx_cal_data[0].innerHTML=d,
e._els.dhx_cal_data[0].lastChild.scrollTop=e._grid._gridScrollTop||0;var l=e._els.dhx_cal_data[0].getElementsByTagName("tr");e._rendered=[];for(var _=0;_<l.length;_++)e._rendered[_]=l[_]},e._grid._print_event_row=function(t,n){var a=[];t.color&&a.push("background:"+t.color),t.textColor&&a.push("color:"+t.textColor),t._text_style&&a.push(t._text_style),e[n].rowHeight&&a.push("height:"+e[n].rowHeight+"px");var i="";a.length&&(i="style='"+a.join(";")+"'");for(var d=e[n].columns,r=e.templates.event_class(t.start_date,t.end_date,t),_="<tr class='dhx_grid_event"+(r?" "+r:"")+"' event_id='"+t.id+"' "+i+">",o=e._grid._getViewName(n),l=["text-align","vertical-align","padding-left","padding-right"],s=0;s<d.length;s++){
var c;c=d[s].template?d[s].template(t.start_date,t.end_date,t):"date"==d[s].id?e.templates[o+"_full_date"](t.start_date,t.end_date,t):"start_date"==d[s].id||"end_date"==d[s].id?e.templates[o+"_single_date"](t[d[s].id]):e.templates[o+"_field"](d[s].id,t);var h=e._grid._getStyles(d[s],l),u=d[s].css?' class="'+d[s].css+'"':"";_+="<td style='width:"+d[s].width+"px;"+h.join(";")+"' "+u+">"+c+"</td>"}return _+="<td class='dhx_grid_dummy'></td></tr>"},e._grid._print_grid_header=function(t){for(var n="<div class='dhx_grid_line'>",a=e[t].columns,i=[],d=a.length,r=e._obj.clientWidth-2*a.length-20,_=0;_<a.length;_++){
var o=1*a[_].initialWidth;isNaN(o)||""===a[_].initialWidth||null===a[_].initialWidth||"boolean"==typeof a[_].initialWidth?i[_]=null:(d--,r-=o,i[_]=o)}for(var l=Math.floor(r/d),s=["text-align","padding-left","padding-right"],c=0;c<a.length;c++){var h=i[c]?i[c]:l;a[c].width=h-e._grid._calcPadding(a[c],t);var u=e._grid._getStyles(a[c],s);n+="<div style='width:"+(a[c].width-1)+"px;"+u.join(";")+"'>"+(void 0===a[c].label?a[c].id:a[c].label)+"</div>"}return n+="</div>"}});