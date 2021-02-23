import { Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { fromEvent, interval, Subscription } from 'rxjs';
import { throttle } from 'rxjs/operators';

@Component({
  selector: 'app-movie-rating',
  templateUrl: './movie-rating.component.html',
  styleUrls: ['./movie-rating.component.scss']
})
export class MovieRatingComponent implements OnInit {
  @Input() max = 5
  @Input() rating = 0
  @Output() ratingChange = new EventEmitter<number>()
  @ViewChild('container') containerRef: ElementRef

  changeToRating = 0
  changeMode = false
  mouseMoveSubs: Subscription

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.mouseMoveSubs = fromEvent(this.containerRef.nativeElement, 'mousemove').pipe(
      throttle(event => interval(16))
    ).subscribe((event: MouseEvent) => this.onMouseMove(event))
  }

  onMouseEnter(): void {
    this.changeMode = true
  }

  onMouseLeave(): void {
    this.changeMode = false
  }

  onMouseMove(event: MouseEvent): void {
    const target = event.target as HTMLElement
    this.changeToRating = +target.id
  }

  onRatingClick(rating: number): void {
    this.ratingChange.emit(rating)
  }

}
