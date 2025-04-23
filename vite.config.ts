// Импорт функции defineConfig для создания конфигурации Vite
import { defineConfig } from 'vite';
// Плагин для поддержки React (JSX, HMR и т.д.)
import react from '@vitejs/plugin-react';
// Плагин для автоматического использования путей из tsconfig.json
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';
// Импорт функции resolve для работы с путями в файловой системе
//import { resolve } from 'path';

// Экспорт расширенной конфигурации Vite
export default defineConfig({
  // Массив подключаемых плагинов
  plugins: [
    react(), // Подключаем плагин для работы с React
    svgr({
      include: ['**/*.svg?react', "**/*.svg"],
      svgrOptions: {icon: true}
    }),
    tsconfigPaths({
      projects: ['tsconfig.app.json', 'tsconfig.json'],
    }), // Используем алиасы и пути, указанные в tsconfig.json
  ],

  css: {
    modules: {
      generateScopedName: '[name]__[local]__[hash:base64:5]',
    },
  },

  // Разрешение модулей и настройка алиасов. ДУБЛИРУЕТ КОД
  // resolve: {
  //   alias: [{ find: '@', replacement: "src"}],
  // },

  // Конфигурация сервера разработки
  server: {
    port: 3020,       // Указываем порт для запуска сервера разработки
    open: true,       // Автоматически открываем браузер при старте сервера
    proxy: {
      // Прокси для API-запросов, чтобы обойти проблемы CORS
      '/api': {
        target: 'http://localhost:5000', // URL сервера API
        changeOrigin: true,              // Изменяем origin запроса
        secure: false,                   // Если API работает по http, отключаем проверку SSL
        rewrite: (path) => path.replace(/^\/api/, ''), // Удаляем префикс '/api' из запроса
      },
    },
    hmr: {
      overlay: true, // Показываем оверлей с ошибками во время разработки
      // Дополнительные параметры HMR можно указать, например, port:
      port: 3040,
    },
  },

  // Опции сборки для продакшна
  build: {
    outDir: 'dist',   // Папка, куда будет собран проект
    sourcemap: true,  // Генерация sourcemap для отладки в продакшене
    rollupOptions: {
      output: {
        // Пример разбиения на чанки: выносим сторонние библиотеки в отдельный чанк
        manualChunks: {
          vendor: ['react', 'react-dom'],
        },
      },
    },
  },

  /*// Настройки для работы с CSS и препроцессорами (например, SCSS)
  css: {
    preprocessorOptions: {
      scss: {
        // Автоматически подключаем глобальные SCSS-переменные или миксины ко всем SCSS файлам
        additionalData: `@import "@/styles/variables.scss";`,
    },
  },
},*/

  // Определение глобальных констант и переменных окружения
  define: {
    // Пример: передаём все переменные окружения из process.env
    //'process.env': process.env,
  },

// Настройки для серверного рендеринга (SSR)
  ssr: {
    // Указываем зависимости, которые не нужно бандлить в SSR (например, если некоторые модули должны оставаться внешними)
    noExternal: ['react-router-dom'],
  },
});