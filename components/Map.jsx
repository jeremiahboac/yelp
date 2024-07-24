'use client'

import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

const Map = ({ campgrounds, isMiniMap = false }) => {
  const mapContainer = useRef();
  const map = useRef();
  const phil = { lng: 122.50011624937103, lat: 11.895150068759879 };
  const zoomLevel = isMiniMap ? 12 : 4.1
  const [zoom] = useState(zoomLevel);

  mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN

  useEffect(() => {
    if (map.current) return; // stops map from intializing more than once

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: 'mapbox://styles/mapbox/dark-v11',
      center: isMiniMap ? campgrounds.features[0].geometry.coordinates : [phil.lng, phil.lat],
      zoom: zoom,
      projection: 'mercator'
    });

    if (!isMiniMap) {
      map.current.on('load', () => {

        map.current.addControl(new mapboxgl.NavigationControl({
          visualizePitch: true
        }));

        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
          })
        );

        // add a clustered GeoJSON source for a sample set of campgrounds
        map.current.addSource('campgrounds', {
          'type': 'geojson',
          'data': campgrounds,
          cluster: true,
          clusterMaxZoom: 14, // Max zoom to cluster points on
          clusterRadius: 50 // Radius of each cluster when clustering points (defaults to 50)
        });

        map.current.addLayer({
          id: 'clusters',
          type: 'circle',
          source: 'campgrounds',
          filter: ['has', 'point_count'],
          paint: {
            // Use step expressions (https://docs.maptiler.com/gl-style-specification/expressions/#step)
            // with three steps to implement three types of circles:
            //   * Blue, 20px circles when point count is less than 100
            //   * Yellow, 30px circles when point count is between 100 and 750
            //   * Pink, 40px circles when point count is greater than or equal to 750
            'circle-color': [
              'step',
              ['get', 'point_count'],
              '#51bbd6',
              100,
              '#f1f075',
              750,
              '#f28cb1'
            ],
            'circle-radius': [
              'step',
              ['get', 'point_count'],
              20,
              100,
              30,
              750,
              40
            ]
          }
        });

        map.current.addLayer({
          id: 'cluster-count',
          type: 'symbol',
          source: 'campgrounds',
          filter: ['has', 'point_count'],
          layout: {
            'text-field': '{point_count_abbreviated}',
            'text-font': ['DIN Offc Pro Medium', 'Arial Unicode MS Bold'],
            'text-size': 12
          }
        });

        map.current.addLayer({
          id: 'unclustered-point',
          type: 'circle',
          source: 'campgrounds',
          filter: ['!', ['has', 'point_count']],
          paint: {
            'circle-color': '#11b4da',
            'circle-radius': 4,
            'circle-stroke-width': 1,
            'circle-stroke-color': '#fff'
          }
        });

        // inspect a cluster on click
        map.current.on('click', 'clusters', (e) => {
          const features = map.current.queryRenderedFeatures(e.point, {
            layers: ['clusters']
          });
          const clusterId = features[0].properties.cluster_id;
          const source = map.current.getSource('campgrounds')
          source.getClusterExpansionZoom(clusterId, (err, expansionZoom) => {
            if (err) return;

            map.current.easeTo({
              center: features[0].geometry.coordinates,
              zoom: expansionZoom
            });
          });
        });

        // When a click event occurs on a feature in
        // the unclustered-point layer, open a popup at
        // the location of the feature, with
        // description HTML from its properties.
        map.current.on('click', 'unclustered-point', (e) => {
          const coordinates = e.features[0].geometry.coordinates.slice();
          const mag = e.features[0].properties.mag;
          const tsunami = e.features[0].properties.tsunami === 1 ? 'yes' : 'no'

          // Ensure that if the map is zoomed out such that
          // multiple copies of the feature are visible, the
          // popup appears over the copy being pointed to.
          while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
            coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
          }

          new mapboxgl.Popup()
            .setLngLat(coordinates)
            .setHTML(
              'magnitude: ' + mag + '<br>Was there a tsunami?: ' + tsunami
            )
            .addTo(map.current);
        });

        map.current.on('mouseenter', 'clusters', () => {
          map.current.getCanvas().style.cursor = 'pointer';
        });
        map.current.on('mouseleave', 'clusters', () => {
          map.current.getCanvas().style.cursor = '';
        });
      });
    } else {
      map.current.addControl(new mapboxgl.NavigationControl({
        visualizePitch: true
      }));

      map.current.addControl(
        new mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true
          },
          trackUserLocation: true,
          showUserHeading: true
        })
      );

      new mapboxgl.Marker({ color: 'red' })
        .setLngLat(campgrounds.features[0].geometry.coordinates)
        .addTo(map.current);
    }

  }, [phil.lng, phil.lat, zoom]);

  return (
    <div className="map-wrap">
      <div ref={mapContainer} className="map" />
    </div>
  );
}
export default Map