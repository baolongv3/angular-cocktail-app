import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';
import { CocktailService } from '../services/cocktail.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  ingredients$ : Observable<Array<Ingredient>> = new Observable<Array<Ingredient>>();
  constructor(private service : CocktailService) { }

  ngOnInit(): void {
    this.ingredients$ = this.service.getAllIngredient();
  }

}
