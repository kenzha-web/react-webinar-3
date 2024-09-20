import React from 'react';
import Modal from "../modal";
import Basket from "../basket";
import PropTypes from "prop-types";
import {cn as bem} from "@bem-react/classname";
import {formatPrice} from "../../utils";

function BasketModal(props) {
  const {
    store,
    isOpen = false,
    onClose = () => {},
    totalPrice
  } = props;
  const cn = bem('BasketModal');

  return (
    <Modal className={cn()} isOpen={isOpen} onClose={onClose}>
      <Basket store={store} isOpen={isOpen} totalPrice={totalPrice} />
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
