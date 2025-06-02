import {INodeType, INodeTypeDescription, ITriggerFunctions, ITriggerResponse, NodeConnectionType,} from 'n8n-workflow';

import ReconnectingWebSocket from "reconnecting-websocket";

export class SignalTrigger implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'Signal CLI REST Trigger',
        name: 'signalCliRestApiTrigger',
        icon: 'file:signal-logo.svg',
        group: ['trigger'],
        version: 1,
        description: 'Triggers on incoming Signal messages via signal-cli-rest-api WebSocket',
        defaults: {
            name: 'Signal CLI REST Trigger',
        },
        inputs: [],
        outputs: [NodeConnectionType.Main],
        properties: [
            {
                displayName: 'WebSocket URL',
                name: 'wsUrl',
                type: 'string',
                default: 'ws://localhost:8080/v1/receive',
                placeholder: 'ws://localhost:8080/v1/receive',
                required: true,
                description: 'URL of the signal-cli-rest-api WebSocket endpoint',
            },
            {
                displayName: 'Phone Number',
                name: 'phoneNumber',
                type: 'string',
                default: '',
                placeholder: '+1234567890',
                required: true,
                description: 'Phone number for which messages should be received',
            },

        ],
    };

    async trigger(this: ITriggerFunctions): Promise<ITriggerResponse> {
        const wsBaseUrl = this.getNodeParameter('wsUrl') as string;
        const phoneNumber = this.getNodeParameter('phoneNumber') as string;
        const wsUrl = `${wsBaseUrl}/${phoneNumber}`;

        const ws = new ReconnectingWebSocket(wsUrl);

        ws.addEventListener('open', () => {
            this.logger.info('Opened WebSocket connection to ' + wsUrl);
        });

        ws.addEventListener('message', (messageEvent: MessageEvent) => {
            const dataString = messageEvent.data as string;
            const message = JSON.parse(dataString);
            this.logger.debug(`Received message: ${JSON.stringify(message)}`);

            const items = this.helpers.returnJsonArray([{
                message: message
            }])

            this.emit([items]);
        });

        const closeFunction = async () => {
            if (ws.readyState === WebSocket.OPEN) {
                ws.close();
                this.logger.info('Closed WebSocket connection to ' + wsUrl);
            }
        };

        return {
            closeFunction
        };
    }
}