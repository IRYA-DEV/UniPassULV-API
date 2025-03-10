import { endCargoUseCase } from "../../usercases/position.usercase.js";

export const endCargo = async (req, res) => {
    try {
        const success = await endCargoUseCase(req.params.Matricula);
        if (!success) {
            return res.status(404).json({ message: "Cargo no encontrado" });
        }
        res.json({ message: "Cargo eliminado exitosamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
