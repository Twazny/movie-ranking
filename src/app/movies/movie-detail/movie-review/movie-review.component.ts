import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-movie-review',
  templateUrl: './movie-review.component.html',
  styleUrls: ['./movie-review.component.scss']
})
export class MovieReviewComponent implements OnInit {
  @Input() review

  form: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.form = new FormGroup({
      title: new FormControl('', Validators.required),
      review: new FormControl('', Validators.required)
    })
  }

  onSubmit(): void {
    if (!this.form.valid) {
      return
    }
  }
}
