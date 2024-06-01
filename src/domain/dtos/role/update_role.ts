export class UpdateRole{
    constructor(public readonly id: number,
        public readonly name: string,
        public readonly description: string |null,)
    {}
    get values(){
        const returnObj: {[key: string]: any} = {};
        if(this.name) returnObj.name = this.name;
        if(this.description) returnObj.description = this.description;
        return returnObj
    }
static create(props: {[key:string]: any} ): [string?, UpdateRole?]{
    const {id, name, description} = props;
    if(!id || isNaN( Number(id))){
        return ['id must be a number > 0 and integer'];
    }

    if(name == ''){
        return [ 'Name is requered' ];
    }


    return [undefined, new UpdateRole(id, name, description)]
}
    
}