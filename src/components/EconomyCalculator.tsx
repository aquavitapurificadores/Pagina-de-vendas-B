import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, CheckCircle2, MessageCircle, AlertTriangle } from 'lucide-react';
import { motion } from 'motion/react';
import { EconomyConfig } from '../types';

interface EconomyCalculatorProps {
  trackConversionEvent: (eventName: string, payload: any) => void;
}

export const ECONOMY_CONFIG: EconomyConfig = {
  energyCostKwh: 0.95, // Tarifa média estimada no RS/Brasil (R$/kWh)
  models: [
    {
      id: 'sovereign',
      name: 'AquaVita Sovereign',
      investment: 2490,
      filterAnnualCost: 150, // Troca anual de refil de ozônio/carbono ativo
      energyAnnualCost: 35,  // Custo elétrico anual (ozonização inteligente de baixo consumo)
      description: 'O padrão ouro em purificação. Sistema ozonizador inteligente com controle ativo de pH, filtragem de 7 estágios e design minimalista em aço escovado.',
    },
    {
      id: 'classic',
      name: 'AquaVita Classic',
      investment: 1890,
      filterAnnualCost: 120, // Troca anual de refil
      energyAnnualCost: 28,  // Custo elétrico anual
      description: 'Compacto e robusto. Ideal para famílias que buscam excelente custo-benefício, água pura ozonizada e pH alcalino perfeitamente equilibrado.',
    }
  ]
};

const MODELS = ECONOMY_CONFIG.models;

export default function EconomyCalculator({ trackConversionEvent }: EconomyCalculatorProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [gallonsPerWeek, setGallonsPerWeek] = useState(3);
  const [pricePerGallon, setPricePerGallon] = useState(14);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Core Math
  const weeklyCurrentCost = gallonsPerWeek * pricePerGallon;
  const annualCurrentCost = weeklyCurrentCost * 52;
  const monthlyCurrentCost = Math.max(1, annualCurrentCost / 12);
  
  // Real savings and payback calculations incorporating electricity & filter replacements:
  const monthlyOperationalCost = selectedModel.energyAnnualCost / 12;
  const monthlySavings = Math.max(1, monthlyCurrentCost - monthlyOperationalCost);
  const paybackMonths = Number((selectedModel.investment / monthlySavings).toFixed(1));
  
  const secondYearSavings = annualCurrentCost - (selectedModel.filterAnnualCost + selectedModel.energyAnnualCost);
  const fiveYearsSavings = (annualCurrentCost * 5) - selectedModel.investment - (selectedModel.energyAnnualCost * 5) - (selectedModel.filterAnnualCost * 4);

  // Trigger analytics when calculator settings change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      trackConversionEvent('calculator_used', {
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        gallonsPerWeek,
        pricePerGallon,
        annualSpend: annualCurrentCost,
        paybackMonths,
        secondYearSavings,
        fiveYearsSavings
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedModel.id, gallonsPerWeek, pricePerGallon]);

  const handleWhatsAppClick = () => {
    trackConversionEvent('calculator_whatsapp_clicked', {
      modelName: selectedModel.name,
      annualSpend: annualCurrentCost,
      paybackMonths,
      secondYearSavings
    });

    const message = `Olá! Utilizei a Calculadora de Economia no site da AquaVita e fiquei impressionado.\n\n*Minha realidade atual:*\n- Consumo semanal: ${gallonsPerWeek} galão(ões) de 20L\n- Preço por galão: R$ ${pricePerGallon.toFixed(2)}\n- Gasto anual estimado: R$ ${annualCurrentCost.toFixed(2)}\n\n*Com o ${selectedModel.name}:*\n- O aparelho se paga em apenas: ${paybackMonths} meses!\n- Minha economia anual recorrente será de: R$ ${secondYearSavings.toFixed(2)}\n- Economia projetada em 5 anos: R$ ${fiveYearsSavings.toFixed(2)}\n\nGostaria de entender melhor como funciona a instalação e as formas de pagamento!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5554999997286?text=${encodedMessage}`, '_blank');
  };

  return (
    <section id="calculadora" className="py-24 px-6 bg-sand border-t border-b border-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-sapphire/10 text-sapphire text-sm font-medium tracking-wide mb-4">
            Simulação Financeira Inteligente
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">
            Quanto Custa Continuar Comprando Galões de Plástico?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Além do cansaço físico e dos riscos à saúde pela contaminação do plástico (BPA), o custo financeiro recorrente acumula uma fortuna silenciosa. Descubra sua economia real.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-soft border border-slate-100 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Product Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  1. Escolha o Purificador AquaVita Desejado:
                </label>
                <div className="grid sm:grid-cols-2 gap-4">
                  {MODELS.map((model) => (
                    <button
                      key={model.id}
                      onClick={() => setSelectedModel(model)}
                      className={`text-left p-5 rounded-2xl border-2 transition-all duration-300 relative overflow-hidden flex flex-col justify-between ${
                        selectedModel.id === model.id
                          ? 'border-sapphire bg-sapphire/5 text-sapphire shadow-md'
                          : 'border-slate-100 bg-slate-50 hover:border-slate-200 text-slate-700'
                      }`}
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <span className="font-serif font-bold text-lg">{model.name}</span>
                          {selectedModel.id === model.id && (
                            <CheckCircle2 className="w-5 h-5 text-sapphire shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                          {model.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/50 flex justify-between items-end">
                        <span className="text-xs text-slate-400 font-medium">Investimento</span>
                        <span className="text-lg font-bold font-serif text-slate-800">
                          R$ {model.investment.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              <hr className="border-slate-100" />

              {/* Sliders Container */}
              <div className="space-y-6">
                {/* Slider 1: Gallons per Week */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      2. Consumo de Galões por Semana (20 Litros):
                    </span>
                    <span className="bg-sapphire/10 text-sapphire px-3.5 py-1 rounded-full text-base font-bold font-mono">
                      {gallonsPerWeek} {gallonsPerWeek === 1 ? 'galão' : 'galões'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="15"
                    step="1"
                    value={gallonsPerWeek}
                    onChange={(e) => setGallonsPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sapphire"
                    style={{
                      background: `linear-gradient(to right, #0369A1 0%, #0369A1 ${((gallonsPerWeek - 1) / 14) * 100}%, #F1F5F9 ${((gallonsPerWeek - 1) / 14) * 100}%, #F1F5F9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                    <span>1 galão (família de 1-2 pessoas)</span>
                    <span>15 galões (empresa/família grande)</span>
                  </div>
                </div>

                {/* Slider 2: Price per Gallon */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      3. Preço Médio Pago por Galão:
                    </span>
                    <span className="bg-sapphire/10 text-sapphire px-3.5 py-1 rounded-full text-base font-bold font-mono">
                      R$ {pricePerGallon.toFixed(2)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="6"
                    max="35"
                    step="1"
                    value={pricePerGallon}
                    onChange={(e) => setPricePerGallon(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sapphire"
                    style={{
                      background: `linear-gradient(to right, #0369A1 0%, #0369A1 ${((pricePerGallon - 6) / 29) * 100}%, #F1F5F9 ${((pricePerGallon - 6) / 29) * 100}%, #F1F5F9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                    <span>R$ 6,00</span>
                    <span>R$ 35,00</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Micro warning about plastics */}
            <div className="mt-8 bg-amber-50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>O Custo Invisível:</strong> Galões sofrem desgaste por higienização com produtos químicos agressivos e exposição solar durante transporte, liberando microplásticos diretamente na água de consumo da sua família.
              </p>
            </div>
          </div>

          {/* Results Column (Right) */}
          <div className="lg:col-span-5 bg-gradient-to-br from-sapphire to-blue-800 text-white rounded-3xl p-8 shadow-2xl flex flex-col justify-between relative overflow-hidden">
            {/* Subtle glow background */}
            <div className="absolute -right-24 -bottom-24 w-64 h-64 bg-cyan-400/20 rounded-full blur-3xl pointer-events-none"></div>
            <div className="absolute -left-16 -top-16 w-48 h-48 bg-white/5 rounded-full blur-2xl pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6 bg-white/10 w-fit px-4 py-1.5 rounded-full border border-white/10">
                <Calculator className="w-4 h-4 text-cyan-200" />
                <span className="text-xs font-semibold tracking-wider uppercase text-cyan-100">Resultado da Simulação</span>
              </div>

              {/* Annual Spend on Bottles */}
              <div className="mb-6">
                <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider block mb-1">Seu gasto anual atual com galões</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light text-blue-200">R$</span>
                  <span className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                    {annualCurrentCost.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                  <span className="text-sm text-blue-200 font-medium ml-2">/ ano</span>
                </div>
                <span className="text-xs text-blue-200/80 font-medium">Equivale a R$ {monthlyCurrentCost.toLocaleString('pt-BR', { maximumFractionDigits: 2 })} por mês pagos recorrentemente.</span>
              </div>

              <hr className="border-white/10 my-6" />

              {/* Economic Milestones */}
              <div className="space-y-6">
                {/* Payback period */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <TrendingUp className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider block font-semibold">Prazo de Retorno do Investimento</span>
                    <p className="text-lg font-serif font-bold text-white leading-snug">
                      Seu AquaVita se paga em <span className="text-cyan-200 underline decoration-cyan-300 decoration-2 font-mono">{paybackMonths} {paybackMonths === 1 ? 'mês' : 'meses'}</span>!
                    </p>
                    <span className="text-xs text-blue-200/80 block mt-0.5">Após esse período, o custo da sua água cai a praticamente zero.</span>
                  </div>
                </div>

                {/* Recurrent savings 2nd year */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <DollarSign className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider block font-semibold">Economia Recorrente (a partir do 2º Ano)</span>
                    <p className="text-lg font-serif font-bold text-white leading-snug">
                      <span className="text-cyan-200 font-mono">R$ {secondYearSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}</span> economizados anualmente!
                    </p>
                    <span className="text-xs text-blue-200/80 block mt-0.5">Descontando a manutenção anual (Refil: R$ {selectedModel.filterAnnualCost} + Energia: R$ {selectedModel.energyAnnualCost}).</span>
                  </div>
                </div>

                {/* Savings in 5 years */}
                <div className="flex items-start gap-3.5">
                  <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center shrink-0 border border-white/10">
                    <CheckCircle2 className="w-4 h-4 text-cyan-300" />
                  </div>
                  <div>
                    <span className="text-xs text-blue-200 uppercase tracking-wider block font-semibold">Economia Projetada em 5 Anos</span>
                    <p className="text-xl font-serif font-bold text-cyan-200 leading-snug font-mono">
                      R$ {fiveYearsSavings.toLocaleString('pt-BR', { maximumFractionDigits: 0 })}
                    </p>
                    <span className="text-xs text-blue-200/80 block mt-0.5">Capital que deixa de ser gasto com água parada e volta para o seu bolso.</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Conversion Action */}
            <div className="mt-8 relative z-10">
              <motion.button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-base shadow-xl hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 relative overflow-hidden group"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 shrink-0 animate-bounce" />
                <span>Garantir Minha Economia Especial</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  animate={isCtaHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>
              <p className="text-center text-xs text-blue-100/70 font-medium mt-3">
                *Simulação baseada no consumo doméstico médio de galões de 20 litros.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
