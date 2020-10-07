import View from "./View";
import Example from "../../domain/model/Example";
import ExampleShortViewDTO from "../dto/ExampleShortViewDTO";

class ExampleShortView extends View {
  private readonly _example: Example;

  constructor(example: Example) {
    super();

    this._example = example;
  }

  generate(): Promise<ExampleShortViewDTO> {
    return Promise.resolve({
      id: this._example.id,
      field1: this._example.field1,
      field2: this._example.field2,
      field3: this._example.field3,
    });
  }

  get entities(): [Example] {
    return [
      this._example
    ];
  }
}

export default ExampleShortView;
