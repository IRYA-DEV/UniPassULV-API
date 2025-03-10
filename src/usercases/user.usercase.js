import { UserRepository } from "../domain/repositories/user.repository.js";

const userRepository = new UserRepository();

export async function getUserByIdUseCase(id) {
    return await userRepository.getUserById(id);
}

export async function buscarUserMatriculaUseCase(matricula) {
    return await userRepository.getUserByMatricula(matricula);
}

export async function getBuscarCheckersUseCase(email) {
    return await userRepository.getCheckersByEmail(email);
}