import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'venite-add-block',
  templateUrl: './add-block.component.html',
  styleUrls: ['./add-block.component.scss'],
})
export class AddBlockComponent implements OnInit {
  @Input() modal : any;

  constructor() { }

  ngOnInit() {}

}
