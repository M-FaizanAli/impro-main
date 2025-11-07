//
// Offers Slider Component - TypeScript
//

export class OffersSlider {
  private slider: HTMLElement | null;
  private prevBtn: HTMLButtonElement | null;
  private nextBtn: HTMLButtonElement | null;
  private touchStartX: number = 0;
  private touchEndX: number = 0;

  constructor() {
    this.slider = document.getElementById('offerSlider');
    this.prevBtn = document.getElementById('prevBtn') as HTMLButtonElement | null;
    this.nextBtn = document.getElementById('nextBtn') as HTMLButtonElement | null;

    this.init();
  }

  private init(): void {
    this.setupArrowButtons();
    this.setupTouchSwipe();
  }

  private setupArrowButtons(): void {
    if (this.prevBtn) {
      this.prevBtn.addEventListener('click', () => this.scrollByCard(-1));
    }

    if (this.nextBtn) {
      this.nextBtn.addEventListener('click', () => this.scrollByCard(1));
    }
  }

  private scrollByCard(direction: number): void {
    if (!this.slider) return;

    const card = this.slider.querySelector<HTMLElement>('.offer-card');
    if (!card) return;

    const amount = card.offsetWidth + 28; // card width + gap

    this.slider.scrollBy({
      left: direction * amount,
      behavior: 'smooth',
    });
  }

  private setupTouchSwipe(): void {
    if (!this.slider) return;

    this.slider.addEventListener(
      'touchstart',
      (e: TouchEvent) => {
        this.touchStartX = e.changedTouches[0].screenX;
      },
      { passive: true }
    );

    this.slider.addEventListener(
      'touchend',
      (e: TouchEvent) => {
        this.touchEndX = e.changedTouches[0].screenX;
        this.handleSwipe();
      },
      { passive: true }
    );
  }

  private handleSwipe(): void {
    const swipeThreshold = 50;

    if (this.touchStartX - this.touchEndX > swipeThreshold) {
      this.scrollByCard(1); // Swipe left
    } else if (this.touchEndX - this.touchStartX > swipeThreshold) {
      this.scrollByCard(-1); // Swipe right
    }
  }
}
