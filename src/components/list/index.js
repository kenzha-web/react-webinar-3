import React from 'react';
import PropTypes from 'prop-types';
import Item from '../item';
import './style.css';

function List(props) {
  const {
    list,
    onDeleteItemToBasket = () => {},
    onAddItemToBasket = () => {}
  } = props;

  return (
    <div className="List">
      {list.map(item => (
        <div key={item.code} className="List-item">
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
