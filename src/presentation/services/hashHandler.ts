
import { compareSync, hashSync } from "bcrypt";
const saltRounds = 10;
//se llama esta funcion para encriptar la contraseña
//envia unicamente el string de la contraseña
export async function encode(PassToEncode: string): Promise<string> {
  try {
    const hash = await hashSync(PassToEncode, saltRounds);
    return hash;
  } catch (error: unknown) {
    throw error;
  }
}

//compara las contraseñas
//primero va la contraseña ingresada en plano
//luego va la contraseña encriptada desde la base de datos
export async function compare(
  PassToCompare: string,
  hashTocompare: string
): Promise<boolean> {
  try {
    const result = compareSync(PassToCompare, hashTocompare);
    return result;
  } catch (error: unknown) {
    throw error;
  }
}
