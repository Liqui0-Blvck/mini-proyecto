/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_PRO: string;
  // Otras variables de entorno...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
