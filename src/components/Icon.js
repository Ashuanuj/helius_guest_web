import React, { PropTypes } from 'react';
import style from '../styles/components/Icon.scss';
import classNames from 'classnames';

const Icon = (props) => (
  <div
    className={classNames([
      style.container,
      style[props.color],
      props.className,
    ])}
    onClick={props.onClick}
    title={props.title}
  >
    <svg
      viewBox={props.viewBox || `0 0 ${props.width} ${props.height}`}
      width={props.width * props.size}
      height={props.height * props.size}
      fill="currentColor"
    >
      {props.children}
    </svg>
  </div>
);

Icon.propTypes = {
  // children: PropTypes.node,
  className: PropTypes.string,
  color: PropTypes.string,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  size: PropTypes.number,
  viewBox: PropTypes.string,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  width: 24,
  height: 24,
  size: 1,
};

export default Icon;
