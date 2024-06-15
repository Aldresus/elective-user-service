import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main(){
    await prisma.users.create({
      data : {
        last_name: "Smith",
        first_name: "John",
        email: "john.smith@example.com",
        postal_code: "12345",
        address: "123 Maple Street",
        city: "Springfield",
        birthday: "1985-07-14",
        phone: "555-123-4567",
        role: "CLIENT",
        password: "password123"
      },
    });
    await prisma.users.create({
      data : {
        last_name: "Johnson",
        first_name: "Emma",
        email: "emma.johnson@example.com",
        postal_code: "67890",
        address: "456 Oak Avenue",
        city: "Centerville",
        birthday: "1990-02-25",
        phone: "555-987-6543",
        role: "DEV",
        password: "passw0rd!"
      },
  });
  await prisma.users.create({
    data : {
      last_name: "Williams",
      first_name: "Olivia",
      email: "olivia.williams@example.com",
      postal_code: "11223",
      address: "789 Pine Road",
      city: "Smalltown",
      birthday: "1982-11-30",
      phone: "555-456-7890",
      role: "CLIENT",
      password: "Olivia$2024"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Brown",
      first_name: "Liam",
      email: "liam.brown@example.com",
      postal_code: "33445",
      address: "101 Cedar Boulevard",
      city: "Bigtown",
      birthday: "1978-03-15",
      phone: "555-321-9876",
      role: "CLIENT",
      password: "Secure*Pass1"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Jones",
      first_name: "Sophia",
      email: "sophia.jones@example.com",
      postal_code: "55667",
      address: "202 Birch Lane",
      city: "Middletown",
      birthday: "1995-08-22",
      phone: "555-654-3210",
      role: "COMMERCIAL",
      password: "Sophia!2024"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Garcia",
      first_name: "Mia",
      email: "mia.garcia@example.com",
      postal_code: "77889",
      address: "303 Elm Street",
      city: "Rivertown",
      birthday: "1987-06-18",
      phone: "555-789-0123",
      role: "RESTAURATEUR",
      password: "Mia@2024!"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Martinez",
      first_name: "Noah",
      email: "noah.martinez@example.com",
      postal_code: "99001",
      address: "404 Willow Way",
      city: "Seaside",
      birthday: "1992-01-05",
      phone: "555-012-3456",
      role: "DELIVERYMAN",
      password: "Noah#2024!"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Davis",
      first_name: "Ava",
      email: "ava.davis@example.com",
      postal_code: "22334",
      address: "505 Cherry Drive",
      city: "Hilltown",
      birthday: "1984-09-19",
      phone: "555-345-6789",
      role: "ADMIN",
      password: "Ava2024*"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Rodriguez",
      first_name: "Isabella",
      email: "isabella.rodriguez@example.com",
      postal_code: "55678",
      address: "606 Maple Court",
      city: "Lakeside",
      birthday: "1991-12-10",
      phone: "555-678-1234",
      role: "CLIENT",
      password: "IsaBella2024!"
    },
  });
  await prisma.users.create({
    data : {
      last_name: "Martinez",
      first_name: "Mason",
      email: "mason.martinez@example.com",
      postal_code: "33456",
      address: "707 Oak Circle",
      city: "Rivercity",
      birthday: "1989-05-30",
      phone: "555-901-2345",
      role: "TECHNICIAN",
      password: "Mason*2024!"
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