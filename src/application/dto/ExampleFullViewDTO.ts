import DTO from "./DTO";

interface ExampleFullViewDTO extends DTO {
  id: string,
  field1: string,
  field2: number,
  field3: string,
  inmutableField: string,
  optField: string|undefined
  createdAt: Date,
  updatedAt: Date
}

export default ExampleFullViewDTO;

