import { Component, OnInit } from '@angular/core';
import { YieldCalculationService } from '../hero.service';
import { YieldCalculation } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class YieldFormulaComponent implements OnInit {
  formulas: YieldCalculation[];
  newYield: YieldCalculation;

  constructor(private heroService: YieldCalculationService) {}

  ngOnInit() {
    this.getYieldFormulas();
    this.newYield = new YieldCalculation();
  }
  getYieldFormulas() {
    this.heroService
      .getYieldFormulas()
      .subscribe((formulas) => (this.formulas = formulas));
  }

  add(): void {
    this.heroService.addYieldFormula(this.newYield).subscribe((hero) => {
      this.formulas.push(hero);
    });
  }

  delete(formula: YieldCalculation): void {
    this.formulas = this.formulas.filter((h) => h !== formula);
    this.heroService.deleteYieldFormula(formula).subscribe();
  }
}
