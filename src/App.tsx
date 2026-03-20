import React, { useState, useEffect, useRef } from 'react';
import { ShieldCheck, Leaf, Droplets, CheckCircle2, XCircle, ArrowRight, MessageCircle, Star, Shield, Lock, CreditCard, Award, HeartPulse, Zap, ChevronDown, Wrench, Check, ChevronLeft, ChevronRight, AlertTriangle, Microscope, Calendar, MapPin, Quote, Loader2, Share2, Facebook, Twitter, Menu, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const googleReviews = [
  {
    name: "Geni Suliman",
    time: "Há 1 mês",
    text: "Ótimo muito bom deu resultado na minha saúde. Pois estava com problema de estômago e graças à Deus e este aparelho estou bem já consigo me alimentar bem"
  },
  {
    name: "Gilvani Eichelberger",
    time: "Há 2 meses",
    text: "Sinceramente, foi uma das melhores decisões que já tomei! Eu tinha muito problema de estômago e, depois que instalei o purificador, nunca mais senti nada. A água é leve, gostosa e dá pra ver a diferença logo nos primeiros dias. Atendimento top e produto incrível — recomendo demais!"
  },
  {
    name: "Franciele Mombach",
    time: "Há 3 meses",
    text: "Foi um dos melhores investimento que fizemos... acabamos consumindo mais água que faz tão bem p nossa saúde..."
  },
  {
    name: "Laurindo Fenner",
    time: "Há 4 meses",
    text: "O ozonizador e um bom investimento para a saude, quem comprou acho que não vai se arepender, e no caso da assistencia tecnica e otima"
  },
  {
    name: "Sirlei Vais Klein",
    time: "Há 5 meses",
    text: "Com a aquisição do Purificador sabemos que estamos consumindo uma água de boa qualidade...,super recomendo, sempre importante investir em nossa saúde em primeiro lugar... Só tenho há agradecer ,nada a reclamar...."
  },
  {
    name: "Rosmeri Heineck",
    time: "Há 6 meses",
    text: "O purificador de água alcalina e ozonizada foi um dos melhores investimentos que já fizemos para nossa saúde. Qualidade e sabor inigualável. Muito satisfeitos."
  },
  {
    name: "Inez Maria Hanauer",
    time: "Há 7 meses",
    text: "Olá, boa noite. Viemos compartilhar neste espaço, da nossa satisfação em adquirir o nosso Purificador de Água. Dizer que realmente funciona muito bem, é de fácil manuseio, e o mais importante é que a água está melhor, em termos de cor, sabor e leveza. Mas um detalhe importante também foi o atendimento prestado pelos profissionais. Fomos atendidos em nossa casa, de maneira muito cordial e gentil, com explicações técnicas e detalhadas. A instalação do aparelho foi muito bem feita pelos mesmos, não deixaram nada a dever. Só podemos agradecer aos ótimos profissionais que nos atenderam nesse investimento, em melhor qualidade de água. Água é Vida. E vida longa a Água Vita é o que desejamos! Abraços"
  },
  {
    name: "Maria Aparecida Miranda Nascimento",
    time: "Há 8 meses",
    text: "Excelente. Fiz teste com água do filtro e da torneira. Podemos perceber a qualidade da água filtrada. Ótimo investimento. Água é vida.vale a pena investir."
  },
  {
    name: "cleonice grutzmann elegda",
    time: "Há 9 meses",
    text: "Comprei o purificador de àgua e estou muito satisfeita com o produto. Sempre pensando na saúde"
  },
  {
    name: "Iracema Maria Frolich",
    time: "Há 10 meses",
    text: "Água é vida, agua com qualidade é dos Purificadores AquaVita. Investimento que vale a pena cada centavo do qual não nos arrependemos."
  }
];

export default function App() {
  const [showStickyCTA, setShowStickyCTA] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);

  const trackContact = () => {
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('track', 'Contact');
    }
  };

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setIsRedirecting(true);
    trackContact();
    setTimeout(() => {
      setIsRedirecting(false);
      window.open("https://wa.me/5554999997286?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20an%C3%A1lise%20gratuita%20da%20minha%20%C3%A1gua.", "_blank");
    }, 2000);
  };

  const galleryImages = [
    "https://lh3.googleusercontent.com/p/AF1QipNO4CZ-3LVQ7I6lubR4tqNrfbBGZDcMlZMNwxjJ=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipPtOcftU5sgTIbChNGPpuSeWb5X-o5ACZlmimDr=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipMF3VtiK7Yhb5U64jNrNyPYhhB8dAMw1RPqjCn-=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipOid5nkjD9d2XyFMUQC_szPwGL6Oj2LbDZAjzVh=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipOcn5QElNUtssFqf2PHcBEBO-xVuDhhJHAhhqmV=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipNlEfveuWf2Ss5IuYumk8FJ3FLIpjtGhJW6cZ2X=s1360-w1360-h1020-rw",
    "https://lh3.googleusercontent.com/p/AF1QipOx3afzKjS4m5ci6F6zXGLG363ENVJcs8nxeRRM=s1360-w1360-h1020-rw"
  ];

  const scrollGallery = (direction: 'left' | 'right') => {
    if (carouselRef.current) {
      const scrollAmount = direction === 'left' ? -350 : 350;
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky CTA after scrolling past the hero section (approx 600px)
      if (window.scrollY > 600) {
        setShowStickyCTA(true);
      } else {
        setShowStickyCTA(false);
      }
      
      // Dynamic Navbar
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const faqs = [
    {
      question: "A instalação exige quebrar a parede ou bancada?",
      answer: "Absolutamente não. Nossos especialistas realizam uma instalação limpa, rápida e preservam 100% da estética da sua cozinha."
    },
    {
      question: "Como funciona a manutenção e a troca de refil?",
      answer: "O sistema é inteligente e você não precisa se preocupar. A durabilidade média é de 12 meses e nossa equipe avisa você quando for o momento ideal."
    },
    {
      question: "Por que é mais seguro que a água mineral de galão?",
      answer: "Galões de plástico liberam Bisfenol (BPA) e a água parada prolifera bactérias. O AquaVita Sovereign entrega água corrente, esterilizada por Ozônio (O3) e com pH alcalino."
    }
  ];

  return (
    <div className="min-h-screen bg-snow font-sans text-text-main selection:bg-sapphire/20">
      {/* Navigation */}
      <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${isScrolled ? 'bg-snow/90 backdrop-blur-md border-b border-gray-100 shadow-sm py-0' : 'bg-transparent py-2'}`}>
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Droplets className="w-8 h-8 text-sapphire" />
            <span className="font-serif text-2xl font-semibold tracking-tight text-sapphire">AquaVita</span>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#beneficios" className="text-slate-600 hover:text-sapphire font-medium transition-colors">Benefícios</a>
            <a href="#tecnologia" className="text-slate-600 hover:text-sapphire font-medium transition-colors">Tecnologia</a>
            <a href="#instalacao" className="text-slate-600 hover:text-sapphire font-medium transition-colors">Instalação</a>
            <a href="#faq" className="text-slate-600 hover:text-sapphire font-medium transition-colors">FAQ</a>
            <a 
              href="#diagnostico"
              onClick={trackContact}
              className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-sapphire text-white font-medium hover:bg-sapphire/90 transition-colors"
            >
              <Calendar className="w-4 h-4" />
              Agendar Análise
            </a>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-800 focus:outline-none"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Abrir menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Off-Canvas Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[60] md:hidden"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            
            {/* Sidebar */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 h-full w-[80vw] max-w-sm bg-snow z-[70] shadow-2xl flex flex-col md:hidden"
            >
              <div className="p-6 flex items-center justify-between border-b border-gray-100">
                <div className="flex items-center gap-2">
                  <Droplets className="w-6 h-6 text-sapphire" />
                  <span className="font-serif text-xl font-semibold text-sapphire">AquaVita</span>
                </div>
                <button 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="p-2 text-slate-500 hover:text-slate-800 bg-gray-100 rounded-full transition-colors"
                  aria-label="Fechar menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="flex-1 overflow-y-auto py-8 px-6 flex flex-col gap-6">
                <a 
                  href="#beneficios" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-sapphire"
                >
                  Benefícios
                </a>
                <a 
                  href="#tecnologia" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-sapphire"
                >
                  Tecnologia
                </a>
                <a 
                  href="#instalacao" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-sapphire"
                >
                  Instalação
                </a>
                <a 
                  href="#faq" 
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-lg font-medium text-slate-700 hover:text-sapphire"
                >
                  Perguntas Frequentes
                </a>
              </div>
              
              <div className="p-6 border-t border-gray-100">
                <a 
                  href="#diagnostico"
                  onClick={(e) => {
                    setIsMobileMenuOpen(false);
                    trackContact();
                  }}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-sapphire text-white font-medium hover:bg-sapphire/90 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Análise
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 bg-snow">
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-5xl md:text-7xl font-serif text-text-main leading-tight mb-6">
              <span className="block text-xl md:text-2xl font-sans text-sapphire font-medium mb-4 tracking-wide uppercase">Purificador de Água Alcalina e Ozonizada</span>
              A Blindagem de Ozônio e Alcalinidade que sua Família Merece.
            </h1>
            <p className="text-xl md:text-2xl text-text-muted font-light max-w-3xl mx-auto mb-8 leading-relaxed">
              Mais do que água. Uma blindagem de <strong className="font-medium text-sapphire">Ozônio</strong> e <strong className="font-medium text-sapphire">Alcalinidade Medicinal</strong> para a saúde da sua família.
            </p>
            
            <div className="flex flex-col items-center justify-center gap-4 mb-12">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <a
                  href="#diagnostico"
                  onClick={trackContact}
                  className="inline-flex items-center justify-center gap-2 bg-sapphire text-white px-8 py-4 rounded-full text-lg font-medium shadow-lg hover:shadow-xl hover:bg-sapphire/90 transition-all"
                >
                  <Calendar className="w-5 h-5" />
                  Agendar Análise Gratuita
                </a>
                <a
                  href="#beneficios"
                  className="inline-flex items-center justify-center gap-2 bg-white text-sapphire border border-sapphire/20 px-8 py-4 rounded-full text-lg font-medium hover:bg-sapphire/5 transition-all"
                >
                  Conhecer a Tecnologia
                </a>
              </div>
              <p className="text-sm text-sapphire/80 font-medium mt-2">
                Atendimento Especializado: Deixe a instalação e a manutenção por nossa conta.
              </p>
            </div>
          </motion.div>

          {/* Media Container */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: "easeOut" }}
            className="relative rounded-3xl overflow-hidden shadow-soft aspect-video max-w-5xl mx-auto bg-black group"
          >
            <div className="absolute inset-0 w-full h-full overflow-hidden rounded-3xl">
              <iframe
                src="https://www.youtube.com/embed/Ym7UaGxk9iQ?autoplay=0&mute=0&controls=1&rel=0&modestbranding=1"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title="AquaVita Sovereign"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent pointer-events-none"></div>
            
            {/* Share Button */}
            <div className="absolute top-6 right-6 z-30">
              <button 
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="bg-white/10 backdrop-blur-md border border-white/20 text-white p-3 rounded-full flex items-center justify-center shadow-2xl hover:bg-white/20 transition-all"
                aria-label="Compartilhar"
              >
                <Share2 className="w-5 h-5" />
              </button>
              
              <AnimatePresence>
                {showShareMenu && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.9, y: 10 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 10 }}
                    className="absolute top-full right-0 mt-3 bg-white rounded-2xl shadow-xl p-2 w-48 flex flex-col gap-1 border border-gray-100"
                  >
                    <a 
                      href={`https://wa.me/?text=${encodeURIComponent("Conheça a AquaVita: Purificadores de Água Alcalina e Ozonizada Premium! https://landingpageaquavita.netlify.app")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors"
                    >
                      <MessageCircle className="w-4 h-4 text-green-500" />
                      <span className="text-sm font-medium">WhatsApp</span>
                    </a>
                    <a 
                      href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent("https://landingpageaquavita.netlify.app")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors"
                    >
                      <Facebook className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium">Facebook</span>
                    </a>
                    <a 
                      href={`https://twitter.com/intent/tweet?url=${encodeURIComponent("https://landingpageaquavita.netlify.app")}&text=${encodeURIComponent("Conheça a AquaVita: Purificadores de Água Alcalina e Ozonizada Premium!")}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-3 py-2.5 hover:bg-gray-50 rounded-xl text-gray-700 transition-colors"
                    >
                      <Twitter className="w-4 h-4 text-sky-500" />
                      <span className="text-sm font-medium">Twitter</span>
                    </a>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Floating Badges */}
            <div className="absolute top-6 left-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-2xl transform transition-transform group-hover:scale-105">
              <Droplets className="w-4 h-4 text-sapphire-light" />
              <span className="text-sm font-medium tracking-wide">99,9% Livre de Bactérias</span>
            </div>
            <div className="absolute bottom-6 right-6 bg-white/10 backdrop-blur-md border border-white/20 text-white px-4 py-2.5 rounded-2xl flex items-center gap-2 shadow-2xl transform transition-transform group-hover:scale-105">
              <ShieldCheck className="w-4 h-4 text-sapphire-light" />
              <span className="text-sm font-medium tracking-wide">Ozônio Ativo (O₃)</span>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Authority Logos Section */}
      <section id="tecnologia" className="py-10 px-6 bg-snow border-b border-gray-50">
        <div className="max-w-5xl mx-auto">
          <p className="text-center text-sm font-medium text-slate-400 uppercase tracking-widest mb-8">
            Tecnologia Aprovada e Certificada por Especialistas
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16 opacity-60 grayscale hover:grayscale-0 transition-all duration-500">
            <div className="flex items-center gap-2 text-slate-600">
              <Award className="w-6 h-6" />
              <span className="font-serif font-semibold text-lg">Selo INMETRO</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Droplets className="w-6 h-6" />
              <span className="font-serif font-semibold text-lg">Water Quality</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <HeartPulse className="w-6 h-6" />
              <span className="font-serif font-semibold text-lg">Aprovado por Nutricionistas</span>
            </div>
            <div className="flex items-center gap-2 text-slate-600">
              <Zap className="w-6 h-6" />
              <span className="font-serif font-semibold text-lg">Qualidade Internacional</span>
            </div>
          </div>
        </div>
      </section>

      {/* O Problema da Água (Atenção/Interesse) */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-main mb-6">Você sabe o que realmente tem na sua água?</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              Mesmo a água filtrada ou de galão pode esconder impurezas invisíveis a olho nu. O cloro resseca a pele, enquanto microplásticos e bactérias comprometem a saúde da sua família a longo prazo.
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-snow p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-red-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center mb-6">
                <AlertTriangle className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">O Perigo do Cloro</h3>
              <p className="text-text-muted leading-relaxed">
                Usado para tratar a água da rua, o cloro elimina bactérias, mas quando ingerido diariamente, pode prejudicar a flora intestinal e ressecar pele e cabelos.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-snow p-8 rounded-3xl border border-gray-100 hover:shadow-xl hover:shadow-orange-500/5 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-2xl flex items-center justify-center mb-6">
                <Microscope className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">Microplásticos em Galões</h3>
              <p className="text-text-muted leading-relaxed">
                Galões de plástico expostos ao calor liberam bisfenol (BPA) e microplásticos na água. Além do peso e do trabalho de trocar, a pureza nunca é garantida.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-sapphire p-8 rounded-3xl text-white shadow-lg hover:shadow-2xl hover:shadow-sapphire/20 transition-all duration-300"
            >
              <div className="w-14 h-14 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7" />
              </div>
              <h3 className="text-xl font-serif font-medium mb-3">A Solução Definitiva</h3>
              <p className="text-sapphire-light leading-relaxed">
                O purificador AquaVita elimina 99,9% das bactérias com Ozônio, regula o pH para alcalino e entrega água 100% pura, direto na sua cozinha.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* A Ilusão da Água Tratada */}
      <section className="py-24 px-6 bg-slate-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Coluna Esquerda (Vídeo) */}
            <div className="relative rounded-2xl overflow-hidden shadow-xl aspect-video bg-black">
              <iframe 
                className="absolute top-0 left-0 w-full h-full"
                src="https://www.youtube.com/embed/yePM4804HG4" 
                title="A Ilusão da Água Tratada" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            
            {/* Coluna Direita (Copy Científica) */}
            <div>
              <h2 className="text-3xl md:text-4xl font-serif text-slate-900 mb-4 leading-tight">
                A Ilusão da Água Tratada: O Inimigo Invisível na Sua Torneira
              </h2>
              <p className="text-lg text-text-muted mb-8">
                Por que sistemas comuns não protegem mais a sua família.
              </p>
              
              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="relative group w-12 h-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center shrink-0 cursor-help">
                    <AlertTriangle className="w-6 h-6" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center pointer-events-none leading-relaxed">
                      O cloro elimina bactérias, mas reage com matéria orgânica formando compostos nocivos à saúde.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-lg text-slate-900 mb-1">O Paradoxo do Cloro</h4>
                    <p className="text-text-muted leading-relaxed">A reação química nas tubulações gera Trihalometanos (THMs), toxinas invisíveis.</p>
                  </div>
                </div>
                
                <div className="flex gap-4">
                  <div className="relative group w-12 h-12 bg-slate-200 text-slate-600 rounded-full flex items-center justify-center shrink-0 cursor-help">
                    <Microscope className="w-6 h-6" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center pointer-events-none leading-relaxed">
                      Estudos apontam a presença de microplásticos e metais pesados mesmo após o tratamento municipal.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-lg text-slate-900 mb-1">Alerta Científico</h4>
                    <p className="text-text-muted leading-relaxed">Estudos europeus recentes associam esses químicos a riscos silenciosos para a saúde a longo prazo.</p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="relative group w-12 h-12 bg-sapphire/10 text-sapphire rounded-full flex items-center justify-center shrink-0 cursor-help">
                    <ShieldCheck className="w-6 h-6" />
                    {/* Tooltip */}
                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-56 p-3 bg-slate-900 text-white text-xs rounded-lg shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10 text-center pointer-events-none leading-relaxed">
                      Purificação avançada que remove 99,9% das impurezas, preservando apenas os minerais essenciais.
                      <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-slate-900"></div>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-serif font-medium text-lg text-slate-900 mb-1">A Solução AquaVita</h4>
                    <p className="text-text-muted leading-relaxed">Retenção absoluta através de Carvão Ativado e esterilização orgânica por Ozônio.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Escala de pH (Educação/Desejo) */}
      <section className="py-24 px-6 bg-white overflow-hidden">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-serif text-text-main mb-6">A diferença entre matar a sede e nutrir o corpo</h2>
            <p className="text-xl text-text-muted max-w-3xl mx-auto leading-relaxed">
              O pH do nosso sangue é levemente alcalino (7.35 a 7.45). Consumir bebidas ácidas força o corpo a roubar minerais dos ossos para equilibrar o organismo. Veja onde a sua água está:
            </p>
          </div>

          <div className="relative max-w-5xl mx-auto pt-16 pb-24 px-4 md:px-0">
            {/* The Gradient Bar */}
            <div className="h-6 rounded-full w-full bg-gradient-to-r from-red-500 via-yellow-400 to-blue-600 relative shadow-inner">
              
              {/* Markers */}
              {/* Refrigerante pH 2.5 */}
              <div className="absolute top-0 left-[10%] -translate-x-1/2 -translate-y-full pb-8 flex flex-col items-center">
                <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-3 mb-2 flex flex-col items-center w-24 md:w-28">
                  <span className="text-xs font-bold text-red-500 mb-1">pH 2.5</span>
                  <span className="text-sm font-medium text-center leading-tight">Refrigerante</span>
                </div>
                <div className="w-0.5 h-8 bg-red-500"></div>
                <div className="w-4 h-4 rounded-full bg-red-500 border-4 border-white shadow-md absolute bottom-0 translate-y-1/2"></div>
              </div>

              {/* Café pH 5.0 */}
              <div className="absolute top-0 left-[35%] -translate-x-1/2 translate-y-6 pt-8 flex flex-col items-center">
                <div className="w-4 h-4 rounded-full bg-orange-400 border-4 border-white shadow-md absolute top-0 -translate-y-1/2"></div>
                <div className="w-0.5 h-8 bg-orange-400"></div>
                <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-3 mt-2 flex flex-col items-center w-24 md:w-28">
                  <span className="text-xs font-bold text-orange-500 mb-1">pH 5.0</span>
                  <span className="text-sm font-medium text-center leading-tight">Café</span>
                </div>
              </div>

              {/* Água da Torneira pH 7.0 */}
              <div className="absolute top-0 left-[60%] -translate-x-1/2 -translate-y-full pb-8 flex flex-col items-center">
                <div className="bg-white border border-gray-100 shadow-lg rounded-2xl p-3 mb-2 flex flex-col items-center w-24 md:w-28">
                  <span className="text-xs font-bold text-green-500 mb-1">pH 7.0</span>
                  <span className="text-sm font-medium text-center leading-tight">Água da Torneira</span>
                </div>
                <div className="w-0.5 h-8 bg-green-500"></div>
                <div className="w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-md absolute bottom-0 translate-y-1/2"></div>
              </div>

              {/* AquaVita pH 9.5+ */}
              <div className="absolute top-0 left-[90%] -translate-x-1/2 -translate-y-full pb-10 flex flex-col items-center z-10">
                <motion.div 
                  initial={{ y: 10, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  className="bg-sapphire text-white shadow-2xl rounded-2xl p-4 mb-2 flex flex-col items-center w-36 md:w-44 border border-white/20 relative"
                >
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-2xl blur opacity-30 animate-pulse"></div>
                  <span className="text-sm font-bold text-blue-200 mb-1 relative z-10">pH 9.5+</span>
                  <span className="text-base font-serif font-medium text-center leading-tight relative z-10">Água Alcalina AquaVita</span>
                </motion.div>
                <div className="w-1 h-10 bg-blue-600"></div>
                <div className="w-6 h-6 rounded-full bg-blue-600 border-4 border-white shadow-lg absolute bottom-0 translate-y-1/2"></div>
              </div>

            </div>
            
            <div className="flex justify-between mt-12 text-sm font-medium text-text-muted px-2">
              <span className="text-red-500 hidden md:block">Ambiente Ácido (Doenças)</span>
              <span className="text-red-500 md:hidden">Ácido</span>
              <span className="text-green-500">Neutro</span>
              <span className="text-blue-600 hidden md:block">Ambiente Alcalino (Saúde)</span>
              <span className="text-blue-600 md:hidden">Alcalino</span>
            </div>
          </div>

        </div>
      </section>

      {/* Benefits Section */}
      <section id="beneficios" className="py-24 px-6 bg-sand">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">Benefícios da Água Alcalina e Ozonizada</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Desenvolvido para famílias que não abrem mão do melhor em saúde e bem-estar.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.1, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-snow p-10 rounded-3xl shadow-soft border border-gray-50 hover:shadow-xl hover:shadow-sapphire/10 transition-shadow duration-300 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-sapphire to-sapphire-light flex items-center justify-center mb-8 shadow-lg shadow-sapphire/20 transform group-hover:scale-110 transition-transform duration-300">
                <ShieldCheck className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Imunidade Blindada</h3>
              <p className="text-text-muted leading-relaxed">
                Água enriquecida com minerais essenciais e pH perfeitamente alcalino, fortalecendo as defesas naturais do seu corpo a cada gole.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-snow p-10 rounded-3xl shadow-soft border border-gray-50 hover:shadow-xl hover:shadow-sapphire/10 transition-shadow duration-300 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center mb-8 shadow-lg shadow-emerald-500/20 transform group-hover:scale-110 transition-transform duration-300">
                <Leaf className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Alimentos 100% Livres de Agrotóxicos</h3>
              <p className="text-text-muted leading-relaxed">
                O poder do Ozônio ativo elimina bactérias e neutraliza agrotóxicos de frutas e verduras em minutos, garantindo refeições verdadeiramente seguras.
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              whileHover={{ y: -5, scale: 1.02 }}
              className="bg-snow p-10 rounded-3xl shadow-soft border border-gray-50 hover:shadow-xl hover:shadow-sapphire/10 transition-shadow duration-300 group"
            >
              <div className="w-20 h-20 rounded-full bg-gradient-to-br from-cyan-500 to-blue-400 flex items-center justify-center mb-8 shadow-lg shadow-cyan-500/20 transform group-hover:scale-110 transition-transform duration-300">
                <Droplets className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-serif mb-4">Hidratação Celular Profunda</h3>
              <p className="text-text-muted leading-relaxed">
                A tecnologia de micro-clusters reduz o tamanho das moléculas da água, permitindo uma absorção até 6x mais rápida pelas suas células.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Comparison Section */}
      <section className="py-24 px-6 bg-snow">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4">O Padrão Ouro em Purificadores de Água</h2>
            <p className="text-lg text-text-muted max-w-2xl mx-auto">
              Entenda por que as famílias mais exigentes estão abandonando os métodos tradicionais.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 md:gap-0 items-center max-w-4xl mx-auto">
            {/* Galão */}
            <div className="bg-sand p-8 md:p-12 rounded-3xl border border-gray-100 flex flex-col md:rounded-r-none md:border-r-0 z-0 relative">
              <h3 className="text-2xl font-serif text-gray-500 mb-8 text-center">Galão Comum</h3>
              <ul className="space-y-6 flex-grow">
                <li className="flex items-start gap-4 text-gray-500">
                  <XCircle className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                  <span>Risco de contaminação por bisfenol (BPA) no plástico</span>
                </li>
                <li className="flex items-start gap-4 text-gray-500">
                  <XCircle className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                  <span>Água parada, sujeita a proliferação de bactérias</span>
                </li>
                <li className="flex items-start gap-4 text-gray-500">
                  <XCircle className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                  <span>pH frequentemente ácido, prejudicando o corpo</span>
                </li>
                <li className="flex items-start gap-4 text-gray-500">
                  <XCircle className="w-6 h-6 text-gray-400 shrink-0 mt-0.5" />
                  <span>Trabalho pesado e inconveniente de troca de garrafões</span>
                </li>
              </ul>
            </div>

            {/* AquaVita */}
            <div className="bg-sapphire-light p-8 md:p-12 rounded-3xl shadow-2xl relative flex flex-col border-2 border-sapphire/30 z-10 md:scale-105 transform transition-transform hover:scale-110 bg-gradient-to-br from-sapphire-light to-white">
              <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-sapphire text-white px-6 py-2 rounded-full text-sm font-medium tracking-wide shadow-lg whitespace-nowrap">
                A Escolha das Famílias Exigentes
              </div>
              <h3 className="text-2xl font-serif text-sapphire mb-8 text-center mt-4">AquaVita Sovereign</h3>
              <ul className="space-y-6 flex-grow">
                <li className="flex items-start gap-4 text-text-main">
                  <CheckCircle2 className="w-6 h-6 text-sapphire shrink-0 mt-0.5" />
                  <span className="font-medium">Água 100% livre de plásticos e toxinas</span>
                </li>
                <li className="flex items-start gap-4 text-text-main">
                  <CheckCircle2 className="w-6 h-6 text-sapphire shrink-0 mt-0.5" />
                  <span className="font-medium">Purificação ativa com Ozônio bactericida</span>
                </li>
                <li className="flex items-start gap-4 text-text-main">
                  <CheckCircle2 className="w-6 h-6 text-sapphire shrink-0 mt-0.5" />
                  <span className="font-medium">Alcalinidade perfeita para equilíbrio do organismo</span>
                </li>
                <li className="flex items-start gap-4 text-text-main">
                  <CheckCircle2 className="w-6 h-6 text-sapphire shrink-0 mt-0.5" />
                  <span className="font-medium">Design minimalista e fornecimento contínuo</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>



      {/* Installation & Gallery Section */}
      <section id="instalacao" className="py-24 px-6 bg-sand border-t border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-sapphire/10 text-sapphire text-sm font-medium tracking-wide mb-4">
              Experiência Premium
            </span>
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-slate-800">Instalação Impecável. Design Integrado.</h2>
            <p className="text-lg text-slate-600 max-w-2xl mx-auto">
              Nossa equipe técnica especializada garante uma instalação limpa e rápida, preservando 100% da estética da sua cozinha.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Installation Video/Image */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="relative rounded-3xl overflow-hidden shadow-2xl aspect-video bg-black group"
            >
              <div className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/_ukGFm9lfPw?autoplay=1&mute=1&controls=0&loop=1&playlist=_ukGFm9lfPw&playsinline=1&rel=0&modestbranding=1&disablekb=1"
                  className="w-full h-full"
                  style={{ transform: 'scale(1.15)' }}
                  frameBorder="0"
                  allow="autoplay; encrypted-media"
                  title="Instalação White-Glove"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-8">
                <div className="flex items-center gap-3 mb-2">
                  <div className="w-10 h-10 rounded-full bg-sapphire flex items-center justify-center">
                    <Wrench className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-white text-xl font-medium">Serviço White-Glove</h3>
                </div>
                <p className="text-white/80 text-sm">Sem quebra-quebra. Sem sujeira. Pronto para uso em 45 minutos.</p>
              </div>
            </motion.div>

            {/* Installation Benefits */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="space-y-8"
            >
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sapphire/10 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-sapphire" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-slate-800 mb-2">Agendamento Flexível</h4>
                  <p className="text-slate-600 leading-relaxed">Nossa equipe se adapta à sua agenda. Escolha o dia e horário mais convenientes para você.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sapphire/10 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-sapphire" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-slate-800 mb-2">Técnicos Certificados</h4>
                  <p className="text-slate-600 leading-relaxed">Profissionais uniformizados, treinados e equipados com ferramentas de precisão para não danificar suas bancadas.</p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-12 h-12 rounded-full bg-sapphire/10 flex items-center justify-center shrink-0">
                  <Check className="w-6 h-6 text-sapphire" />
                </div>
                <div>
                  <h4 className="text-xl font-serif text-slate-800 mb-2">Teste de Qualidade da Água</h4>
                  <p className="text-slate-600 leading-relaxed">Antes de finalizarmos, realizamos testes de pH e pureza na sua frente para comprovar a eficácia do sistema.</p>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Gallery Carousel */}
          <div className="relative group/carousel">
            <button 
              onClick={() => scrollGallery('left')} 
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-sapphire hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
              aria-label="Anterior"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            
            <div 
              ref={carouselRef} 
              className="flex overflow-x-auto gap-4 snap-x snap-mandatory pb-4" 
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {galleryImages.map((img, idx) => (
                <motion.div 
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="min-w-[280px] md:min-w-[320px] aspect-square rounded-2xl overflow-hidden shadow-sm group snap-center relative cursor-pointer"
                  onClick={() => setSelectedImage(img)}
                >
                  <img 
                    src={img} 
                    alt={`Instalação ${idx + 1}`} 
                    className="w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105" 
                    referrerPolicy="no-referrer" 
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-sapphire/80 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <span className="text-white font-medium">Ver detalhes</span>
                  </div>
                </motion.div>
              ))}
            </div>

            <button 
              onClick={() => scrollGallery('right')} 
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full shadow-lg flex items-center justify-center text-sapphire hover:bg-white hover:scale-110 transition-all opacity-0 group-hover/carousel:opacity-100 disabled:opacity-0"
              aria-label="Próximo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Como Funciona (Clareza de Ação) */}
      <section id="como-funciona" className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-main mb-6">Como ter o melhor purificador de água na sua casa</h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              Um processo simples, transparente e focado no seu conforto.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-12 relative">
            {/* Connecting Line (Desktop only) */}
            <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-gray-200 z-0"></div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-snow border-4 border-white shadow-md rounded-full flex items-center justify-center text-sapphire mb-6">
                <MessageCircle className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3">1. Agendamento</h3>
              <p className="text-text-muted leading-relaxed">
                Fale conosco pelo WhatsApp e agende o melhor horário para receber nosso especialista.
              </p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-sapphire border-4 border-white shadow-md rounded-full flex items-center justify-center text-white mb-6">
                <Droplets className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3">2. Análise Gratuita</h3>
              <p className="text-text-muted leading-relaxed">
                Avaliamos a pressão e a qualidade da água da sua residência sem nenhum custo ou compromisso.
              </p>
            </div>

            <div className="relative z-10 text-center">
              <div className="w-24 h-24 mx-auto bg-snow border-4 border-white shadow-md rounded-full flex items-center justify-center text-sapphire mb-6">
                <Wrench className="w-10 h-10" />
              </div>
              <h3 className="text-2xl font-serif font-medium mb-3">3. Instalação Premium</h3>
              <p className="text-text-muted leading-relaxed">
                Instalação limpa, rápida e com acabamento perfeito. Sua família já começa a beber água pura na hora.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Depoimentos (Prova Social) */}
      <section className="py-24 px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-text-main mb-6">O que dizem nossas famílias</h2>
            <p className="text-xl text-text-muted max-w-2xl mx-auto">
              A satisfação de quem já transformou a saúde da sua casa com a AquaVita.
            </p>
          </div>

          <div className="relative">
            <div className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 hide-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
              {googleReviews.map((review, idx) => (
                <div 
                  key={idx}
                  className="snap-center shrink-0 w-[85vw] md:w-[400px] bg-white p-8 rounded-3xl relative shadow-sm border border-gray-100 flex flex-col"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center text-white font-medium text-xl shrink-0">
                        {review.name.charAt(0)}
                      </div>
                      <div>
                        <h4 className="font-medium text-slate-900 line-clamp-1">{review.name}</h4>
                        <div className="flex items-center gap-2 text-sm text-slate-500">
                          <span>{review.time}</span>
                        </div>
                      </div>
                    </div>
                    {/* Google G Logo SVG */}
                    <svg className="w-6 h-6 shrink-0" viewBox="0 0 24 24">
                      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                    </svg>
                  </div>
                  <div className="flex gap-1 mb-4 text-amber-400">
                    {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <p className="text-[17px] md:text-lg text-slate-700 leading-[1.8] flex-grow">
                    {review.text}
                  </p>
                </div>
              ))}
            </div>
            {/* Gradient fades on edges for desktop */}
            <div className="hidden md:block absolute top-0 bottom-8 left-0 w-12 bg-gradient-to-r from-snow to-transparent pointer-events-none"></div>
            <div className="hidden md:block absolute top-0 bottom-8 right-0 w-12 bg-gradient-to-l from-snow to-transparent pointer-events-none"></div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 bg-snow">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif mb-4 text-slate-800">Perguntas Frequentes</h2>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div 
                key={index}
                className="bg-sand rounded-2xl border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setOpenFaqIndex(openFaqIndex === index ? null : index)}
                  className="w-full px-8 py-6 flex items-center justify-between text-left focus:outline-none"
                >
                  <h3 className="text-lg font-medium text-slate-800 pr-8">{faq.question}</h3>
                  <ChevronDown 
                    className={`w-5 h-5 text-sapphire transition-transform duration-300 shrink-0 ${openFaqIndex === index ? 'rotate-180' : ''}`} 
                  />
                </button>
                <AnimatePresence>
                  {openFaqIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-8 pb-6 text-slate-600 leading-relaxed border-t border-gray-100/50 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Guarantee Section */}
      <section className="py-20 px-6 bg-sapphire text-white">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-white/10 mb-8">
            <Shield className="w-10 h-10 text-sapphire-light" />
          </div>
          <h2 className="text-3xl md:text-4xl font-serif mb-6">Garantia de 1 Ano com Suporte Técnico Local</h2>
          <div className="text-lg md:text-xl text-sapphire-light font-light leading-relaxed max-w-3xl mx-auto space-y-6">
            <p>
              Garantia de 1 Ano com Suporte Técnico Local e Instalação Especializada na Nossa Região. Com a Aqua Vita, você não compra um aparelho na internet para se virar depois, nós cuidamos de tudo para você.
            </p>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section id="diagnostico" className="py-24 px-6 bg-sand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-serif mb-6">Eleve o Padrão de Saúde da Sua Família</h2>
          <p className="text-xl text-text-muted mb-12 max-w-2xl mx-auto leading-relaxed">
            Agende uma análise gratuita da água da sua residência. Nossos especialistas estão prontos para recomendar a solução perfeita, sem compromisso.
          </p>
          
          <div className="flex flex-col items-center justify-center">
            <motion.a
              href="https://wa.me/5554999997286?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20an%C3%A1lise%20gratuita%20da%20minha%20%C3%A1gua."
              target="_blank"
              rel="noopener noreferrer"
              onClick={handleCtaClick}
              className={`inline-flex items-center justify-center gap-3 bg-sapphire text-white px-10 py-5 rounded-full text-lg font-medium shadow-xl hover:shadow-2xl hover:bg-sapphire/90 transition-all relative group overflow-hidden ${isRedirecting ? 'pointer-events-none opacity-90' : ''}`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="absolute inset-0 w-full h-full bg-white/20 animate-pulse rounded-full"></span>
              {isRedirecting ? (
                <>
                  <Loader2 className="w-6 h-6 relative z-10 animate-spin" />
                  <span className="relative z-10">Enviando...</span>
                </>
              ) : (
                <>
                  <Calendar className="w-6 h-6 relative z-10" />
                  <span className="relative z-10">Agendar Análise Gratuita</span>
                  <ArrowRight className="w-5 h-5 relative z-10 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </motion.a>
            <p className="text-sm text-sapphire/80 font-medium mt-4">
              Atendimento Especializado: Deixe a instalação e a manutenção por nossa conta.
            </p>
          </div>
          
          {/* Scarcity Bonus */}
          <div className="mt-6 inline-flex items-center gap-2 bg-amber-50 border border-amber-200 text-amber-800 px-4 py-2 rounded-full text-sm font-medium shadow-sm">
            <span>🎁</span>
            <span>Bônus: Instalação Premium e entrega Gratuita</span>
          </div>
          
          <div className="mt-8 flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8 text-sm text-slate-500 font-medium">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sapphire/70" />
              <span>✓ Instalação Especializada</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sapphire/70" />
              <span>✓ 1 Ano de Garantia</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-sapphire/70" />
              <span>✓ Certificação Máxima de Qualidade</span>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-text-muted">
            Atendimento exclusivo e personalizado. Sem compromisso.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-snow py-16 px-6 border-t border-gray-100">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <Droplets className="w-8 h-8 text-sapphire" />
              <span className="font-serif text-2xl font-semibold tracking-tight text-sapphire">AquaVita</span>
            </div>
            <p className="text-slate-500 text-sm leading-relaxed max-w-sm mb-8">
              Elevando o padrão de saúde das famílias brasileiras através da purificação avançada por ozônio e alcalinidade perfeita.
            </p>
            <div className="flex items-center gap-4 text-slate-400">
              <Shield className="w-5 h-5" />
              <Lock className="w-5 h-5" />
              <CreditCard className="w-5 h-5" />
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-slate-800 mb-6">Institucional</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-sapphire transition-colors">Sobre a AquaVita</a></li>
              <li><a href="#" className="hover:text-sapphire transition-colors">Tecnologia O₃</a></li>
              <li><a href="#" className="hover:text-sapphire transition-colors">Certificações</a></li>
              <li><a href="https://docs.google.com/forms/d/e/1FAIpQLSeNH6S6MH5gjOshMqxJ2n0XFKBpy1c5b_k4GA0s1y3EP1UMow/viewform?usp=publish-editor" target="_blank" rel="noopener noreferrer" className="hover:text-sapphire transition-colors">Trabalhe Conosco</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-medium text-slate-800 mb-6">Suporte</h4>
            <ul className="space-y-4 text-sm text-slate-500">
              <li><a href="#" className="hover:text-sapphire transition-colors">Central de Ajuda</a></li>
              <li><a href="#" className="hover:text-sapphire transition-colors">Agendar Manutenção</a></li>
              <li><a href="#" className="hover:text-sapphire transition-colors">Garantia e Suporte</a></li>
              <li><a href="#" className="hover:text-sapphire transition-colors">Política de Privacidade</a></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-8 border-t border-gray-100 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-400">
          <p>&copy; {new Date().getFullYear()} AquaVita Purificadores. Todos os direitos reservados.</p>
          <p>CNPJ: 42.123.456/0001-89 | Ambiente 100% Seguro</p>
        </div>
      </footer>

      {/* Mobile Sticky CTA */}
      <AnimatePresence>
        {showStickyCTA && (
          <motion.div 
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 p-4 bg-snow/90 backdrop-blur-md border-t border-gray-200 z-50 md:hidden shadow-[0_-10px_40px_rgba(0,0,0,0.1)]"
          >
            <a
              href="https://wa.me/5554999997286?text=Ol%C3%A1,%20gostaria%20de%20agendar%20uma%20an%C3%A1lise%20gratuita%20da%20minha%20%C3%A1gua."
              target="_blank"
              rel="noopener noreferrer"
              onClick={trackContact}
              className="flex items-center justify-center gap-2 w-full bg-sapphire text-white py-4 rounded-2xl font-medium shadow-lg active:scale-95 transition-transform"
            >
              <Calendar className="w-5 h-5" />
              Agendar Análise Gratuita
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/5554999997286?text=Ol%C3%A1%21%20Estava%20na%20p%C3%A1gina%20da%20AquaVita%20%28Fam%C3%ADlia%29%20e%20quero%20o%20meu%20Diagn%C3%B3stico%20VIP."
        target="_blank"
        rel="noopener noreferrer"
        onClick={trackContact}
        className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-[#25D366] text-white font-medium px-5 py-3 rounded-full shadow-2xl shadow-green-900/30 hover:scale-105 transition-all"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="currentColor"
          className="w-6 h-6"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
        </svg>
        Falar com Especialista
      </a>

      {/* Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm cursor-zoom-out"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-5xl w-full max-h-[90vh] flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => setSelectedImage(null)}
                className="absolute -top-12 right-0 md:-right-12 w-10 h-10 bg-white/10 hover:bg-white/20 text-white rounded-full flex items-center justify-center transition-colors"
                aria-label="Fechar"
              >
                <XCircle className="w-6 h-6" />
              </button>
              <img
                src={selectedImage}
                alt="Instalação detalhada"
                className="w-auto h-auto max-w-full max-h-[85vh] object-contain rounded-lg shadow-2xl"
                referrerPolicy="no-referrer"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
