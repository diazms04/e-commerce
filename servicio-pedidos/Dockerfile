# Usa una imagen base oficial de Node.js
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos de configuración primero para aprovechar la caché de Docker
COPY package.json package-lock.json ./

# Instala las dependencias (solo de producción)
RUN npm ci --only=production

# Copia el resto del código al contenedor
COPY . .

# Si usas Prisma, genera los binarios dentro del contenedor
RUN npx prisma generate

# Expone el puerto en el que corre NestJS
EXPOSE 4000

# Comando para iniciar la aplicación
CMD ["npm", "run", "start"]
