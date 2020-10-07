import DTO from "./DTO";

interface ExampleUpdateInputDTO extends DTO {
  field1: string,
  field2: number,
  field3: string,
  optField: string|undefined
}

export default ExampleUpdateInputDTO;
