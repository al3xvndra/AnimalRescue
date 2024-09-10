const Report = () => {
  return (
    <div className="main">
      <h1>Report Page</h1>
      <h2>welcome</h2>
      <div className="form">
        <form>
          <label>Category</label>
          <input type="text" placeholder="Category"></input>
          <label>Pick up</label>
          <input type="text" placeholder="Pick Up"></input>
          <label>Drop off</label>
          <input type="text" placeholder="Drop Off"></input>
          <label>Color</label>
          <input type="text" placeholder="Color"></input>
          <label>Status</label>
          <input type="text" placeholder="Status"></input>
          <label>Author</label>
          <input type="text" placeholder="Author"></input>
          <label>Message</label>
          <input type="text" placeholder="Message"></input>
          <button type="submit">Report</button>
        </form>
      </div>
    </div>
  );
};

export default Report;
