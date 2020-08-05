import { Component, OnInit, Input } from '@angular/core';
import { Tarea } from 'src/app/models/tarea';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
  @Input() tarea: Tarea;

  constructor(private tareaSvc: PrincipalService) { }

  ngOnInit(): void {
  }

  // Elimina un item de la lista.
  eliminar(): void { 
    // Filtro la lista de tareas de acuerdo a la posición de memoria.
    this.tareaSvc.tareas = this.tareaSvc.tareas.filter(cadaTarea => {
      return cadaTarea !== this.tarea;
    });
    this.tareaSvc.deleteTarea(this.tarea).subscribe((resp) => console.log('RESPONSE', resp));
  }

}
