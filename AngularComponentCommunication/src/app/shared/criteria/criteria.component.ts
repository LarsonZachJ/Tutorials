import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('filterElement', { static: false }) filterElementRef: ElementRef;

  @Input()
  displayDetail: boolean;

  @Input()
  hitCount: number;

  hitMessage: string;

  listFilter: string;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.hitCount.currentValue) {
      this.hitMessage = `Hits: ${this.hitCount}`;
    } else {
      this.hitMessage = `No matches found`;
    }
  }

  ngAfterViewInit(): void {
    this.filterElementRef.nativeElement.focus();
  }
  ngOnInit(): void {}
  constructor() {}
}
