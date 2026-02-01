// Импортируем встроенные модули Node.js для работы с файловой системой и путями
const fs = require('fs');
const path = require('path');

// --- НАСТРОЙКИ ---
const BASE_URL = 'https://pknpro5-ops.github.io'; // Ваш домен
const PAGES_DIR = path.resolve(__dirname); // Директория для сканирования (корень проекта)
const OUTPUT_DIR = path.resolve(__dirname, 'public'); // Куда сохранять sitemap
const SITEMAP_PATH = path.join(OUTPUT_DIR, 'sitemap.xml'); // Полный путь к файлу
// -----------------

// Функция для генерации карты сайта
function generateSitemap() {
  try {
    // Убедимся, что директория 'public' существует
    if (!fs.existsSync(OUTPUT_DIR)) {
      fs.mkdirSync(OUTPUT_DIR, { recursive: true });
    }

    // Сканируем директорию на наличие файлов
    const allFiles = fs.readdirSync(PAGES_DIR);

    // Фильтруем только .html файлы и исключаем страницы ошибок
    const pageFiles = allFiles.filter(file => {
      const extension = path.extname(file);
      const baseName = path.basename(file, extension);
      const errorPages = ['404', '500', 'notfound'];
      return extension === '.html' && !errorPages.includes(baseName);
    });
    
    // Получаем текущую дату в формате YYYY-MM-DD
    const today = new Date().toISOString().split('T')[0];

    const urls = pageFiles.map(file => {
      const pageName = path.basename(file, '.html');
      
      // index.html должен вести на корень сайта
      const urlPath = (pageName === 'index') ? '/' : `/${file}`;
      const loc = `${BASE_URL}${urlPath}`;

      // Определяем priority и changefreq по имени файла
      let priority = '0.8';
      let changefreq = 'monthly';

      if (pageName === 'index') {
        priority = '1.0';
        changefreq = 'weekly';
      } else if (['sro', 'prices', 'contacts', 'about'].includes(pageName)) {
        // Страницы с юридической информацией, ценами и контактами менее важны
        priority = '0.5';
      }

      return `
  <url>
    <loc>${loc}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${changefreq}</changefreq>
    <priority>${priority}</priority>
  </url>`;
    });

    // Собираем XML-структуру
    const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}
</urlset>`;

    // Записываем файл
    fs.writeFileSync(SITEMAP_PATH, sitemapXml.trim());

    console.log(`✅ Sitemap сгенерирован успешно: ${SITEMAP_PATH}`);

  } catch (error) {
    console.error('❌ Ошибка при генерации sitemap:', error);
  }
}

// Запускаем генерацию
generateSitemap();
