import React from 'react';

import { Marker } from 'react-map-gl';
import { MdLocationPin } from 'react-icons/md';

import styles from './point.module.sass';
import FadeIn from 'react-fade-in/lib/FadeIn';

export interface PointProps {
  latitude: number
  longitude: number
  onPress: () => any;
}

export const Point: React.FC<PointProps> = ({
  latitude,
  longitude,
  onPress
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={onPress}
    >
      <FadeIn>
        <div className={styles.point}>
          <MdLocationPin
            size={15}
            color='white'
          />
        </div>
      </FadeIn>
    </Marker>
  )
}
