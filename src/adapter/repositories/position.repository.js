import { getConnection } from "../../infrastructure/database/connection.js";
import sql, { pool } from "mssql";

export class PositionRepository {
    async getInfoDelegado(matriculaEncargado) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, matriculaEncargado)
            .query(`
                SELECT * FROM LoginUniPass 
                INNER JOIN Position ON LoginUniPass.IdCargoDelegado = Position.IdCargo
                WHERE Position.MatriculaEncargado = @Id
            `);

        return result.recordset.length === 0 ? null : result.recordset;
    }

    async createPosition(matriculaEncargado, classUser, asignado) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("MatriculaEncargado", sql.VarChar, matriculaEncargado)
            .input("ClassUser", sql.VarChar, classUser)
            .input("Asignado", sql.VarChar, asignado)
            .input("Activo", sql.Int, o)
            .query(`INSERT INTO Position (MatriculaEncargado, ClassUser, Asignado, Activo) 
                VALUES (@MatriculaEncargado, @ClassUser, @Asignado, @Activo);
                SELECT SCOPE_IDENTITY() AS id;`);
            if (result.rowsAffected[0] > 0) {
                const newId = result.recordset[0].id;
                const createdData = await pool.request()
                    .input("id", sql.Int, newId)
                    .query(`SELECT * FROM Position WHERE IdCargo = @id`);        
                return createdData.recordset[0];
            }
        
        return null;        
    }

    async updateActivo(idCargo, activo) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, idCargo)
            .input("Activo", sql.Int, activo)
            .query(`UPDATE Position SET Activo = @Activo WHERE IdCargo = @Id`)
        return result.rowsAffected[0] > 0;
    }
}
