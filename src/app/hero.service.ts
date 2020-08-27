import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { MessageService } from './message.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { YieldCalculation } from './hero';

@Injectable({ providedIn: 'root' })
export class YieldCalculationService {
  private yieldFormulasUrl = 'api/yieldFormulas'; // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(
    private http: HttpClient,
    private messageService: MessageService
  ) {}

  getYieldFormulas(): Observable<YieldCalculation[]> {
    return this.http.get<YieldCalculation[]>(this.yieldFormulasUrl).pipe(
      tap((_) => this.log('fetched heroes')),
      catchError(this.handleError<YieldCalculation[]>('getYieldFormulas', []))
    );
  }

  getFormula(id: number): Observable<YieldCalculation> {
    const url = `${this.yieldFormulasUrl}/${id}`;
    return this.http.get<YieldCalculation>(url).pipe(
      tap((_) => this.log(`fetched hero id=${id}`)),
      catchError(
        this.handleError<YieldCalculation>(`getYieldCalculation id=${id}`)
      )
    );
  }

  /** PUT: update the hero on the server */
  updateYieldFormula(hero: YieldCalculation): Observable<any> {
    return this.http.put(this.yieldFormulasUrl, hero, this.httpOptions).pipe(
      tap((_) => this.log(`updated hero id=${hero.id}`)),
      catchError(this.handleError<any>('updateYieldFormula'))
    );
  }

  /** POST: add a new hero to the server */
  addYieldFormula(hero: YieldCalculation): Observable<YieldCalculation> {
    return this.http
      .post<YieldCalculation>(this.yieldFormulasUrl, hero, this.httpOptions)
      .pipe(
        tap((newYieldCalculation: YieldCalculation) =>
          this.log(`added hero w/ id=${newYieldCalculation.id}`)
        ),
        catchError(this.handleError<YieldCalculation>('addYieldFormula'))
      );
  }

  /** DELETE: delete the hero from the server */
  deleteYieldFormula(
    hero: YieldCalculation | number
  ): Observable<YieldCalculation> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.yieldFormulasUrl}/${id}`;

    return this.http.delete<YieldCalculation>(url, this.httpOptions).pipe(
      tap((_) => this.log(`deleted hero id=${id}`)),
      catchError(this.handleError<YieldCalculation>('deleteYieldFormula'))
    );
  }

  /* GET heroes whose name contains search term */
  searchYieldFormulas(term: string): Observable<YieldCalculation[]> {
    if (!term.trim()) {
      // if not search term, return empty hero array.
      return of([]);
    }
    return this.http
      .get<YieldCalculation[]>(`${this.yieldFormulasUrl}/?name=${term}`)
      .pipe(
        tap((x) =>
          x.length
            ? this.log(`found heroes matching "${term}"`)
            : this.log(`no heroes matching "${term}"`)
        ),
        catchError(
          this.handleError<YieldCalculation[]>('searchYieldCalculationes', [])
        )
      );
  }

  /** Log a YieldCalculationService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`YieldCalculationService: ${message}`);
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
