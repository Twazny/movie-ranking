import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Review } from '../../movie.service';


@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent implements OnInit {
  @Input() review: Review
  @Output('review') reviewEvent = new EventEmitter<Review>()
  @Output('cancel') cancelEvent = new EventEmitter()

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl(this.review.title, Validators.required),
      review: new FormControl(this.review.review, Validators.required)
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return
    }
    const value = this.form.value as Review
    this.reviewEvent.emit(value)
  }

  onCancel(): void {
    this.cancelEvent.emit()
  }
}
