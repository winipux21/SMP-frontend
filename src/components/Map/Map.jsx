import React from 'react';
import { YMaps, Map } from 'react-yandex-maps';

const MapComponent = () => {
  console.log('Компонент карты рендерится');

  return (
<YMaps query={{ apikey: '603e464a-f0ec-49dd-9c9a-97e5ed154e3f' }}>
  <Map defaultState={{ center: [55.751574, 37.573856], zoom: 10 }} width="100%" height="600px" />
</YMaps>
  );
};

export default MapComponent;
