import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Ingredient } from '../models/Ingredient';

@Component({
  selector: 'app-ingredients-details',
  templateUrl: './ingredients-details.component.html',
  styleUrls: ['./ingredients-details.component.css']
})
export class IngredientsDetailsComponent implements OnInit {
  ingredient : Ingredient | any = null;
  constructor(private activatedRoute : ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((data) => {
      this.ingredient = data.ingredient;
    })
  }

}
