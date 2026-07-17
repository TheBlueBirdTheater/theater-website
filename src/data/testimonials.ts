export interface Testimonial {
  quote: string;
  author: string;
  role?: string;
}

// Patron and community testimonials.
// Leave this array empty until real, attributable quotes have been gathered and
// approved by the patrons who gave them. Do not publish invented quotes. When a
// real quote is available, add it using the shape:
//   { quote: 'Their words here.', author: 'First Last', role: 'Season Ticket Holder' }
export const testimonials: Testimonial[] = [];
