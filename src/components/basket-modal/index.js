import React from 'react';
import Modal from "../modal";
import Basket from "../basket";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";

const cn = bem('BasketModal');

function BasketModal(props) {
  const {
    store,
    isOpen,
    onClose = () => {},
    totalPrice
  } = props;

  return (
    <Modal className={cn()} isOpen={isOpen} onClose={onClose}>
      <Basket store={store} totalPrice={totalPrice} />
    </Modal>
  )
}

BasketModal.propTypes = {
  store: PropTypes.shape({
    getState: PropTypes.func,
    subscribe: PropTypes.func,
  }).isRequired,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  totalPrice: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};

export default BasketModal;
