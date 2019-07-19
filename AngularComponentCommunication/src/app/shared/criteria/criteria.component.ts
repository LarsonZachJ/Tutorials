import {
  Component,
  OnInit,
  ViewChild,
  ElementRef,
  AfterViewInit,
  Input,
  OnChanges,
  SimpleChanges,
  Output,
  EventEmitter,
} from '@angular/core';
import { NgModel } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ProductParamterService } from '@app/products/product-paramter.service';

@Component({
  selector: 'app-criteria',
  templateUrl: './criteria.component.html',
  styleUrls: ['./criteria.component.scss'],
})
export class CriteriaComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('filterElement', { static: false }) filterElementRef: ElementRef;
  @ViewChild(NgModel, { static: false }) filterInput: NgModel;

  @Output() filterChange: EventEmitter<string> = new EventEmitter<string>();
  @Input()
  displayDetail: boolean;

  @Input()
  hitCount: number;

  hitMessage: string;

  get listFilter(): string {
    return this.productParameterService.filterBy;
  }

  set listFilter(value: string) {
    this.productParameterService.filterBy = value;
    this.filterChange.emit(this.listFilter);
  }

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
  constructor(private productParameterService: ProductParamterService) {}
}
