import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: [
  ]
})
export class SearchPageComponent {
  public SearchInput = new FormControl('');
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private HeroesService: HeroesService){}
  searchHero() {
    const value: string = this.SearchInput.value || '';

    this.HeroesService.getSuggestions(  )
      .subscribe( heroes => this.heroes = heroes );
  }

  onSelectedOption( event: MatAutocompleteSelectedEvent): void{
    if (!event.option.value ){
      this.selectedHero = undefined;
      return;
    }
    const hero: Hero = event.option.value;
    this.SearchInput.setValue( hero.superhero );

    this.selectedHero = hero;
  }

}
