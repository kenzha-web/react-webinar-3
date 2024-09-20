import React from 'react';
import PropTypes from 'prop-types';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('PageLayout');

function PageLayout(props) {
  const {
    children = null
  } = props

  return (
    <div className={cn()}>
      <div className={cn('center')}>{children}</div>
    </div>
  );
}

PageLayout.propTypes = {
  children: PropTypes.node,
};

export default React.memo(PageLayout);
