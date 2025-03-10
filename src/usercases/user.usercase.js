import { UserRepository } from "../domain/repositories/user.repository.js";

const userRepository = new UserRepository();

export async function getUserByIdUseCase(id) {
    return await userRepository.getUserById(id);
}

export async function updateUserUseCase(id, userData) {
    return await userRepository.updateUser(id, userData);
}
