const Report = () => {
  return (
    <div className="main">
      <h1>Report Page</h1>
      <h2>welcome</h2>
      <div className="form">
        <form>
          <input type="text" placeholder="category"></input>
          <input type="text" placeholder="pickup"></input>
          <input type="text" placeholder="dropoff"></input>
          <input type="text" placeholder="color"></input>
          <input type="text" placeholder="status"></input>
          <input type="text" placeholder="author"></input>
          <input type="text" placeholder="message"></input>
          <button type="submit">Report</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
