import DTO from "../dto/DTO";

abstract class View {
  abstract generate(): Promise<DTO>;
  abstract get entities(): Array<any>;
}

export default View;
