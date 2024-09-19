import React, {useCallback, useEffect, useRef, useState} from "react";
import Portal from "../portal";
import { cn as bem } from '@bem-react/classname';
import PropTypes from "prop-types";
import "./style.css"

function Modal(props) {
  const {
    children = null,
    isOpen = false,
    onClose = () => {}
  } = props;
  const cn = bem('Modal');
  const [isClosing, setIsClosing] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const timerRef = useRef();

  useEffect(() => {
    if (isOpen) {
      setIsMounted(true);
    }
  }, [isOpen]);

  const closeHandler = useCallback(() => {
    if (onClose) {
      setIsClosing(true);
      timerRef.current = setTimeout(() => {
        onClose();
        setIsClosing(false);
      }, 300);
    }
  }, [onClose]);

  const onKeyDown = useCallback(
    (e) => {
      console.log(e.key)
      if (e.key === 'Escape') {
        closeHandler();
      }
    },
    [closeHandler],
  );

  const onContentClick = (e) => {
    e.stopPropagation();
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }
    return () => {
      clearTimeout(timerRef.current);
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  return (
    <Portal>
      <div className={cn({opened: isOpen, closing: isClosing})}>
        <div className={cn('overlay')} onClick={closeHandler}>
          <div className={cn('content')} onClick={onContentClick}>
            <button className={cn('btn')} onClick={closeHandler}>Закрыть</button>
            {children}
          </div>
        </div>
      </div>
    </Portal>
  )
}

Modal.propTypes = {
  children: PropTypes.node,
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
};

export default Modal;
