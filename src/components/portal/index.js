import { ReactNode } from 'react';
import {createPortal} from "react-dom";
import PropTypes from 'prop-types';

function Portal(props) {
  const {children, element = document.body} = props;

  return createPortal(children, element)
}

Portal.propTypes = {
  children: PropTypes.node,
  element: PropTypes.instanceOf(HTMLElement),
}

export default Portal;
