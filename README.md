# Presipedia: Edición Argentina

### *Cronología presidencial argentina*

Desde Bernardino Rivadavia hasta Javier Gerardo Milei, la más completa guía sobre los mandatos presidenciales de la República Argentina. Cronología de mandatos y eventos relevantes, juegos de preguntas, datos históricos, visualizaciones, curiosidades y mucho más sobre cada uno de los más de 50 presidentes que gobernaron este gran país. ¿Cuál es tu favorito? ¿Con cuál te identificás? ¿Cuántas cosas en común tenés con cada expresidente? Y la pregunta de los 40 millones: ¿Podrás ser el siguiente? ¡Descubrilo con Presipedia!  

*Basado en [esta nota](https://www.lanueva.com/nota/2003-5-25-9-0-0-desde-rivadavia-todos-los-que-se-sentaron-en-el-sillon) del diario "La Nueva Provincia" del 25 de mayo de 2003.*
*Inspirado en [esta nota](https://www.infobae.com/politica/2019/10/27/curiosidades-estadisticas-y-datos-poco-conocidos-de-los-53-mandatarios-de-la-historia-argentina/) de "Infobae" del 27 de octubre de 2019.*  


## Stack

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


## Edición de los datos  
Actualmente Presipedia es puramente *client-side*, por lo que su contenido es estático. Todos los datos se incluyen en el archivo [database.json](src/assets/database.json). Para editar este archivo se recomienda utilizar el [editor](editor/database) provisto en este mismo repositorio. 

En caso de editar el archivo manualmente, debe respetar el siguiente formato:

```jsonc
{
  "people":{},
  "terms":[],
  "events":[]
}
```
#### Personas (Entrada ```people```):  
Para cada entrada se calcula un identificador de contenido (CID) mediante una función de hash y se emplea como clave del objeto ```people```. El uso del hash para validación del contenido no se aplica actualmente, por lo que esta entrada se puede editar sin modificar el nombre de cada clave. Para encontrar el CID de un mandatario, puede utilizar el mismo [editor](editor/database/), pulsando sobre el botón de copiar CID.  
```jsonc
{
  "name": "", // string
  "surname": "", // string
  "gender": "", // string {M, F, null}
  "picture": "", // picture file name string (public folder)
  "birth_date": 0, // unix timestamp
  "death_date": 0, // unix timestamp [optional]
  "cause_of_death": "", // string [optional]
  "birth_location": {}, // geojson (nombre del lugar en 'properties')
  "occupation": "" // string
}
```
Cuando se actualizan los datos de un mandatario y se exporta una nueva base de datos desde el [editor](editor/database/), el CID del presidente se actualizará en función del nuevo contenido. Las referencias a este mandatario en la lista de mandatos se actualizarán automáticamente, sin embargo, existen otras referencias que pueden estar *hardcodeadas*, como por ejemplo en la sección de artículos. Revise los enlaces luego de actualizar los datos de alguno de los presidentes.

#### Mandatos (Entrada ```terms```):  
Como puede darse el hecho de que un mismo presidente gobierne en mandatos discontinuados, se emplea una entrada aparte y se la referencia con el CID. El arreglo de mandatos no necesita estar ordenado cronológicamente.
```jsonc
{
  "cid": "", // string
  "party": "", // string
  "begin": 0, // unix timestamp
  "end": 0 // unix timestamp [optional]
}
```
#### Eventos (Entrada ```events```):  
```jsonc
{
  "type": "", // string: {PERIOD, DATE}
  "title": "", // string
  "description": "", // string
  "image": "", // image file name string (public folder)
  "begin": 0,  // unix timestamp
  "end": 0, // unix timestamp [optional]
  "location": {}, // geojson [optional]
  "sources": [] // Array of strings
}
```

#### Estadística
Para la generación de los gráficos e indicadores estadísticos, se procesan los datos durante la compilación y se guardan en el archivo [processed.json](src/assets/processed.json). Para generar este archivo, ejecute el siguiente comando:

```bash
npm run process-db
```

#### Artículos
El contenido de los artículos se encuentra en un [archivo](src/assets/blog.json) separado de la base de datos de presidentes. Puede valerse de la carpeta [blog](editor/blog/) para visualizar cada artículo. Luego, utilice el siguiente formato para cada entrada:  

```jsonc
{
  "title": "", // string
  "cover": "", // cover file name string
  "content": "", // HTML formatted string
  "sources": [], // array of urls strings
}
```

Los artículos se encuentran agrupados en categorías o secciones, las cuales respetan el siguiente formato:

```jsonc
{
  "title": "", // string
  "icon": "", // path to icon file in 'public' folder
  "articles": [], // array of article objects
}
```

#### Imágenes
Las imágenes con las fotografías de perfil de cada presidente y de los eventos deben alojarse en la carpeta [pictures](public/pictures/). Para los artículos se emplea la carpeta [blog](public/blog/). Para visualizar estas imágenes con el editor de contenido, se emplean enlaces simbólicos. Por ejemplo, para crear los correspondientes a las fotografías de presidentes, utilice el siguiente comando:  

```bash
cd editor/pictures
ln -s ../../public/pictures/* .
```

Para el caso de los artículos, es:  

```bash
cd editor/blog/img
ln -s ../../public/blog/* .
```



### N. del A.
Durante el tiempo que asistí a las escuelas primaria y secundaria, las asignaturas relacionadas con las ciencias sociales fueron las que más detesté estudiar. Más adelante comencé a entender que, efectivamente, conocer la historia de nuestro país nos permite prever y anticipar el impacto de las decisiones que tomamos en el presente sobre el futuro que vamos creando como sociedad. "Todos los problemas son problemas de educación" dijo una vez el expresidente Sarmiento, así que consideren a esta pieza de software como una humilde contribución en pos de lograr una Nación, digamos, "menos problemática". 