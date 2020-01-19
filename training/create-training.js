import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
    const data = JSON.parse(event.body);
    const params = {
        TableName: process.env.tableTraining,
        Item: {
            userId: event.requestContext.identity.cognitoIdentityId,
            trainingId: uuid.v1(),
            title: data.title,
            core_circuit: data.core_circuit,
            weight_circuit: data.weight_circuit,
            createdAt: Date.now()
        }
    };

    try {
        await dynamoDbLib.call("put", params);
        return success(params.Item);
    } catch (e) {
        return failure({ status: false });
    }
}
