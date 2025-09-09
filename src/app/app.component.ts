import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
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
    DatePipe,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ]
})
export class AppComponent {
  protected readonly currentTab = signal<string>('date-range');

  protected selectedDates: [Date, Date] = [
    new Date(new Date().setDate(new Date().getDate() + 1)), // Tomorrow
    new Date(new Date().setDate(new Date().getDate() + 3))  // Day after tomorrow + 1
  ];

  protected selectedDateWithAgenda = new Date();

  protected currentMonth = new Date();

  protected agendas: CalendarAgenda[] = [];

  constructor() {
    const now = new Date();
    const yesterday = new Date(new Date().setDate(now.getDate() - 1));
    const today = new Date();
    const tomorrow = new Date(new Date().setDate(now.getDate() + 1));
    const dayAfterTomorrow = new Date(new Date().setDate(now.getDate() + 2));

    this.agendas = [
      // Yesterday
      { start: new Date(yesterday.setHours(10, 0, 0, 0)), end: new Date(yesterday.setHours(11, 0, 0, 0)) },

      // Today
      { start: new Date(today.setHours(9, 0, 0, 0)), end: new Date(today.setHours(10, 30, 0, 0)) },
      { start: new Date(today.setHours(14, 0, 0, 0)), end: new Date(today.setHours(15, 0, 0, 0)) },
      { start: new Date(today.setHours(16, 30, 0, 0)), end: new Date(today.setHours(17, 0, 0, 0)) },

      // Tomorrow
      { start: new Date(tomorrow.setHours(11, 0, 0, 0)), end: new Date(tomorrow.setHours(12, 0, 0, 0)) },
      { start: new Date(tomorrow.setHours(15, 30, 0, 0)), end: new Date(tomorrow.setHours(16, 0, 0, 0)) },

      // Day after tomorrow
      ...Array.from({ length: 10 }, (_, i) => {
          const startHour = 8 + i;
          const start = new Date(dayAfterTomorrow.setHours(startHour, 0, 0, 0));
          const end = new Date(dayAfterTomorrow.setHours(startHour, 30, 0, 0));
          return { start, end };
      })
    ];
  }

  protected currentValue: Date = new Date(this.selectedDates[0]);

  protected endValue: Date = new Date(this.selectedDates[1]);

  protected selectedTrigger(date: Date): void {
    console.log(date);
  }

  protected onMonthChanged(month: Date): void {
    this.currentMonth = month;
    console.log('Month changed to:', month.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }));
  }
}
