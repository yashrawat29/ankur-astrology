import React, { useState, useEffect, useRef } from 'react';
import Layout from './components/Layout';
import ChatWidget from './components/ChatWidget';
import ServiceCard from './components/ServiceCard';
import { Page, ServiceItem, TestimonialItem } from './types';
import { 
  Star, 
  Moon, 
  Sun, 
  Heart, 
  Briefcase, 
  Home, 
  Scroll, 
  CheckCircle,
  Phone,
  Video,
  Users,
  Calendar,
  MapPin,
  Gem,
  Sparkles,
  Hand,
  Hash,
  ChevronDown,
  ChevronUp,
  Globe,
  MessageCircle,
  GraduationCap,
  Building,
  Activity,
  Clock,
  Quote,
  Mail
} from 'lucide-react';

// --- Data & Constants ---

const SERVICES: ServiceItem[] = [
  {
    id: '1',
    title: 'Birth Chart / Janam Kundali Analysis',
    description: 'A deep, personalized reading of your Janam Kundali to reveal your purpose, opportunities, challenges, and upcoming planetary cycles.',
    iconName: 'Sun'
  },
  {
    id: '2',
    title: 'Kundali Milan / Matchmaking',
    description: 'Accurate and insightful matchmaking based on Guna Milan, planetary placements, Manglik analysis, and long-term harmony.',
    iconName: 'Heart'
  },
  {
    id: '3',
    title: 'Vedic Astrology Consultation',
    description: 'A complete session covering any life area — career, marriage, business, family, health, finance, or personal confusion.',
    iconName: 'Moon'
  },
  {
    id: '4',
    title: 'Daily / Weekly / Monthly Horoscope',
    description: 'Personalized predictions based on your individual chart covering relationships, career, finance, and lucky periods.',
    iconName: 'Calendar'
  },
  {
    id: '5',
    title: 'Personalized Natal Chart Readings',
    description: 'A deep dive into your soul blueprint. Karmic lessons, past-life influences, spiritual path & hidden strengths.',
    iconName: 'Star'
  },
  {
    id: '6',
    title: 'Vastu Consultation (Home & Office)',
    description: 'Correct the energy of your space for prosperity, health & peace. Available for home and office (offline & online).',
    iconName: 'Home'
  },
  {
    id: '7',
    title: 'Numerology Reports',
    description: 'Decode your numbers to understand personality, destiny, career path, relationships & name harmony.',
    iconName: 'Hash'
  },
  {
    id: '8',
    title: 'Palmistry (Hast Rekha)',
    description: 'Your hands reflect your life patterns, mindset, relationships & future possibilities.',
    iconName: 'Hand'
  },
  {
    id: '9',
    title: 'Gemstone Recommendation',
    description: 'Choose the right gemstone with accuracy & safety. Strictly based on Kundali and planetary strength.',
    iconName: 'Gem'
  },
  {
    id: '10',
    title: 'Remedies: Mantra • Yantra',
    description: 'Simple, positive, and effective remedies (Mantra, Yantra, Rituals) that bring balance without fear.',
    iconName: 'Sparkles'
  },
  {
    id: '11',
    title: 'Career / Finance / Business',
    description: 'Focused professional guidance for growth, stability, job changes, promotions, and business success timing.',
    iconName: 'Briefcase'
  },
  {
    id: '12',
    title: 'Health & Spiritual Guidance',
    description: 'Holistic insights for emotional, mental & spiritual healing. Energy imbalance and stress relief.',
    iconName: 'Activity'
  },
  {
    id: '13',
    title: 'Yearly Predictive Reports',
    description: 'Plan your year with confidence. A complete forecast covering all major life areas (Varshaphal).',
    iconName: 'Scroll'
  },
  {
    id: '14',
    title: 'Astrology Courses & Workshops',
    description: 'For students interested in learning Vedic astrology in a simple, practical way.',
    iconName: 'GraduationCap'
  },
  {
    id: '15',
    title: 'Corporate Astrology Sessions',
    description: 'For companies seeking employee well-being, productivity insights, or event astrology.',
    iconName: 'Building'
  }
];

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'Shivani R.',
    text: 'His reading gave me clarity I was searching for years.'
  },
  {
    id: '2',
    name: 'Aditya & Neha',
    text: 'Matchmaking analysis was 100% accurate. Truly grateful.'
  },
  {
    id: '3',
    name: 'Manish S.',
    text: 'Simple remedies, big results. Highly recommended.'
  },
  {
    id: '4',
    name: 'Priya J.',
    text: 'Very calm, patient and accurate astrologer.'
  }
];

const FAQS = [
  {
    q: "What makes Ankur Tripathi Astrology different?",
    a: "The approach is a blend of traditional Vedic astrology and modern interpretation — offering practical, fear-free, and accurate guidance."
  },
  {
    q: "How do I book a consultation?",
    a: "You can book through the website, WhatsApp, call, or via the AstroSage app."
  },
  {
    q: "What details are required for a Kundali reading?",
    a: "Full Name, Date of Birth, Time of Birth, and Place of Birth."
  },
  {
    q: "Can I get an online consultation?",
    a: "Yes, through phone, WhatsApp call, or video call."
  },
  {
    q: "Are the remedies safe?",
    a: "Yes, all remedies are positive, practical, and do not involve any harmful rituals."
  }
];

// --- Helper Components ---

const FAQItem: React.FC<{ q: string; a: string }> = ({ q, a }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-brand-gold/20 last:border-0">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full py-6 flex justify-between items-center text-left focus:outline-none group hover:bg-brand-beige/30 transition-colors px-2 rounded-lg"
      >
        <span className="text-lg font-serif text-brand-brown font-medium group-hover:text-brand-brownLight transition-colors pr-8">
          {q}
        </span>
        {isOpen ? (
          <ChevronUp className="w-5 h-5 text-brand-gold shrink-0" />
        ) : (
          <ChevronDown className="w-5 h-5 text-brand-gold/70 shrink-0" />
        )}
      </button>
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100 pb-6 px-2' : 'max-h-0 opacity-0'
        }`}
      >
        <p className="text-gray-600 font-sans leading-relaxed">{a}</p>
      </div>
    </div>
  );
};

// --- Page Components ---

const HomePage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <div className="animate-fade-in">
    {/* Hero */}
    <section className="relative h-[80vh] md:h-[700px] overflow-hidden flex items-center">
      <div className="absolute inset-0 bg-brand-brown/90 z-0">
        <img 
          src="https://picsum.photos/seed/astro_hero/1920/1080" 
          alt="Cosmic Background" 
          className="w-full h-full object-cover opacity-20 mix-blend-overlay"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <span className="inline-block py-1 px-3 border border-brand-gold/50 rounded-full text-brand-gold text-sm tracking-[0.2em] uppercase mb-6 animate-slide-up">
          Clarity. Alignment. Destiny.
        </span>
        <h1 className="font-serif text-4xl md:text-6xl lg:text-7xl text-brand-beige font-bold mb-6 leading-tight animate-slide-up animation-delay-200 max-w-5xl mx-auto">
          Astrologer Ankur Tripathi<br/>
          <span className="text-2xl md:text-3xl font-sans font-normal block mt-4 text-brand-beige/90">Certified Astrologer • 10+ Years Experience</span>
        </h1>
        <p className="font-sans text-lg md:text-xl text-brand-beige/80 max-w-2xl mx-auto mb-10 animate-slide-up animation-delay-400">
          Experience astrology that guides you — not confuses you. Find direction in love, career, finance, family & spiritual life with precise, compassionate insights.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up animation-delay-600">
          <button 
            onClick={() => onNavigate(Page.BOOKING)}
            className="bg-brand-gold hover:bg-brand-goldHover text-brand-brown font-bold py-4 px-8 rounded-full transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
          >
            Book Consultation
          </button>
        </div>
      </div>
    </section>

    {/* Trust Section (Why Choose Us) */}
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown">Why Choose Ankur Tripathi?</h2>
          <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-brand-brown/10 p-3 rounded-full">
                <Star className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">10+ Years Experience</h3>
                <p className="text-gray-600 text-sm">A decade of helping individuals overcome life’s toughest challenges with accurate insights.</p>
              </div>
            </div>
          </div>
          {/* Card 2 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-brand-brown/10 p-3 rounded-full">
                <Scroll className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">Certified Vedic Astrologer</h3>
                <p className="text-gray-600 text-sm">Trained professionally with deep knowledge of Kundali, Vedic methods, and modern techniques.</p>
              </div>
            </div>
          </div>
          {/* Card 3 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-all">
             <div className="flex items-start gap-4">
              <div className="bg-brand-brown/10 p-3 rounded-full">
                <Sun className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">Modern + Vedic Approach</h3>
                <p className="text-gray-600 text-sm">Balanced readings rooted in ancient wisdom but explained in a simple, practical way.</p>
              </div>
            </div>
          </div>
          {/* Card 4 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-all">
            <div className="flex items-start gap-4">
              <div className="bg-brand-brown/10 p-3 rounded-full">
                <Globe className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">Consult Anywhere</h3>
                <p className="text-gray-600 text-sm">Phone, WhatsApp, Video Call, In-Person & AstroSage App.</p>
              </div>
            </div>
          </div>
          {/* Card 5 */}
          <div className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/20 hover:shadow-md transition-all md:col-span-2 lg:col-span-1">
            <div className="flex items-start gap-4">
              <div className="bg-brand-brown/10 p-3 rounded-full">
                <MessageCircle className="w-6 h-6 text-brand-brown" />
              </div>
              <div>
                <h3 className="font-serif font-bold text-lg text-brand-brown mb-2">Hindi & English</h3>
                <p className="text-gray-600 text-sm">Clear, comfortable communication for clients across India and abroad.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* Featured Services */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown">Featured Astrology Services</h2>
           <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Comprehensive guidance for every aspect of your life.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           {SERVICES.slice(0, 9).map((service) => (
             <div key={service.id} className="bg-brand-beige/30 p-6 rounded-xl border border-transparent hover:border-brand-gold/30 transition-all hover:bg-white hover:shadow-md group cursor-pointer" onClick={() => onNavigate(Page.SERVICES)}>
               <div className="flex items-center gap-4 mb-4">
                 <span className="text-brand-brown group-hover:text-brand-gold transition-colors">
                   {service.iconName === 'Sun' && <Sun className="w-6 h-6"/>}
                   {service.iconName === 'Heart' && <Heart className="w-6 h-6"/>}
                   {service.iconName === 'Moon' && <Moon className="w-6 h-6"/>}
                   {service.iconName === 'Home' && <Home className="w-6 h-6"/>}
                   {service.iconName === 'Hash' && <Hash className="w-6 h-6"/>}
                   {service.iconName === 'Hand' && <Hand className="w-6 h-6"/>}
                   {service.iconName === 'Gem' && <Gem className="w-6 h-6"/>}
                   {service.iconName === 'Sparkles' && <Sparkles className="w-6 h-6"/>}
                   {service.iconName === 'Calendar' && <Calendar className="w-6 h-6"/>}
                   {service.iconName === 'Star' && <Star className="w-6 h-6"/>}
                 </span>
                 <h3 className="font-serif font-bold text-lg text-brand-brown">{service.title}</h3>
               </div>
               <p className="text-gray-600 text-sm leading-relaxed line-clamp-2">{service.description}</p>
             </div>
           ))}
        </div>
        <div className="text-center mt-10">
          <button onClick={() => onNavigate(Page.SERVICES)} className="text-brand-brown font-bold border-b-2 border-brand-gold hover:text-brand-goldHover transition-colors pb-1 uppercase text-sm tracking-wide">
            View All Services
          </button>
        </div>
      </div>
    </section>

    {/* Process Section */}
    <section className="py-20 bg-brand-brown text-brand-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">How Your Consultation Works</h2>
          <p className="opacity-80">Simple steps to your clarity.</p>
        </div>
        <div className="flex flex-col md:flex-row justify-between relative gap-8">
           {/* Connector Line (Desktop) */}
           <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-brand-gold/30 -z-0 transform translate-y-4"></div>
           
           {[
             { step: 1, title: "Choose Service", desc: "Select the reading you need." },
             { step: 2, title: "Share Details", desc: "Birth date, time & place." },
             { step: 3, title: "Analysis", desc: "Manual study of your chart." },
             { step: 4, title: "Live Session", desc: "Call or Video consultation." },
             { step: 5, title: "Remedies", desc: "Practical guidance & solutions." }
           ].map((item) => (
             <div key={item.step} className="relative z-10 flex flex-col items-center text-center flex-1">
               <div className="w-16 h-16 rounded-full bg-brand-brown border-2 border-brand-gold flex items-center justify-center text-xl font-bold font-serif text-brand-gold mb-6 shadow-lg">
                 {item.step}
               </div>
               <h3 className="font-bold text-xl mb-2 font-serif">{item.title}</h3>
               <p className="text-sm opacity-80 px-2">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>

    {/* Testimonials */}
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4 text-center">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-12">What People Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((t) => (
            <div key={t.id} className="bg-white p-6 rounded-xl shadow-sm border border-brand-gold/10 text-left">
               <div className="text-brand-gold text-4xl font-serif mb-2">"</div>
               <p className="text-gray-600 font-sans text-sm italic mb-4">{t.text}</p>
               <p className="font-bold text-brand-brown text-sm">— {t.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Path to Clarity CTA */}
    <section className="py-24 relative overflow-hidden">
      <div className="absolute inset-0 bg-brand-brown/95 z-0">
         <img 
          src="https://picsum.photos/seed/stars/1920/600" 
          alt="Stars" 
          className="w-full h-full object-cover opacity-10"
        />
      </div>
      <div className="container mx-auto px-4 relative z-10 text-center">
        <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Your Path to Clarity Starts Here</h2>
        <p className="text-brand-beige/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
          When you understand your astrology, you understand your life. Take your next step with an astrologer who cares, guides, and brings real clarity.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={() => onNavigate(Page.BOOKING)}
            className="bg-brand-gold hover:bg-brand-goldHover text-brand-brown font-bold py-4 px-10 rounded-full transition-all shadow-xl"
          >
            Book Consultation
          </button>
          <button 
            onClick={() => onNavigate(Page.CONTACT)}
            className="border-2 border-brand-gold text-brand-gold hover:bg-brand-gold hover:text-brand-brown font-bold py-4 px-10 rounded-full transition-all"
          >
            Contact Now
          </button>
        </div>
      </div>
    </section>

    {/* FAQ Section */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-3xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown text-center mb-12">Frequently Asked Questions</h2>
        <div className="space-y-2">
          {FAQS.map((faq, index) => (
            <FAQItem key={index} q={faq.q} a={faq.a} />
          ))}
        </div>
      </div>
    </section>
  </div>
);

const AboutPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <div className="animate-fade-in bg-white">
    {/* Header Section */}
    <section className="bg-brand-brown py-20 text-center relative overflow-hidden">
       {/* Background pattern or subtle image overlay could go here */}
      <div className="container mx-auto px-4 relative z-10">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-gold mb-4">About Astrologer Ankur Tripathi</h1>
        <div className="flex flex-col md:flex-row justify-center items-center gap-2 md:gap-4 text-brand-beige/80 font-sans text-sm md:text-base uppercase tracking-wider mb-6">
           <span>Certified Astrologer</span>
           <span className="hidden md:inline">•</span>
           <span>10+ Years of Experience</span>
        </div>
        <p className="text-brand-beige text-lg md:text-xl max-w-3xl mx-auto font-light">
          Modern + Vedic Astrology for Real-Life Clarity
        </p>
      </div>
    </section>

    {/* Intro & Journey */}
    <section className="py-20 container mx-auto px-4">
      <div className="max-w-4xl mx-auto">
        <div className="prose prose-lg text-gray-600 mx-auto">
          <p className="text-xl leading-relaxed text-brand-brown font-medium mb-8">
            Astrologer Ankur Tripathi is a trusted name in modern Vedic astrology, known for providing clear, practical and deeply insightful guidance. With over 10+ years of professional experience, he has helped thousands of individuals navigate life’s challenges with confidence and peace.
          </p>
          <p className="mb-6">
            His approach blends the ancient wisdom of Vedic astrology with modern interpretation, offering guidance that is spiritual yet practical, intuitive yet logical — helping people understand their destiny with clarity.
          </p>
        </div>

        <div className="mt-16 bg-brand-beige/30 p-8 rounded-2xl border border-brand-gold/20">
          <h2 className="font-serif text-3xl text-brand-brown mb-6">A Journey Rooted in Purpose</h2>
          <p className="text-gray-700 leading-relaxed mb-6">
            Since childhood, Ankur felt a strong connection with cosmic energies, planetary movements, and spiritual sciences. What began as curiosity evolved into a deep passion, leading him to pursue astrology professionally.
          </p>
          <p className="text-gray-700 leading-relaxed mb-8">
            Today, he stands as a certified astrologer, delivering accurate readings and meaningful solutions across India and abroad.
          </p>
          <div className="bg-white p-6 rounded-xl border-l-4 border-brand-gold shadow-sm">
             <h3 className="font-bold text-brand-brown uppercase text-sm tracking-wide mb-2">His Mission</h3>
             <p className="font-serif text-xl italic text-gray-600">
               "To help people find clarity, alignment, and peace through honest, compassionate, and reliable astrology."
             </p>
          </div>
        </div>
      </div>
    </section>

    {/* Unique Approach */}
    <section className="py-20 bg-brand-beige">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
           <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown">What Makes His Approach Unique?</h2>
           <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
           {[
             { title: "Modern + Vedic Combined", desc: "Ankur blends traditional Vedic principles with a modern understanding of life, careers, relationships & human psychology." },
             { title: "Calm, Clear & Non-Judgmental", desc: "He explains every detail in simple language (Hindi/English) so anyone can understand their chart without confusion." },
             { title: "Accurate Manual Chart Reading", desc: "Every Kundali, compatibility check or prediction is manually analysed — never auto-generated reports." },
             { title: "Solutions That Work", desc: "Remedies are practical, safe, spiritual and easy to follow — mantras, yantras, routine corrections & lifestyle tweaks." },
             { title: "Guidance for Real-Life Problems", desc: "Relationships • Marriage • Career • Finance • Vastu • Health • Business • Family issues • Spiritual growth" },
           ].map((item, idx) => (
             <div key={idx} className="bg-white p-8 rounded-xl shadow-sm hover:shadow-md transition-all border-t-4 border-brand-brown">
               <h3 className="font-serif text-xl font-bold text-brand-brown mb-3">{item.title}</h3>
               <p className="text-gray-600 text-sm leading-relaxed">{item.desc}</p>
             </div>
           ))}
        </div>
      </div>
    </section>

    {/* Expertise */}
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 max-w-5xl">
        <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown text-center mb-12">Areas of Expertise</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <div className="space-y-8">
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-brand-brown text-brand-gold rounded-full flex items-center justify-center shrink-0"><Sun className="w-6 h-6" /></div>
               <div>
                 <h3 className="font-serif text-xl font-bold text-brand-brown">Birth Chart / Janam Kundali Analysis</h3>
                 <p className="text-gray-600 text-sm mt-1">Deep insights into your life purpose, strengths, challenges & future timeline.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-brand-brown text-brand-gold rounded-full flex items-center justify-center shrink-0"><Heart className="w-6 h-6" /></div>
               <div>
                 <h3 className="font-serif text-xl font-bold text-brand-brown">Matchmaking / Kundali Milan</h3>
                 <p className="text-gray-600 text-sm mt-1">Accurate compatibility readings for marriage & long-term relationships.</p>
               </div>
            </div>
            <div className="flex gap-4">
               <div className="w-12 h-12 bg-brand-brown text-brand-gold rounded-full flex items-center justify-center shrink-0"><Moon className="w-6 h-6" /></div>
               <div>
                 <h3 className="font-serif text-xl font-bold text-brand-brown">Vedic Astrology Consultations</h3>
                 <p className="text-gray-600 text-sm mt-1">Holistic guidance based on planetary energies, dasha cycles & karmic patterns.</p>
               </div>
            </div>
          </div>
          
          <div className="bg-brand-beige/40 p-8 rounded-xl border border-brand-gold/30">
            <h3 className="font-serif text-xl font-bold text-brand-brown mb-6 border-b border-brand-gold/20 pb-2">Additional Specializations</h3>
            <ul className="space-y-3">
              {[
                "Vastu Consultation (Home/Office)", "Numerology", "Palmistry", "Gemstone recommendations", 
                "Remedies (yantra, mantra, rituals)", "Financial & career astrology", 
                "Health & spiritual guidance", "Annual predictions (Varshaphal)",
                "Courses & workshops", "Corporate astrology sessions"
              ].map((item, idx) => (
                <li key={idx} className="flex items-center gap-3 text-gray-700 text-sm font-medium">
                  <CheckCircle className="w-4 h-4 text-brand-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    {/* Philosophy */}
    <section className="py-20 bg-brand-brown text-brand-beige text-center">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <Sparkles className="w-12 h-12 text-brand-gold mx-auto mb-6" />
          <h2 className="font-serif text-3xl md:text-4xl font-bold mb-6">“Astrology should guide you, not scare you.”</h2>
          <p className="text-lg text-brand-beige/80 mb-8">
            Ankur believes astrology is not destiny — it’s a roadmap. The planets show tendencies, but your choices shape your life.
          </p>
          <div className="flex flex-wrap justify-center gap-4 md:gap-8 text-sm font-bold uppercase tracking-wider text-brand-gold">
             <span>Truth</span> • <span>Clarity</span> • <span>Compassion</span> • <span>Confidentiality</span>
          </div>
        </div>
      </div>
    </section>

    {/* Consultation Methods */}
    <section className="py-16 bg-white border-b border-gray-100">
      <div className="container mx-auto px-4 text-center">
        <h3 className="font-serif text-2xl font-bold text-brand-brown mb-8">How People Consult Him</h3>
        <div className="flex flex-wrap justify-center gap-6 md:gap-12">
          {[
             { icon: Phone, label: "Phone Call" },
             { icon: MessageCircle, label: "WhatsApp Call" },
             { icon: Video, label: "Video Call" },
             { icon: Users, label: "In-Person" },
             { icon: Globe, label: "AstroSage App" },
          ].map((m, i) => (
             <div key={i} className="flex flex-col items-center gap-2">
               <div className="w-12 h-12 bg-brand-beige rounded-full flex items-center justify-center text-brand-brown">
                 <m.icon className="w-5 h-5" />
               </div>
               <span className="text-sm font-bold text-gray-600">{m.label}</span>
             </div>
          ))}
        </div>
        <p className="mt-8 text-gray-500 text-sm">Languages: Hindi & English</p>
      </div>
    </section>

    {/* Testimonials (Short) */}
    <section className="py-20 bg-brand-beige/30">
      <div className="container mx-auto px-4 text-center">
         <h2 className="font-serif text-3xl font-bold text-brand-brown mb-10">What People Say</h2>
         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
           {[
             { text: "He explained my Kundali in the simplest way. Truly eye-opening.", name: "Ritu V." },
             { text: "His matchmaking analysis saved us from a wrong decision.", name: "Sushant A." },
             { text: "Very calm, accurate and supportive astrologer.", name: "Kavya S." },
             { text: "Remedies were easy and really worked for me.", name: "Harsh P." }
           ].map((t, i) => (
             <div key={i} className="bg-white p-6 rounded-lg shadow-sm italic text-gray-600 text-sm">
               "{t.text}"
               <div className="mt-3 font-bold text-brand-brown not-italic">— {t.name}</div>
             </div>
           ))}
         </div>
      </div>
    </section>

    {/* Platform Purpose */}
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 text-center max-w-4xl">
        <div className="w-16 h-1 bg-brand-gold mx-auto mb-8"></div>
        <h3 className="font-serif text-2xl font-bold text-brand-brown mb-4">The Purpose of This Platform</h3>
        <p className="text-gray-600 leading-relaxed mb-8">
          This website has been created to offer easy access to services for anyone seeking clarity in love, career, financial stability, family peace, and spiritual balance. You deserve guidance that is pure, compassionate, and genuinely helpful — and that is exactly what Astrologer Ankur Tripathi delivers.
        </p>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 bg-brand-brown relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
           <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Your Journey to Clarity Starts Here</h2>
           <p className="text-brand-beige/80 text-lg mb-10 max-w-2xl mx-auto">
             Whether you’re confused about your future, struggling with relationships, or seeking guidance for a major life decision, you’re in the right place.
           </p>
           <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => onNavigate(Page.BOOKING)} className="bg-brand-gold text-brand-brown font-bold py-3 px-8 rounded-full hover:bg-white transition-colors">
                Book Consultation
              </button>
              <button onClick={() => onNavigate(Page.CONTACT)} className="border border-brand-gold text-brand-gold font-bold py-3 px-8 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-colors">
                Contact Now
              </button>
           </div>
        </div>
    </section>
  </div>
);

const ServicesPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  const getIcon = (name: string) => {
    switch(name) {
      case 'Sun': return <Sun className="w-8 h-8" />;
      case 'Heart': return <Heart className="w-8 h-8" />;
      case 'Moon': return <Moon className="w-8 h-8" />;
      case 'Briefcase': return <Briefcase className="w-8 h-8" />;
      case 'Home': return <Home className="w-8 h-8" />;
      case 'Star': return <Star className="w-8 h-8" />;
      case 'Scroll': return <Scroll className="w-8 h-8" />;
      case 'Hash': return <Hash className="w-8 h-8" />;
      case 'Hand': return <Hand className="w-8 h-8" />;
      case 'Gem': return <Gem className="w-8 h-8" />;
      case 'Sparkles': return <Sparkles className="w-8 h-8" />;
      case 'Calendar': return <Calendar className="w-8 h-8" />;
      case 'Activity': return <Activity className="w-8 h-8" />;
      case 'GraduationCap': return <GraduationCap className="w-8 h-8" />;
      case 'Building': return <Building className="w-8 h-8" />;
      default: return <Sun className="w-8 h-8" />;
    }
  };

  const SERVICE_FAQS = [
    { q: "How do I choose the right service?", a: "If you’re unsure, start with a Vedic Astrology Consultation or Kundali Analysis." },
    { q: "Are consultations available online?", a: "Yes — via phone, WhatsApp, or video call." },
    { q: "Can I consult in Hindi or English?", a: "Both options are available." },
    { q: "Are the remedies complicated?", a: "No — all remedies are simple, positive & practical." },
    { q: "Will my information stay confidential?", a: "Absolutely. 100% privacy is maintained." },
  ];

  return (
    <div className="animate-fade-in">
      <section className="bg-brand-beige py-20 text-center border-b border-brand-gold/20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-brown mb-4">Our Astrology Services</h1>
          <p className="text-brand-brown/70 text-lg max-w-2xl mx-auto">Clarity, alignment, and accurate guidance for every stage of life.</p>
        </div>
      </section>
      
      <section className="py-12 bg-white border-b border-gray-100">
        <div className="container mx-auto px-4 text-center max-w-4xl">
           <p className="text-gray-600 leading-relaxed text-lg">
             At Ankur Tripathi Astrology, we offer a complete range of modern + Vedic astrology services designed to bring clarity, direction, and peace to your personal, professional, and spiritual journey. Each session is personally conducted by Astrologer Ankur Tripathi, a certified astrologer with 10+ years of experience.
           </p>
        </div>
      </section>
      
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => (
              <ServiceCard 
                key={service.id}
                service={service}
                icon={getIcon(service.iconName)}
                onBook={() => onNavigate(Page.BOOKING)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Our Services */}
      <section className="py-20 bg-brand-beige">
        <div className="container mx-auto px-4">
           <div className="text-center mb-12">
             <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown">Why Choose Our Services?</h2>
             <div className="w-24 h-1 bg-brand-gold mx-auto mt-4"></div>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
             {[
               "Personally handled by a certified astrologer",
               "Modern + Vedic combined approach",
               "Accurate, non-judgmental guidance",
               "Simple, effective remedies",
               "Available on call/video/in-person",
               "Trusted by thousands"
             ].map((reason, i) => (
               <div key={i} className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-sm">
                 <div className="w-8 h-8 rounded-full bg-brand-brown flex items-center justify-center shrink-0">
                   <CheckCircle className="w-4 h-4 text-brand-gold" />
                 </div>
                 <span className="font-semibold text-gray-700">{reason}</span>
               </div>
             ))}
           </div>
        </div>
      </section>

      {/* Services FAQs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-brand-brown text-center mb-10">Frequently Asked Questions</h2>
          <div className="space-y-2">
            {SERVICE_FAQS.map((faq, index) => (
              <FAQItem key={index} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-brand-brown py-20 text-brand-beige text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-brand-gold via-transparent to-transparent"></div>
        <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl mb-6 text-white">Need Guidance? Start Your Consultation Today</h2>
          <p className="text-xl mb-10 text-brand-beige/80">Discover your path. Find clarity. Transform your life.</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
               onClick={() => onNavigate(Page.BOOKING)}
               className="bg-brand-gold text-brand-brown px-10 py-4 rounded-full font-bold hover:bg-white transition-colors shadow-xl"
            >
              Book Consultation
            </button>
            <button 
               onClick={() => onNavigate(Page.CONTACT)}
               className="border-2 border-brand-gold text-brand-gold px-10 py-4 rounded-full font-bold hover:bg-brand-gold hover:text-brand-brown transition-colors"
            >
              Contact Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const BookingPage: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('Vedic Astrology Consultation');
  const formRef = useRef<HTMLDivElement>(null);

  const scrollToForm = (serviceName: string) => {
    setSelectedService(serviceName);
    formRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const BOOKING_TYPES = [
    {
      title: "Vedic Astrology Consultation",
      duration: "20–40 minutes",
      desc: "A general consultation covering career, relationship, marriage, business, finance, family & personal guidance.",
      mode: "Phone / WhatsApp / Video / In-Person"
    },
    {
      title: "Birth Chart / Janam Kundali Analysis",
      duration: "30–45 minutes",
      desc: "A deep, personalized reading explaining life path, strengths, challenges & future trends.",
      mode: "Phone / WhatsApp / Video / In-Person"
    },
    {
      title: "Kundali Milan / Matchmaking",
      duration: "25–40 minutes",
      desc: "Complete Guna Milan, emotional + mental compatibility, long-term relationship harmony & Manglik analysis.",
      mode: "Phone / WhatsApp / Video / In-Person"
    },
    {
      title: "Vastu Consultation (Home / Office)",
      duration: "Online / Offline",
      desc: "Energy correction for prosperity, peace & harmony. (You will be asked to upload floor plan/photos if online.)",
      mode: "Online / Offline Visit"
    },
    {
      title: "Numerology or Palmistry Session",
      duration: "Variable",
      desc: "Guidance through life numbers or hand analysis.",
      mode: "Phone / WhatsApp / Video / In-Person"
    },
    {
      title: "Follow-Up Session",
      duration: "15-20 minutes",
      desc: "For existing clients needing updates or quick clarity.",
      mode: "Phone / WhatsApp"
    }
  ];

  const BOOKING_FAQS = [
    { q: "How soon will my consultation be scheduled?", a: "Most appointments are confirmed within a few hours." },
    { q: "Can I get an urgent same-day consultation?", a: "Yes, urgent slots are often available." },
    { q: "What if I don’t know my birth time?", a: "A rectification process can be done to estimate accurate timing." },
    { q: "Is online consultation as accurate as in-person?", a: "Yes — Kundali and astrology readings are 100% accurate online." },
    { q: "Do you offer consultations on AstroSage?", a: "Yes, Astrologer Ankur Tripathi is available on AstroSage as well." }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* Hero */}
      <section className="bg-brand-beige py-20 text-center border-b border-brand-gold/20">
        <div className="container mx-auto px-4">
          <h1 className="font-serif text-4xl md:text-5xl text-brand-brown mb-6">Book Your Consultation</h1>
          <p className="text-xl text-brand-brown/80 max-w-3xl mx-auto mb-8 leading-relaxed">
             Get clarity, direction & accurate guidance for your life — directly from Astrologer Ankur Tripathi.
          </p>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base bg-white/50 py-2 px-4 rounded-full inline-block">
            Available in <span className="font-bold text-brand-brown">Hindi & English</span> via Phone, WhatsApp, Video Call, In-Person, and AstroSage.
          </p>
        </div>
      </section>

      {/* Consultation Types */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 max-w-6xl">
          <h2 className="font-serif text-3xl font-bold text-brand-brown text-center mb-4">Choose Your Consultation Type</h2>
          <p className="text-center text-gray-600 mb-12">Select the session that matches your need.</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {BOOKING_TYPES.map((type, idx) => (
              <div key={idx} className="border border-brand-gold/20 rounded-xl p-6 hover:shadow-lg transition-shadow bg-brand-beige/10 flex flex-col h-full group">
                <h3 className="font-serif text-xl font-bold text-brand-brown mb-3 group-hover:text-brand-brownLight transition-colors">{type.title}</h3>
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-gold mb-4">
                  <Clock className="w-4 h-4" /> {type.duration}
                </div>
                <p className="text-gray-600 text-sm mb-4 flex-grow leading-relaxed">{type.desc}</p>
                <p className="text-xs text-gray-500 mb-6 italic">Mode: {type.mode}</p>
                <button 
                  onClick={() => scrollToForm(type.title)}
                  className="w-full bg-brand-brown text-brand-gold font-bold py-3 rounded-lg hover:bg-brand-brownLight transition-colors mt-auto uppercase text-sm tracking-wide"
                >
                  Book Now
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Booking Works */}
      <section className="py-20 bg-brand-brown text-brand-beige relative overflow-hidden">
         <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center mb-16">
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">How Booking Works</h2>
            <p className="opacity-80 text-brand-gold">Simple steps to your clarity.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 text-center">
            {[
              { step: "01", title: "Choose Service", desc: "Select the reading based on your need." },
              { step: "02", title: "Fill Form", desc: "Share birth details & contact info." },
              { step: "03", title: "Confirmation", desc: "We contact you to confirm slot." },
              { step: "04", title: "Consultation", desc: "Session via Phone, Video or In-Person." },
              { step: "05", title: "Remedies", desc: "Receive practical solutions." }
            ].map((item, i) => (
              <div key={i} className="relative p-4 border border-brand-gold/10 rounded-xl bg-white/5 hover:bg-white/10 transition-colors">
                <div className="text-4xl font-serif text-brand-gold opacity-30 mb-2">{item.step}</div>
                <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                <p className="text-sm opacity-80">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <div ref={formRef} className="py-24 container mx-auto px-4 max-w-6xl">
         <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* What You Need to Share Sidebar */}
            <div className="lg:col-span-1">
               <div className="bg-brand-beige p-8 rounded-2xl border border-brand-gold/30 sticky top-24">
                  <h3 className="font-serif text-2xl text-brand-brown mb-6">What You Need to Share</h3>
                  <p className="text-sm text-gray-600 mb-6">To ensure accurate analysis, please keep these ready:</p>
                  <ul className="space-y-4">
                    {[
                      "Full Name", "Date of Birth", "Time of Birth", "Place of Birth", 
                      "Relationship status (if matchmaking)", "House map/photos (if Vastu)"
                    ].map((req, idx) => (
                      <li key={idx} className="flex items-start gap-3 text-brand-brown font-medium">
                        <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                        <span>{req}</span>
                      </li>
                    ))}
                  </ul>
               </div>
            </div>

            {/* Actual Form */}
            <div className="lg:col-span-2">
              <div className="bg-white p-8 md:p-12 rounded-2xl shadow-xl border border-gray-100">
                  <div className="mb-8">
                    <h2 className="font-serif text-3xl text-brand-brown mb-2">Schedule Your Session</h2>
                    <p className="text-gray-500">Fill in your details to request a booking.</p>
                  </div>
                  
                  <form className="space-y-6" onSubmit={(e) => { e.preventDefault(); alert("Thank you! Our team will contact you via WhatsApp/Call to confirm your slot."); }}>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Full Name</label>
                        <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="Your Name" required />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                        <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="+91 99771..." required />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-700 mb-2">Service Type</label>
                      <select 
                        value={selectedService} 
                        onChange={(e) => setSelectedService(e.target.value)}
                        className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all"
                      >
                        {BOOKING_TYPES.map((t, i) => <option key={i} value={t.title}>{t.title}</option>)}
                      </select>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Birth Date</label>
                        <input type="date" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-gray-700 mb-2">Birth Time</label>
                        <input type="time" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" />
                      </div>
                      <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">Place of Birth</label>
                         <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all" placeholder="City, State" />
                      </div>
                    </div>
                    
                    <div>
                         <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Mode</label>
                         <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-brand-gold focus:border-transparent outline-none transition-all">
                            <option>Phone Call</option>
                            <option>WhatsApp Call</option>
                            <option>Video Call</option>
                            <option>In-Person (Chhatarpur)</option>
                         </select>
                    </div>

                    <button type="submit" className="w-full bg-brand-brown text-brand-gold font-bold py-4 rounded-lg hover:bg-brand-brownLight transition-colors text-lg mt-4 shadow-md hover:shadow-lg">
                      Book Consultation
                    </button>
                    
                    <p className="text-xs text-center text-gray-500 mt-4">
                      By booking, you agree to our terms. Consultations are strictly confidential.
                    </p>
                  </form>
              </div>
            </div>
         </div>
      </div>

      {/* Why Consult Section */}
      <section className="py-20 bg-brand-beige/30 border-t border-brand-gold/10">
        <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl md:text-4xl font-bold text-brand-brown mb-12">Why Consult With Astrologer Ankur Tripathi?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto text-left">
            {[
              "Certified astrologer with 10+ years experience",
              "Modern + Vedic combined approach",
              "Accurate, personalized predictions",
              "Clear explanations in Hindi or English",
              "Practical, safe remedies",
              "Trusted by thousands across India & abroad"
            ].map((item, idx) => (
               <div key={idx} className="flex items-center gap-4 bg-white p-5 rounded-lg shadow-sm border border-brand-gold/10">
                 <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                 <span className="font-medium text-gray-700">{item}</span>
               </div>
            ))}
          </div>
        </div>
      </section>

      {/* Booking FAQs */}
      <section className="py-20 bg-white border-t border-gray-100">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="font-serif text-3xl font-bold text-brand-brown text-center mb-12">Booking FAQs</h2>
          <div className="space-y-2">
            {BOOKING_FAQS.map((faq, index) => (
              <FAQItem key={index} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

       {/* Final CTA */}
      <section className="bg-brand-brown py-16 text-center">
        <div className="container mx-auto px-4">
           <h2 className="font-serif text-2xl md:text-3xl text-white mb-6">Start Your Journey Toward Clarity</h2>
           <p className="text-brand-beige/80 mb-8 max-w-2xl mx-auto">Whether it’s love, career, marriage, finances, or spiritual direction — your answers are only one session away.</p>
           <div className="flex justify-center gap-4 flex-wrap">
             <button onClick={() => window.open('https://wa.me/919977153576', '_blank')} className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
                <MessageCircle className="w-5 h-5" /> WhatsApp Now
             </button>
             <button className="bg-brand-gold hover:bg-white text-brand-brown px-8 py-3 rounded-full font-bold transition-colors flex items-center gap-2">
                <Phone className="w-5 h-5" /> Call Now
             </button>
           </div>
        </div>
      </section>
    </div>
  );
}

const TestimonialsPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => {
  
  const categories = [
    {
      title: "Featured Testimonials",
      icon: Star,
      items: [
        { text: "His guidance gave me a new direction in life. Truly grateful.", name: "Neha S." },
        { text: "The accuracy of his Kundali reading shocked me. Everything made sense.", name: "Rohit D." },
        { text: "Very humble and patient astrologer. He listens deeply.", name: "Anjali P." },
        { text: "Matchmaking session was 100% honest and helped us take the right decision.", name: "Aman & Sakshi" },
        { text: "His remedies brought peace to my home within a week.", name: "Manoj R." },
        { text: "Explained my career timeline so clearly, I felt instantly relieved.", name: "Harshit G." }
      ]
    },
    {
      title: "Relationship & Marriage",
      icon: Heart,
      items: [
        { text: "He guided us through our marriage decision with so much clarity.", name: "Radhika A." },
        { text: "Matchmaking analysis was extremely detailed and accurate.", name: "Karan & Meera" },
        { text: "Helped me understand my partner better. Saved my relationship.", name: "Shweta R." },
        { text: "Simple remedies improved our communication instantly.", name: "Ritu A." }
      ]
    },
    {
      title: "Career & Finance",
      icon: Briefcase,
      items: [
        { text: "Career astrology session was life-changing.", name: "Prakash K." },
        { text: "His predictions about my business growth were spot on.", name: "Anurag P." },
        { text: "Gave me confidence to switch jobs at the right time.", name: "Vivek S." },
        { text: "Clarity in just 20 minutes. Wish I had spoken earlier.", name: "Harsh M." }
      ]
    },
    {
      title: "Vastu & Home Energy",
      icon: Home,
      items: [
        { text: "After Vastu changes, our home felt lighter and peaceful.", name: "Meenal J." },
        { text: "My business improved after following his Vastu guidance.", name: "Amit V." },
        { text: "Very easy solutions. No expensive changes.", name: "Neeraj R." }
      ]
    },
    {
      title: "Health & Spiritual Guidance",
      icon: Activity,
      items: [
        { text: "He helped me understand the root cause of my stress.", name: "Payal D." },
        { text: "His spiritual insights brought a lot of mental peace.", name: "Kiran M." },
        { text: "Remedies were simple yet powerful.", name: "Shraddha V." }
      ]
    },
    {
      title: "Gemstone & Remedies",
      icon: Gem,
      items: [
        { text: "The gemstone he suggested works beautifully for me.", name: "Sana A." },
        { text: "Remedies were easy and effective. No fear, no complications.", name: "Rakesh S." },
        { text: "Yantra guidance uplifted my energy quickly.", name: "Jyoti K." }
      ]
    },
    {
      title: "Long-Term Client Experiences",
      icon: Users,
      items: [
        { text: "I’ve been consulting him for years — always honest and accurate.", name: "Deepak C." },
        { text: "His yearly predictions match my life events every time.", name: "Pooja L." },
        { text: "The only astrologer I truly trust.", name: "Nitin R." }
      ]
    }
  ];

  return (
    <div className="animate-fade-in bg-white">
      {/* Header */}
      <section className="bg-brand-beige py-20 text-center border-b border-brand-gold/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center gap-2 text-brand-gold text-sm font-bold uppercase tracking-widest mb-4">
             <span>Real Voices</span> • <span>Real Guidance</span> • <span>Real Transformation</span>
          </div>
          <h1 className="font-serif text-4xl md:text-5xl text-brand-brown mb-6">Client Experiences & Transformations</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Every reading by Astrologer Ankur Tripathi is focused on bringing clarity, alignment, and peace. These short but powerful testimonials reflect the trust people have built over the past 10+ years.
          </p>
        </div>
      </section>

      {/* Testimonials Categories */}
      <section className="py-20">
        <div className="container mx-auto px-4 max-w-7xl space-y-20">
          {categories.map((category, idx) => (
            <div key={idx} className="animate-slide-up">
              <div className="flex items-center gap-3 mb-8 border-b border-brand-gold/20 pb-4">
                <div className="w-10 h-10 bg-brand-brown text-brand-gold rounded-full flex items-center justify-center">
                  <category.icon className="w-5 h-5" />
                </div>
                <h2 className="font-serif text-2xl md:text-3xl text-brand-brown font-bold">{category.title}</h2>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {category.items.map((item, i) => (
                  <div key={i} className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-md transition-all group relative overflow-hidden">
                     <div className="absolute top-0 right-0 p-4 opacity-10">
                       <Quote className="w-12 h-12 text-brand-gold transform rotate-180" />
                     </div>
                     <p className="text-gray-600 italic mb-6 relative z-10 leading-relaxed">"{item.text}"</p>
                     <div className="flex items-center gap-3 mt-auto">
                        <div className="w-8 h-8 bg-brand-beige text-brand-brown rounded-full flex items-center justify-center text-xs font-bold">
                           {item.name[0]}
                        </div>
                        <span className="font-bold text-brand-brown text-sm">— {item.name}</span>
                     </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Client Satisfaction Highlights */}
      <section className="py-20 bg-brand-brown text-brand-beige">
        <div className="container mx-auto px-4">
           <h2 className="font-serif text-3xl text-center mb-12 font-bold text-brand-gold">Client Satisfaction Highlights</h2>
           <div className="flex flex-wrap justify-center gap-8 max-w-5xl mx-auto">
              {[
                "10+ Years of Trust",
                "Thousands of Satisfied Clients",
                "Accurate Predictions & Practical Remedies",
                "Friendly, respectful and non-judgmental approach",
                "Clear, simple explanation in Hindi & English"
              ].map((highlight, i) => (
                <div key={i} className="flex items-center gap-3 bg-white/10 px-6 py-3 rounded-full backdrop-blur-sm">
                   <CheckCircle className="w-5 h-5 text-brand-gold shrink-0" />
                   <span className="font-sans text-sm md:text-base font-medium">{highlight}</span>
                </div>
              ))}
           </div>
        </div>
      </section>

      {/* Video Testimonials Placeholder */}
      <section className="py-24 bg-brand-beige/30 text-center">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto border-2 border-dashed border-brand-brown/20 rounded-2xl p-12 flex flex-col items-center justify-center bg-white/50">
            <Video className="w-16 h-16 text-brand-brown/40 mb-6" />
            <h3 className="font-serif text-2xl text-brand-brown font-bold mb-2">Video Stories</h3>
            <p className="text-gray-500 text-lg italic">“Coming Soon – Real client stories in their own words.”</p>
          </div>
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4 max-w-2xl">
           <MessageCircle className="w-12 h-12 text-brand-gold mx-auto mb-6" />
           <h2 className="font-serif text-3xl text-brand-brown font-bold mb-4">Share Your Experience</h2>
           <p className="text-gray-600 mb-8 leading-relaxed">Your feedback inspires and guides others who are seeking clarity. We would love to hear your story.</p>
           <button 
             onClick={() => onNavigate(Page.CONTACT)}
             className="border-2 border-brand-brown text-brand-brown px-8 py-3 rounded-full font-bold hover:bg-brand-brown hover:text-white transition-all uppercase text-sm tracking-wide"
           >
             Submit Your Testimonial
           </button>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 bg-brand-brown relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">Ready to Experience Your Own Transformation?</h2>
          <p className="text-brand-beige/80 text-lg md:text-xl mb-12 max-w-2xl mx-auto">
            One conversation can change your direction, your decisions, and your peace of mind.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button 
              onClick={() => onNavigate(Page.BOOKING)}
              className="bg-brand-gold text-brand-brown px-10 py-4 rounded-full font-bold hover:bg-white transition-colors shadow-xl"
            >
              Book Your Consultation
            </button>
            <button 
              onClick={() => onNavigate(Page.CONTACT)}
              className="border-2 border-brand-gold text-brand-gold px-10 py-4 rounded-full font-bold hover:bg-brand-gold hover:text-brand-brown transition-colors"
            >
              Contact Now
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

const ContactPage: React.FC<{ onNavigate: (p: Page) => void }> = ({ onNavigate }) => (
  <div className="animate-fade-in bg-white">
    {/* Hero */}
    <section className="bg-brand-beige py-20 text-center border-b border-brand-gold/20">
      <div className="container mx-auto px-4">
        <h1 className="font-serif text-4xl md:text-5xl text-brand-brown mb-4">Get In Touch</h1>
        <p className="text-brand-brown/70 text-lg md:text-xl max-w-2xl mx-auto mb-6">Clarity, guidance & support — just one message away.</p>
        <p className="text-gray-600 max-w-3xl mx-auto leading-relaxed">
          Whether you have a question, want to book a consultation, or need help choosing the right service, we’re here to assist you. Connect with Astrologer Ankur Tripathi directly through WhatsApp, call, email, or by filling out the contact form.
        </p>
      </div>
    </section>

    <div className="container mx-auto px-4 max-w-6xl py-20">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Contact Info */}
        <div className="space-y-8">
           <div className="bg-brand-beige p-8 rounded-2xl border border-brand-gold/20">
              <h3 className="font-serif text-2xl font-bold text-brand-brown mb-8">Contact Details</h3>
              
              <div className="space-y-6">
                 {/* Phone */}
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-brown flex items-center justify-center shrink-0 text-brand-gold">
                       <Phone className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-brand-brown text-lg">Phone / WhatsApp</h4>
                       <p className="text-gray-600 font-medium">+91 99771 53576</p>
                       <p className="text-xs text-gray-500 mt-1">Mon - Sat: 10am - 7pm</p>
                    </div>
                 </div>

                 {/* Email */}
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-brown flex items-center justify-center shrink-0 text-brand-gold">
                       <Mail className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-brand-brown text-lg">Email</h4>
                       <p className="text-gray-600 font-medium">support@ankurtripathiastrology.com</p>
                    </div>
                 </div>

                 {/* Location */}
                 <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-full bg-brand-brown flex items-center justify-center shrink-0 text-brand-gold">
                       <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                       <h4 className="font-bold text-brand-brown text-lg">Location</h4>
                       <p className="text-gray-600 font-medium">Available for in-person consultations.</p>
                       <p className="text-sm text-gray-500 mt-1">Choubey Colony, Chhatarpur, Madhya Pradesh, 471001, India</p>
                    </div>
                 </div>
              </div>

              {/* AstroSage */}
              <div className="mt-8 pt-8 border-t border-brand-gold/20">
                 <h4 className="font-bold text-brand-brown mb-2 flex items-center gap-2">
                   <Globe className="w-5 h-5 text-brand-gold" /> Also available on AstroSage App
                 </h4>
                 <p className="text-sm text-gray-600 mb-3">Search for: <span className="font-semibold">Astrologer Ankur Tripathi</span></p>
                 <button 
                   className="bg-black text-white px-6 py-2 rounded-lg font-semibold text-sm hover:opacity-80 transition-opacity"
                   onClick={() => window.open('https://varta.astrosage.com/astrologer/ankur233212?lang=en', '_blank')}
                 >
                   Visit Profile
                 </button>
              </div>
           </div>

           {/* Quick Response Promise */}
           <div className="bg-green-50 p-6 rounded-xl border border-green-100 flex items-start gap-4">
              <Clock className="w-6 h-6 text-green-600 shrink-0 mt-1" />
              <div>
                 <h4 className="font-bold text-green-800 text-lg mb-1">Quick Response Promise</h4>
                 <p className="text-green-700 text-sm leading-relaxed">
                    You will receive a reply within 1–2 hours for all messages on WhatsApp, Contact form, or Email. Urgent consultations can be arranged.
                 </p>
              </div>
           </div>
        </div>

        {/* Contact Form */}
        <div className="bg-white p-8 md:p-10 rounded-2xl shadow-lg border border-gray-100">
           <h3 className="font-serif text-2xl font-bold text-brand-brown mb-6">Send a Message</h3>
           <form className="space-y-5" onSubmit={(e) => { e.preventDefault(); alert("Message sent successfully!"); }}>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Name</label>
                 <input type="text" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-gold outline-none transition-colors" placeholder="Your Full Name" required />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Email</label>
                 <input type="email" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-gold outline-none transition-colors" placeholder="your@email.com" required />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Phone Number</label>
                 <input type="tel" className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-gold outline-none transition-colors" placeholder="+91 99771..." required />
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Mode</label>
                 <select className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-gold outline-none transition-colors">
                    <option>Phone Call</option>
                    <option>WhatsApp Chat/Call</option>
                    <option>Video Call</option>
                    <option>In-Person</option>
                 </select>
              </div>
              <div>
                 <label className="block text-sm font-bold text-gray-700 mb-2">Message / Query</label>
                 <textarea rows={4} className="w-full p-4 bg-gray-50 border border-gray-200 rounded-lg focus:border-brand-gold outline-none transition-colors" placeholder="How can we help you today?" required></textarea>
              </div>
              <button type="submit" className="w-full bg-brand-brown text-brand-gold font-bold py-4 rounded-lg hover:bg-brand-brownLight transition-colors shadow-md">
                 Send Message
              </button>
           </form>
        </div>
      </div>
    </div>

    {/* When Should You Contact Us */}
    <section className="bg-brand-beige/30 py-20 border-t border-brand-gold/10">
       <div className="container mx-auto px-4 max-w-5xl">
          <h2 className="font-serif text-3xl font-bold text-brand-brown text-center mb-12">When Should You Contact Us?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
             {[
                "Confused about career, job or business",
                "Relationship or marriage-related issues",
                "Compatibility / Matchmaking concerns",
                "Vastu problems at home/office",
                "Financial blockages",
                "Need a detailed Kundali reading",
                "Health or emotional imbalance",
                "Seeking spiritual direction",
                "Want a safe gemstone recommendation",
                "Need urgent clarity on a life decision"
             ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-3 bg-white p-4 rounded-lg shadow-sm border border-brand-gold/5">
                   <div className="w-2 h-2 rounded-full bg-brand-gold shrink-0"></div>
                   <span className="text-gray-700 font-medium">{item}</span>
                </div>
             ))}
          </div>
          <p className="text-center text-brand-brown font-bold mt-8 text-lg italic">"Whatever you’re going through — guidance is available."</p>
       </div>
    </section>

    {/* Why Reach Out */}
    <section className="py-20 bg-white">
       <div className="container mx-auto px-4 text-center">
          <h2 className="font-serif text-3xl font-bold text-brand-brown mb-12">Why Reach Out to Astrologer Ankur Tripathi?</h2>
          <div className="flex flex-wrap justify-center gap-6 md:gap-8 max-w-5xl mx-auto">
             {[
                "10+ years astrology experience",
                "Certified astrologer",
                "Modern + Vedic combined approach",
                "Accurate, compassionate guidance",
                "Simple remedies",
                "Hindi & English consultations",
                "Trusted by thousands worldwide"
             ].map((item, idx) => (
                <div key={idx} className="bg-brand-beige px-6 py-3 rounded-full text-brand-brown font-bold text-sm md:text-base flex items-center gap-2">
                   <CheckCircle className="w-4 h-4 text-brand-gold" /> {item}
                </div>
             ))}
          </div>
       </div>
    </section>

    {/* Final CTA */}
    <section className="bg-brand-brown py-20 text-center relative overflow-hidden">
       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-10"></div>
       <div className="container mx-auto px-4 relative z-10">
          <h2 className="font-serif text-3xl md:text-5xl text-white mb-6">You’re One Step Away From Clarity</h2>
          <p className="text-brand-beige/80 text-lg md:text-xl mb-10 max-w-2xl mx-auto">
             Your doubts, worries, and confusions don’t need to stay unanswered. Reach out today — your journey towards peace and direction begins here.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
             <button 
                onClick={() => onNavigate(Page.BOOKING)}
                className="bg-brand-gold text-brand-brown font-bold py-4 px-10 rounded-full hover:bg-white transition-colors shadow-xl"
             >
                Book Consultation
             </button>
             <button 
                className="border-2 border-brand-gold text-brand-gold font-bold py-4 px-10 rounded-full hover:bg-brand-gold hover:text-brand-brown transition-colors flex items-center justify-center gap-2"
                onClick={() => window.open('https://wa.me/919977153576', '_blank')}
             >
                <MessageCircle className="w-5 h-5" /> Contact on WhatsApp
             </button>
          </div>
       </div>
    </section>
  </div>
);

// --- Main App Component ---

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<Page>(Page.HOME);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case Page.HOME: return <HomePage onNavigate={setCurrentPage} />;
      case Page.ABOUT: return <AboutPage onNavigate={setCurrentPage} />;
      case Page.SERVICES: return <ServicesPage onNavigate={setCurrentPage} />;
      case Page.BOOKING: return <BookingPage />;
      case Page.TESTIMONIALS: return <TestimonialsPage onNavigate={setCurrentPage} />;
      case Page.CONTACT: return <ContactPage onNavigate={setCurrentPage} />;
      default: return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <Layout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
      <ChatWidget />
    </Layout>
  );
};

export default App;