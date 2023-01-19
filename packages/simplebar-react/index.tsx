import * as React from 'react';
import type { ReactNode, MutableRefObject } from 'react';
import SimpleBarCore from 'simplebar-core';
import type { SimpleBarOptions } from 'simplebar-core';

type RenderFunc = (props: {
  scrollableNodeRef: MutableRefObject<HTMLElement | undefined>;
  scrollableNodeProps: {
    className: string;
    ref: MutableRefObject<HTMLElement | undefined>;
  };
  contentNodeRef: MutableRefObject<HTMLElement | undefined>;
  contentNodeProps: {
    className: string;
    ref: MutableRefObject<HTMLElement | undefined>;
  };
}) => ReactNode;

export interface Props
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'children'>,
    SimpleBarOptions {
  children?: ReactNode | RenderFunc;
  scrollableNodeProps?: {
    ref?: any;
    className?: string;
    [key: string]: any;
  };
}

const SimpleBar = React.forwardRef<SimpleBarCore | null, Props>(
  ({ children, scrollableNodeProps = {}, ...otherProps }, ref) => {
    const elRef = React.useRef();
    const scrollableNodeRef = React.useRef<HTMLElement>();
    const contentNodeRef = React.useRef<HTMLElement>();
    const options: Partial<SimpleBarOptions> = {};
    const rest: any = {};

    Object.keys(otherProps).forEach((key) => {
      if (
        Object.prototype.hasOwnProperty.call(SimpleBarCore.defaultOptions, key)
      ) {
        (options as any)[key] = otherProps[key as keyof SimpleBarOptions];
      } else {
        rest[key] = otherProps[key as keyof SimpleBarOptions];
      }
    });

    const classNames = {
      ...SimpleBarCore.defaultOptions.classNames,
      ...options.classNames,
    } as Required<(typeof SimpleBarCore.defaultOptions)['classNames']>;

    const scrollableNodeFullProps = {
      ...scrollableNodeProps,
      className: `${classNames.contentWrapper}${
        scrollableNodeProps.className ? ` ${scrollableNodeProps.className}` : ''
      }`,
      tabIndex: 0,
      role: 'region',
      'aria-label': options.ariaLabel || SimpleBarCore.defaultOptions.ariaLabel,
    };

    React.useEffect(() => {
      let instance: SimpleBarCore | null;
      scrollableNodeRef.current = scrollableNodeFullProps.ref
        ? scrollableNodeFullProps.ref.current
        : scrollableNodeRef.current;

      if (elRef.current) {
        instance = new SimpleBarCore(elRef.current, {
          ...options,
          ...(scrollableNodeRef.current && {
            scrollableNode: scrollableNodeRef.current,
          }),
          ...(contentNodeRef.current && {
            contentNode: contentNodeRef.current,
          }),
        });

        if (typeof ref === 'function') {
          ref(instance);
        } else if (ref) {
          ref.current = instance;
        }
      }

      return () => {
        instance?.unMount();
        instance = null;
        if (typeof ref === 'function') {
          ref(null);
        }
      };
    }, []);

    return (
      <div data-simplebar="init" ref={elRef} {...rest}>
        <div className={classNames.wrapper}>
          <div className={classNames.heightAutoObserverWrapperEl}>
            <div className={classNames.heightAutoObserverEl} />
          </div>
          <div className={classNames.mask}>
            <div className={classNames.offset}>
              {typeof children === 'function' ? (
                children({
                  scrollableNodeRef,
                  scrollableNodeProps: {
                    ...scrollableNodeFullProps,
                    ref: scrollableNodeRef,
                  },
                  contentNodeRef,
                  contentNodeProps: {
                    className: classNames.contentEl,
                    ref: contentNodeRef,
                  },
                })
              ) : (
                <div {...scrollableNodeFullProps}>
                  <div className={classNames.contentEl}>{children}</div>
                </div>
              )}
            </div>
          </div>
          <div className={classNames.placeholder} />
        </div>
        <div className={`${classNames.track} simplebar-horizontal`}>
          <div className={classNames.scrollbar} />
        </div>
        <div className={`${classNames.track} simplebar-vertical`}>
          <div className={classNames.scrollbar} />
        </div>
      </div>
    );
  }
);

SimpleBar.displayName = 'SimpleBar';

export default SimpleBar;
