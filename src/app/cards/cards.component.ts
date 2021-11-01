import { Component, OnInit } from '@angular/core';
import { Card } from '../models/card';
import { CardService } from '../card.service';

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.css']
})
export class CardsComponent implements OnInit {
  card:Card[] = [];
  flag:number = 1;
  cNo:number = 0;
  front:boolean = true;

  constructor(private cardSer:CardService) { }

  ngOnInit(): void {
    this.loadCards()
  }

  startReview():void{
    this.flag = 2;
  }

  loadCards():void{
    this.cardSer.loadCardDetails().subscribe(data=>this.card=data, error=>console.log(error));
    this.card.length=this.card.length;
  }

  loadCard(idx):void{
    this.front=true;
    this.flag=2;
    this.cNo=idx;
  }
  loadNext():void{
    this.front=true;
    this.loadCard(this.cNo+1)
  }
  flipCard():void{
    if(this.front){
      this.front=false;
    }
    else {this.front = true};
  }
  loadPrev():void{
    this.front=true;
    this.loadCard(this.cNo-1);
  }
}