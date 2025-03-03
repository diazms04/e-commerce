# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración primero para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto en el que corre NestJS
EXPOSE 3000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
