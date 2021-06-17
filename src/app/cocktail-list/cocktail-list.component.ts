import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { Cocktail } from '../models/Cocktail';
import { CocktailService } from '../services/cocktail.service';

@Component({
  selector: 'app-cocktail-list',
  templateUrl: './cocktail-list.component.html',
  styleUrls: ['./cocktail-list.component.css']
})
export class CocktailListComponent implements OnInit {
  cocktails$ : Observable<Cocktail[]> = new Observable<Cocktail[]>();
  constructor(private service : CocktailService) { }

  ngOnInit(): void {
    this.cocktails$ = this.service.listByFirstLetter('b');
    console.log(this.cocktails$);
  }

}
