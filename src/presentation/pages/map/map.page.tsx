import { useCallback, useRef } from "react";

import { NextPage } from "next";
import { Map, MapRef, Marker } from "react-map-gl";
import { EnvConfig } from "~/core/env";

import styles from './map.module.sass';

import { usePlaces } from "~/presentation/hooks/use-places.hook";
import { Point } from "~/presentation/components/point/point.component";

export const MapPage: NextPage = () => {
  const {
    places,
    getPlaces
  } = usePlaces();

  const mapRef = useRef<MapRef>(null);

  const onMove = useCallback(async () => {
    const bounds = await mapRef.current?.getBounds();
    const ne = bounds?.getNorthEast();
    const sw = bounds?.getSouthWest();

    getPlaces({
      latitude__gte: sw?.lat as number,
      latitude__lte: ne?.lat as number,
      longitude__gte: sw?.lng as number,
      longitude__lte: ne?.lng as number
    });
  }, []);

  return (
    <main className={styles.wrapper}>
      <h1>Places count: {places.length}</h1>
      <Map
        ref={mapRef}
        onLoad={onMove}
        onMoveEnd={onMove}
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={EnvConfig.mapboxAccessToken}
      >
        {places.map((place) => (
          <Point
            key={place.id}  
            latitude={place.latitude}
            longitude={place.longitude}
            onPress={() => {
              alert(JSON.stringify(place))
            }}
          />
        ))}
      </Map>
    </main>
  )
}
