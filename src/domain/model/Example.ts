import ExampleFullViewDTO from "../../application/dto/ExampleFullViewDTO";

class Example {

  private readonly _id: string;
  private _field1: string;
  private _field2: number;
  private _field3: string;
  private _inmutableField: string;
  private _optField: string;
  private readonly _createdAt: Date;
  private readonly _updatedAt: Date;

  private constructor(id: string, field1: string, field2: number, field3: string, inmutableField: string, optField = 'optionalWithValue', createdAt: Date = new Date(), updatedAt: Date = new Date()) {
    this._id = id;
    this._field1 = field1;
    this._field2 = field2;
    this._field3 = field3;
    this._inmutableField = inmutableField;
    this._optField = optField;
    this._createdAt = createdAt;
    this._updatedAt = updatedAt;
  }

  static fromJSON(data: any): Example {
    return new Example(
      data._id,
      data.field1,
      data.field2,
      data.field3,
      data.inmutableField,
      data.optField,
      data.createdAt,
      data.updatedAt
    );
  }

  toJSON(): ExampleFullViewDTO {
    return {
      id: this.id,
      field1: this.field1,
      field2: this.field2,
      field3: this.field3,
      inmutableField: this.inmutableField,
      optField: this.optField,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt,
    }
  }

  get id(): string {
    return this._id;
  }

  get field1(): string {
    return this._field1;
  }

  get field2(): number {
    return this._field2;
  }

  get field3(): string {
    return this._field3;
  }

  get inmutableField(): string {
    return this._inmutableField;
  }

  get optField(): string {
    return this._optField;
  }

  get createdAt(): Date {
    return this._createdAt;
  }

  get updatedAt(): Date {
    return this._updatedAt;
  }

  set field1(value: string) {
    this._field1 = value;
  }

  set field2(value: number) {
    this._field2 = value;
  }

  set field3(value: string) {
    this._field3 = value;
  }

  set optField(value: string) {
    this._optField = value;
  }
}

export default Example;
