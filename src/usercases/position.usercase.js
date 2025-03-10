import { PositionRepository } from "../adapter/repositories/position.repository.js";

const positionRepository = new PositionRepository();

export async function endCargoUseCase(matricula) {
    return await positionRepository.endCargo(matricula);
}
