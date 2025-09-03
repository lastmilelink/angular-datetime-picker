import { ChangeDetectionStrategy, Component, Inject, Input, Optional } from '@angular/core';
import { OwlDateTimeIntl } from './date-time-picker-intl.service';
import { DateTimeAdapter } from './adapter/date-time-adapter.class';
import { OWL_DATE_TIME_FORMATS, OwlDateTimeFormats } from './adapter/date-time-format.class';
import { CalendarAgenda } from './calendar-agenda.class';

@Component({
    selector: 'owl-date-time-agenda-list',
    templateUrl: './agenda-list.component.html',
    styleUrls: ['./agenda-list.component.scss'],
    standalone: false,
    preserveWhitespaces: false,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwlAgendaListComponent<T> {
    @Input()
    agendas: CalendarAgenda[] = [];

    constructor(
        protected pickerIntl: OwlDateTimeIntl,
        @Optional() protected dateTimeAdapter: DateTimeAdapter<T>,
        @Optional() @Inject(OWL_DATE_TIME_FORMATS) protected dateTimeFormats: OwlDateTimeFormats
    ) {}

    formatTime(time: Date): string {
        const d = this.dateTimeAdapter.deserialize(time);
        return this.dateTimeAdapter.format(d, this.dateTimeFormats.timePickerInput);
    }
}
