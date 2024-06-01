export class CreateRole{
    private constructor(
        public readonly name: string,
        public readonly description: string |null
    ){}

    static Create(props: {[key: string]: any} ): [string?, CreateRole?] {
        const { name, description } = props;

        if ( !name ) return ['Name property is required', undefined];


        return [undefined, new CreateRole(name, description)];
    }

}