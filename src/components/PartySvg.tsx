import { readFileSync } from 'node:fs';
import path from 'node:path';

type Props = {
  src: string;
  alt: string;
  width: number;
  height: number;
  className?: string;
};

/** Inline our local artwork so each individual contour can be colored. */
export default function PartySvg({ src, alt, width, height, className }: Props) {
  const markup = readFileSync(path.join(process.cwd(), 'public', src), 'utf8');
  return <span
    role="img"
    aria-label={alt}
    data-party-artwork
    className={className}
    style={{ display: 'block', width, maxWidth: '100%', aspectRatio: `${width} / ${height}` }}
    dangerouslySetInnerHTML={{ __html: markup }}
  />;
}
