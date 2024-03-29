import { WebSocket } from 'ws';
import { EventEmitter } from 'events';
import { MessageDto } from './dto/Message.dto';

export declare interface DiscordClient {
    on(event: 'messageCreate', listener: (message: MessageDto) => void): this;
}

export class DiscordClient extends EventEmitter {
    private discordToken: string;
    private seq: number | null;
    private session_id: string | null;
    private ack: Array<number>;
    private ackTimer: NodeJS.Timer | undefined;
    private heartbeatTimer: NodeJS.Timer | undefined;
    private ws: WebSocket;

    constructor(discordToken: string) {
        super();
        this.discordToken = discordToken;
        this.seq = null;
        this.session_id = null;
        this.ack = [];
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');
    }

    public connect() {
        this.ws = new WebSocket('wss://gateway.discord.gg/?v=6&encoding=json');

        this.ws.on('error', event => {
            console.error(`WebSocket error: ${event}`);
        });

        this.ws.on('close', () => {
            if (this.heartbeatTimer) {
                clearInterval(this.heartbeatTimer);
            }

            if (this.ackTimer) {
                clearInterval(this.ackTimer);
            }

            this.seq = null;
            this.session_id = null;
            this.ack = [];

            setTimeout(this.connect, 5000);
        });

        this.ws.on('message', (data: string) => {
            const payload = JSON.parse(data);
            const { op, d, s, t } = payload;

            this.seq = s ? s : this.seq;

            if (op == 1) {
                this.heartbeat();
            } else if (op == 9) {
                    setTimeout(() => {
                        this.identify();
                    }, 3000);
            } else if (op == 10) {
                this.heartbeatTimer = setInterval(() => {
                    this.heartbeat();
                }, d.heartbeat_interval);

                if (this.session_id && this.seq) {
                    this.ws.send(JSON.stringify({
                        'op': 6,
                        'd': {
                            'token': this.discordToken,
                            'session_id': this.session_id,
                            'seq': this.seq
                        }
                    }));
                } else {
                    this.identify();
                }
            } else if (op == 11) {
                this.ack.shift();
            }

            switch (t) {
                case 'READY':
                    this.session_id = d.session_id;
                    break;
                case 'MESSAGE_CREATE':
                    this.emit('messageCreate', d as MessageDto);
                    break;
            }
        });
    }

    private heartbeat() {
        this.ws.send(JSON.stringify({
            'op': 1,
            'd': this.seq
        }));

        this.ack.push(new Date().getTime());

        if (!this.ackTimer) {
            this.ackTimer = setInterval(() => {
                if (this.ack.length > 0) {
                    if (new Date().getTime() - this.ack[0] > 5000) {
                        this.ws.close();
                    }
                }
            }, 5000)
        }
    }

    private identify() {
        this.ws.send(JSON.stringify({
            'op': 2,
            'd': {
                'token': this.discordToken,
                'properties': {
                    '$os': 'linux',
                    '$browser': 'chrome',
                    '$device': 'chrome'
                }
            }
        }));
    }
}