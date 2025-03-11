import { getInfoDelegadoUseCase, createPositionUseCase, cambiarActivoUseCase } from "../../usercases/position.usercase.js";

export const getInfoDelegado = async (req, res) => {
    try {
        const { Id } = req.params;
        console.log("Buscando delegado para:", Id);

        const delegado = await getInfoDelegadoUseCase(Id);

        if (!delegado) {
            return res.status(404).json(null);
        }

        return res.json(delegado);
    } catch (error) {
        console.error("Error en getInfoDelegado:", error);
        res.status(500).json({ error: error.message });
    }
};

export const createPosition = async (req, res) => {
    try {
        const { MatriculaEncargado, ClassUser, Asignado } = req.body;

        if (!MatriculaEncargado || !ClassUser || !Asignado) {
            return res.status(400).json({ message: "Faltan datos requeridos" });
        }

        const newPosition = await createPositionUseCase(MatriculaEncargado, ClassUser, Asignado);

        if (!newPosition) {
            return res.status(400).json({ message: "No se pudo crear el registro" });
        }

        return res.status(201).json({
            message: "Registro creado exitosamente",
            data: newPosition
        });
    } catch (error) {
        console.error("Error en createPosition:", error);
        res.status(500).json({ error: error.message });
    }
};

export const cambiarActivo = async (req, res) => {
    try {
        const { Id } = req.params;
        const { Activo } = req.body;

        if (!Id) {
            return res.status(400).json({ message: "El parámetro 'Id' es obligatorio" });
        }

        if (typeof Activo !== "number") {
            return res.status(400).json({ message: "El valor de 'Activo' debe ser un número" });
        }

        const success = await cambiarActivoUseCase(Id, Activo);

        if (!success) {
            return res.status(404).json({ message: "No se encontró el IdCargo o no se actualizó" });
        }

        return res.status(200).json({ message: "Estado actualizado exitosamente" });
    } catch (error) {
        console.error("Error en cambiarActivo:", error);
        res.status(500).json({ error: error.message });
    }
};
