// Скрипт для генерации хешей паролей для тестовых пользователей
const bcrypt = require('bcryptjs');

const generateHash = async (password) => {
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  return hash;
};

const generateHashes = async () => {
  console.log('Генерация хешей паролей...\n');
  
  const passwords = {
    'admin123': await generateHash('admin123'),
    'user123': await generateHash('user123')
  };

  console.log('Пароли и их хеши:');
  console.log('==========================================');
  
  for (const [password, hash] of Object.entries(passwords)) {
    console.log(`\nПароль: ${password}`);
    console.log(`Хеш: ${hash}`);
  }

  console.log('\n==========================================');
  console.log('\nИспользуйте эти хеши в seed.sql');
};

generateHashes();
