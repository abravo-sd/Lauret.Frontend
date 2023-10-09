# Lauret.Frontend

Entorno de desarrollo para aplicación web usando [Angular](https://angular.io/), [Angular CLI](https://cli.angular.io/), [Angular Material](https://v8.material.angular.io/) y el sistema de cuadricula de [Bootstrap](https://getbootstrap.com/)

### Secciones

- [Comenzar](#Comenzar)
- [Requisitos](#Requisitos)
- [Instalar dependencias](#Instalar-dependencias)
- [Ambientes](#Ambientes)
- [Lista de tareas](#List-de-tareas)
- [Lanzamiento](#Lanzamiento)
- [Lista de cambios](#Lista-de-cambios)
- [Versionamiento](#Versionamiento)
- [Confirmaciones](#Confirmaciones)

## Comenzar

Estas instrucciones lo llevarán a tener una copia del proyecto de manera local.

## Requisitos

- [Visual Studio Code](https://visualstudio.microsoft.com/es/vs/community/)
- [Git](https://git-scm.com/downloads)
- [Node.js & NPM (>8.0.0)](https://nodejs.org/es/)

## Instalar dependencias

Ejecute el siguiente comando en la terminal apuntando a la raíz del proyecto.

`npm install`

## Ambientes

En este entorno tenemos 4 ambientes:

1. Local
2. Producción

Los dominios para cada ambiente son:

1. http://localhost:4200
2.

## Lista de tareas

Ejecute en la terminal `npm run` seguido del nombre de la tarea.

| Tarea          | Descripción                                                                                                                                         |
| -------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| `start`        | Compila el proyecto en modo desarrollo y lo inicia en `localhost:4200`                                                                              |
| `build`        | Compila y empaqueta el proyecto en modo producción con la variable de entorno PROD. La distribución se puede encontrar en el directorio `dist/prod` |
| `release`      | Actualiza la versión de `package.json` como versión productiva y el `CHANGELOG`, también ejecuta la tarea `build`                                   |
| `release:beta` | Actualiza la versión de `package.json` con el sufijo `beta` y el `CHANGELOG`, también ejecuta la tarea `build`                                      |
| `release:rc`   | Actualiza la versión de `package.json` con el sufijo `rc` y el `CHANGELOG`, también ejecuta la tarea `build`                                        |
| `lint`         | Revisa y formatea el codigo acorde a las reglas y configuración de eslint y prettier                                                                |

## Lanzamiento

### Publicación

## Lista de cambios

Puede ver nuestra lista de cambios en [CHANGELOG.](CHAGELOG.md)

## Versionamiento

Usamos el versionamiento `SemVer` guiado de las confirmaciones convencionales de Angular con `standard-version` para su automatización, [aprenda mas.](https://semver.org/)

## Confirmaciones

Usamos las confirmaciones convencionales de Angular, [aprenda mas.](https://www.conventionalcommits.org/en/v1.0.0/)
