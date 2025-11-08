//
// Header Component - TypeScript
//

export class Header {
  private hamburger: HTMLButtonElement | null;
  private navMenu: HTMLElement | null;
  private menuOverlay: HTMLElement | null;
  private dropdown: HTMLElement | null;
  private dropdownLink: HTMLElement | null;
  private mainNav: HTMLElement | null;
  private lastScrollY: number;

  constructor() {
    this.hamburger = document.querySelector('.hamburger');
    this.navMenu = document.querySelector('.nav-menu');
    this.menuOverlay = document.querySelector('.menu-overlay');
    this.dropdown = document.querySelector('.nav-menu .dropdown');
    this.dropdownLink = this.dropdown?.querySelector('.has-sub') || null;
    this.mainNav = document.querySelector('.main-nav');
    this.lastScrollY = 0;

    this.init();
  }

  private init(): void {
    this.setupMobileMenuToggle();
    this.setupDropdown();
    this.setupMenuLinkCloseOnClick();
    this.setupEscapeKeyClose();
    this.setupStickyHeader();
  }

  private setupMobileMenuToggle(): void {
    if (this.hamburger) {
      this.hamburger.addEventListener('click', () => this.toggleMenu());
    }

    if (this.menuOverlay) {
      this.menuOverlay.addEventListener('click', () => this.closeMenu());
    }
  }

  private setupMenuLinkCloseOnClick(): void {
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');
    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        if (window.innerWidth <= 900) {
          this.closeMenu();
        }
      });
    });
  }

  private setupEscapeKeyClose(): void {
    document.addEventListener('keydown', (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.navMenu?.classList.contains('active')) {
        this.closeMenu();
      }
    });
  }

  private setupDropdown(): void {
    if (!this.dropdown || !this.dropdownLink) return;

    this.dropdownLink.addEventListener('click', (e: Event) => {
      if (window.innerWidth <= 900) {
        e.preventDefault();
        this.dropdown?.classList.toggle('open');
      }
    });

    document.addEventListener('click', (e: Event) => {
      const target = e.target as HTMLElement;
      if (window.innerWidth <= 900 && !this.dropdown?.contains(target)) {
        this.dropdown?.classList.remove('open');
      }
    });
  }

  private toggleMenu(): void {
    this.hamburger?.classList.toggle('active');
    this.navMenu?.classList.toggle('active');
    this.menuOverlay?.classList.toggle('active');

    const isOpen = this.navMenu?.classList.contains('active');
    document.body.style.overflow = isOpen ? 'hidden' : '';
  }

  private closeMenu(): void {
    this.hamburger?.classList.remove('active');
    this.navMenu?.classList.remove('active');
    this.menuOverlay?.classList.remove('active');
    document.body.style.overflow = '';
  }

  private setupStickyHeader(): void {
    if (!this.mainNav) return;

    const siteHeader = document.querySelector('.site-header') as HTMLElement;
    const topbar = document.querySelector('.topbar') as HTMLElement;
    
    // Calculate topbar height
    const topbarHeight = topbar ? topbar.offsetHeight : 0;

    window.addEventListener('scroll', () => {
      const currentScrollY = window.scrollY;

      // When scrolled past topbar, fix the main-nav to top
      if (currentScrollY > topbarHeight) {
        this.mainNav?.classList.add('scrolled', 'is-fixed');
        // Add padding to body to prevent jump
        if (this.mainNav) {
          document.body.style.paddingTop = this.mainNav.offsetHeight + 'px';
        }
      } else {
        this.mainNav?.classList.remove('scrolled', 'is-fixed');
        document.body.style.paddingTop = '0';
      }

      this.lastScrollY = currentScrollY;
    });
  }
}
