import {useState,} from "react"

export default function AddPlant() {

const [formData, setFormData] = useState({ name:"", origin:"", description:"", image_url:"" })



const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    

    await fetch("http://localhost:3000/plants", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

      setFormData({ name:"", origin:"", description:"", image_url:"" });
  };

   return (  
   <div className="add-plant-container">
      <h2>Add a New Plant</h2>
      <form onSubmit={handleSubmit} className="add-plant-form">
        <label>
          Plant Name:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Origin:
          <input
            type="text"
            name="origin"
            value={formData.origin}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Description:
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Image URL:
          <input
            type="text"
            name="image_url"
            value={formData.image_url}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit">Add Plant</button>
      </form>
    </div> )


}

