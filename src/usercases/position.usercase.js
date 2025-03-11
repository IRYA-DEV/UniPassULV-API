import { PositionRepository } from "../adapter/repositories/position.repository.js";

const positionRepository = new PositionRepository();

export async function getInfoDelegadoUseCase(matriculaEncargado) {
    return await positionRepository.getInfoDelegado(matriculaEncargado);
}

export async function createPositionUseCase(matriculaEncargado, classUser, asignado) {
    return await positionRepository.createPosition(matriculaEncargado, classUser, asignado);
}

export async function updateActivoUseCase(idCargo, activo) {
    return await positionRepository.updateActivo(idCargo, activo);
}