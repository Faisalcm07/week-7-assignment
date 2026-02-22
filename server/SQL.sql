CREATE TABLE exotic_plants (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    origin TEXT,
    description TEXT,
    image_url TEXT
);

INSERT INTO exotic_plants (name, origin, description, image_url) VALUES
('Bird of Paradise', 'South Africa', 'A large tropical flower with vibrant colors resembling a bird.', 'https://cdn.mos.cms.futurecdn.net/qcnFSh3WxSLUBNNNKbhyG9-1200-80.jpg'),
('Dragon Tree', 'Canary Islands', 'A tree known for its unique umbrella-shaped leaves.', 'https://www.ocregister.com/wp-content/uploads/2019/04/iStock-187523304-1.jpg?w=1800&resize=1800,1800'),
('Spider Lily', 'Asia', 'A red flower with spider-like petals.', 'https://cdn11.bigcommerce.com/s-asrnch/images/stencil/1280x1280/products/4704/14360/Art2__56769.1710123731.jpg?c=2'),
('Jade Vine', 'Philippines', 'A type of vine with rare turquoise, claw-shaped flowers.', 'https://www.tnnursery.net/cdn/shop/articles/7d59df48a26ac91cbf001692166f719d_93b4eeb0-c264-4b72-b3be-7a70ac483c23.jpg?v=1766071017'),
('Pickerel Weed', 'North America', 'A freshwater aquatic plant recognized by its heart-shaped leaves and spikes of violet-blue flowers.', 'https://upload.wikimedia.org/wikipedia/commons/4/4f/Pontederia_cordata_4_PP.jpg'),
('Venus Flytrap','North Carolina, USA','A small carnivorous plant which captures insects using jaw-like leaves that snap shut when trigger hairs are touched.','https://www.rhs.org.uk/getmedia/9186ed03-7b50-4e56-88ae-e76961f56c8f/dionaea-muscipula-close-up.jpg');

CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    climate TEXT,
    soil_type TEXT
);

INSERT INTO categories (name, description, climate, soil_type) VALUES
('Tropical', 'Plants that thrive in warm, humid regions.', 'Tropical', 'Moist, rich soil'),
('Carnivorous', 'Plants that trap insects for nutrition.', 'Humid/Wetlands', 'Acidic, sandy soil'),
('Aquatic', 'Plants that live in water or very damp soil.', 'Freshwater', 'Waterlogged soil'),
('Climbing', 'Vines or plants that grow by climbing on structures.', 'Tropical/Subtropical', 'Fertile, loose soil');


CREATE TABLE plant_categories (
  plant_id INT REFERENCES exotic_plants(id),
  category_id INT REFERENCES categories(id),
  PRIMARY KEY (plant_id, category_id) -- cannot accidentally have duplicate entries.
)


INSERT INTO plant_categories (plant_id, category_id) VALUES
(1, 1), 
(2, 1), 
(3, 1), 
(4, 4),  
(4, 1),
(5, 3), 
(6, 2); 

select exotic_plants.name, array_agg(categories.name) AS categories
from exotic_plants
inner join plant_categories
on plant_categories.plant_id = exotic_plants.id
inner join categories
on categories.id = plant_categories.category_id
group by exotic_plants.name