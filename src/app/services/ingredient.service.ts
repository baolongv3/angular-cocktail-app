import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Ingredient } from '../models/Ingredient';
interface IngredientFormat{
  strIngredient : string,
  strDescription : string,
  strType : string
}
@Injectable({
  providedIn: 'root'
})
export class IngredientService {
  static baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1'
  constructor(private http : HttpClient) { }

  public getIngredients() : Observable<Array<string>> {
    let url = `${IngredientService.baseUrl}/list.php?i=list`;
    return this.http.get<{drinks : Array<{strIngredient1 : string}>}>(url).pipe(
      map(result => result.drinks.map(d => d.strIngredient1)))
    }
  public getSpecificIngredient(name : string | any) : Observable<Ingredient>{
    let url = `${IngredientService.baseUrl}/search.php?i=${name}`
    return this.http.get<{ingredients : Array<IngredientFormat>}>(url).pipe(map((result) => {
      if(!result.ingredients.length){
        throw new Error('No Ingredient by that name ');
      }

      return this.mapToModel(result.ingredients[0]);
    }))
  }

  private mapToModel(item : IngredientFormat) : Ingredient{
    return {
      name : item.strIngredient,
      desc : item.strDescription,
      type : item.strType
    }
  }
}
