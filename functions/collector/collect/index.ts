import { AzureFunction } from "@azure/functions"
import axios from "axios"
import EventHubBindingContext from "../core/interfaces/eventHubBindingContext"
import Device from "../core/interfaces/remo/device"

const timerTrigger: AzureFunction = async function (context: EventHubBindingContext, myTimer: any): Promise<void> {
    var timeStamp = new Date().toISOString();
    
    if (myTimer.IsPastDue)
    {
        context.log('Timer function is running late!');
    }
    context.log('Timer trigger function ran!', timeStamp);

    const url = 'https://api.nature.global/1/devices';
    const apiKey = process.env.API_KEY || '';
    const response = await axios.get(url, {
        headers: {
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    const data: Device[] = response.data;
    context.bindings.outputEventHubMessage = JSON.stringify({
        "iothub-connection-device-id": 'remo',
        ...data[0].newest_events
    });
};

export default timerTrigger;
