class ApiServer {
    constructor(private addr: string, private port?: number, public prefix?: string) {
        this.port = port ? port : 80;
    }

    get_url(): string {
        const base_url = `http://${this.addr}:${this.port}`;
        return this.prefix ? base_url + `/${this.prefix}` : base_url;
    }
}

export const apiServer = new ApiServer('lms.boileryao.com', 8080);
