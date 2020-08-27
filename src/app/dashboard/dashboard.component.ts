import { Component, OnInit } from '@angular/core';
import { YieldCalculationService } from '../hero.service';
import { YieldCalculation } from '../hero';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  heroes: YieldCalculation[] = [];

  constructor(private heroService: YieldCalculationService) {}

  ngOnInit() {
    this.getYieldFormulas();
  }

  getYieldFormulas(): void {
    this.heroService
      .getYieldFormulas()
      .subscribe((heroes) => (this.heroes = heroes.slice(1, 5)));
  }
}
