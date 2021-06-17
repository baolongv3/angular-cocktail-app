import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { Ingredient } from './models/Ingredient';
import { CocktailService } from './services/cocktail.service';

@Injectable({
  providedIn: 'root'
})
export class IngredientsDetailResolver implements Resolve<Ingredient> {
  name : string | null = ''
  constructor(private service : CocktailService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Ingredient> {
    this.name = route.paramMap.get('name');
    return this.service.getOneIngredient(this.name);
  }
}
