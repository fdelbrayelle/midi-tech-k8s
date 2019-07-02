import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Beer, IBeer } from './beer.model';

type EntityArrayResponseType = HttpResponse<IBeer[]>;

@Injectable(({ providedIn: 'root' }))
export class AppService {
  constructor(protected http: HttpClient) {}

  public resourceUrl = 'http://localhost:8080/beers/';

  findAllBeers(): Observable<EntityArrayResponseType> {
    return this.http.get<IBeer[]>(this.resourceUrl, { observe: 'response' });
  }

  addBeer(beer: Beer) {
    this.http.post<IBeer>(this.resourceUrl, beer, { observe: 'response' });
  }
}
