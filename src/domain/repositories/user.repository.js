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
}
