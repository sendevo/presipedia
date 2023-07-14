# Presipedia: Edición Argentina

### *Cronología presidencial argentina*

Desde Bernardino Rivadavia hasta Alberto Ángel Fernández, la más completa guía sobre los mandatos presidenciales de la República Argentina. Cronología, datos históricos, interesantes visualizaciones y curiosidades sobre los últimos xx presidentes que gobernaron este gran país.  

*Basado en [una nota](https://www.lanueva.com/nota/2003-5-25-9-0-0-desde-rivadavia-todos-los-que-se-sentaron-en-el-sillon) del diario "La Nueva Provincia" del 25 de mayo de 2003.*


## Stack

#### Resumen de [package.json](package.json):

| Funcionalidad | Tecnología |
|---|---|
| Gestión de proyecto | Vite |
| Componentes GUI | ReactJS |
| Hojas de estilos | MUI |
| Componentes nativos | CapacitorJS |
| Visualizaciones | [VisJS](https://visjs.github.io/vis-timeline/examples/timeline/) |
| Formateo de fechas | MomentJS |

#### Otras herramientas utilizadas:
| Funcionalidad | Tecnología |
|---|---|
| Edición de JSON | [json crack](https://jsoncrack.com/editor) |
| Ubicación de sitios | [geojson.io](https://geojson.io/) |
| Cálculos temporales | [current millis](https://currentmillis.com/) |



## Formato de datos  
Personas:  
```jsonc
{
    "name": "", // string
    "surname": "", // string
    "picture": "", // string
    "birth_date": 0, // unix timestamp
    "death_date": 0, // unix timestamp / null 
    "birth_location_name": "", // string
    "birth_location": {}, // geojson 
    "occupation": "" // string
}
```
Mandatos:
```jsonc
{
    "pid": "", // string
    "party": "", // string
    "term_begin": 0, // unix timestamp
    "term_end": 0 // unix timestamp / null 
}
```
Eventos:
```jsonc
{
    "name": "", // string
    "description": "", // string
    "date": 0,  // unix timestamp
    "location": {} // geojson
}
```

## Backlog 

v1.0.x (alpha):  
  - [x] Creación del repositorio GitHub.  
  - [x] Definición del modelo de datos: mandatos y personas.  
  - [ ] Herramienta interna para edición de datos:  
    - [ ] Carga y listado de base de datos.  
    - [x] Formulario para editar persona.  
    - [ ] Formulario para editar mandato.  
    - [x] Cálculo de CID para inserción de nuevos elementos.  
    - [x] Exportar base de datos a archivo json.  
  - [ ] Proyecto Vite multitarget: PWA y Android.  
  - [ ] Front-end React + MUI.  
  - [ ] Branding: Logo, nombre, eslogans.  
  - [ ] Visualización de línea de tiempo con Vis.js.  
  - [ ] Compilación (build) y publicación.  
  - [ ] Opensourcing del repo.  

v1.1.x (beta) (requisitos pendientes):
  - [ ] Más data entry: eventos relevantes.  
  - [ ] Optimizar manipulación de datos.  
  - [ ] Visualizaciones con Highcharts.  
