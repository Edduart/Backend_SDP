export class UpdateRoleStruc{
    constructor(public readonly id: number,
        public readonly name: string,
        public readonly description: string |null,
        public readonly numbers: number[])
    {}
    get values(){
        const returnObj: {[key: string]: any} = {};
        if(this.name) returnObj.name = this.name;
        if(this.description) returnObj.description = this.description;
        return returnObj
    }
static Create(props: {[key:string]: any} ): [string?, UpdateRoleStruc?]{
    const { id, name, description, numbers } = props;
    if(!id || isNaN( Number(id))){
        return ['id must be a number > 0 and integer'];
    }

    if(name == ''){
        return [ 'Name is requered' ];
    }


    return [undefined, new UpdateRoleStruc(id, name, description, numbers)]
}
    
}