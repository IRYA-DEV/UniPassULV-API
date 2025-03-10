import sql from "mssql";
import { DB_CONFIG } from "../config/env.config.js"; 

export const getConnection = async () => {
    try {
        console.log("Conectando a la base de datos...");
        const pool = await sql.connect(DB_CONFIG);
        console.log("Conexión a la base de datos establecida.");
        return pool;
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        throw new Error("No se pudo conectar a la base de datos.");
    }
};
