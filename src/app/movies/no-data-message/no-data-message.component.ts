import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-no-data-message',
  templateUrl: './no-data-message.component.html',
  styleUrls: ['./no-data-message.component.scss']
})
export class NoDataMessageComponent implements OnInit {
  @Input() message: string;
  @Input() additional: string;

  constructor() { }

  ngOnInit(): void {
  }

}
