import { Component, OnInit } from '@angular/core';
import { YieldFormulaService } from '../hero.service';
import { YieldFormula } from '../hero';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.css'],
})
export class YieldFormulaComponent implements OnInit {
  formulas: YieldFormula[];
  newYield: YieldFormula;

  constructor(private heroService: YieldFormulaService) {}

  ngOnInit() {
    this.getYieldFormulas();
    this.newYield = new YieldFormula();
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

  delete(formula: YieldFormula): void {
    this.formulas = this.formulas.filter((h) => h !== formula);
    this.heroService.deleteYieldFormula(formula).subscribe();
  }
}
