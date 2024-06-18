export class ParishEntity {

    constructor (
        public id: number,
        public diocese_id: number,
        public name: string,
        public patron: string
    ){}

    public static fromObject( object: {[key: string]: any} ): ParishEntity {
    const { id,diocese_id,name, patron } = object;
    if (!id) throw 'Id is required';
    if (!diocese_id) throw 'Diocese_id is required';
    if (!name) throw 'text is required';
    if (!patron) throw "patron is required";

    return new ParishEntity(id,diocese_id, name, patron);
  }
}

