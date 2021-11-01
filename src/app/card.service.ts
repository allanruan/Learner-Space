import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './models/card';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class CardService {

  constructor(private httpClient:HttpClient) { }

  loadCardDetails():Observable<Card[]>{
    return this.httpClient.get<Card[]>("http://localhost:3000/card");
  }
}

