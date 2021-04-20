export default class GraphPath {
  path: string[];
  totalWeigth: string;
  constructor(path: string[], weigth: string) {
    this.totalWeigth = weigth;
    this.path = path;
  }
}
