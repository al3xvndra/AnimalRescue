import photo1 from "../assets/dog1.jpeg";
import photo2 from "../assets/dog2.jpeg";
import photo3 from "../assets/cat1.jpeg";

const Home = () => {
  return (
    <div className="main">
      <h1>Home Page</h1>
            <p>Welcome to Animal Rescue, the community hub for reuniting lost pets with their families. Here, you can report a missing animal, share when you’ve found one, and browse reports from others nearby. Together, we can help pets find their way home.</p>
<div className="home-photos">
  <img src={photo1} alt="Pet 1" />
  <img src={photo2} alt="Pet 2" />
  <img src={photo3} alt="Pet 3" />
</div>
    </div>
  );
};

export default Home;
