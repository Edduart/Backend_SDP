import { compareSync, hashSync } from 'bcrypt';
const saltRounds = 10;
//se llama esta funcion para encriptar la contraseña
//envia unicamente el string de la contraseña
export function Encode(Pass_To_Encode: string):string{
    const hash = hashSync(Pass_To_Encode, saltRounds);
    return hash;
}
//compara las contraseñas
//primero va la contraseña ingresada en plano
//luego va la contraseña encriptada desde la base de datos
export function Compare(Pass_to_Compare: string, hash_to_compare: string): boolean{
    const result = compareSync(Pass_to_Compare, hash_to_compare);
    return result;
}