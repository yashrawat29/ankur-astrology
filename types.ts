export enum Page {
  HOME = 'HOME',
  ABOUT = 'ABOUT',
  SERVICES = 'SERVICES',
  BOOKING = 'BOOKING',
  TESTIMONIALS = 'TESTIMONIALS',
  CONTACT = 'CONTACT',
}

export interface ServiceItem {
  id: string;
  title: string;
  description: string;
  iconName: string;
  price?: string;
}

export interface TestimonialItem {
  id: string;
  name: string;
  role?: string;
  text: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  isThinking?: boolean;
}
