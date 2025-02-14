import type {LngLat, YMapLocationRequest} from '@yandex/ymaps3-types';
import type {YMapDefaultMarkerProps} from '@yandex/ymaps3-default-ui-theme';

export const LOCATION: YMapLocationRequest = {
    center: [39.7112, 43.5797], // starting position [lng, lat]
    zoom: 14.5 // starting zoom
};

export const FIRST_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; coordinates: LngLat} = {
    iconName: 'boat_station',
    coordinates: [39.7105, 43.5804]
};
export const SECOND_MARKER_PROPS: {iconName: YMapDefaultMarkerProps['iconName']; coordinates: LngLat} = {
    iconName: 'waterpark',
    coordinates: [39.6929, 43.5794]
};
