const SearchBar = ({ Input, setInput }) => {
  const handleChange = (e) => {
    setInput(e.target.value);
  };

  return (
    <input
      type='text'
      placeholder='Zoek cursussen...'
      value={Input}
      onChange={handleChange}
      style={{
        width: '90%',
        padding: '10px',
        fontSize: '16px',
        marginTop: '1rem',
        marginBottom: '1rem',
        borderRadius: '6px',
        border: '1px solid #ccc',
      }}
    />
  );
};

export default SearchBar;
