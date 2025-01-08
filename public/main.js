
const map = L.map('map').setView([-25.4951166, -49.2897982,11], 10);

const streetLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

const markersLayer = L.layerGroup();
const circlesLayer = L.layerGroup();
const polygonsLayer = L.layerGroup();

L.control.layers(
  {
    "Streets": streetLayer
  },
  {
    "Markers": markersLayer,
    "Circles": circlesLayer,
    "Polygons": polygonsLayer
  },
  {collapsed: false}
).addTo(map);

async function informationLoading() {
  
  const getLocations = await fetch('http://localhost:3000/locations');
  const locations = await getLocations.json();

  locations.forEach(locations => { 
    const coords = locations.geom.coordinates;
    
    const marker = L.marker([coords[1], coords[0]]).addTo(map)
      .bindPopup(locations.name);
      
      
    
    markersLayer.addLayer(marker);
      
  });
  
  markersLayer.addTo(map);


  const getCircles = await fetch('http://localhost:3000/circles');
  const circle = await getCircles.json();

  

  circle.forEach(circle => { 
    const coords = circle.center.coordinates;
    
    const circles = L.circle([coords[1], coords[0]], {   
      radius: circle.radius,   
      color: 'red',           
      fillColor: 'blue',      
      fillOpacity: 0.4        
    }).addTo(map)
    .bindPopup(circle.name)
    
    circlesLayer.addLayer(circles);  
  });

  circlesLayer.addTo(map);

  const getPolygon = await fetch('http://localhost:3000/polygons');
  const polygon = await getPolygon.json();

  polygon.forEach(polygon => {
    const coords = polygon.geometry.coordinates

    const polygons = L.polygon(coords).addTo(map).bindPopup(polygon.name);
    
    polygonsLayer.addLayer(polygons);
  })

  polygonsLayer.addTo(map);
}

informationLoading();