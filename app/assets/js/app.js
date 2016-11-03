import MobileMenu from './modules/MobileMenu';
import ScrollReveal from './modules/RevealOnScroll';
import StickyHeader from './modules/StickyHeader';

let menu = new MobileMenu();
let features = new ScrollReveal('.feature-item', '85%');
let testimonials = new ScrollReveal('.testimonial', '60%');
let header = new StickyHeader();
