class BackendServer {
  private readonly port: number;
  constructor(private addr: string, port?: number, private prefix?: string) {
    this.port = port ? port : 80;
  }

  get_url(): string {
    const base_url = `http://${this.addr}:${this.port}`;
    return this.prefix ? base_url + `/${this.prefix}` : base_url;
  }
}

export const backendServer = new BackendServer('lms.boileryao.com', 8080);
