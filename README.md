# Presipedia: Edición Argentina

### *Cronología presidencial argentina*

Desde Bernardino Rivadavia hasta Alberto Ángel Fernández, la más completa guía sobre los mandatos presidenciales de la República Argentina. Cronología de mandatos y eventos relevantes, juegos de preguntas, datos históricos, visualizaciones, curiosidades y mucho más sobre cada uno de los más de 50 presidentes que gobernaron este gran país. ¿Cuál es tu favorito? ¿Con cuál te identificás? ¿Cuántas cosas en común tenés con cada expresidente? Y la pregunta de los 40 millones: ¿Podrás ser el siguiente? ¡Descubrilo con Presipedia!  

*Basado en [esta nota](https://www.lanueva.com/nota/2003-5-25-9-0-0-desde-rivadavia-todos-los-que-se-sentaron-en-el-sillon) del diario "La Nueva Provincia" del 25 de mayo de 2003.*
*Inspirado en [esta nota](https://www.infobae.com/politica/2019/10/27/curiosidades-estadisticas-y-datos-poco-conocidos-de-los-53-mandatarios-de-la-historia-argentina/) de "Infobae" del 27 de octubre de 2019.*  


## Stack

#### Resumen de [package.json](package.json):

| Funcionalidad | Tecnología |
|---|---|
| Gestión de proyecto | [Vite](https://vitejs.dev/) |
| Componentes GUI | [ReactJS](https://es.react.dev/) |
| Hojas de estilos | [MUI](https://mui.com/) |
| Componentes nativos | [CapacitorJS](https://capacitorjs.com/) |
| Formateo de fechas | [MomentJS](https://momentjs.com/) |
| Calendario | [React-Calendar](https://www.npmjs.com/package/react-calendar) |
| Visualización de datos | [Charts.js](https://www.chartjs.org/) |
| Contenido deslizante | [React-Slick](https://react-slick.neostack.com/) |

#### Otras herramientas utilizadas:
| Funcionalidad | Tecnología |
|---|---|
| Visualización de JSON | [json crack](https://jsoncrack.com/editor) |
| Ubicación de sitios | [geojson.io](https://geojson.io/) |
| Cálculos temporales | [current millis](https://currentmillis.com/) |


## Cómo contribuir

Para contribuir al proyecto *Presipedia*, puede hacer un fork y enviar un pull request. Este proyecto sigue los términos de licencia de la [GNU General Public License (v3)](LICENSE), por lo que deberá tener en cuenta que estará liberando su trabajo según los términos de esta misma licencia. 

#### Quiero contribuir, pero no soy desarrollador...

Si Ud. no posee conocimientos de desarrollo de software o de sistemas de control de versiones pero quiere sugerir cambios a este proyecto, puede ponerse en contacto a través del siguiente correo electrónico: [holasendevo@gmail.com](mailto:holasendevo@gmail.com). ¡Todo comentario, sugerencia o colaboración será bienvenida!


## Formato de datos  
Se emplea un único archivo JSON como base de datos, ya que la aplicación es puramente *client-side*. En un futuro, y en el hipotético caso de que este proyecto escale, puede considerarse alguna otra opción más eficiente como MySQL o IndexedDB.  

Base de datos
```jsonc
{
  "people":{},
  "terms":[],
  "events":[]
}
```
Personas (Entrada ```people```):  
*Para cada entrada se calcula un identificador de contenido (CID) mediante una función de hash y se emplea como clave del objeto ```people```*
```jsonc
{
  "name": "", // string
  "surname": "", // string
  "gender": "", // string {M, F, null}
  "picture": "", // picture file name string (public folder)
  "birth_date": 0, // unix timestamp
  "death_date": 0, // unix timestamp | null
  "cause_of_death": "", // string | null
  "birth_location": {}, // geojson (nombre del lugar en 'properties')
  "occupation": "" // string
}
```
Mandatos (Entrada ```terms```):  
*Como puede darse el hecho de que un mismo presidente gobierne en mandatos discontinuados, se emplea una entrada aparte y se la referencia con el CID. El arreglo de mandatos no necesita estar ordenado cronológicamente.*
```jsonc
{
  "cid": "", // string
  "party": "", // string
  "begin": 0, // unix timestamp
  "end": 0 // unix timestamp | null
}
```
Eventos (Entrada ```events```):  
```jsonc
{
  "type": "", // string: {PERIOD, DATE}
  "title": "", // string
  "description": "", // string
  "image": "", // image file name string (public folder)
  "begin": 0,  // unix timestamp
  "end": 0, // unix timestamp | null
  "location": {}, // geojson | null
  "sources": [] // Array of strings
}
```
Artículos (En objeto separado)
```jsonc
{
  "title": "", // string
  "cover": "", // cover file name string
  "content": "", // HTML formatted string
  "sources": [], // array of urls strings
}
```

### N. del A.
Durante el tiempo que asistí a las escuelas primaria y secundaria, las asignaturas relacionadas con las ciencias sociales fueron las que más detesté estudiar. Y no fue hasta luego de egresar de la universidad, cuando comencé a entender que efectivamente conocer la historia de nuestro país nos permite prever y anticipar el impacto de las decisiones que tomamos en el presente sobre el futuro que vamos creando como sociedad. "Todos los problemas son problemas de educación" dijo una vez el expresidente Sarmiento, así que consideren a esta pieza de software como una humilde contribución en pos de lograr una Nación, digamos, "menos problemática". 