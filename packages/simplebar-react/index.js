import React, { useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import SimpleBarJS from 'simplebar/dist/simplebar-core';

export default function SimpleBar({
  children,
  className,
  style,
  scrollableNodeProps,
  ...options
}) {
  const elRef = useRef();
  const scrollableNodeRef = useRef();
  const contentNodeRef = useRef();

  useEffect(() => {
    new SimpleBarJS(elRef.current, {
      ...options,
      ...(scrollableNodeRef.current && {
        scrollableNode: scrollableNodeRef.current
      }),
      ...(contentNodeRef.current && {
        contentNode: contentNodeRef.current
      })
    });
  });

  return (
    <div ref={elRef} className={className} style={style}>
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
                  scrollableNodeProps && scrollableNodeProps.className
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
    </div>
  );
}

SimpleBar.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]),
  className: PropTypes.string,
  style: PropTypes.object,
  scrollableNodeProps: PropTypes.object
};
