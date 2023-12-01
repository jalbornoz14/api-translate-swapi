# Prueba tecnica de traduccion de keys 🚀✅

## Descripcion: <br>

Este proyecto es una prueba tecnica de backend en nodejs usando nestjs, aws
mysql, swagger y la api de swapi.

## Proceeso de Instalacion<br>

1. Clonar el repositorio<br>

```bash
git clone https://github.com/jalbornoz14/api-translate-swapi.git
```

2. Ejecutar el comando pnpm install<br>

```bash
pnpm install
```

3. Ejecutar el comando npm run start:dev<br>

```bash
pnpm run start:dev
```

4. Abrir la documentacion navegador en la url http://localhost:3000/docs/<br>

## Uso

| EndPoint            | Metodo | Descripcion                                               |
| ------------------- | ------ | --------------------------------------------------------- |
| /translate-keys     | GET    | Lista todos las keys que se traduciran                    |
| /translate-keys     | POST   | Crea una nueva key para traducir                          |
| /translate-keys/:id | GET    | Obtiene una key por su id                                 |
| /translate-keys/:id | PUT    | Actualiza una key por su id                               |
| /translate-keys/:id | DELETE | Elimina una key por su id                                 |
| /films              | GET    | Lista todas las peliculas de swapi y con la key traducida |
| /films/:id          | GET    | Obtiene una pelicula por su id y con la key traducida     |
