import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule, Route } from '@angular/router'
import {MatButtonModule} from '@angular/material/button';
import { CocktailListComponent } from './cocktail-list/cocktail-list.component';
import { CocktailDetailsComponent } from './cocktail-details/cocktail-details.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { CocktailDetailsResolver } from './cocktail-details.resolver';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { IngredientsDetailsComponent } from './ingredients-details/ingredients-details.component';
import { IngredientsDetailResolver } from './ingredients-detail.resolver';

const routes : Route[] = [
  {
    path : 'list',
    component: CocktailListComponent
  },
  {
    path : 'cocktail-details/:id',
    resolve: {
      cocktail : CocktailDetailsResolver
    },
    component: CocktailDetailsComponent
  },
  {
    path: 'ingredients',
    component: IngredientsListComponent
  },
  {
    path: 'ingredients/:name',
    resolve: {
      ingredient : IngredientsDetailResolver
    }
    ,
    component: IngredientsDetailsComponent
  },
  {
    path : '',
    pathMatch : 'full',
    redirectTo : 'list'
  },
  {
    path: '**',
    component: NotFoundComponent
  }
]
@NgModule({
  declarations: [
    AppComponent,
    CocktailListComponent,
    CocktailDetailsComponent,
    IngredientsListComponent,
    IngredientsDetailsComponent,
    NotFoundComponent,
    HeaderComponent,
    FooterComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
