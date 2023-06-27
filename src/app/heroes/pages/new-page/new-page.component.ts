import { Component, OnInit } from '@angular/core';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';

import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';
import { filter, switchMap, tap } from 'rxjs';





@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: [
  ]
})
export class NewPageComponent implements OnInit{

  public heroForm = new FormGroup({
    id:         new FormControl<string>(''),
    superhero:  new FormControl<string>('',{ nonNullable: true}),
    publisher:  new FormControl<Publisher>( Publisher.DCComics),
    alter_ego:  new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img:    new FormControl(''),
  });

  public Publishers = [
    { id: 'DC  Comics', desc: 'DC - Comics'},
    { id: 'Marvel Comics', desc: 'Marvel - Comics'},
  ];

  constructor(
    private HeroesService: HeroesService,
    private ActivatedRoute: ActivatedRoute,
    private Router: Router,
    private snackbar: MatSnackBar,
    private dialog: MatDialog,
    ) {}

  get correntHero(): Hero {
    const hero = this.heroForm.value as Hero;
    return hero;
  }

  ngOnInit(): void {
    if (!this.Router.url.includes('edit')) return;
    this.ActivatedRoute.params
    .pipe(
      switchMap( ({id}) => this.HeroesService.getHeroById(id)),
    ).subscribe(hero => {

      if (!hero) {
        return this.Router.navigateByUrl('/');
      }

      this.heroForm.reset(hero);
      return;
    });
  }

  onSubmit(): void {
    if ( this.heroForm.invalid ) return;

    if( this.correntHero.id ) {
      this.HeroesService.updateHero( this.correntHero)
      .subscribe( hero => {
        this.showSnackbar(`${ hero.superhero } updated`);
      });
      return;
    }

    this.HeroesService.addHero( this.correntHero )
      .subscribe( hero => {
        this.Router.navigate(['/heroes/edit', hero.id]);
        this.showSnackbar(`${ hero.superhero } created`);
      })

  }

  onDeleteHero() {
    if ( !this.correntHero.id ) throw Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent,{
      data: this.heroForm.value
    });

    dialogRef.afterClosed()
    .pipe(
      filter( (result: boolean) => result ),
      switchMap( () => this.HeroesService.deleteHeroById( this.correntHero.id )),
      filter( (wasDeleted: boolean) => wasDeleted ),
    )
    .subscribe(() => {
      this.Router.navigate(['/heroes']);
    });

  }

  showSnackbar(message: string): void{
    this.snackbar.open(message, 'done',{
      duration: 2500,
    })
  }


  //onSubmit():void {

    //console.log({
      //formIsValid: this.heroForm.valid,
      //value: this.heroForm.value,
    //})

  //}



}
