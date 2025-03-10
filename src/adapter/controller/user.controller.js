import { getUserByIdUseCase, updateUserUseCase } from "../../usercases/user.usercase.js";

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

export const updateUser = async (req, res) => {
    try {
        const updated = await updateUserUseCase(req.params.Id, req.body);
        if (!updated) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }
        res.json({ message: "Usuario actualizado correctamente" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
