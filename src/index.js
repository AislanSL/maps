import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient;

export const routes = app => {
  app.post('/add-point', async(req, res) => {
    
    const locations = req.body; // Supondo que req.body seja um array de objetos

   
  
    try {
      // Cria os pontos no banco de dados em lote
      const createdLocations = await Promise.all(
        locations.map(({ name, latitude, longitude }) => {
    
          return prisma.location.create({
            data: {
              name,
              geom: {
                type: 'Point',
                coordinates: [longitude, latitude] // Longitude vem primeiro!
              },
            },
          });
        })
      );
  
      res.status(201).json({
        message: "Pontos cadastrados com sucesso!",
        data: createdLocations,
      });

    } catch(erro) {
      res.status(500).json({message: `${erro.message}`});
    }
  });

  app.get('/locations', async (req, res) => {
    
    
    try {
      const locations = await prisma.location.findMany();
      res.status(200).json(locations);
      console.log("Entrei aqui");
      

    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao buscar pontos');
    }
  })

  app.post('/add-circle', async (req, res) => {
    const { name, latitude, longitude, radius } = req.body;

    
    try{
      const circle = await prisma.circle.create({
        data: {
          name,
          center: {
            type: 'Point', coordinates: [longitude, latitude]
          },
          radius
        }
      });

      res.status(201).json(circle);
    } catch(erro) {
      res.status(500).json({ message: `${erro.message}` });
    }
  });

  app.get('/circles', async (req, res) => {
    try {
      const circles = await prisma.circle.findMany();
      res.status(200).json(circles);
    } catch (erro) {
      console.error(erro);
      res.status(500).send('Erro ao buscar círculos');
    }
  });

  app.post('/add-polygon', async (req, res) => {
    const { name, coordinates } = req.body;

    try {
      const polygon = await prisma.polygon.create({
        data: {
          name,
          geometry: {
            type: 'Polygon',
            coordinates: [coordinates],
          }
        }
      });
      res.status(201).json(polygon);
    } catch(erro) {
      res.status(500).json({message: `${erro.message}`});
    }
  })

  app.get('/polygons', async (req, res) => {
    try{
      const polygons = await prisma.polygon.findMany();
      res.status(200).json(polygons);
    } catch(erro) {
      res.status(500).json({message: `${erro.message}`});
    }

  })
};