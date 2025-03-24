import { getConnection } from "../../infrastructure/database/connection.js";
import sql from "mssql";

export class PointRepository {
    async getPointsByExitId(idSalida) {
        const pool = await getConnection();
        const result = await pool.request()
            .input("IdSalida", sql.Int, idSalida)
            .query("SELECT * FROM Point WHERE IdExit = @IdSalida");

        return result.recordset;
    }
}
