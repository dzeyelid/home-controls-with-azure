/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an orchestrator function.
 * 
 * Before running this sample, please:
 * - create a Durable orchestration function
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your
 *   function app in Kudu
 */

import { AzureFunction, Context } from "@azure/functions"
import collectRemoData from "../core/CollectRemoData";
import CollectedRemoData from "../core/interfaces/remo/CollectedRemoData";

const activityFunction: AzureFunction = async function (context: Context): Promise<CollectedRemoData> {
    const previousData = context.bindings.previousData;
    const result: CollectedRemoData = await collectRemoData(previousData);
    if (Object.keys(result.updatedEvents).length) {
        context.bindings.outputEventHubMessage = JSON.stringify({
            "iothub-connection-device-id": 'remo',
            ...result.updatedEvents
        });
    }
    return result;
};

export default activityFunction;
