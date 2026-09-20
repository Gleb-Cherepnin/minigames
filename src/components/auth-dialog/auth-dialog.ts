import { createElement } from '@/utils/dom';

import '@/components/button/button.scss';
import './auth-dialog.scss';
import { assetUrl } from '@/utils/asset';

export enum AuthMode {
  Login = 'login',
  Register = 'register',
}

interface FieldConfig {
  name: string;
  label: string;
  type: string;
  placeholder: string;
  icon: string;
  autocomplete: string;
  toggleable?: boolean;
}

const LOGIN_FIELDS: FieldConfig[] = [
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'e.g. alex@minigames.com',
    icon: 'mail',
    autocomplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: '••••••••',
    icon: 'lock',
    autocomplete: 'current-password',
    toggleable: true,
  },
];

const REGISTER_FIELDS: FieldConfig[] = [
  {
    name: 'username',
    label: 'Username',
    type: 'text',
    placeholder: 'e.g. CozyGamer_99',
    icon: 'person',
    autocomplete: 'username',
  },
  {
    name: 'email',
    label: 'Email Address',
    type: 'email',
    placeholder: 'your.email@domain.com',
    icon: 'mail',
    autocomplete: 'email',
  },
  {
    name: 'password',
    label: 'Password',
    type: 'password',
    placeholder: 'Min. 8 characters',
    icon: 'lock',
    autocomplete: 'new-password',
    toggleable: true,
  },
  {
    name: 'confirm-password',
    label: 'Confirm Password',
    type: 'password',
    placeholder: 'Repeat your password',
    icon: 'lock',
    autocomplete: 'new-password',
    toggleable: true,
  },
];

export class AuthDialog {
  private readonly dialog: HTMLDialogElement;

  private readonly panelHost: HTMLElement;

  private readonly tabs = new Map<AuthMode, HTMLButtonElement>();

  private mode: AuthMode = AuthMode.Login;

  constructor() {
    this.panelHost = createElement('div');
    this.dialog = this.build();
    this.renderPanel();
  }

  public render(): HTMLDialogElement {
    return this.dialog;
  }

  public open(mode: AuthMode = AuthMode.Login): void {
    this.setMode(mode);
    this.dialog.showModal();
  }

  public close(): void {
    this.dialog.close();
  }

  private build(): HTMLDialogElement {
    const form = createElement('form', {
      className: 'auth-dialog__form',
      attributes: { novalidate: '' },
      children: [this.buildTabs(), this.panelHost],
    });

    form.addEventListener('submit', (event) => {
      event.preventDefault();
    });

    const dialog = createElement('dialog', {
      className: 'auth-dialog',
      attributes: { 'aria-labelledby': 'auth-dialog-title' },
      children: [form],
    });

    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        dialog.close();
      }
    });

    return dialog;
  }

  private buildTabs(): HTMLElement {
    const loginTab = this.buildTab(AuthMode.Login, 'Login');
    const registerTab = this.buildTab(AuthMode.Register, 'Register');

    return createElement('div', {
      className: 'auth-dialog__tabs',
      attributes: { role: 'tablist' },
      children: [loginTab, registerTab],
    });
  }

  private buildTab(mode: AuthMode, label: string): HTMLButtonElement {
    const tab = createElement('button', {
      className: 'auth-dialog__tab',
      text: label,
      attributes: { type: 'button', role: 'tab' },
    });

    tab.addEventListener('click', () => {
      this.setMode(mode);
    });

    this.tabs.set(mode, tab);

    return tab;
  }

  private setMode(mode: AuthMode): void {
    if (this.mode === mode && this.panelHost.childElementCount > 0) {
      return;
    }

    this.mode = mode;

    for (const [tabMode, tab] of this.tabs) {
      const isActive = tabMode === mode;
      tab.classList.toggle('auth-dialog__tab--active', isActive);
      tab.setAttribute('aria-selected', String(isActive));
    }

    this.renderPanel();
  }

  private renderPanel(): void {
    const isLogin = this.mode === AuthMode.Login;

    this.panelHost.replaceChildren(
      createElement('div', {
        className: 'auth-dialog__panel',
        children: [
          this.buildHeading(isLogin),
          this.buildFields(isLogin),
          this.buildActions(isLogin),
          this.buildFooter(isLogin),
        ],
      }),
    );
  }

  private buildHeading(isLogin: boolean): HTMLElement {
    return createElement('div', {
      className: 'auth-dialog__heading',
      children: [
        createElement('h2', {
          className: 'auth-dialog__title',
          text: isLogin ? 'Welcome Back!' : 'Create Account',
          attributes: { id: 'auth-dialog-title' },
        }),
        createElement('p', {
          className: 'auth-dialog__subtitle',
          text: isLogin
            ? 'Sign in to resume your games and progress.'
            : 'Join MiniGames to track your score & streak.',
        }),
      ],
    });
  }

  private buildFields(isLogin: boolean): HTMLElement {
    const configs = isLogin ? LOGIN_FIELDS : REGISTER_FIELDS;
    const fields = configs.map((config) => this.buildField(config));

    if (isLogin) {
      fields.push(
        createElement('div', {
          className: 'auth-dialog__forgot-row',
          children: [
            createElement('button', {
              className: 'auth-dialog__link',
              text: 'Forgot Password?',
              attributes: { type: 'button' },
            }),
          ],
        }),
      );
    }

    return createElement('div', { className: 'auth-dialog__fields', children: fields });
  }

  private buildField(config: FieldConfig): HTMLElement {
    const inputId = `auth-${config.name}`;
    const input = createElement('input', {
      className: 'auth-dialog__input',
      attributes: {
        id: inputId,
        name: config.name,
        type: config.type,
        placeholder: config.placeholder,
        autocomplete: config.autocomplete,
      },
    });

    const wrapperChildren: (Node | string)[] = [
      createElement('img', {
        attributes: {
          src: assetUrl(`/assets/icons/${config.icon}.svg`),
          alt: '',
          width: '20',
          height: '20',
        },
      }),
      input,
    ];

    if (config.toggleable === true) {
      wrapperChildren.push(this.buildPasswordToggle(input));
    }

    return createElement('div', {
      className: 'auth-dialog__field',
      children: [
        createElement('label', {
          className: 'auth-dialog__label',
          text: config.label,
          attributes: { for: inputId },
        }),
        createElement('div', {
          className: 'auth-dialog__input-wrapper',
          children: wrapperChildren,
        }),
      ],
    });
  }

  private buildPasswordToggle(input: HTMLInputElement): HTMLElement {
    const toggle = createElement('button', {
      className: 'auth-dialog__toggle',
      attributes: { type: 'button', 'aria-label': 'Show password' },
      children: [
        createElement('img', {
          attributes: {
            src: assetUrl('/assets/icons/visibility.svg'),
            alt: '',
            width: '20',
            height: '20',
          },
        }),
      ],
    });

    toggle.addEventListener('click', () => {
      const isHidden = input.type === 'password';
      input.type = isHidden ? 'text' : 'password';
      toggle.setAttribute('aria-label', isHidden ? 'Hide password' : 'Show password');
    });

    return toggle;
  }

  private buildActions(isLogin: boolean): HTMLElement {
    return createElement('div', {
      className: 'auth-dialog__actions',
      children: [
        createElement('button', {
          className: 'button button--primary auth-dialog__submit',
          text: isLogin ? 'Login' : 'Create Account',
          attributes: { type: 'submit' },
        }),
        createElement('p', { className: 'auth-dialog__divider', text: 'or' }),
        this.buildGoogleButton(isLogin),
      ],
    });
  }

  private buildGoogleButton(isLogin: boolean): HTMLElement {
    const icon = createElement('img', {
      attributes: { src: assetUrl('/assets/icons/google.svg'), alt: '', width: '24', height: '24' },
    });

    const label = createElement('span', {
      text: isLogin ? 'Continue with Google' : 'Sign up with Google',
    });

    return createElement('button', {
      className: 'auth-dialog__google',
      attributes: { type: 'button' },
      children: [icon, label],
    });
  }

  private buildFooter(isLogin: boolean): HTMLElement {
    const switchLink = createElement('button', {
      className: 'auth-dialog__link',
      text: isLogin ? 'Register' : 'Login',
      attributes: { type: 'button' },
    });

    switchLink.addEventListener('click', () => {
      this.setMode(isLogin ? AuthMode.Register : AuthMode.Login);
    });

    return createElement('p', {
      className: 'auth-dialog__footer',
      children: [
        createElement('span', {
          text: isLogin ? "Don't have an account?" : 'Already have an account?',
        }),
        switchLink,
      ],
    });
  }
}
