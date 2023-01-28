import { useCallback, useRef, useState } from "react";

import { NextPage } from "next";
import { Map, MapRef } from "react-map-gl";
import { EnvConfig } from "~/core/env";

import styles from './map.module.sass';

import { usePlaces } from "~/presentation/hooks/use-places.hook";
import { Point } from "~/presentation/components/point/point.component";
import { PlaceEntity } from "~/domain/entities/place.entity";
import { PlaceDetails } from "~/presentation/components/place-details/place-details.component";
import { PlaceDetailsEntity } from "~/domain/entities/place-details.entity";

export const MapPage: NextPage = () => {
  const {
    places,
    getPlaces,
    getPlaceDetails
  } = usePlaces();

  const [ detailsVisible, setDetailsVisible ] = useState<boolean>(false);
  const [ detailsLoading, setDetailsLoading ] = useState<boolean>(true);
  const [ details, setDetails ] = useState<PlaceDetailsEntity | null>(null);
  
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

  const openPlaceDetails = useCallback(async (place: PlaceEntity) => {
    setDetailsLoading(true);
    setDetailsVisible(true);

    mapRef.current?.flyTo({
      center: [place.longitude, place.latitude],
      zoom: 12
    });

    const details = await getPlaceDetails(place.id);

    setDetails(details);
    setDetailsLoading(false);
  }, []);

  return (
    <main className={styles.wrapper}>
      <PlaceDetails
        visible={detailsVisible}
        onClose={() => {
          setDetailsVisible(false)
          setDetails(null);
        }}
        details={details}
        loading={detailsLoading}
      />
      <Map
        ref={mapRef}
        onLoad={onMove}
        onMoveEnd={onMove}
        dragRotate
        mapStyle="mapbox://styles/mapbox/streets-v9"
        mapboxAccessToken={EnvConfig.mapboxAccessToken}
      >
        {places.map((place) => (
          <Point
            key={place.id}  
            latitude={place.latitude}
            longitude={place.longitude}
            selected={details?.id === place.id}
            onPress={() => {
              openPlaceDetails(place);
            }}
          />
        ))}
      </Map>
    </main>
  )
}
