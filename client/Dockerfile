# Используем образ Node.js
FROM node:16

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем файлы package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN npm install

# Копируем остальные файлы проекта
COPY . .

# Собираем проект для продакшн-режима
RUN npm run build

# Открываем порт 5173
EXPOSE 5173

# Запускаем приложение в режиме preview на порту 5173
CMD ["npm", "run", "preview", "--", "--host", "0.0.0.0", "--port", "5173"]
