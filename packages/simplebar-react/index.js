import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SimpleBarJS from 'simplebar/dist/simplebar-core.esm';

/* Deprecated
 * Hardcore this here until we can safely deprecated it.
 * Helper function to retrieve options from element attributes
 */
const getOptions = function(obj) {
  const options = Array.prototype.reduce.call(
    obj,
    (acc, attribute) => {
      const option = attribute.name.match(/data-simplebar-(.+)/);
      if (option) {
        const key = option[1].replace(/\W+(.)/g, (x, chr) => chr.toUpperCase());
        switch (attribute.value) {
          case 'true':
            acc[key] = true;
            break;
          case 'false':
            acc[key] = false;
            break;
          case undefined:
            acc[key] = true;
            break;
          default:
            acc[key] = attribute.value;
        }
      }
      return acc;
    },
    {}
  );
  return options;
};

const DEFAULT_CLASS_NAMES = {
  contentEl: 'simplebar-content',
  contentWrapper: 'simplebar-content-wrapper',
  offset: 'simplebar-offset',
  mask: 'simplebar-mask',
  wrapper: 'simplebar-wrapper',
  placeholder: 'simplebar-placeholder',
  scrollbar: 'simplebar-scrollbar',
  track: 'simplebar-track',
  heightAutoObserverWrapperEl: 'simplebar-height-auto-observer-wrapper',
  heightAutoObserverEl: 'simplebar-height-auto-observer',
  visible: 'simplebar-visible',
  horizontal: 'simplebar-horizontal',
  vertical: 'simplebar-vertical',
  hover: 'simplebar-hover',
  dragging: 'simplebar-dragging'
};

const SimpleBar = React.forwardRef(
  ({ children, scrollableNodeProps = {}, classNames, ...otherProps }, ref) => {
    let instance;
    let scrollableNodeRef = useRef();
    const elRef = useRef();
    const contentNodeRef = useRef();
    let options = {};
    let rest = {};
    let deprecatedOptions = [];
    const c = { ...DEFAULT_CLASS_NAMES, ...classNames };

    Object.keys(otherProps).forEach(key => {
      if (
        Object.prototype.hasOwnProperty.call(SimpleBarJS.defaultOptions, key)
      ) {
        options[key] = otherProps[key];
      } else if (
        key.match(/data-simplebar-(.+)/) &&
        key !== 'data-simplebar-direction'
      ) {
        deprecatedOptions.push({
          name: key,
          value: otherProps[key]
        });
      } else {
        rest[key] = otherProps[key];
      }
    });

    if (deprecatedOptions.length) {
      console.warn(`simplebar-react: this way of passing options is deprecated. Pass it like normal props instead:
        'data-simplebar-auto-hide="false"' —> 'autoHide="false"'
      `);
    }

    useEffect(() => {
      scrollableNodeRef = scrollableNodeProps.ref || scrollableNodeRef;

      if (elRef.current) {
        instance = new SimpleBarJS(elRef.current, {
          ...getOptions(deprecatedOptions),
          ...options,
          ...(scrollableNodeRef && {
            scrollableNode: scrollableNodeRef.current
          }),
          ...(contentNodeRef.current && {
            contentNode: contentNodeRef.current
          }),
          classNames
        });

        if (ref) {
          ref.current = instance;
        }
      }

      return () => {
        instance.unMount();
        instance = null;
      };
    }, []);

    return (
      <div ref={elRef} data-simplebar {...rest}>
        <div className={c.wrapper}>
          <div className={c.heightAutoObserverWrapperEl}>
            <div className={c.heightAutoObserverEl} />
          </div>
          <div className={c.mask}>
            <div className={c.offset}>
              {typeof children === 'function' ? (
                children({ scrollableNodeRef, contentNodeRef })
              ) : (
                <div
                  {...scrollableNodeProps}
                  className={`${c.contentWrapper}${
                    scrollableNodeProps.className
                      ? ` ${scrollableNodeProps.className}`
                      : ''
                  }`}
                >
                  <div className={c.contentEl}>{children}</div>
                </div>
              )}
            </div>
          </div>
          <div className={c.placeholder} />
        </div>
        <div className={`${c.track} ${c.horizontal}`}>
          <div className={c.scrollbar} />
        </div>
        <div className={`${c.track} ${c.vertical}`}>
          <div className={c.scrollbar} />
        </div>
      </div>
    );
  }
);

SimpleBar.displayName = 'SimpleBar';

SimpleBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  scrollableNodeProps: PropTypes.object,
  classNames: PropTypes.shape({
    contentEl: PropTypes.string,
    contentWrapper: PropTypes.string,
    offset: PropTypes.string,
    mask: PropTypes.string,
    wrapper: PropTypes.string,
    placeholder: PropTypes.string,
    scrollbar: PropTypes.string,
    track: PropTypes.string,
    heightAutoObserverWrapperEl: PropTypes.string,
    heightAutoObserverEl: PropTypes.string,
    visible: PropTypes.string,
    horizontal: PropTypes.string,
    vertical: PropTypes.string,
    hover: PropTypes.string,
    dragging: PropTypes.string
  })
};

export default SimpleBar;
