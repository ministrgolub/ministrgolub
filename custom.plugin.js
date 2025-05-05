/**
 * @name MyOwnPlugin
 * @version 0.1
 * @description Автоматически меняет кастомный статус
 * @author ministrgolub
 * @source https://github.com/ministrgolub/ministrgolub
 * @updateUrl https://github.com/ministrgolub/ministrgolub/blob/main/custom.plugin.js
 */

module.exports = class MyOwnPlugin {
    start() {
        this.statuses = [
            "Привет, tretiyizdvuh.aic",
            "tretiyizdvuh.aic - Здравия желаю, пользователь",
            "Получить доступ к файлам 715",
            "tretiyizdvuh.aic - Получение доступа к файлам 715...",
            "...",
            "tretiyizdvuh.aic - Неудача, повторите попытку позже...",
            "...",
            "....",
            ".....",
            "tretiyizdvuh.aic - Ещё одна попытка разблокирована...",
            "..."
        ];
        this.index = 0;
        this.setStatus();
        this.interval = setInterval(() => this.setStatus(), 10000); // Каждые 10 секунд
    }

    setStatus() {
        const status = this.statuses[this.index];
        this.index = (this.index + 1) % this.statuses.length;

        const { WebpackModules, DiscordModules } = BdApi;
        const UserStatusStore = WebpackModules.getByProps("updateCustomStatus");

        if (UserStatusStore) {
            UserStatusStore.updateCustomStatus({
                text: status,
                expires_at: null
            });
        }
    }

    stop() {
        clearInterval(this.interval);
        const { WebpackModules } = BdApi;
        const UserStatusStore = WebpackModules.getByProps("updateCustomStatus");

        if (UserStatusStore) {
            UserStatusStore.updateCustomStatus(null); // Сброс статуса при выгрузке
        }
    }
};
