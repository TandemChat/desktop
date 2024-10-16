import { Client } from "discord-rpc";
import { getConfig } from "./config";

export var rpc: Client;

export async function connectRPC() {
    if (!getConfig().discordRPC) return;

    try {
        rpc = new Client({ transport: "ipc" });

        rpc.on("ready", () =>
            rpc.setActivity({
                state: "tandemchat.ru",
                details: "Общается с в Tandem",
                largeImageKey: "qr",
                largeImageText: "Связь это главное – используйте Tandem.",
                buttons: [
                    {
                        label: "Войти в Tandem",
                        url: "https://app.tandemchat.ru/",
                    },
                    { label: "Подробнее", url: "https://tandemchat.ru" },
                ],
            }),
        );

        // @ts-ignore
        rpc.on("disconnected", reconnect);

        rpc.login({ clientId: "1296081010064101457" });
    } catch (err) {
        reconnect();
    }
}

const reconnect = () => setTimeout(() => connectRPC(), 1e4);

export async function dropRPC() {
    rpc?.destroy();
}
