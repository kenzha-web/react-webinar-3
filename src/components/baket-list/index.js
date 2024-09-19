import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import {cn as bem} from "@bem-react/classname";
import './style.css';

function BasketList(props) {
  const {
    basket,
    onDeleteItem = () => {},
    isOpen = false
  } = props;
  const cn = bem('BasketList');

  return (
    <div className={cn()}>
      {basket.map(item => (
        <div key={item.code} className={cn('item')}>
          <Item item={item} isOpen={isOpen} onDelete={onDeleteItem} />
        </div>
      ))}
    </div>
  );
}

BasketList.propTypes = {
  basket: PropTypes.arrayOf(
    PropTypes.shape({
      code: PropTypes.number,
    }),
  ).isRequired,
  onDeleteItem: PropTypes.func,
  isOpen: PropTypes.bool
};

export default React.memo(BasketList);
