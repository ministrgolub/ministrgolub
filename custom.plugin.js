/**
 * @name MyOwnPlugin
 * @version 0.2
 * @description Автоматически меняет кастомный статус
 * @author ministrgolub
 * @updateUrl https://raw.githubusercontent.com/ministrgolub/ministrgolub/main/custom.plugin.js
 * @source https://github.com/ministrgolub/ministrgolub
 * @require https://github.com/rauenzi/BDPluginLibrary/blob/master/release/0PluginLibrary.plugin.js
 */

const config = {
    info: {
        name: "MyOwnPlugin",
        authors: [{name: "ministrgolub"}],
        version: "0.2",
        description: "Автоматически меняет кастомный статус",
        github: "https://github.com/ministrgolub/ministrgolub",
        github_raw: "https://raw.githubusercontent.com/ministrgolub/ministrgolub/main/custom.plugin.js"
    }
};

module.exports = !global.ZeresPluginLibrary ? class {
    constructor() { this._config = config; }
    getName() { return config.info.name; }
    getAuthor() { return config.info.authors.map(a => a.name).join(", "); }
    getDescription() { return config.info.description; }
    getVersion() { return config.info.version; }
    load() {
        BdApi.showConfirmationModal("Библиотека не найдена", [
            "Этот плагин требует ZeresPluginLibrary.",
            "Нажмите OK, чтобы открыть страницу загрузки."
        ], {
            confirmText: "OK",
            cancelText: "Отмена",
            onConfirm: () => BdApi.openLink("https://betterdiscord.app/Download?id=9")
        });
    }
    start() {}
    stop() {}
} : (([Plugin, Api]) => {
    const { WebpackModules, Toasts } = Api;
    return class MyOwnPlugin extends Plugin {
        start() {
            this.statuses = [
                "Привет, tretiyizdvuh.aic",
                "tretiyizdvuh.aic - Здравия желаю, пользователь",
                "Получить доступ к файлам 715",
                "tretiyizdvuh.aic - Получение доступа к файлам 715...",
                "....",
                "tretiyizdvuh.aic - Неудача, повторите попытку позже...",
                ".....",
                "tretiyizdvuh.aic - Ещё одна попытка разблокирована...",
                "..."
            ];
            this.index = 0;

            this.customStatusModule = WebpackModules.getByProps("updateCustomStatus");

            if (!this.customStatusModule) {
                Toasts.show("❌ Модуль кастомного статуса не найден", {type: "error"});
                return;
            }

            this.setStatus();
            this.interval = setInterval(() => this.setStatus(), 10000);
        }

        setStatus() {
            const status = this.statuses[this.index];
            this.index = (this.index + 1) % this.statuses.length;

            if (this.customStatusModule?.updateCustomStatus) {
                this.customStatusModule.updateCustomStatus({
                    text: status,
                    expires_at: null
                });
            }
        }

        stop() {
            clearInterval(this.interval);
            if (this.customStatusModule?.updateCustomStatus) {
                this.customStatusModule.updateCustomStatus(null);
            }
        }
    };
})(global.ZeresPluginLibrary.buildPlugin(config));
