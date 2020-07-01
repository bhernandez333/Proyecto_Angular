import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  public tareas: Tarea[];

  constructor() { }
}
