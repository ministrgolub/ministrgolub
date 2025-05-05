const { Plugin } = require('powercord/entities');

module.exports = class AutoStatusChanger extends Plugin {
    startPlugin() {
        this.statuses = [
            "Привет, tretiyizdvuh.aic"
            "tretiyizdvuh.aic- Здравия желаю, пользователь"
            "Получить доступ к файлам 715",
            "Получение доступа к файлам 715...",
            "...",
            "Неудача, повторите попытку позже...",
            "...",
            "....",
            ".....",
            "Ещё одна попытка разблокирована...",
            "...",
            // Добавьте свои статусы
        ];
        this.index = 0;

        this.changeStatus();
        setInterval(() => this.changeStatus(), 10000); // Каждые 10 секунд
    }

    changeStatus() {
        const status = this.statuses[this.index];
        this.index = (this.index + 1) % this.statuses.length;

        // Изменение статуса через API Discord
        const { getCurrentUser } = require('discord-webhooks');
        const user = getCurrentUser();
        
        if (user) {
            user.setActivity(status);
        }
    }

    pluginWillUnload() {
        clearInterval(this.interval);
    }
};