# Módulo 4

## Descripción

Este proyecto es un sistema de E-commerce desarrollado con NestJS, TypeORM y PostgreSQL. El objetivo principal es permitir a los usuarios registrarse, autentificarse, navegar productos, añadir productos al carrito y realizar compras.

## Características

- Autenticación y autorización con JWT.
- Gestión de productos (creación, lectura, actualización y eliminación).
- Carrito de compras y órdenes.
- Subida y gestión de imágenes con Cloudinary.
- Documentación de la API con Swagger.
- Contenerización con Docker.

## Tecnologías Utilizadas

- **NestJS**: Framework de Node.js para la construcción de aplicaciones del lado del servidor.
- **TypeORM**: ORM para TypeScript y JavaScript (ES7).
- **PostgreSQL**: Sistema de gestión de bases de datos relacional.
- **Cloudinary**: Servicio de almacenamiento de imágenes en la nube.
- **Docker**: Plataforma de contenerización para desarrollar, enviar y ejecutar aplicaciones.

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/ekinast/m4-deploy.git
   cd m4-deploy
   ```
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Configurar las variables de entorno:

   - Crear un archivo `.env` basado en el archivo `.env.example` y completar con las credenciales de base de datos y Cloudinary. Luego hay que cambiar en el archivo de configuración de TypeORM dentro de la carpeta
     /config la siguiente línea, para que refleje el nombre del archivo de credenciales que use
     dotenvConfig({ path: '.env.development' });

4. Ejecutar migraciones de TypeORM:

   ```bash
   npm run typeorm migration:run
   ```

5. Generar imágenes y contenedores con Docker:

   ```bash
   Docker compose up
   ```

6. Iniciar la aplicación:
   ```bash
   Correr la aplicación en Docker Desktop
   ```

## Uso

- Acceder a la documentación de la API en `http://localhost:3000/api`.
- Interactuar con los endpoints a través de la documentación generada por Swagger.

## Mas detalles

[text](docs/README.md)

## Licencia

Este proyecto está bajo la Licencia MIT.

---

Creado por Edmundo Kinast.
