import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';
import {cn as bem} from "@bem-react/classname";

const cn = bem("List");

function List(props) {
  const {
    list,
    onDeleteItemToBasket,
    onAddItemToBasket
  } = props;

  return (
    <div className={cn()}>
      {list.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} onDelete={onDeleteItemToBasket} onAddToBasket={onAddItemToBasket} />
        </div>
      ))}
    </div>
  );
}

List.propTypes = {
  list: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItemToBasket: PropTypes.func,
  onAddItemToBasket: PropTypes.func,
};

export default React.memo(List);
