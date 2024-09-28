import React, {useState} from 'react';
import "./style.css";
import {cn as bem} from "@bem-react/classname";
import {numberFormat} from "../utils/utils";

const cn = bem('ProductInfo');

let ProductInfo = ({product, onAdd}) => {
  const {description, madeIn, category, edition, price} = product;
  const callbacks = {
    onAdd: e => onAdd(product),
  };

  return <div className={cn()}>
    <div className={cn()}>
      <p>Описание: {description}</p>
      <p>Производитель: <strong>{madeIn.title}</strong></p>
      <p>Категория: <strong>{category.title}</strong></p>
      <p>Издание: <strong>{edition}</strong></p>
      <p><strong>Цена: {numberFormat(price)} ₽</strong></p>
      <button onClick={callbacks.onAdd}>Добавить</button>
    </div>
  </div>
};

export default ProductInfo;
