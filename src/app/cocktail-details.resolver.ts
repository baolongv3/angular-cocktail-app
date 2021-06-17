import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { Observable, of } from 'rxjs';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { Cocktail } from './models/Cocktail';
import { CocktailService } from './services/cocktail.service';

@Injectable({
  providedIn: 'root'
})
export class CocktailDetailsResolver implements Resolve<Cocktail> {

  constructor(private service : CocktailService){}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Cocktail> {
    const id = route.paramMap.get('id');
    return this.service.fetchById(id);
  }
}
