import { useParams } from "react-router"
import {useEffect, useState} from "react"

export default function PlantDetails() {

    const {id} = useParams()
    console.log(id)

    const [PlantDetails, setPlantDetails] = useState(null)

    console.log(PlantDetails)

    useEffect(() => {
        async function fetchData() {
            const res = await fetch(`http://localhost:3000/plants/${id}`)
            const data = await res.json()
            console.log(data)

            setPlantDetails(data[0]) }

            fetchData() }, [])

            return(     <div className="plant-details-container">
            {PlantDetails ? <div>
                <p className="plant-details-content">{PlantDetails.name}</p>
                <p >{PlantDetails.origin}</p>
                <p>{PlantDetails.description}</p>
      
                <img  src={PlantDetails.image_url} alt= {PlantDetails.description} />
            </div> : <p>{`Couldn't find plant >:(`}</p>}
        </div>)


}