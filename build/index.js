import "dotenv/config";
import { create } from "@open-wa/wa-automate";
import { openWaConfig } from "./config/openWaConfig";
import { signAndWriteDocument } from "./signAndWriteDocument";
import { writeDocument } from "./writeDocument";
const { PATH_TO_SIGNED_PDF_FILE, GROUP_ID } = process.env;
create(openWaConfig).then((client) => start(client));
function start(client) {
    client.sendText(GROUP_ID, "✅ Operacional");
    client.onMessage(async (message) => {
        if (message.isGroupMsg && message.chatId.toString() === GROUP_ID) {
            try {
                const messageText = message.body;
                const firstLine = messageText.split("\n")?.[0];
                const name = firstLine.split("Nome:")?.[1]?.trim();
                if (name) {
                    await client.sendText(message.from, `✅ Gerando documento para: ${name}...`);
                    await writeDocument(message.body);
                    await signAndWriteDocument();
                    client.sendFile(message.chatId, PATH_TO_SIGNED_PDF_FILE, `${name}.pdf`, "");
                }
                else {
                    await client.sendText(message.from, "❌ Comando desconhecido comece a mensagem assim: \n\n Nome: Fulano Ciclano \n\n receita...");
                }
            }
            catch (error) {
                console.error(error);
                await client.sendText(message.from, "❌ Algo deu errado:");
                await client.sendText(message.from, error);
            }
        }
    });
}
