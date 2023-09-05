const { QueueClient } = require("@azure/storage-queue");
const { DefaultAzureCredential } = require('@azure/identity');
const { v1: uuidv1 } = require("uuid");

async function main() {
    console.log("Azure Queue Storage client library - JavaScript quickstart sample");

    // Create a unique name for the queue
    const queueName = "marcosgodinho";

    // Instantiate a QueueClient which will be used to create and interact with a queue
    // TODO: replace <storage-account-name> with the actual name
    const queueClient = new QueueClient(`https://waltercoan.queue.core.windows.net/${queueName}`, new DefaultAzureCredential());

    console.log("\t", queueName);

    const messages = await queueClient.receiveMessages({ numberOfMessages : 5 });
    
    for (i = 0; i < messages.receivedMessageItems.length; i++) {
        console.log("\t", encodeBase64ToJson(messages.receivedMessageItems[i].messageText));

        const deleteMessageResponse = await queueClient.deleteMessage(
            messages.receivedMessageItems[i].messageId,
            messages.receivedMessageItems[i].popReceipt
        );
    }
}

function jsonToBase64(jsonObj) {
    const jsonString = JSON.stringify(jsonObj)
    return  Buffer.from(jsonString).toString('base64')
}
function encodeBase64ToJson(base64String) {
    const jsonString = Buffer.from(base64String,'base64').toString()
    return JSON.parse(jsonString)
}

main().then(() => console.log("\nDone")).catch((ex) => console.log(ex.message));