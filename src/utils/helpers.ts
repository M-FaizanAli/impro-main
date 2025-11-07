//
// Utility Functions - TypeScript
//

export interface CookiePreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: number;
}

const COOKIE_KEY = 'impro_cookie_prefs_v1';

export class CookieManager {
  static getPreferences(): CookiePreferences | null {
    try {
      const stored = localStorage.getItem(COOKIE_KEY);
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  }

  static setPreferences(prefs: CookiePreferences): void {
    try {
      localStorage.setItem(COOKIE_KEY, JSON.stringify(prefs));
    } catch {
      // Storage not available
    }
  }
}

export class ScrollSpy {
  private sections: HTMLElement[];
  private navLinks: HTMLElement[];
  private scrollTimer: number | null = null;

  constructor() {
    this.sections = Array.from(document.querySelectorAll('header, section'));
    this.navLinks = Array.from(document.querySelectorAll('.nav-menu .nav-link'));
    this.init();
  }

  private init(): void {
    window.addEventListener(
      'scroll',
      () => {
        if (this.scrollTimer) {
          clearTimeout(this.scrollTimer);
        }

        this.scrollTimer = window.setTimeout(() => {
          this.updateActiveLink();
        }, 50);
      },
      { passive: true }
    );

    this.updateActiveLink();
  }

  private updateActiveLink(): void {
    let currentSection = 'home';

    this.sections.forEach((section) => {
      const rect = section.getBoundingClientRect();
      if (rect.top <= 100) {
        currentSection = section.id || currentSection;
      }
    });

    this.navLinks.forEach((link) => link.classList.remove('active'));

    const activeLink = this.navLinks.find((link) => link.getAttribute('href') === `#${currentSection}`);
    if (activeLink) {
      activeLink.classList.add('active');
    }
  }
}

export class SmoothScroll {
  constructor() {
    this.init();
  }

  private init(): void {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e: Event) => {
        const href = (anchor as HTMLAnchorElement).getAttribute('href');

        if (!href || href === '#') return;

        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();

          const headerOffset = 100;
          const elementPosition = target.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth',
          });

          // Close mobile menu if open
          if (window.innerWidth <= 900) {
            const hamburger = document.querySelector<HTMLButtonElement>('.hamburger');
            const navMenu = document.querySelector<HTMLElement>('.nav-menu');

            if (hamburger?.classList.contains('active')) {
              hamburger.classList.remove('active');
              navMenu?.classList.remove('active');
              document.querySelector<HTMLElement>('.menu-overlay')?.classList.remove('active');
              document.body.style.overflow = '';
            }
          }
        }
      });
    });
  }
}

export class CookieConsent {
  private cookieBar: HTMLElement | null;
  private cookieModal: HTMLElement | null;
  private btnAccept: HTMLButtonElement | null;
  private btnOptions: HTMLButtonElement | null;
  private btnSave: HTMLButtonElement | null;
  private btnCancel: HTMLButtonElement | null;
  private chkAnalytics: HTMLInputElement | null;
  private chkMarketing: HTMLInputElement | null;

  constructor() {
    this.cookieBar = document.querySelector('.cookiebar');
    this.cookieModal = document.getElementById('cbModal');
    this.btnAccept = document.getElementById('cbAcceptBtn') as HTMLButtonElement | null;
    this.btnOptions = document.getElementById('cbOptionsBtn') as HTMLButtonElement | null;
    this.btnSave = document.getElementById('cbSave') as HTMLButtonElement | null;
    this.btnCancel = document.getElementById('cbCancel') as HTMLButtonElement | null;
    this.chkAnalytics = document.getElementById('cbAnalytics') as HTMLInputElement | null;
    this.chkMarketing = document.getElementById('cbMarketing') as HTMLInputElement | null;

    this.init();
  }

  private init(): void {
    const prefs = CookieManager.getPreferences();
    if (!prefs) {
      this.showCookieBar();
    }

    this.setupEventListeners();
  }

  private setupEventListeners(): void {
    this.btnAccept?.addEventListener('click', () => this.handleAcceptAll());
    this.btnOptions?.addEventListener('click', () => this.openCookieModal());
    this.btnSave?.addEventListener('click', () => this.handleSavePreferences());
    this.btnCancel?.addEventListener('click', () => this.closeCookieModal());

    this.cookieModal?.addEventListener('click', (e: Event) => {
      if (e.target === this.cookieModal) {
        this.closeCookieModal();
      }
    });

    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.cookieModal?.style.display === 'flex') {
        this.closeCookieModal();
      }
    });
  }

  private handleAcceptAll(): void {
    CookieManager.setPreferences({
      necessary: true,
      analytics: true,
      marketing: true,
      timestamp: Date.now(),
    });
    this.hideCookieBar();
  }

  private handleSavePreferences(): void {
    CookieManager.setPreferences({
      necessary: true,
      analytics: this.chkAnalytics?.checked ?? false,
      marketing: this.chkMarketing?.checked ?? false,
      timestamp: Date.now(),
    });
    this.closeCookieModal();
    this.hideCookieBar();
  }

  private openCookieModal(): void {
    const currentPrefs = CookieManager.getPreferences() || { analytics: false, marketing: false };

    if (this.chkAnalytics) {
      this.chkAnalytics.checked = !!currentPrefs.analytics;
    }
    if (this.chkMarketing) {
      this.chkMarketing.checked = !!currentPrefs.marketing;
    }

    if (this.cookieModal) {
      this.cookieModal.style.display = 'flex';
      this.cookieModal.setAttribute('aria-hidden', 'false');
    }
  }

  private closeCookieModal(): void {
    if (this.cookieModal) {
      this.cookieModal.style.display = 'none';
      this.cookieModal.setAttribute('aria-hidden', 'true');
    }
  }

  private showCookieBar(): void {
    if (this.cookieBar) {
      this.cookieBar.style.display = 'block';
    }
  }

  private hideCookieBar(): void {
    if (this.cookieBar) {
      this.cookieBar.style.display = 'none';
    }
  }
}
