//this in case i'll need to use
export class CreateParishDto {
  private constructor(
    //public readonly id: number,
    public readonly diocese_id: number, //tengo dudas sobre este dato del mer ya que es de la relacion y no entiendo aun esa parte xd
    public readonly name: string,
    public readonly patron: string
  ) {}

  static create(props: { [key: string]: any }): [string?, CreateParishDto?] {
    const { diocese_id, name, patron } = props;
    let errorarray: string[]= [];
    
    //validating it existance
    if (!diocese_id) errorarray.push("diocese_id is required");
    if (!name) errorarray.push ("Name is required");
    if (!patron) errorarray.push("Patron is required");

     //Validating data types
    if (isNaN(Number(diocese_id))) errorarray.push("Diocese_id must be a number")
    if (typeof name !== 'string') errorarray.push("Name only supports characters");
    if (typeof patron !== 'string') errorarray.push("Patron only supports characters");

    // Validating Lenght
    if (name.length > 100) errorarray.push("Parish name  is too long");
    if (name.length < 5 && name) errorarray.push("Parish name is too short");
    if (patron.length > 100) errorarray.push("Patron name is too long");
    if (patron.length < 5 && patron) errorarray.push("Patron name is too short");
    if (errorarray.length > 0) {
      return [errorarray.join(", "), undefined];
  }
    return [undefined, new CreateParishDto( diocese_id ,name, patron)];
  }
}

