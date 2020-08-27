import { Component, OnInit } from '@angular/core';
import { YieldFormulaService } from '../hero.service';
import { YieldFormula } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: YieldFormula[] = [];

  constructor(private heroService: YieldFormulaService) {}

  ngOnInit() {
    this.getYieldFormulas();
  }

  getYieldFormulas(): void {
    this.heroService
      .getYieldFormulas()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
