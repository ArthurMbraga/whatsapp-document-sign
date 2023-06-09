import "dotenv/config";
import { ChatId, Client, create } from "@open-wa/wa-automate";
import { openWaConfig } from "./config/openWaConfig";
import { signDocument } from "./signDocument";
import { writeDocument } from "./writeDocument";

const { PATH_TO_SIGNED_PDF_FILE, GROUP_ID } = process.env;

function start(client: Client) {
  client.sendText(GROUP_ID as ChatId, "✅ Operacional");

  client.onMessage(async (message) => {
    if (message.isGroupMsg && message.chatId.toString() === GROUP_ID) {
      try {
        const messageText = message.body;
        const firstLine = messageText.split("\n")?.[0];
        const name = firstLine.split("Nome:")?.[1]?.trim();

        if (name) {
          await client.sendText(
            message.from,
            `✅ Gerando documento para: ${name}...`
          );
          await writeDocument(message.body);
          await signDocument();

          client.sendFile(
            message.chatId,
            PATH_TO_SIGNED_PDF_FILE,
            `${name}.pdf`,
            ""
          );
        } else {
          await client.sendText(
            message.from,
            "❌ Comando desconhecido comece a mensagem assim: \n\n Nome: Fulano Ciclano \n\n receita..."
          );
        }
      } catch (error: any) {
        console.error(error);
        await client.sendText(message.from, "❌ Algo deu errado:");
        await client.sendText(message.from, error);
      }
    }
  });
}

create(openWaConfig).then((client) => start(client));
