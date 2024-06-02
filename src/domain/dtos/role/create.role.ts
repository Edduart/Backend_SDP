export class CreateRoleStruc{
    private constructor(
        public readonly name: string,
        public readonly description: string |null,
        public readonly numbers: number[]
    ){}

    static Create(props: {[key: string]: any} ): [string?, CreateRoleStruc?] {
        const { name, description, numbers } = props;

        if ( !name ) return ['Name property is required', undefined];


        return [undefined, new CreateRoleStruc(name, description, numbers)];
    }

}