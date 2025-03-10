import { getConnection } from "../database/connection.js";
import sql from 'mssql';

export const endCargo = async (req, res) => {
    let pool;
    try {
        pool = await getConnection();

        // Obtener el IdCargoDelegado relacionado
        const getIdCargoResult = await pool
            .request()
            .input("Matricula", sql.VarChar, req.params.Matricula)
            .query(`SELECT IdCargoDelegado FROM LoginUniPass WHERE Matricula = @Matricula`);

        if (getIdCargoResult.recordset.length === 0) {
            return res.status(404).json({ message: "Matrícula no encontrada" });
        }

        const idCargoDelegado = getIdCargoResult.recordset[0].IdCargoDelegado;

        // Verificar si IdCargoDelegado tiene un valor válido
        if (!idCargoDelegado) {
            return res.status(400).json({ message: "El registro no tiene un IdCargoDelegado válido" });
        }

        // Actualizar el IdCargoDelegado a NULL
        await pool
            .request()
            .input("Matricula", sql.VarChar, req.params.Matricula)
            .query(`UPDATE LoginUniPass SET IdCargoDelegado = NULL WHERE Matricula = @Matricula`);

        // Eliminar el registro en la tabla Position
        const deleteResult = await pool
            .request()
            .input("IdCargo", sql.VarChar, idCargoDelegado.toString())
            .query(`DELETE FROM Position WHERE IdCargo = @IdCargo`);

        if (deleteResult.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "No se encontró un registro en Position con el IdCargo relacionado" });
        }

        return res.status(200).json({ message: "Estado actualizado y registro eliminado exitosamente" });
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send(error.message);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos');
            }
        }
    }
};

export const updateCargo = async (req, res) => {
    let pool;
    try {
        pool = await getConnection();
        const result = await pool
            .request()
            .input("Matricula", sql.VarChar, req.params.Matricula)
            .input("Delegado", sql.Int, req.body.IdCargoDelegado)
            .query(`UPDATE LoginUniPass SET IdCargoDelegado = @Delegado WHERE Matricula = @Matricula`);

        if (result.rowsAffected[0] > 0) {
            return res.status(200).json({ message: "Estado actualizado exitosamente" });
        } else {
            return res.status(404).json({ message: "Registro no encontrado" });
        }
    } catch (error) {
        console.error('Error en el servidor:', error);
        res.status(500).send(error.message);
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexion a la base de datos');
            }
        }
    }
}

export const buscarPersona = async (req, res) => {
    let pool;
    try {
        pool = await getConnection();
        const result = await pool
            .request()
            .input('Nombre', sql.VarChar, req.params.Nombre)
            .query(`SELECT 
                lp.*, 
                CASE 
                    WHEN p.MatriculaEncargado IS NOT NULL THEN 'Existe en Position' 
                    ELSE 'No existe en Position' 
                END AS ExisteEnPosition
            FROM 
                LoginUniPass AS lp
            LEFT JOIN 
                Position AS p ON lp.Matricula = p.Asignado
            WHERE 
                (lp.Nombre = @Nombre OR lp.Apellidos = @Nombre)
                `);
        
        if (result.rowsAffected[0] === 0) {
            // Retornar un null explícito si no hay registros
            return res.status(404).json(null);
        }

        return res.json(result.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
};

export const SearchTokenFCM = async (req, res) => {
    let pool
    try {
        console.log(req.params.Matricula)
        pool = await getConnection();
        const respuesta = await pool.request()
        .input('Matricula', sql.VarChar, req.params.Matricula)
        .query(`IF EXISTS (
    SELECT * FROM LoginUniPass 
    INNER JOIN Position ON LoginUniPass.IdCargoDelegado = Position.IdCargo
    WHERE Position.MatriculaEncargado = @Matricula
        AND Position.Activo = 1
)
BEGIN
    SELECT TokenCFM FROM LoginUniPass 
    INNER JOIN Position ON LoginUniPass.IdCargoDelegado = Position.IdCargo
    WHERE Position.MatriculaEncargado = @Matricula
        AND Position.Activo = 1
END
ELSE
BEGIN
    SELECT TokenCFM FROM LoginUniPass WHERE Matricula = @Matricula
END`);
    if (respuesta.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Dato no encontrado" });
    }
    return res.json(respuesta.recordset);
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
}

export const documentComplet = async (req, res) => {
    let pool
    try {
        console.log(req.params.Matricula)
        pool = await getConnection();
        const respuesta = await pool.request()
            .input('Matricula', sql.VarChar, req.params.Matricula)
            .input('StatusDoc', sql.Int, req.body.StatusDoc)
            .query(`UPDATE LoginUniPass SET Documentacion = @StatusDoc WHERE Matricula = @Matricula`);
        if (respuesta.rowsAffected[0] === 0) {
            return res.status(404).json({ message: "Dato no encontrado" });
        }
        res.json("Dato Actulizado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
}

export const registerTokenFCM = async (req, res) => {
    let pool
    try {
        console.log(req.params.Matricula)
        pool = await getConnection();
        const respuesta = await pool.request()
        .input('Matricula', sql.VarChar, req.params.Matricula)
        .input('TokenCFM', sql.VarChar, req.body.TokenCFM)
        .query(`UPDATE LoginUniPass SET TokenCFM = @TokenCFM WHERE Matricula = @Matricula`);
    if (respuesta.rowsAffected[0] === 0) {
        return res.status(404).json({ message: "Dato no encontrado" });
    }
    res.json("Dato Actulizado");
    } catch (error) {
        res.status(500).json({ error: error.message });
    } finally {
        if (pool) {
            try {
                await pool.close();
            } catch (closeError) {
                console.error('Error al cerrar la conexión a la base de datos:', closeError);
            }
        }
    }
}