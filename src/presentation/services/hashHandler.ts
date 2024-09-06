import { compareSync, hashSync } from "bcrypt";
const saltRounds = 10;

export async function encode(PassToEncode: string): Promise<string> {
  try {
    const hash = await hashSync(PassToEncode, saltRounds);
    return hash;
  } catch (error: unknown) {
    throw error;
  }
}

export async function compare(
  PassToCompare: string,
  hashToCompare: string
): Promise<boolean> {
  try {
    const result = compareSync(PassToCompare, hashToCompare);
    return result;
  } catch (error: unknown) {
    throw error;
  }
}