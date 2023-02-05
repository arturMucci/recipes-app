import React from 'react';
import PropTypes from 'prop-types';

export default function Button({ value, id, testid, handleFilter }) {
  return (
    <button
      id={ id }
      data-testid={ testid }
      onClick={ (evt) => handleFilter(evt) }
    >
      {value}
    </button>
  );
}

Button.propTypes = {
  value: PropTypes.string.isRequired,
  id: PropTypes.string,
  testid: PropTypes.string,
  handleFilter: PropTypes.func.isRequired,
};

Button.defaultProps = {
  testid: '',
  id: '',
};
