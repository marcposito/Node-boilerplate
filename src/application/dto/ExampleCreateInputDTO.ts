import DTO from "./DTO";

interface ExampleCreateInputDTO extends DTO {
  field1: string,
  field2: number,
  field3: string,
  inmutableField: string,
  optField: string|undefined
}

export default ExampleCreateInputDTO;
