import React, { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Calendar, 
  ChevronRight, 
  MapPin, 
  Phone, 
  Mail, 
  MoveRight, 
  Maximize2, 
  Check, 
  ArrowRight,
  Clock,
  Award,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Sub-components ---

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[95%] max-w-7xl px-6 py-3 flex items-center justify-between rounded-full border ${
      isScrolled 
        ? 'bg-background/80 backdrop-blur-2xl border-accent/20 shadow-lg' 
        : 'bg-transparent border-white/10'
    }`}>
      <div className={`text-2xl font-heading font-bold tracking-tight ${isScrolled ? 'text-primary' : 'text-white'}`}>
        FCML
      </div>
      
      <div className={`hidden md:flex gap-8 font-detail text-sm uppercase tracking-widest ${isScrolled ? 'text-primary/70' : 'text-white/70'}`}>
        {['Products', 'Showroom', 'Process', 'Projects'].map((item) => (
          <a key={item} href={`#${item.toLowerCase()}`} className="hover:text-accent transition-colors">{item}</a>
        ))}
      </div>

      <button className="btn-premium btn-primary py-2 px-6 text-xs">
        Book Appointment
        <span className="sheen"></span>
      </button>
    </nav>
  );
};

const Hero = () => {
  const containerRef = useRef();
  const [bgIndex, setBgIndex] = useState(0);
  const heroImages = [
    { url: "https://images.unsplash.com/photo-1556911220-e152748a7352?auto=format&fit=crop&q=80&w=2000", alt: "Modern Modular Kitchen" },
    { url: "https://images.unsplash.com/photo-1513519245088-0e12902e35ca?auto=format&fit=crop&q=80&w=2000", alt: "Premium Wooden Flooring" },
    { url: "https://images.unsplash.com/photo-1507089947368-19c1da97753e?auto=format&fit=crop&q=80&w=2000", alt: "Luxury Bathroom Fittings" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setBgIndex((i) => (i + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 60,
        opacity: 0,
        duration: 1.2,
        stagger: 0.12,
        ease: 'power4.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative h-[100dvh] flex items-center overflow-hidden" ref={containerRef}>
      <div className="absolute inset-0">
        {heroImages.map((img, i) => (
          <img 
            key={i}
            src={img.url} 
            alt={img.alt} 
            className={`absolute inset-0 w-full h-full object-cover transition-all duration-[2000ms] ease-in-out ${i === bgIndex ? 'opacity-100 scale-105' : 'opacity-0 scale-100'}`}
          />
        ))}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/90 via-primary/40 to-transparent"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-8 md:px-16 pt-20">
        <div className="max-w-2xl">
          <p className="hero-reveal font-detail text-accent uppercase tracking-[0.3em] mb-4">Artisan Heritage</p>
          <h1 className="hero-reveal text-5xl md:text-8xl text-white font-medium mb-6 leading-[0.9]">
            Craftsmanship <br />
            <span className="text-accent text-drama block mt-4">that Endures.</span>
          </h1>
          <p className="hero-reveal text-white/70 text-lg md:text-xl font-body max-w-md mb-10 leading-relaxed">
            Crafting timeless living spaces through exceptional wooden flooring, premium bathroom sanctuaries, and bespoke modular kitchens.
          </p>
          <div className="hero-reveal flex gap-4">
            <button className="btn-premium btn-primary">
              Schedule Design Consultation
              <span className="sheen"></span>
            </button>
            <button className="btn-premium btn-secondary !text-white !border-white/20 hover:!bg-white/5">
              View Showroom
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

const SpecializedCard = ({ title, category, description, children, type }) => {
  return (
    <div className="group relative bg-white rounded-premium border border-primary/5 p-8 h-full flex flex-col shadow-sm hover:shadow-xl transition-all duration-700">
      <div className="mb-6">
        <span className="text-accent font-detail text-xs uppercase tracking-widest">{category}</span>
        <h3 className="text-3xl font-heading text-primary mt-2">{title}</h3>
      </div>
      <p className="text-dark/60 text-sm mb-8 leading-relaxed">
        {description}
      </p>
      <div className="flex-grow">
        {children}
      </div>
      <button className="mt-8 flex items-center gap-2 text-primary font-body font-semibold group-hover:text-accent transition-colors">
        Learn More <MoveRight size={18} className="translate-x-0 group-hover:translate-x-2 transition-transform" />
      </button>
    </div>
  );
};

const MaterialCarousel = () => {
  const [index, setIndex] = useState(0);
  const materials = [
    { name: 'Heritage Oak', img: 'https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=400', finish: 'Satin' },
    { name: 'Smoked Walnut', img: 'https://images.unsplash.com/photo-1615876063860-d971f6d9000f?auto=format&fit=crop&q=80&w=400', finish: 'Matte' },
    { name: 'Aged Teak', img: 'https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=400', finish: 'Oil' },
    { name: 'Arctic Maple', img: 'https://images.unsplash.com/photo-1550928236-0562e841261e?auto=format&fit=crop&q=80&w=400', finish: 'High Gloss' },
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % materials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-64 rounded-xl overflow-hidden shadow-inner bg-background">
      {materials.map((m, i) => (
        <div key={m.name} className={`absolute inset-0 transition-opacity duration-1000 ${i === index ? 'opacity-100' : 'opacity-0'}`}>
          <img src={m.img} className="w-full h-full object-cover scale-110" alt={m.name} />
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur px-4 py-2 rounded-lg">
            <p className="text-xs font-bold text-primary">{m.name}</p>
            <p className="text-[10px] text-accent font-detail uppercase">{m.finish} Finish</p>
          </div>
        </div>
      ))}
    </div>
  );
};

const ConfigurationStudio = () => {
  const [selected, setSelected] = useState([0, 2, 4]);
  const toggle = (i) => setSelected(s => s.includes(i) ? s.filter(x => x !== i) : [...s, i]);
  
  return (
    <div className="grid grid-cols-3 gap-3">
      {[...Array(9)].map((_, i) => (
        <div 
          key={i} 
          onClick={() => toggle(i)}
          className={`aspect-square rounded-lg border-2 flex items-center justify-center cursor-pointer transition-all duration-300 ${
            selected.includes(i) ? 'border-accent bg-accent/5 shadow-inner' : 'border-primary/5 hover:border-accent/30'
          }`}
        >
          {selected.includes(i) ? <Check className="text-accent" size={20} /> : <div className="w-1 h-1 bg-primary/10 rounded-full" />}
        </div>
      ))}
      <div className="col-span-3 mt-4 flex items-center justify-between px-2">
        <span className="text-[10px] uppercase tracking-wider text-primary/40 font-detail">12 Curated Collections</span>
        <span className="text-xs font-bold text-accent">{selected.length} Selected</span>
      </div>
    </div>
  );
};

const DimensionCalculator = () => {
  const [val, setVal] = useState(45);
  return (
    <div className="bg-background rounded-xl p-6 relative overflow-hidden h-64 border border-primary/5">
      <div className="relative z-10">
        <p className="text-xs font-bold text-primary uppercase mb-6">Custom Fitting Area</p>
        <div className="flex flex-col gap-8">
          <div className="space-y-3">
            <div className="flex justify-between text-[10px] font-detail uppercase text-primary/60">
              <span>Standard</span>
              <span>Bespoke</span>
            </div>
            <input 
              type="range" 
              value={val} 
              onChange={(e) => setVal(e.target.value)}
              className="w-full accent-accent h-1 bg-primary/10 rounded-full appearance-none cursor-pointer" 
            />
          </div>
          <div>
            <span className="text-4xl font-heading text-primary font-bold">{Math.round(val * 1.8)}</span>
            <span className="text-sm text-accent font-detail ml-2">sq. ft.</span>
            <p className="text-[10px] text-primary/40 mt-1">Real-time modular estimate</p>
          </div>
        </div>
      </div>
      <svg className="absolute top-0 right-0 w-full h-full opacity-[0.05]" viewBox="0 0 100 100">
        <line x1="0" y1="20" x2="100" y2="20" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="40" x2="100" y2="40" stroke="currentColor" strokeWidth="0.5" />
        <line x1="0" y1="60" x2="100" y2="60" stroke="currentColor" strokeWidth="0.5" />
        <line x1="20" y1="0" x2="20" y2="100" stroke="currentColor" strokeWidth="0.5" />
        <line x1="40" y1="0" x2="40" y2="100" stroke="currentColor" strokeWidth="0.5" />
      </svg>
    </div>
  );
};

const Philosophy = () => {
  const textRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.philo-word', {
        scrollTrigger: {
          trigger: textRef.current,
          start: 'top 80%',
        },
        y: 20,
        opacity: 0,
        scale: 0.95,
        duration: 0.8,
        stagger: 0.05,
        ease: 'power3.out',
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <section className="relative py-32 bg-dark text-white overflow-hidden">
      <div className="absolute inset-0 opacity-15 overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1541123437800-1bb1317badc2?auto=format&fit=crop&q=80&w=2000" 
          alt="Texture" 
          className="w-full h-full object-cover grayscale"
        />
      </div>
      <div className="container mx-auto px-8 relative z-10" ref={textRef}>
        <div className="max-w-4xl mx-auto text-center">
          <p className="font-detail text-accent uppercase tracking-widest mb-8">Craftsmanship Manifesto</p>
          <p className="philo-word text-xl md:text-2xl font-body text-white/60 mb-12">
            Most home décor offers mass-produced, standardized solutions that fade with the seasons.
          </p>
          <h2 className="philo-word text-4xl md:text-7xl font-medium leading-tight">
            We craft <span className="text-accent text-drama">bespoke living environments</span> tailored to your vision.
          </h2>
        </div>
      </div>
    </section>
  );
};

const ProcessStack = () => {
  const containerRef = useRef();
  const steps = [
    { 
      id: "01", 
      title: "Initial Consultation", 
      desc: "A deep dive into your lifestyle and aesthetic preferences. We sketch the first blueprint of your dream space.",
      time: "2-4 Days",
      icon: <Users className="text-accent" />,
      bg: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      id: "02", 
      title: "Material Selection", 
      desc: "Select from our vault of premium walnut, brass fittings, and Italian marble. Touch the textures that will define your home.",
      time: "1-2 Weeks",
      icon: <Maximize2 className="text-accent" />,
      bg: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      id: "03", 
      title: "Design Finalization", 
      desc: "Our master designers present high-fidelity 3D renderings and material boards for your final approval.",
      time: "3-5 Weeks",
      icon: <Check className="text-accent" />,
      bg: "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=1200"
    },
    { 
      id: "04", 
      title: "Expert Installation", 
      desc: "Our artisans bring the vision to life with surgical precision and exceptional attention to detail.",
      time: "Duration Variable",
      icon: <Award className="text-accent" />,
      bg: "https://images.unsplash.com/photo-1541888941257-2364c3983353?auto=format&fit=crop&q=80&w=1200"
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray('.process-card');
      cards.forEach((card, i) => {
        if (i < cards.length - 1) {
          ScrollTrigger.create({
            trigger: card,
            start: "top top",
            pin: true,
            pinSpacing: false,
            scrub: true,
            onUpdate: (self) => {
              gsap.set(card, {
                scale: 1 - self.progress * 0.08,
                filter: `blur(${self.progress * 12}px)`,
                opacity: 1 - self.progress * 0.4,
              });
            }
          });
        }
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section className="bg-background relative" ref={containerRef}>
      <div id="process">
        {steps.map((step) => (
          <div key={step.id} className="process-card h-screen w-full flex items-center justify-center p-8 sticky top-0">
            <div className="w-full max-w-6xl flex flex-col md:flex-row bg-white rounded-premium overflow-hidden shadow-2xl border border-primary/5 h-[80vh]">
              <div className="flex-1 p-12 flex flex-col justify-center">
                <span className="text-accent font-detail font-bold text-4xl mb-6">{step.id}</span>
                <h3 className="text-5xl font-heading text-primary mb-6">{step.title}</h3>
                <p className="text-dark/60 text-lg leading-relaxed mb-10 max-w-md">
                  {step.desc}
                </p>
                <div className="flex items-center gap-4 text-accent font-detail uppercase tracking-wider text-sm">
                  <Clock size={18} />
                  <span>{step.time}</span>
                </div>
              </div>
              <div className="flex-1 relative overflow-hidden group">
                <img src={step.bg} className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110" alt={step.title} />
                <div className="absolute inset-0 bg-primary/20 bg-blend-overlay"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

const AppointmentHero = () => {
  return (
    <section className="py-32 px-8 bg-accent/90 relative overflow-hidden">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <pattern id="blueprint" width="10" height="10" patternUnits="userSpaceOnUse">
            <path d="M 10 0 L 0 0 0 10" fill="none" stroke="currentColor" strokeWidth="0.1" />
          </pattern>
          <rect width="100" height="100" fill="url(#blueprint)" />
        </svg>
      </div>
      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <h2 className="text-5xl md:text-7xl font-heading text-white mb-8">Begin Your Transformation</h2>
        <p className="text-white/80 text-lg md:text-xl font-body mb-12 max-w-2xl mx-auto">
          Every great space starts with a single conversation. Join us for a private consultation to discuss your vision.
        </p>
        <div className="flex flex-col md:flex-row gap-6 justify-center">
          <button className="btn-premium bg-white text-accent hover:bg-white/90 shadow-xl">
            <Calendar size={20} />
            Schedule Design Consultation
          </button>
          <button className="btn-premium border border-white/30 text-white hover:bg-white/10">
            <MapPin size={20} />
            Visit Our Showroom
          </button>
        </div>
        <div className="mt-16 pt-8 border-t border-white/20 flex flex-wrap justify-center gap-8 text-[10px] md:text-xs uppercase tracking-[0.2em] font-detail text-white/60">
          <span>Complimentary Design Consultation</span>
          <span>500+ Premium Installations</span>
          <span>Lifetime Craftsmanship Guarantee</span>
        </div>
      </div>
    </section>
  );
};

const SocialProof = () => {
  const images = [
    "https://images.unsplash.com/photo-1507089947368-19c1da97753e?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1556911220-e152748a7352?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1503387762-592dea58ef23?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1516455590571-18256e5bb9ff?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1581094794329-c8112a89af12?auto=format&fit=crop&q=80&w=800",
    "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=800",
  ];

  return (
    <section className="py-32 px-8 bg-background">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="max-w-xl">
            <span className="text-accent font-detail text-xs uppercase tracking-widest">Portfolio</span>
            <h2 className="text-5xl font-heading text-primary mt-4">Curated Living Spaces</h2>
          </div>
          <button className="flex items-center gap-2 text-primary font-bold group">
            View Complete Portfolio <ArrowRight size={20} className="group-hover:translate-x-2 transition-transform" />
          </button>
        </div>
        
        <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
          {images.map((img, i) => (
            <div key={i} className="relative rounded-premium overflow-hidden group cursor-crosshair">
              <img src={img} className="w-full object-cover transition-transform duration-1000 group-hover:scale-110" alt="Interior" />
              <div className="absolute inset-0 bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center p-8">
                <div className="text-center transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 text-white">
                  <p className="font-detail uppercase text-[10px] tracking-widest text-accent mb-2">Penthouse Project</p>
                  <p className="font-heading text-2xl">Ligneous Residence</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer className="bg-dark text-white rounded-t-[3rem] pt-24 pb-8 px-8 mt-24">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="col-span-1 lg:col-span-1">
            <h2 className="text-4xl font-heading font-bold mb-6">FCML</h2>
            <p className="text-white/50 text-sm leading-relaxed max-w-xs">
              Legacy in luxury. We redefine architectural spaces through the lens of timeless materials and artisan soul.
            </p>
          </div>
          
          <div>
            <h4 className="font-detail uppercase text-xs text-accent tracking-widest mb-8">Showroom</h4>
            <div className="space-y-4 text-sm text-white/70">
              <div className="flex gap-3">
                <MapPin size={18} className="text-accent shrink-0" />
                <p>12/A, Industrial Estate, <br />Artisan District, New Delhi</p>
              </div>
              <div className="flex items-center gap-2 mt-6">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse"></div>
                <span className="text-xs uppercase font-detail">Open by Appointment</span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-detail uppercase text-xs text-accent tracking-widest mb-8">Contact</h4>
            <div className="space-y-4 text-sm text-white/70">
              <a href="tel:+" className="flex items-center gap-3 hover:text-white transition-colors">
                <Phone size={18} className="text-accent" />
                <span>+91 999 888 7777</span>
              </a>
              <a href="mailto:info@fcml.com" className="flex items-center gap-3 hover:text-white transition-colors">
                <Mail size={18} className="text-accent" />
                <span>concierge@fcml.com</span>
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-detail uppercase text-xs text-accent tracking-widest mb-8">Navigation</h4>
            <div className="grid grid-cols-2 gap-4 text-sm text-white/70 font-body">
              <a href="#" className="hover:text-accent">Products</a>
              <a href="#" className="hover:text-accent">Process</a>
              <a href="#" className="hover:text-accent">Showroom</a>
              <a href="#" className="hover:text-accent">Privacy</a>
              <a href="#" className="hover:text-accent">Projects</a>
              <a href="#" className="hover:text-accent">Terms</a>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-4 text-[10px] uppercase font-detail text-white/30 tracking-widest">
          <p>© 2026 FCML - The House Of Gods. All Rights Reserved.</p>
          <p>Created by World-Class Tech Agency</p>
        </div>
      </div>
    </footer>
  );
};

// --- Main App Component ---

const App = () => {
  return (
    <main className="font-body selection:bg-accent selection:text-background">
      <Navbar />
      <Hero />
      
      <section id="products" className="py-32 bg-background px-8">
        <div className="container mx-auto">
          <div className="max-w-xl mb-20">
            <span className="text-accent font-detail text-xs uppercase tracking-widest">Specializations</span>
            <h2 className="text-5xl font-heading text-primary mt-4 leading-tight">Crafted with Technical <br />Precision.</h2>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <SpecializedCard 
              category="Flooring" 
              title="Engineered Wooden Flooring"
              description="High-density material samples that combine architectural strength with the organic warmth of natural oak."
            >
              <MaterialCarousel />
            </SpecializedCard>

            <SpecializedCard 
              category="Sanctuary" 
              title="Designer Bathroom Fittings"
              description="Configure your sanctuary with our studio collection of hand-polished brass and artisan faucets."
            >
              <ConfigurationStudio />
            </SpecializedCard>

            <SpecializedCard 
              category="Kitchen" 
              title="Modular Kitchen Solutions"
              description="Real-time dimension estimation for bespoke cabinetry designed for the modern culinary artist."
            >
              <DimensionCalculator />
            </SpecializedCard>
          </div>
        </div>
      </section>

      <Philosophy />
      
      <ProcessStack />
      
      <AppointmentHero />
      
      <SocialProof />
      
      <Footer />
    </main>
  );
};

export default App;
