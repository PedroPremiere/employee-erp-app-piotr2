import { RoleFactory } from '@/db/factories/RoleFactory';
import { UserFactory } from '@/apps/User/factories/UserFactory';
import { ContractsFactory } from '@/db/factories/ContractsFactory';

function createUser() {
    const userData = UserFactory.generate();

    return UserFactory.save(userData);
}

function createContract(ownerId: string) {
    const userData = ContractsFactory.generate(ownerId);

    return ContractsFactory.save(userData);
}

function createRole(users: string[]) {
    const userData = RoleFactory.generate(users);

    return RoleFactory.save(userData, users);
}

async function main() {
    const user = await createUser();

    console.log(user);

    const contract = await createContract(user.id);

    console.log(contract);

    const role = await createRole([user.id]);
    console.log(role);
}

main();
