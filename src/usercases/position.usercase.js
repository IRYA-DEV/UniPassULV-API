import { PositionRepository } from "../domain/repositories/position.repository.js";

const positionRepository = new PositionRepository();

export async function endCargoUseCase(matricula) {
    return await positionRepository.endCargo(matricula);
}
