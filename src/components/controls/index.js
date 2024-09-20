import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const cn = bem('Controls');

function Controls({actions = []}) {
  return (
    <div className={cn()}>
      {actions.map(({handler, key, text, additionalChildren}) => (
        <div key={key} className={cn('action')}>
          {handler && <button className={cn('btn')} onClick={handler}>{text}</button>}
          {additionalChildren}
        </div>
      ))}
    </div>
  );
}

Controls.propTypes = {
  actions: PropTypes.array
};

export default React.memo(Controls);
