import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';

export interface SearchData {
  term?: string;
  year?: number;
}

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  @Input('data') inputData: SearchData
  @Output('search') searchData = new EventEmitter<SearchData>()
  searchForm: FormGroup

  constructor() { }

  ngOnInit(): void {
    this.initForm()
  }

  private initForm(): void {
    console.log(this.inputData)
    this.searchForm = new FormGroup({
      term: new FormControl(this.inputData.term),
      year: new FormControl(this.inputData.year)
    })
  }

  ngOnChanges() {
    this.searchForm = new FormGroup({
      term: new FormControl(this.inputData.term),
      year: new FormControl(this.inputData.year)
    })
  }

  onSubmit(): void {
    this.searchData.emit(this.searchForm.value)
  }
}
