export type Anchor = 'bottom' | 'right';

export type backGroundImages = {
  thumbnail: string;
  img: string;
  title: string;
};

export type IconName =
  | 'My Day'
  | 'Important'
  | 'Planned'
  | 'Completed'
  | 'All'
  | 'Tasks'
  | 'Default';

export type BackGroundImagesType = {
  thumbnail: thumbnailType;
  img: backgroundImagesType;
  title: string;
};

type backgroundImagesType = {
  img:
    | 'background_1'
    | 'background_2'
    | 'background_3'
    | 'background_4'
    | 'background_5'
    | 'background_6'
    | 'background_7'
    | 'background_8'
    | 'background_9'
    | 'background_10'
    | 'background_11'
    | 'background_12';
};
type thumbnailType = {
  thumbnail:
    | 'thumbnail_1'
    | 'thumbnail_2'
    | 'thumbnail_3'
    | 'thumbnail_4'
    | 'thumbnail_5'
    | 'thumbnail_6'
    | 'thumbnail_7'
    | 'thumbnail_8'
    | 'thumbnail_9'
    | 'thumbnail_10'
    | 'thumbnail_11'
    | 'thumbnail_12';
};
