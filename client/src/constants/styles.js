export const selectStyles = {
  option: (styles, { isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isSelected ? '#c0fcea' : 'white',
      color: isFocused ? '#6dd5b6' : 'black',
      borderColor: '#6dd5b6',
      fontSize: '18px',
    };
  },
  control: (styles, { selectProps }) => {
    return {
      ...styles,
      width: selectProps.width ? selectProps.width : '300px',
      borderColor: '#6dd5b6',
      borderRadius: '20px',
      margin: '0.5rem 0',
      padding: '4px 8px',
      fontSize: '18px',
    };
  },
};
