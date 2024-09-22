import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const cn = bem("List");

function List({ items, renderItem, onItemAction }) {
  return (
    <div className={cn()}>
      {items.map(item => (
        <div key={item.code} className={cn('item')}>
          {renderItem(item, onItemAction)}
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  renderItem: PropTypes.func.isRequired,
  onItemAction: PropTypes.func.isRequired,
};

export default React.memo(List);
