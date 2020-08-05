import { Component, OnInit } from '@angular/core';
import { PrincipalService } from 'src/app/services/principal.service';

@Component({
  selector: 'app-lista',
  templateUrl: './lista.component.html',
  styleUrls: ['./lista.component.scss']
})
export class ListaComponent implements OnInit {

  constructor(public service: PrincipalService) { }

  ngOnInit(): void {
    this.service.getTareas().subscribe(resp => {
    });
  }
}
