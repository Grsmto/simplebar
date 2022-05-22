import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SimpleBarJS from 'simplebar-core';

const SimpleBar = React.forwardRef(
  ({ children, scrollableNodeProps = {}, tag = 'div', ...otherProps }, ref) => {
    const RootTag = tag;
    let scrollableNodeRef = useRef();
    const elRef = useRef();
    const contentNodeRef = useRef();
    let options = {};
    let rest = {};

    Object.keys(otherProps).forEach((key) => {
      if (
        Object.prototype.hasOwnProperty.call(SimpleBarJS.defaultOptions, key)
      ) {
        options[key] = otherProps[key];
      } else {
        rest[key] = otherProps[key];
      }
    });

    useEffect(() => {
      let instance;
      scrollableNodeRef.current = scrollableNodeProps.ref
        ? scrollableNodeProps.ref.current
        : scrollableNodeRef.current;

      if (elRef.current) {
        instance = new SimpleBarJS(elRef.current, {
          ...options,
          ...(scrollableNodeRef && {
            scrollableNode: scrollableNodeRef.current,
          }),
          ...(contentNodeRef.current && {
            contentNode: contentNodeRef.current,
          }),
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
      <RootTag ref={elRef} data-simplebar {...rest}>
        <div className="simplebar-wrapper">
          <div className="simplebar-height-auto-observer-wrapper">
            <div className="simplebar-height-auto-observer" />
          </div>
          <div className="simplebar-mask">
            <div className="simplebar-offset">
              {typeof children === 'function' ? (
                children({ scrollableNodeRef, contentNodeRef })
              ) : (
                <div
                  {...scrollableNodeProps}
                  className={`simplebar-content-wrapper${
                    scrollableNodeProps.className
                      ? ` ${scrollableNodeProps.className}`
                      : ''
                  }`}
                >
                  <div className="simplebar-content">{children}</div>
                </div>
              )}
            </div>
          </div>
          <div className="simplebar-placeholder" />
        </div>
        <div className="simplebar-track simplebar-horizontal">
          <div className="simplebar-scrollbar" />
        </div>
        <div className="simplebar-track simplebar-vertical">
          <div className="simplebar-scrollbar" />
        </div>
      </RootTag>
    );
  }
);

SimpleBar.displayName = 'SimpleBar';

SimpleBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  scrollableNodeProps: PropTypes.object,
  tag: PropTypes.string,
};

export default SimpleBar;
