
export class dioceseEntity {

    constructor (
        public id: number,
        public name: string,
        public holder: string
    ){}

    public static fromObject( object: {[key: string]: any} ): dioceseEntity {
    const { id, name, holder } = object;
    if (!id) throw 'Id is required';
    if (!name) throw 'text is required';
    if (!holder) throw "text is required";

    return new dioceseEntity(id, name, holder);
  }
}

