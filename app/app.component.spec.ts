import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ FormsModule ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  }));

  it(`should have as title 'app works!'`, async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('app works!');
  }));

  it('should render title in a h4 tag', async(() => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h4').textContent).toContain('app works!');
  }));
  
  it('the median calculation should be correct', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.median).toEqual(undefined);
      
      app.recordTemperature(1);
      app.recordTemperature(3);
      app.recordTemperature(2);
      
      app.getCurrentMedian();
      expect(app.median).toEqual(2);
      
      app.recordTemperature(5);
      app.recordTemperature(4);
      
      app.getCurrentMedian();
      expect(app.median).toEqual(3);
  });
  
  it('temperatures should be added to array', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      expect(app.USED_SIZE).toEqual(0);
      
      app.recordTemperature(1);
      app.recordTemperature(3);
      app.recordTemperature(2);
      
      let current_array_size = app.USED_SIZE;
      expect(current_array_size).toEqual(3);
      
      app.recordTemperature(5);
      app.recordTemperature(4);
      
      let updated_array_size = app.USED_SIZE;
      expect(updated_array_size).toEqual(5);
  });
  
  it('temperatures not in the -100 to 100 should be rejected', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      
      app.recordTemperature(200);
      expect(app.USED_SIZE).toEqual(0);
      expect(app.median).toEqual(undefined);
  });
  
  it('no more temperature added after the array is full', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      
      for (var _i = 0; _i < app.TOT_SIZE; _i++) {
        app.recordTemperature(_i);
      }
      
      let array_size  = app.USED_SIZE;
      let median_at_max = app.getCurrentMedian();
      
      // add one extra temperature
      app.recordTemperature(-1); 
      
      expect(app.USED_SIZE).toEqual(array_size);
      expect(app.median).toEqual(median_at_max);
  });
  
  it('the temperature variable should be set to undefined after the previous one is recorded', () => {
      const fixture = TestBed.createComponent(AppComponent);
      const app = fixture.debugElement.componentInstance;
      
      app.recordTemperature(-1); 
      
      expect(app.USED_SIZE).toEqual(1);
      expect(app.temperature).toEqual(undefined);
  });
  
});
