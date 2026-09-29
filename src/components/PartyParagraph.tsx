import React, { Children, cloneElement, isValidElement, type ReactNode } from 'react';

function plainText(node: ReactNode): string {
  if (typeof node === 'string' || typeof node === 'number') return String(node);
  if (isValidElement<{ children?: ReactNode }>(node)) return plainText(node.props.children);
  return Children.toArray(node).map(plainText).join('');
}

/** Split sentences across inline links without changing their markup or text. */
export default function PartyParagraph({ children, ...props }: React.ComponentProps<'p'>) {
  const text = plainText(children);
  const sentences = [...new Intl.Segmenter('en', { granularity: 'sentence' }).segment(text)];
  let offset = 0;
  function paint(node: ReactNode): ReactNode {
    return Children.map(node, child => {
      if (typeof child === 'string' || typeof child === 'number') {
        const value = String(child);
        const start = offset;
        offset += value.length;
        return sentences.flatMap((sentence, index) => {
          const from = Math.max(start, sentence.index);
          const to = Math.min(offset, sentence.index + sentence.segment.length);
          return from < to ? [
            <span key={`${from}-${index}`} data-party-sentence={index}>
              {value.slice(from - start, to - start)}
            </span>,
          ] : [];
        });
      }
      if (isValidElement<{ children?: ReactNode }>(child)) {
        return cloneElement(child, {}, paint(child.props.children));
      }
      return child;
    });
  }
  return <p {...props}>{paint(children)}</p>;
}
