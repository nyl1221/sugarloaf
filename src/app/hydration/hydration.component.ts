import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { YieldFormulaService } from '../hero.service';
import { YieldFormula, Hydration } from '../hero';

@Component({
  selector: 'app-hydration',
  templateUrl: './hydration.component.html',
  styleUrls: ['./hydration.component.css'],
})
export class HydrationComponent implements OnInit {
  refYield: YieldFormula;
  hydration: Hydration;

  constructor(
    private route: ActivatedRoute,
    private heroService: YieldFormulaService,
    private location: Location
  ) {
    this.refYield = new YieldFormula();
    this.hydration = new Hydration();
    this.hydration.additionalFlourMeasurements = new Array<number>();
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

  calculate(): void {
    const ycFlour = this.refYield.flour;
    const ycWater = this.refYield.water;
    const totNewFlour = this.hydration.additionalFlourMeasurements.reduce(
      (sum, curr) => sum + curr,
      0
    );
    const totFlour = ycFlour + totNewFlour;
    const totWater = ycWater + this.hydration.additionalWaterMeasurement;
    this.hydration.hydrationPercentage = (totWater / totFlour) * 100;
  }

  add(): void {
    this.hydration.additionalFlourMeasurements.push(0);
  }

  trackByIdx(index: number, obj: any): any {
    return index;
  }
}
