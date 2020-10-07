import View from "./View";
import Example from "../../domain/model/Example";
import ExampleFullViewDTO from "../dto/ExampleFullViewDTO";

class ExampleFullView extends View {
  private readonly _example: Example;

  constructor(example: Example) {
    super();

    this._example = example;
  }

  generate(): Promise<ExampleFullViewDTO> {
    return Promise.resolve({
      id: this._example.id,
      field1: this._example.field1,
      field2: this._example.field2,
      field3: this._example.field3,
      inmutableField: this._example.inmutableField,
      optField: this._example.optField,
      createdAt: this._example.createdAt,
      updatedAt: this._example.updatedAt,
    });
  }

  get entities(): [Example] {
    return [
      this._example
    ];
  }
}

export default ExampleFullView;
