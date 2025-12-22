import { PrismaClient } from '../src/generated/prisma/client.ts';
import { nanoid } from 'nanoid';

const prisma = new PrismaClient();

async function main() {
  const providers = ['perplexity', 'openai', 'anthropic'];

  const chats = Array.from({ length: 150 }).map((_, i) => ({
    id: nanoid(), // String @id
    title: `Seed chat #${i + 1}`, // String @default(nanoid()) — можно переопределить
    provider: providers[i % providers.length],
  }));

  await prisma.chat.createMany({
    data: chats,
    skipDuplicates: true,
  });

  console.log(`✅ Создано ${chats.length} чатов`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
