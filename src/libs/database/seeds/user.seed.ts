import { DataSource } from 'typeorm';
import { Seeder } from 'typeorm-extension';
import { SeederFactoryManager } from 'typeorm-extension/dist/seeder';
import { User } from '../entity/user.entity';
import { hashSync } from 'bcrypt';
export class UserSeed implements Seeder {
  async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager,
  ): Promise<any> {
    const userRepository = dataSource.getRepository(User);
    const listPromise = [];
    for (let i = 1; i <= 100; i++) {
      const email = `test${i}@example.com`;
      const checkExistUser = await userRepository.findOne({ where: { email } });

      if (checkExistUser) {
        console.log(`user ${email} is existed `);
        continue;
      }
      const userData = {
        email,
        address: 'k co',
        firstName: `user${i}`,
        isActive: true,
        lastName: `user${i}`,
        roleId: 1,
        password: await hashSync('string', 10),
      };

      listPromise.push(userRepository.save(userData));
    }

    await Promise.all(listPromise);
  }
}
