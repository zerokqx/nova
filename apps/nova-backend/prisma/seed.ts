import { PrismaClient } from '../src/generated/prisma/client';

const prisma = new PrismaClient();

async function seed() {
  await prisma.sources.createMany({
    data: [{ name: 'perplexity' }, { name: 'gemini' }],
  });

  const perplexitySource = await prisma.sources.findFirst({
    where: { name: 'perplexity' },
  });
  const geminiSource = await prisma.sources.findFirst({
    where: { name: 'gemini' },
  });

  await prisma.models.createMany({
    data: [
      { name: 'sonar-pro', source_id: perplexitySource!.id },
      { name: 'llama-3.1-sonar-large', source_id: perplexitySource!.id },
      { name: 'gemini-2.0-flash', source_id: geminiSource!.id },
      { name: 'gemini-2.0-flash-exp', source_id: geminiSource!.id },
    ],
  });

  // 4. Создаём ключи API (опционально)
  await prisma.keys.createMany({
    data: [
      {
        source_id: perplexitySource!.id,
        api_key: process.env.PERPLEXITY_API_KEY || 'test-key-123',
        is_active: true,
      },
      {
        source_id: geminiSource!.id,
        api_key: process.env.GEMINI_API_KEY || 'test-key-456',
        is_active: true,
      },
    ],
  });

  console.log('✅ Seed завершён: sources, models, keys созданы');
}

seed()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
