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
    // Initialize with current month's agendas
    this.generateAgendasForMonth(new Date());
  }

  protected currentValue: Date = new Date(this.selectedDates[0]);

  protected endValue: Date = new Date(this.selectedDates[1]);

  protected selectedTrigger(date: Date): void {
    console.log(date);
  }

  protected onMonthChanged(month: Date): void {
    this.currentMonth = month;
    this.generateAgendasForMonth(month);
    console.log('Month changed to:', month.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long' 
    }));
  }

  private generateAgendasForMonth(month: Date): void {
    const year = month.getFullYear();
    const monthIndex = month.getMonth();
    const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();
    
    // Clear existing agendas
    this.agendas = [];
    
    // Generate different agenda patterns for each month
    const monthPatterns = this.getMonthPatterns(monthIndex);
    
    // Generate agendas for random days in the month
    const agendaDays = this.getRandomDays(daysInMonth, monthPatterns.agendaCount);
    
    agendaDays.forEach(day => {
      const dayDate = new Date(year, monthIndex, day);
      const agendasForDay = this.generateAgendasForDay(dayDate, monthPatterns);
      this.agendas.push(...agendasForDay);
    });
    
    console.log(`Generated ${this.agendas.length} agendas for ${month.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}`);
  }

  private getMonthPatterns(monthIndex: number): { agendaCount: number; timeSlots: number[]; duration: number } {
    const patterns = {
      0: { agendaCount: 8, timeSlots: [9, 10, 11, 14, 15, 16, 17, 18], duration: 60 }, // January - Winter meetings
      1: { agendaCount: 12, timeSlots: [8, 9, 10, 11, 13, 14, 15, 16, 17, 18, 19, 20], duration: 45 }, // February - Valentine's busy
      2: { agendaCount: 6, timeSlots: [10, 11, 14, 15, 16, 17], duration: 90 }, // March - Spring planning
      3: { agendaCount: 15, timeSlots: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], duration: 30 }, // April - Tax season
      4: { agendaCount: 10, timeSlots: [9, 10, 11, 12, 13, 14, 15, 16, 17, 18], duration: 75 }, // May - Spring reviews
      5: { agendaCount: 7, timeSlots: [9, 10, 11, 14, 15, 16, 17], duration: 120 }, // June - Summer prep
      6: { agendaCount: 5, timeSlots: [10, 11, 14, 15, 16], duration: 60 }, // July - Summer vacation
      7: { agendaCount: 9, timeSlots: [8, 9, 10, 11, 13, 14, 15, 16, 17], duration: 50 }, // August - Back to school
      8: { agendaCount: 11, timeSlots: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18], duration: 40 }, // September - Fall planning
      9: { agendaCount: 13, timeSlots: [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20], duration: 35 }, // October - Halloween busy
      10: { agendaCount: 6, timeSlots: [9, 10, 11, 14, 15, 16], duration: 90 }, // November - Thanksgiving prep
      11: { agendaCount: 4, timeSlots: [10, 11, 14, 15], duration: 120 } // December - Holiday season
    };
    
    return patterns[monthIndex as keyof typeof patterns] || patterns[0];
  }

  private getRandomDays(daysInMonth: number, count: number): number[] {
    const days = Array.from({ length: daysInMonth }, (_, i) => i + 1);
    const shuffled = days.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, daysInMonth));
  }

  private generateAgendasForDay(dayDate: Date, pattern: { timeSlots: number[]; duration: number }): CalendarAgenda[] {
    const agendas: CalendarAgenda[] = [];
    const agendaCount = Math.floor(Math.random() * 4) + 1; // 1-4 agendas per day
    const selectedTimeSlots = this.getRandomTimeSlots(pattern.timeSlots, agendaCount);
    
    selectedTimeSlots.forEach(timeSlot => {
      const start = new Date(dayDate);
      start.setHours(timeSlot, Math.floor(Math.random() * 4) * 15, 0, 0); // Random minutes (0, 15, 30, 45)
      
      const end = new Date(start);
      end.setMinutes(end.getMinutes() + pattern.duration + Math.floor(Math.random() * 30)); // Add some variation
      
      agendas.push({ start, end });
    });
    
    return agendas;
  }

  private getRandomTimeSlots(timeSlots: number[], count: number): number[] {
    const shuffled = [...timeSlots].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.min(count, timeSlots.length));
  }
}
