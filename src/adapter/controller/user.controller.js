import { getUserByIdUseCase, buscarUserMatriculaUseCase, getBuscarCheckersUseCase, buscarPersonaUseCase, getTokenFCMUseCase, documentCompletUseCase, registerTokenFCMUseCase } from "../../usercases/user.usercase.js";

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

export const buscarPersona = async (req, res) => {
    try {
        const { Nombre } = req.params;
        const users = await buscarPersonaUseCase(Nombre);

        if (!users) {
            return res.status(404).json(null);
        }

        return res.json(users);
    } catch (error) {
        console.error("Error en buscarPersona:", error);
        res.status(500).json({ error: error.message });
    }
};

export const SearchTokenFCM = async (req, res) => {
    try {
        const { Matricula } = req.params;
        const token = await getTokenFCMUseCase(Matricula);

        if (!token) {
            return res.status(404).json({ message: "Dato no encontrado" });
        }

        return res.json(token);
    } catch (error) {
        console.error("Error en SearchTokenFCM:", error);
        res.status(500).json({ error: error.message });
    }
};

export const documentComplet = async (req, res) => {
    try {
        const { Matricula } = req.params;
        const { StatusDoc } = req.body;

        const success = await documentCompletUseCase(Matricula, StatusDoc);

        if (!success) {
            return res.status(404).json({ message: "Dato no encontrado" });
        }

        res.json({ message: "Dato actualizado correctamente" });
    } catch (error) {
        console.error("Error en documentComplet:", error);
        res.status(500).json({ error: error.message });
    }
};

export const registerTokenFCM = async (req, res) => {
    try {
        const { Matricula } = req.params;
        const { TokenCFM } = req.body;

        const success = await registerTokenFCMUseCase(Matricula, TokenCFM);

        if (!success) {
            return res.status(404).json({ message: "Dato no encontrado" });
        }

        res.json({ message: "Dato actualizado correctamente" });
    } catch (error) {
        console.error("Error en registerTokenFCM:", error);
        res.status(500).json({ error: error.message });
    }
};