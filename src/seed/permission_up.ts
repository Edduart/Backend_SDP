import { prisma } from "../data/postgres";
import { permissions } from "./data/permission";
async function main() {
    for (let item of permissions) {
        await prisma.permission.create({
            data: item
        });
    }
    console.log('Seeding completed');
}

main()//llamar al may y agarra cualquier error
    .catch(e => {
        throw e
    })

