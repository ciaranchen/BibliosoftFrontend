class ApiServer {
    addr: string;
    port: number;
    constructor(addr: string, port?: number) {
        this.addr = addr;
        this.port = port? port : 80;
    }

    get_url(): string {
        return `https://${this.addr}:${this.port}`;
    }
}

export const apiServer = new ApiServer('localhost', 3000);