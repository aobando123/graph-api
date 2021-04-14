export default class NodeVertex {
  nameOfVertex: string;
  weight: number;
  constructor(theName: string, theWeight: number) {
    this.nameOfVertex = theName;
    this.weight = theWeight;
  }
}
