import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.users.create({
    data: {
      last_name: 'Smith',
      first_name: 'John',
      email: 'john.smith@example.com',
      birthday: '1985-07-14',
      phone: '555-123-4567',
      role: 'CLIENT',
      password:
        '3f6617d3c7acd08787b056ec9ccc7c3056e12b3b36770cbe5aa87f34c0541741', // password123
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Johnson',
      first_name: 'Emma',
      email: 'emma.johnson@example.com',
      birthday: '1990-02-25',
      phone: '555-987-6543',
      role: 'DEV',
      password:
        '588253cdc0e66cf98666edcdebe59661230d4234d667046047c58fcf8c3c6a94', // passw0rd!
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Williams',
      first_name: 'Olivia',
      email: 'olivia.williams@example.com',
      birthday: '1982-11-30',
      phone: '555-456-7890',
      role: 'CLIENT',
      password:
        'b4322f177982afb4169ac8567a3a6422ee11684b8b1cdb8c82d42c4b1a9afa1c', // Olivia$2024
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Brown',
      first_name: 'Liam',
      email: 'liam.brown@example.com',
      birthday: '1978-03-15',
      phone: '555-321-9876',
      role: 'CLIENT',
      password:
        '3c3dae35a4c37ea5079d2a0cf6e6f46dab638755a846729671f055aa9c347a23', // Secure*Pass1
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Jones',
      first_name: 'Sophia',
      email: 'sophia.jones@example.com',
      birthday: '1995-08-22',
      phone: '555-654-3210',
      role: 'COMMERCIAL',
      password:
        '264b823995ebacd70ccc6172b2f16c5580920a797a2884194e8834dd98389952', // Sophia!2024
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Garcia',
      first_name: 'Mia',
      email: 'mia.garcia@example.com',
      birthday: '1987-06-18',
      phone: '555-789-0123',
      role: 'RESTAURATEUR',
      password:
        '3e3306ef0d388d358aacccd3e95915d4b5b8ae3d58c2873b732cb1ef545f037c', // Mia@2024!
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Martinez',
      first_name: 'Noah',
      email: 'noah.martinez@example.com',
      birthday: '1992-01-05',
      phone: '555-012-3456',
      role: 'DELIVERYMAN',
      password:
        'b89426bce67d6b582fc2300b3ae3b6e088ce20828109ec9082890a5e41c66ac1', // Noah#2024!
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Davis',
      first_name: 'Ava',
      email: 'ava.davis@example.com',
      birthday: '1984-09-19',
      phone: '555-345-6789',
      role: 'ADMIN',
      password:
        'a3bef5c78c320dcc8cb95ad19713b2669b612320caf884246079292083750ea7', // Ava2024*
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Rodriguez',
      first_name: 'Isabella',
      email: 'isabella.rodriguez@example.com',
      birthday: '1991-12-10',
      phone: '555-678-1234',
      role: 'CLIENT',
      password:
        '30469df77646dfdd03e6830c98472872a9d4bfaa3861b58bfa9326710cd5838e', // IsaBella2024!
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Martinez',
      first_name: 'Mason',
      email: 'mason.martinez@example.com',
      birthday: '1989-05-30',
      phone: '555-901-2345',
      role: 'TECHNICIAN',
      password:
        '0ff837e23123bb15720c42bbcbd7e946061140b91a2add50a8870b82686344e8', // Mason*2024!
    },
  });
  await prisma.users.create({
    data: {
      last_name: 'Jordan',
      first_name: 'Nathan',
      email: 'nathan.jordan@example.com',
      birthday: '1990-01-15',
      phone: '555-123-4567',
      role: 'RESTAURATEUR',
      password:
        'b5151dcd079ab2910a7d358a6011b3c5e9e99139cf4289c184f68f455cc3883d', // John@2024!
    },
  });

  await prisma.users.create({
    data: {
      last_name: 'Louis',
      first_name: 'Nathan',
      email: 'nathan.jordan@example.com',
      birthday: '1990-01-15',
      phone: '555-123-4567',
      role: 'COMMERCIAL',
      password:
        'b5151dcd079ab2910a7d358a6011b3c5e9e99139cf4289c184f68f455cc3883d', // John@2024!
    },
  });
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
