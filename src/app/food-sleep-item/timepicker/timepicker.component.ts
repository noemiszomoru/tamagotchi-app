import { Component, OnInit, Input } from '@angular/core';
import { min } from 'rxjs/operators';
import { SleepEntry } from 'src/app/models/sleep-entry.model';
import { FoodSleep } from 'src/app/models/food-sleep.model';
import { DataStorageService } from 'src/app/shared/data.storage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timepicker',
  templateUrl: './timepicker.component.html',
  styleUrls: ['./timepicker.component.css']
})
export class TimepickerComponent implements OnInit {
  @Input() food_sleepEl: FoodSleep;
  @Input() dateIdentifier: string;
  @Input() start: number;
  @Input() end: number;

  public time = {
    hour: 13,
    minute: 30
  };
  private startTime;
  private startOffset;
  public dragTime;
  private dragStep = 1;
  private timepicker = null;
  private min = 13 * 60;
  private max = 17 * 60;

  private mouseMode = false;

  formattedTime = '13:00';


  constructor(private dataStorageService: DataStorageService, private router: Router) { }

  ngOnInit() {
  }

  mouseDown = (ev) => {
    console.log('down');
    // ev.stopImmediatePropagation();
    // ev.stopPropagation();
    // ev.preventDefault();

    // We check here if this is an event from mouse or from touch
    if (ev.pageX) {
      this.mouseMode = true;
    } else {
      this.mouseMode = false;
    }

    window.removeEventListener('touchmove', this.mouseMove);
    window.removeEventListener('touchend', this.mouseUp);

    window.addEventListener('touchmove', this.mouseMove);
    window.addEventListener('touchend', this.mouseUp);

    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mouseup', this.mouseUp);

    window.addEventListener('mousemove', this.mouseMove);
    window.addEventListener('mouseup', this.mouseUp);

    if (this.mouseMode) {
      this.startOffset = ev.pageX;
    } else {
      this.startOffset = ev.changedTouches[0].clientX;

    }
    this.startTime = this.time.hour * 60 + this.time.minute;

    // console.log(this.startTime);
  }

  mouseMove = (ev) => {
    console.log(ev);
    if (this.mouseMode) {
      this.dragTime = Math.round((this.startTime + (ev.pageX - this.startOffset) / this.dragStep) / 15) * 15;
    } else {
      this.dragTime = Math.round((this.startTime + (ev.changedTouches[0].clientX - this.startOffset) / this.dragStep) / 15) * 15;
    }


    // console.log(this.dragTime);

    this.dragTime = Math.min(Math.max(this.dragTime, this.min), this.max);

    this.time = {
      hour: Math.floor(this.dragTime / 60),
      minute: this.dragTime % 60
    };

    this.updateComponent();
  }

  mouseUp = (ev) => {
    console.log('up');
    window.removeEventListener('touchmove', this.mouseMove);
    window.removeEventListener('touchend', this.mouseUp);

    window.removeEventListener('mousemove', this.mouseMove);
    window.removeEventListener('mousetouchend', this.mouseUp);
    // this.onTimeMove();
  }

  pad(value, character, length) {
    value = String(value);
    while (value.length < length) {
      value = character + value;
    }
    return value;
  }

  updateComponent() {
    //this.timepicker.innerHTML = this.time.hour + ':' + this.time.minute;
    this.formattedTime = this.pad(this.time.hour, '0', 2) + ':' + this.pad(this.time.minute, '0', 2);
  }

  // onTimeMove() {
  //   const sleep_entry = new SleepEntry(this.food_sleepEl.pk, this.dateIdentifier, this.start, this.end);
  //   this.dataStorageService.addSleepData(sleep_entry).subscribe(() => {
  //     this.router.navigate(['food-sleep']);
  //   });
  //   console.log('backend');
  //   console.log(this.food_sleepEl.pk);
  //   console.log(this.dragTime);
  //   console.log(sleep_entry);


  // }

}
