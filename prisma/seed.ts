import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
    let johnSmith = await prisma.users.create({
        data : {
                last_name: "Smith",
                first_name: "John",
                email: "john.smith@example.com",
                postal_code: "12345",
                address: "123 Maple Street",
                city: "Springfield",
                birthday: "1985-07-14",
                phone: "555-123-4567",
                role: "Manager",
                password: "password123"
        },
    });
}


main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })