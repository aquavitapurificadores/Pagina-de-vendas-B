export interface EconomyConfig {
  energyCostKwh: number;
  models: {
    id: string;
    name: string;
    investment: number;
    filterAnnualCost: number;
    energyAnnualCost: number;
    description: string;
  }[];
}

export interface QuestionOption {
  text: string;
  weight: number;
}

export interface TriageQuestion {
  id: number;
  text: string;
  options: QuestionOption[];
}

export interface RiskIndicator {
  name: string;
  status: 'Aceitável' | 'Ajuste Recomendável' | 'Atenção' | 'Risco Potencial';
  value: number; // 0 to 100 for visual indicator progress
  description: string;
  colorClass: string;
  bgClass: string;
}
