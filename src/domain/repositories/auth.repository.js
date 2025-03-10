import { getConnection } from "../../infrastructure/database/connection.js";
import sql from "mssql";
import User from "../models/user.js";

export class AuthRepository {
    async getUserByMatriculaOrCorreo(matricula, correo) {
        const pool = await getConnection();
        let result;

        if (matricula) {
            result = await pool.request()
                .input('Matricula', sql.VarChar, matricula)
                .query('SELECT * FROM LoginUniPass WHERE Matricula = @Matricula');
        } else if (correo) {
            result = await pool.request()
                .input('Correo', sql.VarChar, correo)
                .query('SELECT * FROM LoginUniPass WHERE Correo = @Correo');
        } else {
            return null;
        }

        if (result.recordset.length === 0) {
            return null;
        }

        return User.fromRecord(result.recordset[0]);
    }

    async updatePassword(correo, hashedPassword) {
        const pool = await getConnection();

        const result = await pool.request()
            .input("Correo", sql.VarChar, correo)
            .input("Password", sql.VarChar, hashedPassword)
            .input("TipoUser", sql.VarChar, "DEPARTAMENTO")
            .query("UPDATE LoginUniPass SET Contraseña = @Password WHERE Correo = @Correo AND TipoUser != @TipoUser");

        return result.rowsAffected[0] > 0;
    }
}
