import React, { useState } from 'react';
import { MapPin, Loader2, Calendar, AlertTriangle, ShieldCheck, Microscope, MessageCircle, Info, ChevronRight, CheckCircle2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface WaterDiagnosticProps {
  trackConversionEvent: (eventName: string, payload: any) => void;
}

const QUESTIONS = [
  {
    id: 1,
    text: 'Qual a fonte principal de água que sua família bebe e cozinha atualmente?',
    options: [
      { text: 'Água direta da torneira (abastecimento público)', weight: 18, key: 'tap' },
      { text: 'Galões retornáveis de plástico de 20 litros', weight: 14, key: 'gallon' },
      { text: 'Filtro comum de barro ou torneira com refil simples', weight: 10, key: 'simple_filter' },
      { text: 'Poço artesiano, cisterna ou captação de fonte local', weight: 22, key: 'well' },
    ],
  },
  {
    id: 2,
    text: 'Com que frequência você ou alguém de sua família percebe gosto, cheiro ou coloração na água?',
    options: [
      { text: 'Frequentemente (várias vezes ao mês ou toda semana)', weight: 25, key: 'often' },
      { text: 'Às vezes (principalmente após chuvas fortes ou obras na rua)', weight: 16, key: 'sometimes' },
      { text: 'Raramente ou quase nunca notamos alterações', weight: 6, key: 'rarely' },
    ],
  },
  {
    id: 3,
    text: 'Alguém na sua casa sofre com problemas gastrointestinais frequentes, azia, gastrite ou pele/cabelos excessivamente secos?',
    options: [
      { text: 'Sim, problemas digestivos ou sensibilidade estomacal recorrente', weight: 22, key: 'stomach' },
      { text: 'Sim, pele e cabelos extremamente ressecados, mesmo usando cremes', weight: 16, key: 'dryness' },
      { text: 'Ambos ou múltiplos sintomas ocorrem com certa frequência', weight: 25, key: 'both' },
      { text: 'Não, todos em casa estão saudáveis e sem queixas', weight: 0, key: 'none' },
    ],
  },
  {
    id: 4,
    text: 'Como os vegetais, verduras e frutas são higienizados na sua casa antes do consumo?',
    options: [
      { text: 'Lavados apenas em água corrente de torneira comum', weight: 20, key: 'only_water' },
      { text: 'Deixamos de molho com vinagre, bicarbonato ou água sanitária comum', weight: 10, key: 'chemical_soak' },
      { text: 'Lavados com água previamente filtrada de galão ou jarra simples', weight: 14, key: 'filtered_water' },
      { text: 'Lavados com água alcalina/ozonizada (gostaríamos de ter essa tecnologia)', weight: 5, key: 'desire_ozone' },
    ],
  },
  {
    id: 5,
    text: 'Qual o principal fator de preocupação que motivou você a avaliar a qualidade da água hoje?',
    options: [
      { text: 'Presença oculta de microplásticos, cloro residual e agrotóxicos', weight: 18, key: 'contaminants' },
      { text: 'O cansaço físico, peso e custo recorrente de galões plásticos', weight: 12, key: 'effort' },
      { text: 'Preocupação com encanamentos antigos e caixas d\'água da região', weight: 16, key: 'infrastructure' },
      { text: 'Desejo de investir em saúde preventiva de alta performance', weight: 5, key: 'prevention' },
    ],
  },
];

export default function WaterDiagnostic({ trackConversionEvent }: WaterDiagnosticProps) {
  // Wizard States
  const [step, setStep] = useState<'cep' | 'questions' | 'lead' | 'results'>('cep');
  const [cep, setCep] = useState('');
  const [isCepLoading, setIsCepLoading] = useState(false);
  const [cepError, setCepError] = useState('');
  const [locationData, setLocationData] = useState<{ city: string; state: string; uf: string } | null>(null);

  // Question States
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, { text: string; weight: number; key: string }>>({});

  // Lead States
  const [leadName, setLeadName] = useState('');
  const [leadPhone, setLeadPhone] = useState('');
  const [wantsPhysicalAnalysis, setWantsPhysicalAnalysis] = useState(true);

  // Masking CEP
  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 8) value = value.slice(0, 8);
    if (value.length > 5) {
      value = `${value.slice(0, 5)}-${value.slice(5)}`;
    }
    setCep(value);
    setCepError('');
  };

  // Masking Phone
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length > 11) value = value.slice(0, 11);
    
    if (value.length > 6) {
      value = `(${value.slice(0, 2)}) ${value.slice(2, 7)}-${value.slice(7)}`;
    } else if (value.length > 2) {
      value = `(${value.slice(0, 2)}) ${value.slice(2)}`;
    }
    setLeadPhone(value);
  };

  const handleValidateCep = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanedCep = cep.replace(/\D/g, '');
    if (cleanedCep.length !== 8) {
      setCepError('Por favor, informe um CEP válido com 8 dígitos.');
      return;
    }

    setIsCepLoading(true);
    setCepError('');

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cleanedCep}/json/`);
      const data = await response.json();

      if (data.erro) {
        setCepError('CEP não encontrado. Verifique os números e tente novamente.');
        setIsCepLoading(false);
        return;
      }

      setLocationData({
        city: data.localidade,
        state: data.uf === 'RS' ? 'Rio Grande do Sul' : data.uf === 'SP' ? 'São Paulo' : data.uf,
        uf: data.uf,
      });

      trackConversionEvent('diagnostic_cep_searched', {
        cep: cleanedCep,
        city: data.localidade,
        state: data.uf,
      });

      // Advance to questions
      setTimeout(() => {
        setIsCepLoading(false);
        setStep('questions');
      }, 600);

    } catch (error) {
      console.error('Erro ao buscar CEP:', error);
      setCepError('Erro de conexão ao buscar dados de região. Você pode prosseguir normalmente.');
      // Fail-safe default
      setLocationData({
        city: 'Salvador das Missões',
        state: 'Rio Grande do Sul',
        uf: 'RS',
      });
      setTimeout(() => {
        setIsCepLoading(false);
        setStep('questions');
      }, 800);
    }
  };

  const handleAnswerSelect = (option: { text: string; weight: number; key: string }) => {
    const questionId = QUESTIONS[currentQuestionIndex].id;
    setAnswers((prev) => ({
      ...prev,
      [questionId]: option,
    }));

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex((prev) => prev + 1);
      }, 250);
    } else {
      setTimeout(() => {
        setStep('lead');
      }, 300);
    }
  };

  const handleLeadSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const score = calculateRiskScore();
    const classification = getRiskClassification(score);

    trackConversionEvent('lead_captured', {
      name: leadName || 'Anônimo',
      phone: leadPhone || 'Não informado',
      cep: cep,
      city: locationData?.city || '',
      state: locationData?.uf || '',
      score,
      classification,
      wantsPhysicalAnalysis,
    });

    trackConversionEvent('diagnostic_completed', {
      score,
      classification,
      answers: Object.keys(answers).reduce((acc, key) => {
        const id = Number(key);
        acc[`question_${id}`] = answers[id].key;
        return acc;
      }, {} as Record<string, string>),
    });

    setStep('results');
  };

  const handleSkipLead = () => {
    const score = calculateRiskScore();
    const classification = getRiskClassification(score);

    trackConversionEvent('diagnostic_completed', {
      score,
      classification,
      isAnonymous: true,
      answers: Object.keys(answers).reduce((acc, key) => {
        const id = Number(key);
        acc[`question_${id}`] = answers[id].key;
        return acc;
      }, {} as Record<string, string>),
    });

    setStep('results');
  };

  // Score Calculation (normalized 0-100)
  const calculateRiskScore = () => {
    const totalWeight = Object.values(answers).reduce((sum, item) => sum + item.weight, 0);
    // Maximum possible score weight is 115, minimum around 25. Let's map it smoothly:
    const maxPossible = 115;
    const normalized = Math.round((totalWeight / maxPossible) * 100);
    return Math.min(100, Math.max(15, normalized));
  };

  const getRiskClassification = (score: number) => {
    if (score < 40) return 'Atenção Moderada (Baixo Risco Geral)';
    if (score < 70) return 'Atenção Elevada (Médio Risco local)';
    return 'Atenção Crítica (Alto Risco detectado)';
  };

  const getClassificationStyles = (score: number) => {
    if (score < 40) {
      return {
        text: 'text-emerald-600',
        bg: 'bg-emerald-50 border-emerald-100',
        badge: 'bg-emerald-500',
        desc: 'Sua água apresenta um nível de risco moderado, mas necessita de ajuste de alcalinidade e filtragem preventiva para blindagem contra bactérias do encanamento.',
      };
    }
    if (score < 70) {
      return {
        text: 'text-amber-600',
        bg: 'bg-amber-50 border-amber-100',
        badge: 'bg-amber-500',
        desc: 'Atenção Elevada. Seus hábitos e/ou percepções regionais apontam uma probabilidade relevante de ingestão crônica de microplásticos (se usa galões) ou excesso de cloro residual descompensado.',
      };
    }
    return {
      text: 'text-rose-600',
      bg: 'bg-rose-50 border-rose-100',
      badge: 'bg-rose-500',
      desc: 'ALERTA CRÍTICO: Triagem de alto risco detectada. É recomendável suspender o uso de galões retornáveis de plástico desgastados ou água sem esterilização profunda por Ozônio para proteger a imunidade da sua família.',
    };
  };

  // Dynamic risk parameters based on user responses
  const getIndicators = (score: number): IndicatorItem[] => {
    const sourceKey = answers[1]?.key || 'tap';
    const tasteKey = answers[2]?.key || 'rarely';
    const symptomKey = answers[3]?.key || 'none';

    return [
      {
        name: 'Cloro Residual Hidrolisado',
        value: sourceKey === 'tap' ? 88 : sourceKey === 'simple_filter' ? 55 : 30,
        status: sourceKey === 'tap' ? 'Atenção' : 'Aceitável',
        description: 'Utilizado pelas concessionárias de esgoto para desinfecção, mas reage nas tubulações gerando subprodutos tóxicos se ingerido de forma contínua.',
        color: sourceKey === 'tap' ? 'text-amber-500 bg-amber-50' : 'text-emerald-500 bg-emerald-50',
      },
      {
        name: 'Presença de Microplásticos',
        value: sourceKey === 'gallon' ? 94 : sourceKey === 'tap' ? 45 : 60,
        status: sourceKey === 'gallon' ? 'Risco Potencial' : 'Aceitável',
        description: 'Liberados por galões de plástico retornáveis sob calor ou higienização abrasiva. Partículas microscópicas acumulam-se no organismo humano.',
        color: sourceKey === 'gallon' ? 'text-rose-500 bg-rose-50' : 'text-emerald-500 bg-emerald-50',
      },
      {
        name: 'Equilíbrio de pH da Água',
        value: sourceKey === 'well' ? 75 : tasteKey === 'often' ? 65 : 40,
        status: tasteKey === 'often' ? 'Ajuste Recomendável' : 'Aceitável',
        description: 'Águas de galões comerciais ou torneiras comuns costumam apresentar pH neutro ou ácido. A saúde preventiva exige hidratação mineral alcalina celular.',
        color: tasteKey === 'often' ? 'text-amber-500 bg-amber-50' : 'text-emerald-500 bg-emerald-50',
      },
      {
        name: 'Coliformes e Bactérias no Filtro',
        value: sourceKey === 'simple_filter' && tasteKey === 'sometimes' ? 82 : symptomKey === 'stomach' || symptomKey === 'both' ? 75 : 35,
        status: symptomKey === 'stomach' || symptomKey === 'both' ? 'Atenção' : 'Aceitável',
        description: 'Tubulações subterrâneas antigas, caixas d\'água sem manutenção e refis de filtro vencidos acumulam bactérias. Esterilização por Ozônio atua eliminando 99.9%.',
        color: symptomKey === 'stomach' || symptomKey === 'both' ? 'text-rose-500 bg-rose-50' : 'text-emerald-500 bg-emerald-50',
      },
      {
        name: 'Turbidez e Sólidos Suspensos',
        value: tasteKey === 'often' ? 85 : tasteKey === 'sometimes' ? 60 : 25,
        status: tasteKey === 'often' ? 'Atenção' : 'Aceitável',
        description: 'Obras no sistema público ou ferrugem interna das tubulações liberam micropartículas de ferro, argila e sílica suspensas na água invisivelmente.',
        color: tasteKey === 'often' ? 'text-rose-500 bg-rose-50' : 'text-emerald-500 bg-emerald-50',
      }
    ];
  };

  const handleWhatsAppResultsClick = () => {
    const score = calculateRiskScore();
    const classification = getRiskClassification(score);

    trackConversionEvent('results_whatsapp_clicked', {
      cep,
      city: locationData?.city,
      score,
      classification,
    });

    const locationStr = locationData ? `em ${locationData.city} - ${locationData.uf}` : '';
    const message = `Olá! Realizei o Diagnóstico de Água online da AquaVita ${locationStr}.\n\n*Resultado do Diagnóstico:*\n- CEP: ${cep}\n- Score de Atenção: ${score}% (${classification})\n- Principal preocupação identificada: ${answers[5]?.text || 'Saúde da família'}\n- Desejo agendamento de análise física gratuita: ${wantsPhysicalAnalysis ? 'Sim' : 'Não'}\n\nGostaria de falar com um especialista e garantir meu bônus de Instalação e Entrega Premium!`;
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/5554999997286?text=${encodedMessage}`, '_blank');
  };

  interface IndicatorItem {
    name: string;
    value: number;
    status: string;
    description: string;
    color: string;
  }

  return (
    <section id="diagnostico-cep" className="py-24 px-6 bg-white border-b border-gray-100">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-sapphire/10 text-sapphire text-sm font-medium tracking-wide mb-4">
            Triagem Regional de Pureza
          </span>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-800 mb-4">
            Diagnóstico de Risco de Água por CEP
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Avalie instantaneamente os riscos de contaminação e os indicadores do abastecimento na sua localidade de forma rápida e intuitiva.
          </p>
        </div>

        <div className="bg-sand rounded-3xl p-8 shadow-soft border border-slate-100 min-h-[450px] flex flex-col justify-between">
          <AnimatePresence mode="wait">
            
            {/* Step 1: CEP Entry */}
            {step === 'cep' && (
              <motion.div
                key="cep"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-8 flex-grow flex flex-col justify-center"
              >
                <div className="text-center max-w-md mx-auto space-y-4">
                  <div className="w-16 h-16 bg-sapphire/10 text-sapphire rounded-full flex items-center justify-center mx-auto mb-6">
                    <MapPin className="w-8 h-8" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800">Insira seu CEP para começar</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Identificamos sua rede de abastecimento regional e concessionárias locais para correlacionar os indicadores.
                  </p>
                </div>

                <form onSubmit={handleValidateCep} className="max-w-md mx-auto w-full space-y-4">
                  <div className="relative">
                    <input
                      type="text"
                      value={cep}
                      onChange={handleCepChange}
                      placeholder="Ex: 97970-000"
                      className="w-full bg-white text-slate-800 text-lg font-semibold font-mono tracking-wider px-6 py-4.5 rounded-2xl border-2 border-slate-200 focus:border-sapphire focus:outline-none transition-all text-center placeholder:font-sans placeholder:text-slate-400"
                    />
                  </div>
                  {cepError && (
                    <p className="text-sm text-rose-500 text-center font-medium">{cepError}</p>
                  )}
                  <button
                    type="submit"
                    disabled={isCepLoading}
                    className="w-full py-4 px-6 rounded-2xl bg-sapphire text-white font-medium text-base hover:bg-sapphire/90 transition-all flex items-center justify-center gap-2"
                  >
                    {isCepLoading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        <span>Verificando abastecimento regional...</span>
                      </>
                    ) : (
                      <>
                        <span>Iniciar Triagem de Risco</span>
                        <ChevronRight className="w-5 h-5" />
                      </>
                    )}
                  </button>
                </form>
              </motion.div>
            )}

            {/* Step 2: Questions Wizard */}
            {step === 'questions' && (
              <motion.div
                key="questions"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="space-y-6 flex-grow flex flex-col justify-between"
              >
                <div>
                  {/* Progress Header */}
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-xs font-semibold text-sapphire uppercase tracking-wider bg-sapphire/10 px-3 py-1 rounded-full">
                      Pergunta {currentQuestionIndex + 1} de {QUESTIONS.length}
                    </span>
                    {locationData && (
                      <span className="text-xs font-medium text-slate-500 flex items-center gap-1.5">
                        <MapPin className="w-3.5 h-3.5 text-sapphire" />
                        Análise para {locationData.city} - {locationData.uf}
                      </span>
                    )}
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-1.5 bg-slate-200 rounded-full mb-8 overflow-hidden">
                    <motion.div
                      className="h-full bg-sapphire"
                      initial={{ width: 0 }}
                      animate={{ width: `${((currentQuestionIndex + 1) / QUESTIONS.length) * 100}%` }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>

                  {/* Question Title */}
                  <h3 className="text-xl md:text-2xl font-serif text-slate-800 mb-8 leading-snug">
                    {QUESTIONS[currentQuestionIndex].text}
                  </h3>

                  {/* Options Stack */}
                  <div className="grid gap-4">
                    {QUESTIONS[currentQuestionIndex].options.map((option, idx) => (
                      <motion.button
                        key={idx}
                        onClick={() => handleAnswerSelect(option)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="text-left bg-white border border-slate-200 hover:border-sapphire p-5 rounded-2xl transition-all duration-200 hover:bg-slate-50 flex items-center justify-between group cursor-pointer"
                      >
                        <span className="text-base font-medium text-slate-700 group-hover:text-slate-900 pr-4">
                          {option.text}
                        </span>
                        <div className="w-6 h-6 rounded-full border-2 border-slate-200 group-hover:border-sapphire flex items-center justify-center shrink-0">
                          <div className="w-3 h-3 rounded-full bg-sapphire scale-0 group-hover:scale-100 transition-transform duration-200" />
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Lead Capture Form */}
            {step === 'lead' && (
              <motion.div
                key="lead"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                className="space-y-6 flex-grow flex flex-col justify-center"
              >
                <div className="text-center max-w-lg mx-auto space-y-3 mb-6">
                  <div className="w-12 h-12 bg-sapphire/10 text-sapphire rounded-full flex items-center justify-center mx-auto mb-3">
                    <Microscope className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-serif text-slate-800">
                    O diagnóstico de abastecimento está concluído!
                  </h3>
                  <p className="text-sm text-slate-500 leading-relaxed">
                    Insira seus dados abaixo para revelar o score de saúde preventiva personalizado e ter acesso aos parâmetros de purificação recomendados.
                  </p>
                </div>

                <form onSubmit={handleLeadSubmit} className="max-w-md mx-auto w-full space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">Seu Nome Completo:</label>
                    <input
                      type="text"
                      required
                      value={leadName}
                      onChange={(e) => setLeadName(e.target.value)}
                      placeholder="Ex: João da Silva"
                      className="w-full bg-white text-slate-800 text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-sapphire focus:outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2">WhatsApp / Telefone para contato:</label>
                    <input
                      type="tel"
                      required
                      value={leadPhone}
                      onChange={handlePhoneChange}
                      placeholder="Ex: (54) 99999-9999"
                      className="w-full bg-white text-slate-800 text-base px-4 py-3 rounded-xl border border-slate-200 focus:border-sapphire focus:outline-none transition-all font-mono"
                    />
                  </div>

                  <div className="bg-slate-50 p-4 rounded-xl border border-slate-200/60 mt-4">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={wantsPhysicalAnalysis}
                        onChange={(e) => setWantsPhysicalAnalysis(e.target.checked)}
                        className="w-5 h-5 rounded text-sapphire accent-sapphire border-slate-300 focus:ring-sapphire cursor-pointer"
                      />
                      <span className="text-xs font-medium text-slate-600 leading-snug">
                        Desejo solicitar o upgrade de <strong>Análise Física Gratuita</strong> da água na minha residência pelos técnicos certificados.
                      </span>
                    </label>
                  </div>

                  <div className="flex flex-col gap-3 pt-2">
                    <button
                      type="submit"
                      className="w-full py-3.5 px-6 rounded-xl bg-sapphire text-white font-medium text-base hover:bg-sapphire/90 transition-all flex items-center justify-center gap-2"
                    >
                      <span>Gerar Relatório de Saúde</span>
                      <ChevronRight className="w-5 h-5" />
                    </button>
                    <button
                      type="button"
                      onClick={handleSkipLead}
                      className="text-xs text-slate-400 hover:text-slate-600 font-medium text-center hover:underline transition-colors mt-1"
                    >
                      Revelar apenas dados estimados básicos (sem suporte local)
                    </button>
                  </div>
                </form>
              </motion.div>
            )}

            {/* Step 4: Diagnostic Results */}
            {step === 'results' && (
              <motion.div
                key="results"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                className="space-y-8"
              >
                {/* Result Hero Header */}
                <div className="grid md:grid-cols-12 gap-6 items-center">
                  <div className="md:col-span-8 space-y-4">
                    <div className="flex items-center gap-2">
                      <span className="bg-sapphire/10 text-sapphire text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                        Resultado de Triagem Local
                      </span>
                      {locationData && (
                        <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
                          Região: {locationData.city} - {locationData.uf}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-serif text-slate-800 leading-tight">
                      Score de Atenção Preventiva:
                    </h3>
                    <p className="text-sm text-slate-600">
                      {getClassificationStyles(calculateRiskScore()).desc}
                    </p>
                  </div>

                  <div className="md:col-span-4 flex justify-center">
                    {/* Score Dial */}
                    <div className="relative w-36 h-36 rounded-full flex items-center justify-center border-8 border-slate-100">
                      <svg className="absolute inset-0 transform -rotate-90 w-full h-full">
                        <circle
                          cx="68"
                          cy="68"
                          r="56"
                          stroke={calculateRiskScore() < 40 ? '#10B981' : calculateRiskScore() < 70 ? '#F59E0B' : '#EF4444'}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={351.8}
                          strokeDashoffset={351.8 - (351.8 * calculateRiskScore()) / 100}
                          className="transition-all duration-1000 ease-out"
                        />
                      </svg>
                      <div className="text-center">
                        <span className="text-4xl font-bold font-mono text-slate-800 leading-none">
                          {calculateRiskScore()}%
                        </span>
                        <span className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mt-1">
                          Nível de Risco
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`p-4 border rounded-2xl ${getClassificationStyles(calculateRiskScore()).bg} ${getClassificationStyles(calculateRiskScore()).text} text-center font-medium text-sm flex items-center justify-center gap-2`}>
                  <AlertTriangle className="w-5 h-5 shrink-0" />
                  <span>Classificação: <strong>{getRiskClassification(calculateRiskScore())}</strong></span>
                </div>

                {/* 5 Indicators Container */}
                <div>
                  <h4 className="text-sm font-semibold text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-2">
                    <Info className="w-4 h-4 text-sapphire" />
                    Principais Parâmetros e Pontos Críticos Analisados:
                  </h4>
                  <div className="space-y-4">
                    {getIndicators(calculateRiskScore()).map((ind, idx) => (
                      <div key={idx} className="bg-white p-5 rounded-2xl border border-slate-100 shadow-sm flex flex-col gap-2">
                        <div className="flex justify-between items-center">
                          <span className="font-serif font-semibold text-slate-800 text-base">{ind.name}</span>
                          <span className={`text-xs font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${ind.color}`}>
                            {ind.status}
                          </span>
                        </div>
                        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-sapphire"
                            style={{ width: `${ind.value}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-500 leading-relaxed mt-1">
                          {ind.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Non-Available Lab Data Notice (Important!) */}
                <div className="bg-slate-50 border border-slate-200/80 p-4 rounded-xl flex gap-3 text-xs text-slate-400 leading-relaxed">
                  <Info className="w-4 h-4 shrink-0 text-slate-400 mt-0.5" />
                  <div>
                    <strong>Nota Importante:</strong> Dado físico-químico municipal individual de Salvador das Missões não integrado em tempo real no banco nacional de triagem padrão. Os indicadores acima são uma projeção estatística calculada sobre o perfil de concessionárias da região de {locationData?.state || 'RS'} combinado às respostas da triagem. Este teste de triagem não substitui uma análise laboratorial física e química da água da sua torneira.
                  </div>
                </div>

                {/* CTA buttons */}
                <div className="pt-4 flex flex-col gap-4">
                  <motion.button
                    onClick={handleWhatsAppResultsClick}
                    className="w-full py-4 px-6 rounded-2xl bg-[#25D366] text-white font-semibold text-base shadow-xl hover:bg-[#20ba59] transition-all flex items-center justify-center gap-2"
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                  >
                    <MessageCircle className="w-5 h-5 shrink-0 animate-bounce" />
                    <span>Concluir Diagnóstico com Especialista</span>
                  </motion.button>
                  
                  {wantsPhysicalAnalysis && (
                    <div className="bg-sapphire/5 border border-sapphire/15 p-4 rounded-2xl flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-sapphire shrink-0 mt-0.5" />
                      <p className="text-xs text-sapphire leading-relaxed">
                        <strong>Upgrade Ativo:</strong> Nossos especialistas locais entrarão em contato no seu número WhatsApp para agendar a visita técnica e realizar a <strong>Análise de Pureza Física e de pH ao vivo</strong> na sua casa sem custo!
                      </p>
                    </div>
                  )}
                </div>

              </motion.div>
            )}

          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
