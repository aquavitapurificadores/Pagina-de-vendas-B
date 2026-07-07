import React, { useState, useEffect } from 'react';
import { Calculator, TrendingUp, DollarSign, CheckCircle2, MessageCircle, AlertTriangle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';
import { EconomyConfig } from '../types';

interface EconomyCalculatorProps {
  trackConversionEvent: (eventName: string, payload: any) => void;
}

export const AQUAVITA_PRODUCTS = {
  giomBranco: {
    id: "giom-branco",
    name: "GIOM Branco",
    price: 2100,
    description: "Compacto e elegante na cor branca pura. Ideal para cozinhas modernas, oferecendo filtragem em triplo estágio e fluxo contínuo de água natural leve.",
    features: {
      alkaline: null,
      ozone: null,
      refrigerated: null,
      bacteriologicalEfficiency: null
    }
  },
  giomCinzaPreto: {
    id: "giom-cinza-preto",
    name: "GIOM Cinza/Preto",
    price: 2200,
    description: "Design contemporâneo em tons cinza e preto. Perfeito para compor bancadas sofisticadas com máxima eficiência de retenção de impurezas.",
    features: {
      alkaline: null,
      ozone: null,
      refrigerated: null,
      bacteriologicalEfficiency: null
    }
  },
  cpd23EssenceOzon: {
    id: "cpd23-essence-ozon",
    name: "CPD23 Essence Ozon",
    price: 2890,
    description: "Tecnologia de purificação avançada equipada com sistema ozonizador para desinfecção orgânica adicional de alimentos e água.",
    features: {
      alkaline: null,
      ozone: null,
      refrigerated: null,
      bacteriologicalEfficiency: null
    }
  },
  cpd23OzonPremium: {
    id: "cpd23-ozon-premium",
    name: "CPD23 Ozon Premium",
    price: 3490,
    description: "O modelo mais completo da categoria. Ozonização ativa, refrigeração de alta capacidade e sistema de controle de parâmetros de fluxo.",
    features: {
      alkaline: null,
      ozone: null,
      refrigerated: null,
      bacteriologicalEfficiency: null
    }
  }
};

export const ECONOMY_CONFIG: EconomyConfig = {
  energyCostKwh: 0.95,
  models: Object.values(AQUAVITA_PRODUCTS).map(p => ({
    id: p.id,
    name: p.name,
    investment: p.price,
    filterAnnualCost: 0, // Set to 0 to avoid using unconfirmed values
    energyAnnualCost: 0,
    description: p.description
  }))
};

export const OPERATING_COSTS: Record<string, number | null> = {
  giomBranco: null,
  giomCinzaPreto: null,
  cpd23EssenceOzon: null,
  cpd23OzonPremium: null
};

const MODELS = ECONOMY_CONFIG.models;

export default function EconomyCalculator({ trackConversionEvent }: EconomyCalculatorProps) {
  const [selectedModel, setSelectedModel] = useState(MODELS[0]);
  const [gallonsPerWeek, setGallonsPerWeek] = useState(3);
  const [pricePerGallon, setPricePerGallon] = useState(14);
  const [monthlyBottledWaterCost, setMonthlyBottledWaterCost] = useState(0);
  const [isCtaHovered, setIsCtaHovered] = useState(false);

  // Core Math Formulas
  const annualGallonsCost = gallonsPerWeek * pricePerGallon * 52;
  const annualBottledWaterCost = monthlyBottledWaterCost * 12;
  const annualCurrentCost = annualGallonsCost + annualBottledWaterCost;
  const monthlyCurrentCost = annualCurrentCost / 12;
  const fiveYearCurrentCost = annualCurrentCost * 5;

  // Formatting helpers
  const formatBRL = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(value);
  };

  const formatBRLDecimals = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }).format(value);
  };

  // Trigger analytics when calculator settings change (debounced)
  useEffect(() => {
    const timer = setTimeout(() => {
      trackConversionEvent('calculator_used', {
        modelId: selectedModel.id,
        modelName: selectedModel.name,
        gallonsPerWeek,
        pricePerGallon,
        monthlyBottledWaterCost,
        annualSpend: annualCurrentCost,
        fiveYearSpend: fiveYearCurrentCost
      });
    }, 1000);

    return () => clearTimeout(timer);
  }, [selectedModel.id, gallonsPerWeek, pricePerGallon, monthlyBottledWaterCost]);

  const handleWhatsAppClick = () => {
    trackConversionEvent('calculator_whatsapp_clicked', {
      modelName: selectedModel.name,
      annualSpend: annualCurrentCost,
      gallonsPerWeek,
      pricePerGallon,
      monthlyBottledWaterCost
    });

    const message = `Olá! Fiz a simulação de economia no site da Aqua Vita. Hoje gasto aproximadamente ${formatBRLDecimals(annualCurrentCost)}/ano com água. Compro cerca de ${gallonsPerWeek} galões por semana. Pago aproximadamente ${formatBRLDecimals(pricePerGallon)} por galão. Também gasto cerca de ${formatBRLDecimals(monthlyBottledWaterCost)}/mês com garrafas. Estou analisando o modelo ${selectedModel.name}. Gostaria de receber uma orientação.`;
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
            Quanto Custa Continuar Comprando Água Mineral?
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Além do esforço de logística, transporte e armazenamento, o gasto recorrente com água mineral engarrafada ou em galões acumula uma fortuna silenciosa. Descubra sua realidade financeira.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 items-stretch">
          {/* Controls Column (Left) */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 shadow-soft border border-slate-100 flex flex-col justify-between">
            <div className="space-y-8">
              {/* Product Selector */}
              <div>
                <label className="block text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4">
                  1. Selecione o Purificador Aqua Vita para comparativo:
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
                          <span className="font-serif font-bold text-base">{model.name}</span>
                          {selectedModel.id === model.id && (
                            <CheckCircle2 className="w-5 h-5 text-sapphire shrink-0" />
                          )}
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mb-4 line-clamp-2">
                          {model.description}
                        </p>
                      </div>
                      <div className="mt-2 pt-2 border-t border-slate-200/50 flex justify-between items-end">
                        <span className="text-xs text-slate-400 font-medium">Equipamento</span>
                        <span className="text-base font-bold font-serif text-slate-800">
                          {formatBRLDecimals(model.investment)}
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
                      2. Consumo de Galões por Semana (20L):
                    </span>
                    <span className="bg-sapphire/10 text-sapphire px-3.5 py-1 rounded-full text-base font-bold font-mono">
                      {gallonsPerWeek} {gallonsPerWeek === 1 ? 'galão' : 'galões'}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    step="1"
                    value={gallonsPerWeek}
                    onChange={(e) => setGallonsPerWeek(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sapphire"
                    style={{
                      background: `linear-gradient(to right, #0369A1 0%, #0369A1 ${((gallonsPerWeek - 1) / 9) * 100}%, #F1F5F9 ${((gallonsPerWeek - 1) / 9) * 100}%, #F1F5F9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                    <span>1 galão</span>
                    <span>10 galões</span>
                  </div>
                </div>

                {/* Slider 2: Price per Gallon */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      3. Valor Médio por Galão (R$):
                    </span>
                    <span className="bg-sapphire/10 text-sapphire px-3.5 py-1 rounded-full text-base font-bold font-mono">
                      {formatBRLDecimals(pricePerGallon)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="8"
                    max="20"
                    step="1"
                    value={pricePerGallon}
                    onChange={(e) => setPricePerGallon(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sapphire"
                    style={{
                      background: `linear-gradient(to right, #0369A1 0%, #0369A1 ${((pricePerGallon - 8) / 12) * 100}%, #F1F5F9 ${((pricePerGallon - 8) / 12) * 100}%, #F1F5F9 100%)`
                    }}
                  />
                  <div className="flex justify-between text-xs text-slate-400 font-medium mt-1">
                    <span>R$ 8,00</span>
                    <span>R$ 20,00</span>
                  </div>
                </div>

                {/* Slider 3: Bottled Water Cost */}
                <div>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-sm font-semibold text-slate-500 uppercase tracking-wider">
                      4. Gasto Mensal com Garrafas Descartáveis:
                    </span>
                    <span className="bg-sapphire/10 text-sapphire px-3.5 py-1 rounded-full text-base font-bold font-mono">
                      {formatBRLDecimals(monthlyBottledWaterCost)}
                    </span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="500"
                    step="10"
                    value={monthlyBottledWaterCost}
                    onChange={(e) => setMonthlyBottledWaterCost(Number(e.target.value))}
                    className="w-full h-2 bg-slate-100 rounded-lg appearance-none cursor-pointer accent-sapphire"
                    style={{
                      background: `linear-gradient(to right, #0369A1 0%, #0369A1 ${((monthlyBottledWaterCost - 0) / 500) * 100}%, #F1F5F9 ${((monthlyBottledWaterCost - 0) / 500) * 100}%, #F1F5F9 100%)`
                    }}
                  />
                  
                  {/* Shortcuts list for Bottled cost */}
                  <div className="flex flex-wrap gap-2 mt-3">
                    <span className="text-xs text-slate-400 font-medium self-center">Atalhos:</span>
                    {[0, 50, 100, 200, 300, 500].map((val) => (
                      <button
                        key={val}
                        type="button"
                        onClick={() => setMonthlyBottledWaterCost(val)}
                        className={`text-xs px-2.5 py-1 rounded-md border transition-all ${
                          monthlyBottledWaterCost === val
                            ? 'bg-sapphire border-sapphire text-white'
                            : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                        }`}
                      >
                        {val === 500 ? 'R$ 500+' : formatBRL(val)}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Micro warning about plastics */}
            <div className="mt-8 bg-amber-50/50 border border-amber-100 p-4 rounded-2xl flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-800 leading-relaxed">
                <strong>Análise de Praticidade:</strong> Carregar fardos pesados de garrafas e virar galões de 20kg frequentemente causam desgaste físico. Além disso, a higienização irregular de galões retornáveis pode introduzir impurezas no seu consumo diário.
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
                <span className="text-xs text-blue-200 font-semibold uppercase tracking-wider block mb-1">Seu gasto estimado atual com água comercial</span>
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-light text-blue-200">R$</span>
                  <span className="text-4xl md:text-5xl font-serif font-bold tracking-tight">
                    {annualCurrentCost.toLocaleString('pt-BR', { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
                  </span>
                  <span className="text-sm text-blue-200 font-medium ml-2">/ ano</span>
                </div>
                
                <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-white/10 text-xs text-blue-200/90 font-medium">
                  <div>
                    <span className="block text-blue-300 font-semibold uppercase tracking-wider mb-0.5">Mensal</span>
                    <span className="text-base font-bold text-white font-mono">{formatBRLDecimals(monthlyCurrentCost)}</span>
                  </div>
                  <div>
                    <span className="block text-blue-300 font-semibold uppercase tracking-wider mb-0.5">Em 5 anos</span>
                    <span className="text-base font-bold text-cyan-200 font-mono">{formatBRL(fiveYearCurrentCost)}</span>
                  </div>
                </div>
              </div>

              <hr className="border-white/10 my-6" />

              {/* Product Comparison Block */}
              <div className="space-y-4">
                <h4 className="text-xs font-semibold text-cyan-200 uppercase tracking-wider">
                  Comparação com o {selectedModel.name}
                </h4>
                
                <div className="bg-white/5 rounded-2xl p-5 border border-white/10 space-y-3">
                  <div className="flex justify-between items-center text-sm">
                    <span className="text-blue-200">Valor do purificador (único):</span>
                    <span className="font-bold text-white font-mono">{formatBRLDecimals(selectedModel.investment)}</span>
                  </div>
                  
                  <div className="text-xs text-blue-200 leading-relaxed pt-2 border-t border-white/5">
                    No primeiro ano, seu investimento se aproxima do que você já gasta anualmente de forma recorrente com galões e garrafas. A partir da aquisição do equipamento, você tem água purificada ilimitada disponível e deixa de depender de logística comercial externa.
                  </div>
                </div>
                
                <div className="text-[11px] text-blue-200/70 italic leading-relaxed pt-2">
                  * Simulação baseada nos valores informados e nas configurações comerciais cadastradas. Custos operacionais futuros variam conforme o padrão de manutenção de filtros específicos.
                </div>
              </div>
            </div>

            {/* Conversion Action */}
            <div className="mt-8 relative z-10">
              <div className="text-sm font-semibold text-cyan-200/95 mb-3 text-center">
                Agora você sabe quanto custa continuar como está.
              </div>
              <motion.button
                onClick={handleWhatsAppClick}
                onMouseEnter={() => setIsCtaHovered(true)}
                onMouseLeave={() => setIsCtaHovered(false)}
                className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-base shadow-xl hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2 relative overflow-hidden group cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <MessageCircle className="w-5 h-5 shrink-0 animate-bounce" />
                <span>Quero Entender Qual Solução Faz Sentido</span>
                <motion.div
                  className="absolute inset-0 bg-white/10"
                  initial={{ x: '-100%' }}
                  animate={isCtaHovered ? { x: '100%' } : { x: '-100%' }}
                  transition={{ duration: 0.6, ease: 'easeInOut' }}
                />
              </motion.button>
              <p className="text-center text-[10px] text-blue-100/50 mt-3">
                Atendimento consultivo e personalizado de forma humana, sem pressão.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
