import { Component } from '@angular/core';
import { TemperatureMonitorService } from './temperature-monitor.service';

@Component({
  selector: 'app-root',
  templateUrl: './app/app.component.html',
  styleUrls: ['./app/app.component.css'],
  providers: [TemperatureMonitorService]
})
export class AppComponent {
  title: string = 'app works!';
  temperature: number;
  median: number;
  USED_SIZE: number = 0;
  TOT_SIZE: number = 8;

  constructor(private temperatureMonitorService: TemperatureMonitorService) { }

  recordTemperature(temp: number): void {
    if (this.temperatureMonitorService.temperature_list.length == this.TOT_SIZE) {
      alert('Reached max storage size of ' + this.TOT_SIZE + '.');
    } else {
      if (temp >= -100 && temp <= 100) {
        this.temperatureMonitorService.recordTemperature(temp);
        this.USED_SIZE = this.temperatureMonitorService.getUsedSize();
        this.temperature = undefined;
      } else {
        alert('The entereed temperature should be in the -100 to 100 degress range.');
      }
    }
  }

  getCurrentMedian(): number {
    this.median = this.temperatureMonitorService.getCurrentMedian();
    return this.median;
  }
}

