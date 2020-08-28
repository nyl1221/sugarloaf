import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { YieldFormulaService } from '../hero.service';
import { YieldFormula } from '../hero';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css'],
})
export class HeroDetailComponent implements OnInit {
  refYield: YieldFormula;
  yield: YieldFormula;

  constructor(
    private route: ActivatedRoute,
    private heroService: YieldFormulaService,
    private location: Location
  ) {
    this.refYield = new YieldFormula();
    this.yield = new YieldFormula();
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

  update(): void {
    this.heroService
      .updateYieldFormula(this.refYield)
      .subscribe(() => this.goBack());
  }

  save(): void {
    this.heroService.addYieldFormula(this.yield).subscribe((y) => {
      this.yield = y;
    });
  }

  calculate(): void {
    this.yield.calculate(this.refYield);
  }
}
