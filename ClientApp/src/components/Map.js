import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl'; // or "const mapboxgl = require('mapbox-gl');"


export function Map() {
  mapboxgl.accessToken = 'pk.eyJ1IjoiZGFyaWFtYW5za2FpYSIsImEiOiJja3R4ZGlzc3AxM2x4MnFtbTZzNzZieDh0In0.w8LWp3G7t0w8Q9r-YYCKaA';
  const mapContainer = useRef(null);
  const map = useRef(null);
  const [lat, setLat] = useState(51.4700223);
  const [lng, setLng] = useState(-0.4542955);
  const [zoom, setZoom] = useState(10);
  
  
  useEffect(() => {
    if (map.current) return; // initialize map only once
    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [lng, lat],
      zoom: zoom
    });
  });

  useEffect(() => {
    if (!map.current) return; // wait for map to initialize
    map.current.on('move', () => {
      setLng(map.current.getCenter().lng.toFixed(4));
      setLat(map.current.getCenter().lat.toFixed(4));
      setZoom(map.current.getZoom().toFixed(2));
    });
  });

  


    return (
      <div>
        <div ref={mapContainer} className="map-container" />
      </div>
    );
}