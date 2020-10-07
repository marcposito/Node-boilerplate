import InfrastructureException from "./InfrastructureException";

export default class WrappedException extends InfrastructureException{

  protected _className: string;
  protected _method: string;

  constructor(className: string, method: string, previous: Error) {
    super('', 'WrappedException', previous);

    this._className = className;
    this._method = method;
  }

  get message(): string {
    return `${this._className}@${this._method} error: ${JSON.stringify(this._previous)}`;
  }
}
