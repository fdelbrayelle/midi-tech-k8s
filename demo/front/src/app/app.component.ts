import { Component, OnInit } from '@angular/core';
import { AppService } from './app.service';
import { IBeer } from './beer.model';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  beers: IBeer[] = [];
  title = 'angular-front';

  constructor(protected appService: AppService) {}

  ngOnInit() {
    this.appService.findAllBeers().subscribe(
      (res: HttpResponse<IBeer[]>) => this.beers = res.body,
      (res: HttpErrorResponse) => console.error(res.message)
    );
  }
}
