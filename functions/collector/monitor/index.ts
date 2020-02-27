/*
 * This function is not intended to be invoked directly. Instead it will be
 * triggered by an HTTP starter function.
 * 
 * Before running this sample, please:
 * - create a Durable activity function (default name is "Hello")
 * - create a Durable HTTP starter function
 * - run 'npm install durable-functions' from the wwwroot folder of your 
 *    function app in Kudu
 */

import * as df from "durable-functions"
import * as moment from 'moment'
import CollectedRemoData from "../core/interfaces/remo/CollectedRemoData";

const orchestrator = df.orchestrator(function* (context) {
    const input: CollectedRemoData = context.df.getInput() as CollectedRemoData || null;
    const data = yield context.df.callActivity('collect', input);

    const nextCheck = moment.utc(context.df.currentUtcDateTime).add(1, 'm');
    yield context.df.createTimer(nextCheck.toDate());

    yield context.df.continueAsNew(data);
});

export default orchestrator;
