export const environment = {
  production: true,
  api: {
    protocol: 'http',
    host: '192.168.99.100:8080',
    get url(){
      return `${this.protocol}://${this.host}/api`;
    }
  }
};
