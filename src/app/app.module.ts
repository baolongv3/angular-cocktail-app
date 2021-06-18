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
import { NotFoundComponent } from './error-page/not-found.component';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CocktailDetailsResolver } from './cocktail-details.resolver';
import { IngredientsListComponent } from './ingredients-list/ingredients-list.component';
import { IngredientsDetailsComponent } from './ingredients-details/ingredients-details.component';
import { IngredientsDetailResolver } from './ingredients-detail.resolver';
import { AngularFireModule    } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AuthGuard } from './guards/auth.guard';
import { UnauthorizedComponent } from './unauthorized/unauthorized.component';
import { environment } from 'src/environments/environment';


const config  = environment.FIREBASE_AUTH;



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
    canActivate: [AuthGuard]
    ,
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
    path : 'unauthorized',
    component: UnauthorizedComponent
  }
  ,
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
    UnauthorizedComponent,

  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes),
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
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
