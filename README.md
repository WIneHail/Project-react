Project-react

Курсовой проект по React (TypeScript, Vite). Демонстрирует базовую архитектуру SPA: маршрутизация, управление состоянием, валидация форм, обработка ошибок.

Технологии

React 18 + TypeScript
Vite (сборка и dev-server)
React Router DOM v6
React Hook Form + Zod (валидация)
SCSS (модульные стили)
React Testing Library + Jest (unit-тесты)
ESLint + Prettier
Функционал

Базовая маршрутизация (Home, About, Form)
Форма с валидацией: email, required fields, custom Zod-схема
Обработка ошибок через ErrorBoundary
Адаптивная верстка (mobile-first)
Unit-тесты для компонентов и хуков (~60% coverage)
Запуск

npm install
npm run dev        # dev-сервер на http://localhost:5173
npm run test       # запуск тестов
npm run build      # production-сборка
