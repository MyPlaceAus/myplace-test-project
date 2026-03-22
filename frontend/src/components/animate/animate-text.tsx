import type { Variants, UseInViewOptions } from 'framer-motion';

import { useRef, useMemo, useEffect } from 'react';
import { m, useInView, useAnimation } from 'framer-motion';
import { createClasses } from 'src/utils/create-classes';
import { cn } from 'src/lib/utils';

import { varFade, varContainer } from './variants';

// ----------------------------------------------------------------------

export const animateTextClasses = {
  root: createClasses('animate__text__root'),
  lines: createClasses('animate__text__lines'),
  line: createClasses('animate__text__line'),
  word: createClasses('animate__text__word'),
  char: createClasses('animate__text__char'),
  space: createClasses('animate__text__space'),
  srOnly: 'sr-only',
};

export type AnimateTextProps = React.ComponentProps<'p'> & {
  variants?: Variants;
  repeatDelayMs?: number;
  textContent: string | string[];
  once?: UseInViewOptions['once'];
  amount?: UseInViewOptions['amount'];
  as?: React.ElementType;
};

export function AnimateText({
  variants,
  className,
  textContent,
  once = true,
  amount = 1 / 3,
  as: Component = 'p',
  repeatDelayMs = 100, // 1000 = 1s
  ...other
}: AnimateTextProps) {
  const textRef = useRef(null);

  const animationControls = useAnimation();

  const textArray = useMemo(
    () => (Array.isArray(textContent) ? textContent : [textContent]),
    [textContent]
  );

  const isInView = useInView(textRef, { once, amount });

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const triggerAnimation = () => {
      if (repeatDelayMs) {
        timeout = setTimeout(async () => {
          await animationControls.start('initial');
          animationControls.start('animate');
        }, repeatDelayMs);
      } else {
        animationControls.start('animate');
      }
    };

    if (isInView) {
      triggerAnimation();
    } else {
      animationControls.start('initial');
    }

    return () => clearTimeout(timeout);
  }, [animationControls, isInView, repeatDelayMs]);

  return (
    <Component
      className={cn(
        'm-0 p-0',
        `[&_.${animateTextClasses.srOnly}]:p-0 [&_.${animateTextClasses.srOnly}]:w-px [&_.${animateTextClasses.srOnly}]:h-px [&_.${animateTextClasses.srOnly}]:-m-px [&_.${animateTextClasses.srOnly}]:border-0 [&_.${animateTextClasses.srOnly}]:overflow-hidden [&_.${animateTextClasses.srOnly}]:absolute [&_.${animateTextClasses.srOnly}]:whitespace-nowrap [&_.${animateTextClasses.srOnly}]:clip-[rect(0,0,0,0)]`,
        cn([animateTextClasses.root, className])
      )}
      {...other}
    >
      <span className={animateTextClasses.srOnly}>{textArray.join(' ')}</span>

      <m.span
        aria-hidden
        ref={textRef}
        initial="initial"
        animate={animationControls}
        exit="exit"
        variants={varContainer()}
        className={animateTextClasses.lines}
      >
        {textArray?.map((line, lineIndex) => (
          <span
            key={`${line}-${lineIndex}`}
            data-index={lineIndex}
            className={cn('block', animateTextClasses.line)}
          >
            {line.split(' ').map((word, wordIndex) => {
              const lastWordInline = line.split(' ')[line.split(' ').length - 1];

              return (
                <span
                  key={`${word}-${wordIndex}`}
                  data-index={wordIndex}
                  className={cn('inline-block', animateTextClasses.word)}
                >
                  {word.split('').map((char, charIndex) => (
                    <m.span
                      key={`${char}-${charIndex}`}
                      variants={variants ?? varFade('in')}
                      data-index={charIndex}
                      className={cn('inline-block', animateTextClasses.char)}
                    >
                      {char}
                    </m.span>
                  ))}

                  {lastWordInline !== word && (
                    <span className={cn('inline-block', animateTextClasses.space)}>&nbsp;</span>
                  )}
                </span>
              );
            })}
          </span>
        ))}
      </m.span>
    </Component>
  );
}
