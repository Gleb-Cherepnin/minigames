export interface ElementOptions {
  className?: string;
  text?: string;
  attributes?: Record<string, string>;
  children?: (Node | string)[];
}

export function createElement<K extends keyof HTMLElementTagNameMap>(
  tag: K,
  options: ElementOptions = {},
): HTMLElementTagNameMap[K] {
  const element = document.createElement(tag);
  const { className, text, attributes, children } = options;

  if (className !== undefined) {
    element.className = className;
  }

  if (text !== undefined) {
    element.textContent = text;
  }

  if (attributes !== undefined) {
    for (const [name, value] of Object.entries(attributes)) {
      element.setAttribute(name, value);
    }
  }

  if (children !== undefined) {
    element.append(...children);
  }

  return element;
}

export function clearNode(node: Node): void {
  while (node.firstChild !== null) {
    node.firstChild.remove();
  }
}
