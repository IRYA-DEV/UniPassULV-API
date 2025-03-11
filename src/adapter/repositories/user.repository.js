import { getConnection } from "../../infrastructure/database/connection.js";
import sql from "mssql";

export class UserRepository {
    async getUserById(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .query("SELECT * FROM LoginUniPass WHERE IdLogin = @Id");
        
        if (result.recordset.length === 0) {
            return null;
        }
        return result.recordset[0];
    }

    async getUserByMatricula(matricula) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .query("SELECT * FROM LoginUniPass WHERE Matricula = @Matricula");

        if (result.recordset.length === 0) {
            return null;
        }

        return result.recordset[0];
    }

    async getCheckersByEmail(email) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("EmailEncargado", sql.VarChar, email)
            .query("SELECT * FROM LoginUniPass WHERE TipoUser = 'DEPARTAMENTO' AND Correo = @EmailEncargado");

        if (result.recordset.length === 0) {
            return null;
        }

        return result.recordset;
    }

    async searchPerson(nombre) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Nombre", sql.VarChar, nombre)
            .query(`
                SELECT 
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

        return result.recordset.length === 0 ? null : result.recordset;
    }

    async getTokenFCM(matricula) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .query(`
                IF EXISTS (
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
                END
            `);

        return result.recordset.length === 0 ? null : result.recordset;
    }

    async updateDocumentStatus(matricula, statusDoc) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .input("StatusDoc", sql.Int, statusDoc)
            .query("UPDATE LoginUniPass SET Documentacion = @StatusDoc WHERE Matricula = @Matricula");

        return result.rowsAffected[0] > 0;
    }

    async updateTokenFCM(matricula, tokenCFM) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .input("TokenCFM", sql.VarChar, tokenCFM)
            .query("UPDATE LoginUniPass SET TokenCFM = @TokenCFM WHERE Matricula = @Matricula");

        return result.rowsAffected[0] > 0;
    }

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
    
    async updateCargo(matricula, idCargoDelegado) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Matricula", sql.VarChar, matricula)
            .input("Delagado", sql.Int, idCargoDelegado)
            .query(`UPDATE LoginUniPass SET IdCargoDelegado = @Delegado WHERE Matricula = @Matricula`);
    
        return result.rowsAffected[0] > 0;
    }

    async getInfoCargo(id) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.VarChar, id)
            .query(`
                SELECT * FROM LoginUniPass 
                INNER JOIN Position ON LoginUniPass.IdCargoDelegado = Position.IdCargo 
                WHERE LoginUniPass.Matricula = @Id
            `);

        return result.recordset.length === 0 ? null : result.recordset[0];
    }
}
