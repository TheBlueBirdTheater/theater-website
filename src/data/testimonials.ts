export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

// TODO: replace with real patron/community quotes.
export const testimonials: Testimonial[] = [
  { quote: '[TODO: patron quote]', author: '[TODO: name]', role: 'Patron' },
  { quote: '[TODO: patron quote]', author: '[TODO: name]', role: 'Season Ticket Holder' },
];
