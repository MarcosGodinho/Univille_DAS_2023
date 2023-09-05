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

    console.log("\nCreating queue...");
    console.log("\t", queueName);
    
    // Create the queue
    //const createQueueResponse = await queueClient.create();
    //console.log("Queue created, requestId:", createQueueResponse.requestId);
    
    let pedido = {
        id: 1,
        produto: "Nintendo Switch",
        valor: "2200"
    }
    let pedido2 = {
        id: 2,
        produto: "Computador Gamer",
        valor: "1800"
    }

    await queueClient.sendMessage(jsonToBase64(pedido));
    await queueClient.sendMessage(jsonToBase64(pedido2));
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