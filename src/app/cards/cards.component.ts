import { Component, OnInit, ɵɵsetComponentScope } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Card } from '../models/card';
import { Deck } from '../models/deck';
import { CardService } from './card.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthModule } from '../auth/auth.module';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  cards:Card[] = [];
  decks:Deck[] = [];
  flag:number = 1;
  cNo:number = 0;
  front:boolean = true;
  cardData: any = {};
  deckData: any = {};
  errors: any = [];
  deckSelected:Deck;
  deckSelectedId:Number;

  constructor(private cardSer:CardService, public auth:AuthService) { }

  ngOnInit(): void {
    this.initDeckForm();
    this.initCardForm();
    this.loadDecks();
    this.loadCards();
  }
  
  initDeckForm(): void {
    this.deckData={Owner:this.auth.getUserid(),deckname:''};
  }
  initCardForm(): void{
    this.cardData={deck:this.deckSelectedId,owner:this.auth.getUserid(),front:'',back:''}
  }
  startReview():void{
    this.flag = 2;
  }

  loadDecks():void{
    this.cardSer.getDecks(this.deckData).subscribe(data=>this.decks=data, error=>console.log(error));
    this.decks.length=this.decks.length;
    console.log('length is: '+this.decks.length)
  }

  loadCards():void{
    this.cardSer.getCards(this.cardData).subscribe(data=>this.cards=data, error=>console.log(error));
    this.cards.length=this.cards.length;
  }

  loadCard(idx):void{
    this.front=true;
    this.flag=2;
    this.cNo=idx;
  }
  loadNext():void{
    this.front=true;
    if(this.cNo+1<this.cards.length){
      this.loadCard(this.cNo+1)
    }
    
    console.log("cno: "+ this.cNo + " size cards: "+ this.cards.length)
  }
  flipCard():void{
    if(this.front){
      this.front=false;
    }
    else {this.front = true};
  }
  loadPrev():void{
    this.front=true;
    if(this.cNo+1<this.cards.length){
      this.loadCard(this.cNo-1);
    }
    
  }
  createDeck(): void {
    console.log(this.deckData);
    this.errors = [];
    this.cardSer.addDeck(this.deckData)
      .subscribe(() => {
        this.flag=1;
        this.loadDecks();
        this.initDeckForm();
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
  
  selectDeck(deck:Deck):void{
    this.deckSelected = deck;
    this.deckSelectedId=deck._id;
    console.log(typeof(this.deckSelectedId));
    this.initCardForm();
    this.flag=1;
  }
  
createCard():void{
  console.log(this.cardData);
  console.log(typeof(this.cardData.deck))
    this.errors = [];
    this.cardSer.addCard(this.cardData)
      .subscribe(() => {
        this.flag=1;
        this.loadCards();
        this.initCardForm();
       },
        (errorResponse) => {
          this.errors.push(errorResponse.error.error);
        });
  }
}