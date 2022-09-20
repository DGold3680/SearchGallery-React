function Search({ handleSubmit, handleInputChange, inputValue }) {
    return (
      <div>
        <form onSubmit={handleSubmit}>
          <input
            className="inputBox"
            onChange={handleInputChange}
            value={inputValue}
          />
        </form>
      </div>
    );
  }

  export default Search