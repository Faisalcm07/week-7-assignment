import { Link } from "react-router";

export default function Home() {
  return (
    <div className="home-container">
    
      <header className="header">
        <h1>Exotic Plant Explorer</h1>
        <p>Discover rare and fascinating plant species from around the world.</p>

        <Link to="/plants" className="plants-button">
          View All Plants
        </Link>
      </header>
    </div>
  );
}
