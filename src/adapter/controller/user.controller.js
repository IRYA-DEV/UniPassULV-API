import { getUserByIdUseCase, buscarUserMatriculaUseCase, getBuscarCheckersUseCase } from "../../usercases/user.usercase.js";

export const getUser = async (req, res) => {
    try {
        const user = await getUserByIdUseCase(req.params.Id);
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const buscarUserMatricula = async (req, res) => {
    try {
        console.log(req.params.Matricula);
        const user = await buscarUserMatriculaUseCase(req.params.Matricula);

        if (!user) {
            return res.status(404).json({ message: "Dato no encontrado" });
        }

        return res.json(user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

export const getBuscarCheckers = async (req, res) => {
    try {
        console.log(req.params.EmailAsignador);
        const checkers = await getBuscarCheckersUseCase(req.params.EmailAsignador);

        if (!checkers) {
            return res.status(404).json({ message: "No hay datos registrados" });
        }

        return res.json(checkers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};