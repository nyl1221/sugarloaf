export class YieldCalculation {
  id: number;
  name: string;
  starter: number;
  flour: number;
  water: number;
  multiplier: number;
  target: number;

  calculate(refYield: YieldCalculation) {
    const ratio = this.target / refYield.target;
    this.starter = refYield.starter * ratio;
    this.flour = refYield.flour * ratio;
    this.water = refYield.water * ratio;
  }
}
