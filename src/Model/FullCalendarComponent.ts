import {AfterViewInit,Component,Output,Input,EventEmitter} from '@angular/core';


class FullCalendarMethod{
  viewRender;
  select
}

export class FullCalendarComponent implements AfterViewInit {
  constructor() {
  }

  defaultOption: Object = {};

  @Output() onSelect = new EventEmitter();
  @Output() onViewRender = new EventEmitter();
  // option pour surcharger l’option par défaut
  @Input() calendarOptions: Object;

  ngAfterViewInit() {

    let extendDefaultOption = $.extend({}, this.calendarOptions, this.defaultOption);
    // surcharge de l’option en ajoutant les méthodes
    this.calendarOptions = $.extend({}, extendDefaultOption, this.fullCalendarMethod());
    // instantiation de fullcalendar
    $(".fullcalendar").fullCalendar(this.calendarOptions);

  }

  fullCalendarMethod(): Object {
    let fullCalendarMethod = <FullCalendarMethod>{};
    fullCalendarMethod.viewRender = (view, element) => {
      let viewRenderParams = {
        _view: view,
        _element: element
      };
      this.onViewRender.emit(viewRenderParams);
    };


    fullCalendarMethod.select = (start, end) => {
      let dateRange = {
        _start: start,
        _end: end
      };
      this.onSelect.emit(dateRange);
    };
    // ajouter d’autre méthode fullcalendar ici
    return fullCalendarMethod;

  }
}
