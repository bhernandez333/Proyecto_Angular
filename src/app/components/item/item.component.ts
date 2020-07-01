import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() tarea: Tarea;

  constructor() { }

  ngOnInit(): void {
  }

}
