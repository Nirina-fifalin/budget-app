import prisma from '../config/database';
import bcrypt from 'bcryptjs';

async function seed() {
  try {
    console.log('🌱 Démarrage du seed...');

    console.log('🧹 Nettoyage de la base de données...');
    await prisma.transaction.deleteMany();
    await prisma.category.deleteMany();
    await prisma.budget.deleteMany();
    await prisma.user.deleteMany();

    console.log('👤 Création de l\'utilisateur...');
    const hashedPassword = await bcrypt.hash('password123', 10);
    const user = await prisma.user.create({
      data: {
        email: 'demo@example.com',
        password: hashedPassword,
        name: 'Utilisateur Demo',
      },
    });
    console.log('✅ Utilisateur créé:', user.email);

    console.log('💰 Création des catégories de revenus...');
    const salaireCategory = await prisma.category.create({
      data: {
        name: 'Salaire',
        type: 'income',
        icon: '💰',
        color: '#22c55e',
        userId: user.id,
      },
    });

    const freelanceCategory = await prisma.category.create({
      data: {
        name: 'Freelance',
        type: 'income',
        icon: '💼',
        color: '#10b981',
        userId: user.id,
      },
    });

    const investissementCategory = await prisma.category.create({
      data: {
        name: 'Investissement',
        type: 'income',
        icon: '📈',
        color: '#059669',
        userId: user.id,
      },
    });

    console.log('💸 Création des catégories de dépenses...');
    const alimentationCategory = await prisma.category.create({
      data: {
        name: 'Alimentation',
        type: 'expense',
        icon: '🍔',
        color: '#ef4444',
        userId: user.id,
      },
    });

    const transportCategory = await prisma.category.create({
      data: {
        name: 'Transport',
        type: 'expense',
        icon: '🚗',
        color: '#f59e0b',
        userId: user.id,
      },
    });

    const logementCategory = await prisma.category.create({
      data: {
        name: 'Logement',
        type: 'expense',
        icon: '🏠',
        color: '#8b5cf6',
        userId: user.id,
      },
    });

    const loisirsCategory = await prisma.category.create({
      data: {
        name: 'Loisirs',
        type: 'expense',
        icon: '🎮',
        color: '#ec4899',
        userId: user.id,
      },
    });

    const santeCategory = await prisma.category.create({
      data: {
        name: 'Santé',
        type: 'expense',
        icon: '💊',
        color: '#3b82f6',
        userId: user.id,
      },
    });

    console.log('✅ 8 catégories créées');

    console.log('📝 Création des transactions...');
    const today = new Date();

    await prisma.transaction.create({
      data: {
        amount: 3500,
        description: 'Salaire mensuel décembre',
        type: 'income',
        date: new Date(2024, 11, 1),
        categoryId: salaireCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 800,
        description: 'Mission freelance développement web',
        type: 'income',
        date: new Date(2024, 11, 15),
        categoryId: freelanceCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 150,
        description: 'Dividendes actions',
        type: 'income',
        date: new Date(2024, 11, 10),
        categoryId: investissementCategory.id,
        userId: user.id,
      },
    });

    // Dépenses
    await prisma.transaction.create({
      data: {
        amount: 450,
        description: 'Courses au supermarché',
        type: 'expense',
        date: new Date(2024, 11, 5),
        categoryId: alimentationCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 85,
        description: 'Plein d\'essence',
        type: 'expense',
        date: new Date(2024, 11, 7),
        categoryId: transportCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 900,
        description: 'Loyer mensuel',
        type: 'expense',
        date: new Date(2024, 11, 1),
        categoryId: logementCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 200,
        description: 'Électricité + eau',
        type: 'expense',
        date: new Date(2024, 11, 3),
        categoryId: logementCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 120,
        description: 'Cinéma et restaurant',
        type: 'expense',
        date: new Date(2024, 11, 10),
        categoryId: loisirsCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 60,
        description: 'Pharmacie',
        type: 'expense',
        date: new Date(2024, 11, 8),
        categoryId: santeCategory.id,
        userId: user.id,
      },
    });

    await prisma.transaction.create({
      data: {
        amount: 75,
        description: 'Abonnement bus mensuel',
        type: 'expense',
        date: new Date(2024, 11, 2),
        categoryId: transportCategory.id,
        userId: user.id,
      },
    });

    console.log('✅ 10 transactions créées');

    console.log('💼 Création du budget...');
    const startOfMonth = new Date(2024, 11, 1);
    const endOfMonth = new Date(2024, 11, 31);

    await prisma.budget.create({
      data: {
        name: 'Budget décembre 2024',
        amount: 2000,
        period: 'monthly',
        startDate: startOfMonth,
        endDate: endOfMonth,
        userId: user.id,
      },
    });

    console.log('✅ Budget créé');

    const totalTransactions = await prisma.transaction.count();
    const totalCategories = await prisma.category.count();
    const totalBudgets = await prisma.budget.count();

    console.log('\n🎉 Seed terminé avec succès !');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('📊 Résumé :');
    console.log(`   👤 Utilisateurs : 1`);
    console.log(`   📂 Catégories : ${totalCategories}`);
    console.log(`   💳 Transactions : ${totalTransactions}`);
    console.log(`   💼 Budgets : ${totalBudgets}`);
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━');
    console.log('\n🔐 Identifiants de connexion :');
    console.log('   📧 Email    : demo@example.com');
    console.log('   🔑 Password : password123');
    console.log('━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n');

  } catch (error) {
    console.error('Erreur pendant le seed:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

seed()
  .then(() => {
    console.log('Déconnexion de Prisma');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Erreur fatale:', error);
    process.exit(1);
  });