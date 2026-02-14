# Практическая работа №5: Redux и управление состоянием

## Описание проекта

Приложение демонстрирует использование Redux для управления состоянием формы принятия пользовательского соглашения в React-приложении.

## Реализованный функционал

- ✅ Форма с чекбоксом для принятия соглашения
- ✅ Кнопка подтверждения, активная только при отмеченном чекбоксе
- ✅ Управление состоянием через Redux
- ✅ Разделение слоя представления и бизнес-логики
- ✅ Демонстрация принципов Redux (SSOT, read-only state, pure functions)

## Структура проекта

```
prac5/
├── public/
│   └── index.html              # HTML шаблон
├── src/
│   ├── actions/
│   │   └── agreementActions.js # Action creators
│   ├── reducers/
│   │   └── agreementReducer.js # Reducer для управления состоянием
│   ├── store/
│   │   └── store.js            # Конфигурация Redux Store
│   ├── components/
│   │   ├── AgreementForm.js    # Компонент формы
│   │   └── AgreementForm.css   # Стили формы
│   ├── App.js                  # Главный компонент с Provider
│   ├── App.css                 # Глобальные стили
│   └── index.js                # Точка входа
├── package.json                # Зависимости проекта
├── webpack.config.js           # Конфигурация Webpack
└── .babelrc                    # Конфигурация Babel
```

## Принципы Redux, использованные в проекте

### 1. Single Source of Truth (Единственный источник истины)
Все состояние приложения хранится в одном Redux Store:
```javascript
const initialState = {
  isAgreed: false,
  isSubmitted: false,
  submittedAt: null,
};
```

### 2. State is Read-Only (Состояние только для чтения)
Состояние изменяется только через dispatch actions:
```javascript
dispatch(toggleAgreement());
dispatch(submitAgreement());
```

### 3. Changes with Pure Functions (Изменения через чистые функции)
Reducer - чистая функция, возвращающая новое состояние:
```javascript
case TOGGLE_AGREEMENT:
  return {
    ...state,
    isAgreed: !state.isAgreed,
  };
```

## Установка и запуск

### 1. Установка зависимостей
```bash
npm install
```

### 2. Запуск в режиме разработки
```bash
npm start
```

Приложение откроется в браузере по адресу: http://localhost:3000

### 3. Сборка для продакшена
```bash
npm build
```

## Компоненты Redux

### Actions (Действия)
Объекты, описывающие что произошло:
- `TOGGLE_AGREEMENT` - переключение состояния чекбокса
- `SUBMIT_AGREEMENT` - подтверждение соглашения
- `RESET_AGREEMENT` - сброс формы

### Reducer (Редьюсер)
Чистая функция, определяющая как изменяется состояние:
- Принимает текущее состояние и action
- Возвращает новое состояние
- Не изменяет оригинальное состояние

### Store (Хранилище)
Единый объект, содержащий состояние приложения:
- Создается с помощью `createStore(reducer)`
- Предоставляется компонентам через `<Provider>`

### Selectors (Селекторы)
Функции для извлечения данных из Store:
```javascript
const isAgreed = useSelector((state) => state.isAgreed);
```

## Использование React-Redux хуков

### useSelector
Получение данных из Redux Store:
```javascript
const isAgreed = useSelector((state) => state.isAgreed);
```

### useDispatch
Отправка actions в Store:
```javascript
const dispatch = useDispatch();
dispatch(toggleAgreement());
```

## Отладка

Для отладки рекомендуется установить расширение **Redux DevTools** для браузера:
- [Chrome Extension](https://chrome.google.com/webstore/detail/redux-devtools/)
- [Firefox Extension](https://addons.mozilla.org/en-US/firefox/addon/reduxdevtools/)

DevTools позволяют:
- Просматривать все actions
- Видеть изменения состояния
- Путешествовать во времени (time-travel debugging)
- Отменять и повторять действия

## Ключевые особенности реализации

1. **Разделение ответственности**: бизнес-логика в reducers, представление в components
2. **Предсказуемость**: все изменения состояния происходят через actions
3. **Тестируемость**: чистые функции легко тестировать
4. **Отладка**: история всех изменений состояния
5. **Масштабируемость**: легко добавлять новые features

## Дополнительные возможности для изучения

- Redux Toolkit (@reduxjs/toolkit) - современный подход к Redux
- Redux Thunk или Redux Saga - для асинхронных операций
- Reselect - для мемоизации селекторов
- Redux Persist - для сохранения состояния в localStorage

## Автор
Практическая работа №5 по курсу React и Redux
