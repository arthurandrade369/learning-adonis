export default class View {
  public body: any;
  public statusCode: number|null;
  public headers: Array<string>;
  public format: string;

  constructor (body: any, headers: Array<any> = []) {
    this.body = body;
    this.headers = headers;
    this.format = 'json';
  }

  public getContentType() {
    switch (this.format) {
      case 'json':
        return 'application/json';
        break;
      case 'xml':
        return 'application/xml';
        break;
      default:
        return 'plain/text';
        break;
    }
  }
}
