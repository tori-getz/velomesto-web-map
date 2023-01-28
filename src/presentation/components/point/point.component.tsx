import React from 'react';

import { Marker } from 'react-map-gl';
import { MdLocationPin } from 'react-icons/md';
import FadeIn from 'react-fade-in/lib/FadeIn';

import styles from './point.module.sass';
import cn from 'classnames';

export interface PointProps {
  latitude: number
  longitude: number
  onPress: () => any;
  selected: boolean
}

export const Point: React.FC<PointProps> = ({
  latitude,
  longitude,
  onPress,
  selected
}) => {
  return (
    <Marker
      latitude={latitude}
      longitude={longitude}
      onClick={onPress}
    >
      <FadeIn>
        <div className={cn(
          styles.point,
          { [styles.selected]: selected }
        )}>
          <MdLocationPin
            size={selected ? 25 : 15}
            color='white'
          />
        </div>
      </FadeIn>
    </Marker>
  )
}
