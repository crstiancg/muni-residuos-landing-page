/// <reference types="vite/client" />

declare module '*.geojson?raw' {
  const content: string;
  export default content;
}

declare module '*.geojson' {
  const content: any;
  export default content;
}
