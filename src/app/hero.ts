export class YieldFormula {
  id: number;
  name: string;
  starter: number;
  flour: number;
  water: number;
  multiplier: number;
  target: number;

  calculate(refYield: YieldFormula) {
    const ratio = this.target / refYield.target;
    this.starter = refYield.starter * ratio;
    this.flour = refYield.flour * ratio;
    this.water = refYield.water * ratio;
  }
}

export class Hydration {
  id: number;
  name: string;
  refYieldId: number;
  additionalFlourMeasurements: number[];
  additionalWaterMeasurement: number;
  hydrationPercentage: number;
}
