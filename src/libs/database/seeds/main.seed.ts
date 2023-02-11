import { runSeeders, Seeder } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { UserSeed } from './user.seed';
export class MainSeeder implements Seeder {
  async run(dataSource: DataSource) {
    await runSeeders(dataSource, { seeds: [UserSeed] });
  }
}
