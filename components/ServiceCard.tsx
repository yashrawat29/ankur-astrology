import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ServiceItem } from '../types';

interface ServiceCardProps {
  service: ServiceItem;
  onBook: () => void;
  icon: React.ReactNode;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ service, onBook, icon }) => {
  return (
    <div className="bg-white p-8 rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 border border-brand-gold/10 group flex flex-col h-full">
      <div className="w-14 h-14 bg-brand-beige rounded-full flex items-center justify-center text-brand-brown mb-6 group-hover:bg-brand-brown group-hover:text-brand-gold transition-colors duration-300">
        {icon}
      </div>
      <h3 className="font-serif text-xl font-bold text-brand-brown mb-3">{service.title}</h3>
      <p className="text-gray-600 font-sans mb-6 flex-grow leading-relaxed">
        {service.description}
      </p>
      <button 
        onClick={onBook}
        className="flex items-center gap-2 text-brand-brown font-semibold text-sm uppercase tracking-wide group-hover:text-brand-brownLight transition-colors"
      >
        Book Now <ArrowRight className="w-4 h-4" />
      </button>
    </div>
  );
};

export default ServiceCard;
