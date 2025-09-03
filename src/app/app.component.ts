import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '../../projects/picker/src/public_api';
import { CalendarAgenda } from '../../projects/picker/src/lib/date-time/calendar-agenda.class';

/** One day in milliseconds */
const ONE_DAY = 24 * 60 * 60 * 1000;

@Component({
  standalone: true,
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [
    FormsModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class AppComponent {
  protected readonly currentTab = signal<string>('date-range');

  protected selectedDates: [Date, Date] = [
    new Date('2025-09-02T10:26:00'),
    new Date('2025-09-04T10:26:00')
  ];

  protected selectedDateWithAgenda = new Date();

  protected agendas: CalendarAgenda[] = [];

  constructor() {
    const today = new Date();
    const yesterday = new Date(Date.now() - ONE_DAY);
    const tomorrow = new Date(Date.now() + ONE_DAY);
    const dayAfterTomorrow = new Date(Date.now() + 2 * ONE_DAY);

    this.agendas = [
      // Yesterday
      { start: yesterday, end: yesterday },

      // Today
      { start: today, end: today },
      { start: today, end: today },
      { start: today, end: today },

      // Tomorrow
      { start: tomorrow, end: tomorrow },
      { start: tomorrow, end: tomorrow },

      // Day after tomorrow
      ...Array.from({ length: 10 }, () => ({ start: dayAfterTomorrow, end: dayAfterTomorrow }))
    ];
  }

  protected currentValue: Date = new Date(this.selectedDates[0]);

  protected endValue: Date = new Date(this.selectedDates[1]);

  protected selectedTrigger(date: Date): void {
    console.log(date);
  }
}
