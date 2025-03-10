import { getConnection } from "../../infrastructure/database/connection.js";
import sql from "mssql";

export class PositionRepository {
    async endCargo(matricula) {
        const pool = await getConnection();

        // Obtener el IdCargoDelegado relacionado
        const getIdCargoResult = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .query(`SELECT IdCargoDelegado FROM LoginUniPass WHERE Matricula = @Matricula`);

        if (getIdCargoResult.recordset.length === 0) {
            return null;
        }

        const idCargoDelegado = getIdCargoResult.recordset[0].IdCargoDelegado;

        // Actualizar el IdCargoDelegado a NULL
        await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .query(`UPDATE LoginUniPass SET IdCargoDelegado = NULL WHERE Matricula = @Matricula`);

        // Eliminar el registro en Position
        const deleteResult = await pool.request()
            .input("IdCargo", sql.VarChar, idCargoDelegado.toString())
            .query(`DELETE FROM Position WHERE IdCargo = @IdCargo`);

        return deleteResult.rowsAffected[0] > 0;
    }
}
