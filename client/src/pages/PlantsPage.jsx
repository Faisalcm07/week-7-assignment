import { useState, useEffect, } from "react"
import { Link } from "react-router"

export default function GetPlants() {
    const [plants, setplants] = useState([])

    console.log(plants)

    useEffect(() => {
        async function fetchData() {
            const data = await fetch(`http://localhost:3000/plants`)
            const plantdata = await data.json()
            setplants(plantdata)
        }
        fetchData()

        const interval = setInterval(fetchData, 5000);

        return () => clearInterval(interval);

    }, [])
    return (
      <div className="plants-container">
      <h2>List of Plants</h2>

      <div className="cards-container">
        {plants.length > 0 ? (
          plants.map((plant) => (
            <div className="card" >
              <img
                src={plant.image_url}
                alt={plant.description}
                className="card-image"
              />
              <h2>{plant.name}</h2>
              <Link to = {`/plants/${plant.id}?details=true`} className="details-button"> View Details </Link>
            </div>
          ))
        ) : (
          <p>Loading plants...</p>
        )}
      </div>
    </div>


    )}