import Hero from "../components/Hero";
import PetList from "./PetList";

const Home = () => {
  const isLoggedIn = !!localStorage.getItem("token");

  return <div>{isLoggedIn ? <Hero /> : <PetList />}</div>;
};

export default Home;
