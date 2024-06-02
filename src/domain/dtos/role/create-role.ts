export class CreateRole_Struc{
    private constructor(
        public readonly name: string,
        public readonly description: string |null,
        public readonly numbers: number[]
    ){}

    static Create(props: {[key: string]: any} ): [string?, CreateRole_Struc?] {
        const { name, description, numbers } = props;

        if ( !name ) return ['Name property is required', undefined];


        return [undefined, new CreateRole_Struc(name, description, numbers)];
    }

}