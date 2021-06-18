import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Cocktail } from '../models/Cocktail';

interface CocktailDbDrink {
  idDrink: string;
  strDrink: string;
  strCategory: string;
  strInstructions: string;
  strDrinkThumb: string;
  strAlcoholic: string;
  strGlass: string;

  strIngredient1: string;
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strIngredient6: string;
  strIngredient7: string;
  strIngredient8: string;
  strIngredient9: string;
  strIngredient10: string;
  strIngredient11: string;
  strIngredient12: string;
  strIngredient13: string;
  strIngredient14: string;
  strIngredient15: string;
}

interface CocktailDbResult {
  drinks: Array<CocktailDbDrink>;
}

@Injectable({
  providedIn: 'root'
})

export class CocktailService {
  static baseUrl = 'https://www.thecocktaildb.com/api/json/v1/1';

constructor(private http: HttpClient) { }

public listByName(name : string) : Observable<Array<Cocktail>> | any{
  const url = `${CocktailService.baseUrl}/search.php?s=${name ? name.split(' ').join('_') : 'b'}`;
    return this.http.get<CocktailDbResult>(url).pipe(
      map((result : CocktailDbResult) =>
        this.mapResultToCocktail(result)

      )
    )
  }





public fetchById(id : string | any) : Observable<Cocktail> {
    const url = `${CocktailService.baseUrl}/lookup.php?i=${id}`;
    return this.http.get<CocktailDbResult>(url).pipe(
      map((result : CocktailDbResult) => {
        return this.mapResultToCocktail(result);
      }),
      map((drinks : Array<Cocktail>) => {
        if(!drinks.length){
          throw new Error(`Cocktail with id ${id} not found.`)
        }
        return drinks[0];
      })
    );

  }

private mapResultToCocktail(result : CocktailDbResult) : Array<Cocktail> | any{
    const drinks = result?.drinks || [];
    return  drinks.map<Array<Cocktail>>((drink) => {
      return this.mapSingleObjToCocktail(drink);
    })

  }



private  mapSingleObjToCocktail(drink : CocktailDbDrink) : Cocktail | any {
    if(!drink){
      return;
    }

    let ingredients = [
        drink.strIngredient1,
        drink.strIngredient2,
        drink.strIngredient3,
        drink.strIngredient4,
        drink.strIngredient5,
        drink.strIngredient6,
        drink.strIngredient7,
        drink.strIngredient8,
        drink.strIngredient9,
        drink.strIngredient10,
        drink.strIngredient11,
        drink.strIngredient12,
        drink.strIngredient13,
        drink.strIngredient14,
        drink.strIngredient15
    ].filter((ingredients : string) => {
      return !!ingredients
    })

    return <Cocktail> {
      id: drink.idDrink,
      name: drink.strDrink,
      category: drink.strCategory,
      instructions: drink.strInstructions,
      alcoholic: drink.strAlcoholic,
      glass: drink.strGlass,
      imageUrl: drink.strDrinkThumb,
      ingredients,
    }
  }

}
