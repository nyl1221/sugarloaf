import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { YieldFormula } from './hero';

@Injectable({ providedIn: 'root' })
export class YieldFormulaService {
  private yieldFormulasUrl = 'api/yieldFormulas'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getYieldFormulas(): Observable<YieldFormula[]> {
    return this.http.get<YieldFormula[]>(this.yieldFormulasUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<YieldFormula[]>('getYieldFormulas', []))
    );
  }

  getFormula(id: number): Observable<YieldFormula> {
    const url = `${this.yieldFormulasUrl}/${id}`;
    return this.http.get<YieldFormula>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(this.handleError<YieldFormula>(`getYieldFormula id=${id}`))
    );
  }

  /** PUT: update the hero on the server */
  updateYieldFormula(hero: YieldFormula): Observable<any> {
    return this.http.put(this.yieldFormulasUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateYieldFormula'))
    );
  }

  /** POST: add a new hero to the server */
  addYieldFormula(hero: YieldFormula): Observable<YieldFormula> {
    return this.http
      .post<YieldFormula>(this.yieldFormulasUrl, hero, this.httpOptions)
      .pipe(
        tap((newYieldFormula: YieldFormula) =>
          this.log(`added hero w/ id=${newYieldFormula.id}`)
        ),
        catchError(this.handleError<YieldFormula>('addYieldFormula'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteYieldFormula(hero: YieldFormula | number): Observable<YieldFormula> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.yieldFormulasUrl}/${id}`;

    return this.http.delete<YieldFormula>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<YieldFormula>('deleteYieldFormula'))
    );
  }

  /* GET heroes whose name contains search term */
  searchYieldFormulas(term: string): Observable<YieldFormula[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<YieldFormula[]>(`${this.yieldFormulasUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(this.handleError<YieldFormula[]>('searchYieldFormulaes', []))
      );
  }

  /** Log a YieldFormulaService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`YieldFormulaService: ${message}`);
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
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
