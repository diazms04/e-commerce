# Proyecto E-Commerce con NestJS

Este proyecto es una aplicación de comercio electrónico desarrollada con **NestJS** para el backend.

## Estructura del Proyecto

El proyecto se compone de los siguientes microservicios:

- **Servicio de Usuarios**: Gestiona el registro, autenticación y perfil de los usuarios.
- **Servicio de Pedidos**: Maneja la creación y seguimiento de pedidos.

Además, se incluye un archivo `docker-compose.yml`.

## Instalación y Ejecución

### Requisitos

- **Node.js** (>= 14.x.x)
- **Docker** y **Docker Compose** (opcional)

### Paso 1: Clonar el Repositorio

```
git clone https://github.com/diazms04/e-commerce.git
cd e-commerce
```

Paso 2: Instalar Dependencias
Instala las dependencias en ambos microservicios:

# Para el servicio de usuarios
```
cd servicio-usuarios
npm install
```

# Para el servicio de pedidos
```
cd ../servicio-pedidos
npm install
```

Paso 3: Configurar las Variables de Entorno
Es esencial configurar las variables de entorno para que cada microservicio se conecte correctamente a su base de datos respectiva. Para ello, sigue estos pasos en cada microservicio:

Crear el archivo .env: En la raíz de cada microservicio (servicio-usuarios y servicio-pedidos), crea un archivo llamado .env.

Configurar la conexión a la base de datos:

Servicio de Usuarios: Abre el archivo .env y agrega la siguiente línea:
```
DATABASE_URL="postgresql://admin:admin@localhost:5433/microservicios_db?schema=public"
```

Servicio de Pedidos: Abre el archivo .env y agrega la siguiente línea:
```
DATABASE_URL="postgresql://admin:admin@localhost:5433/microservicios_pedidos_db?schema=public"
```

En la raiz de todo correr el siguiente comando:
```
docker-compose up --build
```
Esto construirá y levantará los contenedores para los servicios y la base de datos.



## Endpoints

### Microservicio de Autenticación

- **Iniciar Sesión (Obtener Token)**
  - **Método:** `POST`
  - **URL:** `http://localhost:3000/auth/login`
  - **Cuerpo de la Solicitud:**
    ```json
    {
      "email": "juan.perez@example.com",
      "password": "contraseñaSegura123"
    }
    ```
  - **Respuesta de Ejemplo:**
    ```json
    {
      "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```
  - **Descripción:** Este endpoint permite a los usuarios autenticarse proporcionando su correo electrónico y contraseña. Si las credenciales son válidas, se devuelve un token JWT que debe incluirse en el encabezado `Authorization` de las solicitudes subsiguientes para acceder a rutas protegidas.

### Microservicio de Usuarios

- **Registrar Usuario**
  - **Método:** `POST`
  - **URL:** `http://localhost:3000/usuarios/registro`
  - **Cuerpo de la Solicitud:**
    ```json
    {
      "nombre": "Juan Pérez",
      "email": "juan.perez@example.com",
      "password": "contraseñaSegura123"
    }
    ```
  - **Descripción:** Este endpoint permite registrar un nuevo usuario en el sistema.

- **Obtener Perfil del Usuario**
  - **Método:** `GET`
  - **URL:** `http://localhost:3000/usuarios/perfil`
  - **Encabezado:**
    ```
    Authorization: Bearer <tu_token_jwt>
    ```
  - **Descripción:** Este endpoint permite obtener la información del perfil del usuario autenticado. Requiere un token JWT válido en el encabezado `Authorization`.

### Microservicio de Pedidos

- **Crear Pedido**
  - **Método:** `POST`
  - **URL:** `http://localhost:4000/pedidos`
  - **Cuerpo de la Solicitud:**
    ```json
    {
      "descripcion": "Pedido de 10 unidades del producto X",
      "usuarioId": "uuid-del-usuario"
    }
    ```
  - **Descripción:** Este endpoint permite crear un nuevo pedido para un usuario específico.

- **Listar Pedidos por Usuario**
  - **Método:** `GET`
  - **URL:** `http://localhost:4000/pedidos/usuario/{usuarioId}`
  - **Descripción:** Este endpoint permite listar todos los pedidos asociados a un usuario específico.

- **Cambiar Estado de Pedido**
  - **Método:** `PUT`
  - **URL:** `http://localhost:4000/pedidos/{id}/estado`
  - **Cuerpo de la Solicitud:**
    ```json
    {
      "estado": "EN_PROCESO" //  PENDIENTE   EN_PROCESO    COMPLETADO
    }
    ```
  - **Descripción:** Este endpoint permite cambiar el estado de un pedido específico. Requiere un token JWT válido en el encabezado `Authorization`.

*Nota: Reemplaza `{usuarioId}` y `{id}` con los valores correspondientes.*



