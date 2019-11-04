import React, { PropTypes } from 'react';
import classNames from 'classnames';
// import Icon from '../../components/Icon';
import Button  from 'reactstrap';
import Portal from 'react-portal';
import * as style from '../../styles/components/panel.scss';

const Panel = props => (
  <div className={classNames([style.container, props.open && style.open])}>
    {props.hasCloseBtn && (
      <div className={style.actions}>
        {props.actions}
        <div className={style.separator} />
        {/* <Button onClick={props.onClose}>
          <Icon.Close />
        </Button> */}
      </div>
    )}
    {props.children}
    <Portal isOpened={props.open}>{props.hasCloseBtn ? <div onClick={props.onClose} className="grid-backdrop" /> : <div className="grid-backdrop" />}</Portal>
  </div>
);

// Panel.propTypes = {
//   // children: PropTypes.node,
//   open: PropTypes.bool.isRequired,
//   onClose: PropTypes.func,
//   hasCloseBtn: PropTypes.bool.isRequired,
//   title: PropTypes.string,
//   actions: PropTypes.node,
//   styles: React.PropTypes.object,
// };

Panel.defaultProps = {
  hasCloseBtn: false,
};

export default Panel;
