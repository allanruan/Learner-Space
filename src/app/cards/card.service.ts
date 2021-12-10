import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from '../models/card';
import { Deck } from '../models/deck';
import { Observable } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class CardService {

  private cardUrl = 'http://localhost:5000/api/cards';
  private deckUrl = 'http://localhost:5000/api/decks';
  constructor(private http: HttpClient) { }

  getCards(owner:any):Observable<Card[]>{
    return this.http.post<Card[]>(this.cardUrl+'/cardowner',owner,httpOptions);
  }
  addCard(card: Card): Observable<any> {
    return this.http.post<any>(this.cardUrl, card,httpOptions)
  }
  updateCardById(card:Card, id: any): Observable<Task> {
    return this.http.put<Task>(`${this.cardUrl}/${id}`, card, httpOptions);
  }

  getDecks(owner:any):Observable<Deck[]>{
    return this.http.post<Deck[]>(this.deckUrl+'/deckowner',owner,httpOptions);
  }
  addDeck(deck: Deck): Observable<any> {
    return this.http.post<any>(this.deckUrl, deck,httpOptions)
  }
  updateDeckById(deck:Deck, id: any): Observable<Deck> {
    return this.http.put<Deck>(`${this.deckUrl}/${id}`, deck, httpOptions);
  }
}

