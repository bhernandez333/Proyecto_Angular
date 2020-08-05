import { Injectable } from '@angular/core';
import { Tarea } from '../models/tarea';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PrincipalService {
  public tareas: Tarea[];

  tareasUrl = 'http://127.0.0.1:4000';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) {
    this.tareas = new Array<Tarea>();
   }

  //////// Metodos para consultar. //////////
  /** GET: obtener las tareas del servidor. */
  getTareas(): Observable<any> {
    return this.http.get<any>(`${this.tareasUrl}/tareas`)
      .pipe(
        tap(tarea => {
          const tareas = tarea.tareas;
          console.log(tarea);
          tareas.map(t => {
            const nTarea: Tarea = {
              id: t[0],
              usuario: t[3],
              descripcion: t[1],
              fecha: new Date(t[2]),
              estado: t[4]
            };
            this.tareas.push(nTarea);
          });
        }),
        catchError(this.handleError<Tarea[]>('getTareas', []))
      );
  }

  //////// Metodos para modificar. //////////

  /** POST: agrega una nueva tarea al servidor. */
  addTarea(tareaAdd: Tarea): Observable<any> {
    return this.http.post<HttpResponse<any>>(`${this.tareasUrl}/tareas`, tareaAdd, this.httpOptions).pipe(
      tap((newTarea: any) => {
        const { message, tareas } = newTarea;
        var numero = newTarea.tareas.length;
        console.log(newTarea);
        const id = newTarea.tareas[numero-1][0];
        tareaAdd.id = id;
        this.tareas.push(tareaAdd);
      }),
      catchError(this.handleError<Tarea>('addTarea'))
    );
  }

  /** DELETE: borrar la tarea del servidor. */
  deleteTarea(tarea: Tarea | number): Observable<Tarea> {
    const id = typeof tarea === 'number' ? tarea : tarea.id;
    const url = `${this.tareasUrl}/tareas/${id}`;
    console.log(tarea);
    return this.http.delete<Tarea>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted tarea id=${id}`)),
      catchError(this.handleError<Tarea>('deleteTarea'))
    );
  }


  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    }
  }


}
