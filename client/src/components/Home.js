import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Home() {
  const [restaurants, setRestaurants] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("/restaurants")
      .then((response) => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(setRestaurants)
      .catch((error) => {
        console.error('Error fetching data:', error);
        setError('Error fetching data. Please try again later.');
      });
  }, []);

  function handleDelete(id) {
    fetch(`/restaurants/${id}`, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.ok) {
          setRestaurants((prevRestaurants) =>
            prevRestaurants.filter((restaurant) => restaurant.id !== id)
          );
        } else {
          throw new Error('Failed to delete restaurant');
        }
      })
      .catch((error) => {
        console.error('Error deleting restaurant:', error);
        // Handle error state or display a message to the user
      });
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <section className="container">
      {restaurants.map((restaurant) => (
        <div key={restaurant.id} className="card">
          <h2>
            <Link to={`/restaurants/${restaurant.id}`}>{restaurant.name}</Link>
          </h2>
          <p>Address: {restaurant.address}</p>
          <button onClick={() => handleDelete(restaurant.id)}>Delete</button>
        </div>
      ))}
    </section>
  );
}

export default Home;

