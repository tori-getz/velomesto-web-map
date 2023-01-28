import React from "react";

import { PlaceDetailsEntity } from "~/domain/entities/place-details.entity";

import Drawer from "react-modern-drawer";
import { BounceLoader } from "react-spinners";

import styles from "./place-details.module.sass";
import ReactImageGallery from "react-image-gallery";

export interface PlaceDetailsProps {
  visible: boolean;
  onClose: () => any;
  loading: boolean;
  details: PlaceDetailsEntity | null;
}

export const PlaceDetails: React.FC<PlaceDetailsProps> = ({
  visible,
  onClose,
  loading,
  details,
}) => {
  const renderBody = () => {
    if (loading) {
      return (
        <div className={styles.loading}>
          <BounceLoader color="tomato" />
        </div>
      );
    }

    return (
      <>
        {details?.photos?.length !== 0 && (
          <ReactImageGallery
            items={details?.photos?.map((photo) => ({
              original: `https://velomesto.com${photo.image_big}`,
              thumbnail: `https://velomesto.com${photo.image_thumb}`,
            })) ?? []}
            showPlayButton={false}
            showFullscreenButton={false}
            showNav={false}
          />
        )}
        <aside className={styles.aside}>
          <h1 className={styles.title}>{details?.name}</h1>
          <p>{details?.description}</p>
          <div className={styles.infoBlock}>
            <h2>Страна</h2>
            <span>{details?.country}</span>
          </div>
          <div className={styles.infoBlock}>
            <h2>Адрес</h2>
            <span>{details?.address}</span>
          </div>
          {details?.telephone !== "" && (
            <div className={styles.infoBlock}>
              <h2>Телефон</h2>
              <span>{details?.telephone}</span>
            </div>
          )}
          {details?.website !== "" && (
            <div className={styles.infoBlock}>
              <h2>Вебсайт</h2>
              <span>{details?.website}</span>
            </div>
          )}
        </aside>
      </>
    );
  };

  return (
    <Drawer
      open={visible}
      onClose={onClose}
      direction="left"
      overlayColor="transparent"
      size="400px"
    >
      {renderBody()}
    </Drawer>
  );
};
