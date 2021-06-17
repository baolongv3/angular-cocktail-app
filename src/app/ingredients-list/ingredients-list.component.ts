import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Ingredient } from '../models/Ingredient';
import { IngredientService } from '../services/ingredient.service';

@Component({
  selector: 'app-ingredients-list',
  templateUrl: './ingredients-list.component.html',
  styleUrls: ['./ingredients-list.component.css']
})
export class IngredientsListComponent implements OnInit {
  ingredients$ : Observable<Array<string>> = new Observable<Array<string>>();
  constructor(private service : IngredientService) { }

  ngOnInit(): void {
    this.ingredients$ = this.service.getIngredients();
  }

}
