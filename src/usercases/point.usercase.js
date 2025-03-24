import { PointRepository } from "../adapter/repositories/point.repository.js";

const pointRepository = new PointRepository();

export async function getPointsChecksUseCase(idSalida) {
    return await pointRepository.getPointsByExitId(idSalida);
}
