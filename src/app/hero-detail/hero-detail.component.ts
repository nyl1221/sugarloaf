import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { YieldCalculationService } from '../hero.service';
import { YieldCalculation } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  refYield: YieldCalculation;
  yield: YieldCalculation;

  constructor(
    private route: ActivatedRoute,
    private heroService: YieldCalculationService,
    private location: Location
  ) {
    this.refYield = new YieldCalculation();
    this.refYield.starter = 10;
    this.refYield.flour = 20;
    this.refYield.water = 10;
    this.refYield.multiplier = 3;
    this.refYield.target = 56;

    this.yield = new YieldCalculation();
  }

  ngOnInit(): void {
    this.getHero();
  }

  getHero(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.heroService.getFormula(id).subscribe((hero) => (this.refYield = hero));
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
    this.heroService
      .updateYieldFormula(this.refYield)
      .subscribe(() => this.goBack());
  }

  calculate(): void {
    this.yield.calculate(this.refYield);
  }
}
