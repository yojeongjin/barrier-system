export interface PlaceDataProps {
  placeInfo: PlaceType;
}

export type PlaceType = {
  base_name: string;
  base_address: string;
  base_time: string;
  base_fee: number;
  base_image: string;
};
