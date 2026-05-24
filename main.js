const { Plugin } = require('obsidian');

module.exports = class AutoDeletePlugin extends Plugin {
    async onload() {
        console.log('Плагин Auto Delete загружен');

        // Подписываемся на событие изменения кэша метаданных (свойств)
        this.registerEvent(
            this.app.metadataCache.on('changed', async (file, data, cache) => {
                // Проверяем, что это markdown-файл и у него есть frontmatter (свойства)
                if (file && cache && cache.frontmatter) {
                    
                    // Если свойство "Удалить" установлено в true
                    if (cache.frontmatter['Удалить'] === true) {
                        try {
                            // Отправляем файл в корзину (true = системная корзина, false = корзина .trash внутри Obsidian)
                            await this.app.vault.trash(file, true);
                            console.log(`Файл ${file.name} автоматически удален.`);
                        } catch (err) {
                            console.error('Ошибка при удалении файла:', err);
                        }
                    }
                }
            })
        );
    }

    onunload() {
        console.log('Плагин Auto Delete выгружен');
    }
}
