import { memo } from 'react';
import { NavLink } from "react-router-dom";
import PropTypes from 'prop-types';
import { numberFormat } from '../utils/utils';
import { cn as bem } from '@bem-react/classname';
import './style.css';

const cn = bem('Item');

function Item({item, onAdd, link }) {
  const callbacks = {
    onAdd: e => onAdd(item),
  };

  return (
    <div className={cn()}>
      {/*<div className={cn('code')}>{props.item._id}</div>*/}
      <div className={cn('title')}>
        <NavLink to={link} className={cn('nav')}>
            <span className={cn('title-text')}>{item.title}</span>
        </NavLink>
      </div>
      <div className={cn('actions')}>
        <div className={cn('price')}>{numberFormat(item.price)} ₽</div>
        <button onClick={callbacks.onAdd}>Добавить</button>
      </div>
    </div>
  );
}

Item.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    price: PropTypes.number,
  }).isRequired,
  onAdd: PropTypes.func,
};

export default memo(Item);
