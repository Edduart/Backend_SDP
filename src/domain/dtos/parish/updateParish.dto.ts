

export class UpdateParishDto {
  private constructor(
    public readonly id: number,
    public readonly diocese_id: number,
    public readonly name: string,
    public readonly patron: string
  ) {}

  get values() {
    const returnObj: { [key: string]: any } = {};
    if (this.diocese_id) returnObj.diocese_id = this.diocese_id;
    if (this.name) returnObj.name = this.name;
    if (this.patron) returnObj.patron = this.patron;

    return returnObj;
  }

  static update(props: { [key: string]: any }): [string?, UpdateParishDto?] {
    const { id, diocese_id,name,patron } = props;
    let errorarray: string[]= [];
    //validating it existance
    if (!id)errorarray.push("ID must be a valid number");
    if (!diocese_id )errorarray.push("Diocese_id is required");
    if (!patron) errorarray.push("Patron is required");

    //Validating data types
    if (isNaN(Number(diocese_id))) errorarray.push("Diocese_id must be a number")
    if (typeof name !== 'string') errorarray.push("Name only supports characters");
    if (typeof patron !== 'string') errorarray.push("Patron only supports characters");
    
    // Validating lenght
    if (name.length > 100) errorarray.push("Parish name  is too long");
    if (name.length < 5 && name) errorarray.push("Parish name is too short");
    if (patron.length > 100) errorarray.push("Patron name is too long");
    if (patron.length < 5 && patron) errorarray.push("Patron name is too short");
    
    if (errorarray.length > 0) {
      return [errorarray.join(", "), undefined];
  }
    //validate patron
    let name_u = name.toUpperCase();
    let patron_u = patron.toUpperCase();
    return [undefined, new UpdateParishDto(id ,diocese_id,name_u,patron_u)];
  }
}