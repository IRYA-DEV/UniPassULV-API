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

    async updateUser(id, userData) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("Id", sql.Int, id)
            .input("Matricula", sql.VarChar, userData.matricula)
            .input("Correo", sql.VarChar, userData.correo)
            .input("Nombre", sql.VarChar, userData.nombre)
            .query(`UPDATE LoginUniPass SET Matricula = @Matricula, Correo = @Correo, Nombre = @Nombre WHERE IdLogin = @Id`);
        
        return result.rowsAffected[0] > 0;
    }
}
