//
// FAQ Accordion Component - TypeScript
//

export class FAQAccordion {
  private faqItems: NodeListOf<HTMLElement>;
  private resizeTimer: number | null = null;

  constructor() {
    this.faqItems = document.querySelectorAll('#faq_block .item');
    this.init();
  }

  private init(): void {
    this.faqItems.forEach((item) => {
      this.setupItem(item);
    });

    this.setupResizeListener();
  }

  private setupItem(item: HTMLElement): void {
    const btn = item.querySelector<HTMLButtonElement>('.ctrl');
    const panel = item.querySelector<HTMLDivElement>('.panel');

    if (!btn || !panel) return;

    btn.addEventListener('click', () => {
      this.toggleItem(item, btn, panel);
    });

    // Set initial state
    if (item.getAttribute('aria-expanded') === 'true') {
      panel.style.maxHeight = `${panel.scrollHeight}px`;
      btn.setAttribute('aria-expanded', 'true');
    }
  }

  private toggleItem(
    item: HTMLElement,
    btn: HTMLButtonElement,
    panel: HTMLDivElement
  ): void {
    const isOpen = item.getAttribute('aria-expanded') === 'true';

    // Close all items
    this.faqItems.forEach((otherItem) => {
      otherItem.setAttribute('aria-expanded', 'false');
      const otherPanel = otherItem.querySelector<HTMLDivElement>('.panel');
      const otherBtn = otherItem.querySelector<HTMLButtonElement>('.ctrl');

      if (otherPanel) otherPanel.style.maxHeight = '0px';
      if (otherBtn) otherBtn.setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      item.setAttribute('aria-expanded', 'true');
      btn.setAttribute('aria-expanded', 'true');
      panel.style.maxHeight = `${panel.scrollHeight}px`;
    }
  }

  private setupResizeListener(): void {
    window.addEventListener('resize', () => {
      if (this.resizeTimer) {
        clearTimeout(this.resizeTimer);
      }

      this.resizeTimer = window.setTimeout(() => {
        document
          .querySelectorAll<HTMLDivElement>('#faq_block .item[aria-expanded="true"] .panel')
          .forEach((panel) => {
            panel.style.maxHeight = `${panel.scrollHeight}px`;
          });
      }, 250);
    });
  }
}
