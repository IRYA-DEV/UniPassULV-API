import { UserRepository } from "../adapter/repositories/user.repository.js";

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

export async function buscarPersonaUseCase(nombre) {
    return await userRepository.searchPerson(nombre);
}

export async function getTokenFCMUseCase(matricula) {
    return await userRepository.getTokenFCM(matricula);
}

export async function documentCompletUseCase(matricula, statusDoc) {
    return await userRepository.updateDocumentStatus(matricula, statusDoc);
}

export async function registerTokenFCMUseCase(matricula, tokenCFM) {
    return await userRepository.updateTokenFCM(matricula, tokenCFM);
}

export async function endCargoUseCase(matricula) {
    return await userRepository.removeCargo(matricula);
}

export async function updateCargoUseCase(matricula, idCargoDelegado) {
    return await userRepository.updateCargo(matricula, idCargoDelegado);
}

export async function getInfoCargoUseCase(id) {
    return await userRepository.getInfoCargo(id);
}