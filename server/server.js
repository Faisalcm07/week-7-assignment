import express, { request, response } from "express"
import cors from "cors"
import dotenv from "dotenv"
import pg from "pg"
    
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()

const db = new pg.Pool({
    connectionString: process.env.DB_CONN 
}) 

app.get('/', (req, res) => {
    res.send('Hello there!')
})

app.get('/plants', async (req, res)=>{

    const data = await db.query(`SELECT * FROM exotic_plants`)
    const plants = data.rows 
    
    res.status(200).json(plants)})

app.get("/plants/:id", async (req, res) => {


     if (Object.keys(req.query).length > 0) {
      const plant = await db.query( 
    
        `SELECT 
                exotic_plants.*,
                ARRAY_AGG(
                    JSON_BUILD_OBJECT(
                        'id', categories.id,
                        'name', categories.name,
                        'description', categories.description,
                        'climate', categories.climate,
                        'soil_type', categories.soil_type
                    )
                ) AS categories
            FROM exotic_plants
            LEFT JOIN plant_categories
                ON exotic_plants.id = plant_categories.plant_id
            INNER JOIN categories
                ON plant_categories.category_id = categories.id
            WHERE exotic_plants.id = $1
            GROUP BY exotic_plants.id`,

        [req.params.id]
      );
      res.status(200).json(plant.rows); }

      const plant = ( 
      await db.query(`select * from exotic_plants where id = $1`, [req.params.id])
    ).rows;
    if (plant.length < 1) {
      res.status(404).json({ error: "Plant Not Found" });
    }
    res.status(200).json(plant);
    })

app.post("/plants", async (req, res) => {
 
    const { name, origin, description, image_url } = req.body;
    
    const result = (
      await db.query(
        `insert into exotic_plants (name, origin, description, image_url) VALUES ($1, $2, $3, $4) RETURNING *`,
        [name, origin, description, image_url]
      )
    ).rows;
    res.status(201).json(result); 
  
});


app.delete(`/plants/:id`, async (req, res) => {

    await db.query(`delete from exotic_plants where id = $1`, [req.params.id]);

     res.status(204).send(); })
















app.listen(3000, () => {
    console.log(`Server started on http://localhost:3000/`)
})
