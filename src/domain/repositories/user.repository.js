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
}
