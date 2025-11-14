# Build stage
FROM node:18-alpine AS build

WORKDIR /app

# Instalar dependências do sistema necessárias para build
RUN apk add --no-cache python3 make gcc g++ curl

# Copiar package.json, package-lock.json e .npmrc para cache de dependências
COPY package*.json .npmrc ./

# Debug: mostrar conteúdo dos arquivos importantes
RUN echo "===== package.json =====" && cat package.json && echo "===== package-lock.json =====" && cat package-lock.json && echo "===== .npmrc =====" && cat .npmrc

# Instalar dependências com npm ci se package-lock.json existir, senão fallback para npm install
RUN if [ -f package-lock.json ]; then \
      npm ci --legacy-peer-deps; \
    else \
      npm install --legacy-peer-deps; \
    fi

# Copiar todo o código fonte
COPY . .

# Rodar build da aplicação
RUN npm run build

# Produção
FROM node:18-alpine AS production

WORKDIR /app

# Copiar package.json, package-lock.json e .npmrc para produção
COPY --from=build /app/package*.json /app/.npmrc ./

# Instalar só dependências de produção
RUN npm install --omit=dev --legacy-peer-deps

# Copiar build e server.js
COPY --from=build /app/dist ./dist
COPY --from=build /app/server.js ./server.js

EXPOSE 3001

HEALTHCHECK --interval=30s --timeout=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3001/health || exit 1

CMD ["node", "server.js"]
