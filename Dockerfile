# --- ETAPA 1: Build da aplicação ---
FROM node:22-alpine AS builder

WORKDIR /usr/src/app

# Copia os arquivos de dependência
COPY package*.json ./
RUN npm install --legacy-peer-deps

# Copia todo o código fonte e faz o build (ex: npm run build)
COPY . .
RUN npm run build

# --- ETAPA 2: Servir com Nginx ---
FROM nginx:alpine

# Copia os arquivos gerados no build para a pasta pública do Nginx
COPY --from=builder /usr/src/app/dist /usr/share/nginx/html

# Expõe a porta que o Nginx vai escutar por padrão dentro do contêiner
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]