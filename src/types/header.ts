//
// Header Component Types and Interfaces
//

export interface SocialLink {
  icon: string;
  href: string;
  label: string;
  title: string;
}

export interface NavItem {
  label: string;
  href: string;
  submenu?: NavItem[];
}

export interface HeaderConfig {
  phone: string;
  email: string;
  logo: {
    src: string;
    srcset: string;
    sizes: string;
    alt: string;
  };
  brand: {
    name: string;
    subtitle: string;
  };
  socialLinks: SocialLink[];
  navItems: NavItem[];
}

export const defaultHeaderConfig: HeaderConfig = {
  phone: '+44 7973 919702',
  email: 'henry@impro-solution.com',
  logo: {
    src: '/images/impro-marine-logo-256.webp',
    srcset: '/images/impro-marine-logo-256.webp 256w, /images/impro-marine-logo-512.webp 512w',
    sizes: '(max-width: 900px) 48px, 56px',
    alt: 'Impro Marine Service - Anchor Logo',
  },
  brand: {
    name: 'Impro UK Marine Service',
    subtitle: 'an Impro Solutions UK Ltd company',
  },
  socialLinks: [
    {
      icon: 'facebook',
      href: '#',
      label: 'Facebook',
      title: 'Follow us on Facebook',
    },
    {
      icon: 'instagram',
      href: '#',
      label: 'Instagram',
      title: 'Follow us on Instagram',
    },
    {
      icon: 'youtube',
      href: '#',
      label: 'YouTube',
      title: 'Watch on YouTube',
    },
    {
      icon: 'linkedin',
      href: 'https://www.linkedin.com/company/impromarineservice',
      label: 'LinkedIn',
      title: 'Connect on LinkedIn',
    },
  ],
  navItems: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Stock', href: '#stock' },
    {
      label: 'Services',
      href: '#services',
      submenu: [
        { label: 'Marine Stock', href: 'services/marine-stock.html' },
        { label: 'Shipyard Partnership', href: 'services/shipyard-partnership.html' },
        { label: 'Shipyard Acquisition', href: 'services/shipyard-acquisition.html' },
        { label: 'B2B Platform', href: 'services/b2b-platform.html' },
      ],
    },
    { label: 'News', href: '#news' },
    { label: 'Contact', href: '#contact' },
  ],
};
