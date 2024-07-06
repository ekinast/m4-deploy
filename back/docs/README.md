# Documentación del Proyecto Módulo 4

## Índice

1. [Introducción](#introducción)
2. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
3. [Instalación y Configuración](#instalación-y-configuración)
4. [Estructura del Proyecto](#estructura-del-proyecto)
5. [Endpoints Principales](#endpoints-principales)
6. [Pruebas](#pruebas)
7. [Deployment](#deployment)

## Introducción

Este documento proporciona una guía detallada sobre el desarrollo y funcionamiento del proyecto de E-commerce con NestJS.

## Arquitectura del Proyecto

El proyecto sigue una arquitectura modular, aprovechando las ventajas de NestJS para la organización de controladores, servicios, y módulos.

## Instalación y Configuración

Los pasos para la instalación y configuración del proyecto están detallados en el archivo `README.md` principal.

## Estructura del Proyecto

- **src**: Contiene el código fuente del proyecto.
  - **modules**: Módulos principales del proyecto (Users, Products, Auth, etc.).
  - **config**: Archivos de configuración de TypeORM y Cloudinary.
  - **main.ts**: Punto de entrada de la aplicación.

## Endpoints Principales

- **Usuarios**
  - `POST /auth/signup`: Registro de usuario.
  - `POST /auth/signin`: Inicio de sesión.
  - `GET /users`: Obtener todos los usuarios (protegido).
  - `GET /users/:id`: Obtener un usuario por ID (protegido).
- **Productos**
  - `GET /products`: Obtener todos los productos.
  - `POST /products`: Crear un nuevo producto (protegido).
  - `PUT /products/:id`: Actualizar un producto por ID (protegido).
  - `DELETE /products/:id`: Eliminar un producto por ID (protegido).
- **Órdenes**
  - `POST /orders`: Crear una nueva orden (protegido).
  - `GET /orders/:id`: Obtener una orden por ID (protegido).

## Pruebas

Las pruebas unitarias y de integración se encuentran en la carpeta `test`.

## Deployment

El proyecto está configurado para ser desplegado utilizando Docker y Docker Compose. Los detalles de despliegue se encuentran en la sección de `deployment` del `README.md` principal.

La estructura de la base de datos está documentada en
![alt text](<DB M4.png>)
