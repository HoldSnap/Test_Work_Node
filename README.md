# Test Work Node

## Запуск проекта
Убедитесь , что у вас установлен docker
1. Склонируйте репозиторий:
   ```bash
   git clone https://github.com/HoldSnap/Test_Work_Node.git
   cd Test_Work_Node/backend
   ```

2. Запустите контейнеры:
   Перед запуском убедитесь, что вы в папке backend, т.к именно там находится docker-compose
   ```bash
   docker-compose up -d 
   ```
    Также для удобства есть seeds для заполнения БД
   ```bash
   npx sequelize-cli db:seed:all
   ```
3. Доступ к приложению:
   - Фронтенд: [http://localhost:5173](http://localhost:5173)
   - Бэкенд: [http://localhost:3000](http://localhost:3000)

