import { clearNode } from '@/utils/dom';

export interface Page {
  render(): HTMLElement;
  destroy?(): void;
}

export type PageFactory = () => Page;

export class Router {
  private readonly routes = new Map<string, PageFactory>();

  private currentPage: Page | undefined;

  constructor(
    private readonly outlet: HTMLElement,
    private readonly fallbackPath: string,
  ) {}

  public addRoute(path: string, factory: PageFactory): this {
    this.routes.set(path, factory);
    return this;
  }

  public start(): void {
    globalThis.addEventListener('popstate', () => {
      this.renderCurrentPath();
    });
    this.renderCurrentPath();
  }

  public navigate(path: string): void {
    if (path !== globalThis.location.pathname) {
      globalThis.history.pushState({}, '', path);
    }
    this.renderCurrentPath();
  }

  private renderCurrentPath(): void {
    const factory =
      this.routes.get(globalThis.location.pathname) ?? this.routes.get(this.fallbackPath);

    if (factory === undefined) {
      return;
    }

    this.currentPage?.destroy?.();
    this.currentPage = factory();

    clearNode(this.outlet);
    this.outlet.append(this.currentPage.render());
  }
}
