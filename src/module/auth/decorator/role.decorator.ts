import { SetMetadata } from '@nestjs/common';
import { ROLEID } from '../../../common/enum';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: ROLEID[]) => SetMetadata(ROLES_KEY, roles);
