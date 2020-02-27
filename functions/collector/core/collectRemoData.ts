import axios from 'axios'
import * as moment from 'moment'
import Device from './interfaces/remo/Device'
import CollectedRemoData from './interfaces/remo/CollectedRemoData'
import SensorData from './interfaces/remo/SensorData'

const collectRemoData = async function (previousData: CollectedRemoData | null): Promise<CollectedRemoData> {
    const url = process.env.API_ENDPOINT || '';
    const apiKey = process.env.API_KEY || '';

    let remoData: Device;
    let updatedEvents = {};
    try {
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });
        remoData = response.data[0];
        const event = response.data[0].newest_events;
        Object.keys(event).forEach(key => {
            const sensorData: SensorData = event[key];
            if (!previousData) {
                updatedEvents = remoData.newest_events;
            } else {
                const updatedAt = moment(sensorData.created_at);
                const previousUpdatedAt = moment(previousData.device.newest_events[key].created_at);
                if (updatedAt.diff(previousUpdatedAt)) {
                    updatedEvents[key] = sensorData;
                }
            }
        });
    } catch (error) {
        throw error;
    }

    const data: CollectedRemoData = {
        updatedEvents,
        device: remoData,
    };
    return data;
}

export default collectRemoData;