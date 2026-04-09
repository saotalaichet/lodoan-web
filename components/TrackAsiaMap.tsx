'use client';

interface Props {
  latitude: number;
  longitude: number;
  name: string;
}

export default function TrackAsiaMap({ latitude, longitude, name }: Props) {
  const html = `<!DOCTYPE html>
<html><head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<link rel="stylesheet" href="https://unpkg.com/trackasia-gl@latest/dist/trackasia-gl.css">
<script src="https://unpkg.com/trackasia-gl@latest/dist/trackasia-gl.js"></script>
<style>body{margin:0;padding:0;}#map{width:100%;height:100%;}</style>
</head><body>
<div id="map"></div>
<script>
var map = new trackasiagl.Map({
  container: 'map',
  style: 'https://maps.track-asia.com/styles/v2/streets.json?key=b4948621d117757258530daee9e48a980b',
  center: [${longitude}, ${latitude}],
  zoom: 15
});
map.on('load', function() {
  new trackasiagl.Marker({ color: '#8B1A1A' })
    .setLngLat([${longitude}, ${latitude}])
    .setPopup(new trackasiagl.Popup({ offset: 25 }).setText('${name.replace(/'/g, "\\'")}'))
    .addTo(map);
});
</script>
</body></html>`;

  return (
    <iframe
      srcDoc={html}
      style={{ width: '100%', height: '300px', borderRadius: '16px', border: 'none' }}
      sandbox="allow-scripts"
    />
  );
}