//
// Main TypeScript Entry Point
//

import './styles.css';
import { Header } from './components/Header';
import { FAQAccordion } from './components/FAQAccordion';
import { OffersSlider } from './components/OffersSlider';
import { ScrollSpy, SmoothScroll, CookieConsent } from './utils/helpers';

// Initialize all components
function initializeApp(): void {
  // Header
  new Header();

  // FAQ Accordion
  const faqElement = document.getElementById('faq_block');
  if (faqElement) {
    new FAQAccordion();
  }

  // Offers Slider
  const offerSlider = document.getElementById('offerSlider');
  if (offerSlider) {
    new OffersSlider();
  }

  // Utilities
  new ScrollSpy();
  new SmoothScroll();
  new CookieConsent();
}

// Wait for DOM to be ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initializeApp);
} else {
  initializeApp();
}
