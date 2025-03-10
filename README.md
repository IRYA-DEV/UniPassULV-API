# UniPass API - Refactorización con Clean Architecture 🏛️

## 📌 Descripción del Proyecto
Este proyecto es la API de **UniPass**, diseñada para gestionar la información de estudiantes, permisos de salida, documentación y autenticación de usuarios. Se ha refactorizado siguiendo los principios de **Clean Architecture**, lo que permite un código más modular, mantenible y escalable.

---

## 📂 Estructura del Proyecto
El código se ha organizado en **capas separadas**, siguiendo una estructura clara:

/src │── /adapter # Capa de Adaptación (Controladores y Rutas) 
     │ ├── /controllers # Maneja las solicitudes HTTP 
     │ │ ├── user.controller.js 
     │ │ ├── auth.controller.js 
     │ │ │ ├── /routes # Define las rutas de la API 
     │ │ ├── user.routes.js 
     │ │ ├── auth.routes.js 
     │ │── /domain # Capa de Dominio (Modelos y Repositorios) 
     │ | ├── /models # Modelos de datos 
     │ │ | ├── user.model.js 
     │ │ ├── /repositories # Acceso a la base de datos 
     │ │ | ├── user.repository.js 
     │ │ | ├── auth.repository.js 
     │ │── /usecases # Capa de Casos de Uso (Lógica de negocio) 
     │ |  ├── user.usecase.js 
     │ |  ├── auth.usecase.js 
     │ │── /infrastructure # Capa de Infraestructura (Conexión a la BD) 
     │ | ├── /config # Configuración de base de datos 
     │ │ | ├── env.config.js 
     │ | ├── /database # Configuración de la conexcion a la base de datos
     │ │ | ├── connection.js 
     │ │── /utils # Funciones utilitarias 
     │ | ├── hash.utils.js 
     │── app.js # Configuración de Express 
     │── index.js # Punto de entrada de la API 


## 🎯 **Principios de Clean Architecture Aplicados**

### 📌 **1. Separación de Responsabilidades (SRP)**
Cada capa tiene una única responsabilidad:
- **`adapter/`** → Maneja las solicitudes HTTP y respuestas.
- **`domain/`** → Contiene los modelos y repositorios que interactúan con la base de datos.
- **`usecases/`** → Implementa la lógica de negocio, separando la funcionalidad del controlador.

### 📌 **2. Ejemplo de Refactorización: Login**
Antes de aplicar **Clean Architecture**, la lógica del login estaba **dentro del controlador**, lo que lo hacía difícil de probar y mantener.

#### ❌ **Antes (Sin Clean Architecture)**
```js
export const loginUser = async (req, res) => {
    let pool;
    try {
        const { Matricula, Correo, Contraseña } = req.body;
        pool = await getConnection();

        let result;
        if (Matricula) {
            result = await pool.request()
                .input('Matricula', sql.VarChar, Matricula)
                .query('SELECT * FROM LoginUniPass WHERE Matricula = @Matricula');
        } else if (Correo) {
            result = await pool.request()
                .input('Correo', sql.VarChar, Correo)
                .query('SELECT * FROM LoginUniPass WHERE Correo = @Correo');
        } else {
            return res.status(400).json({ message: "Debe proporcionar matrícula o correo" });
        }

        if (result.recordset.length === 0) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        const user = result.recordset[0];
        const isPasswordValid = await VerifyHashData(Contraseña, user.Contraseña);

        if (!isPasswordValid) {
            return res.status(401).json({ message: "Credenciales inválidas" });
        }

        res.json({ success: true, user });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


### ❌ **Problemas con el código**
- Accede directamente a la base de datos desde el controlador.
- Mezcla lógica de negocio con manejo de respuestas HTTP.
- Dificulta la reutilización y pruebas unitarias.


---

### 📌 **2. "Después (Con Clean Architecture)"**
Aquí separaremos la refactorización en **tres partes**:
1. **Repositorio**
2. **Caso de uso**
3. **Controlador**

```md
## ✅ **Después (Con Clean Architecture)**

📌 **Repositorio**
📂 `/domain/repositories/auth.repository.js`
```js
import { getConnection } from "../../infrastructure/database/connection.js";
import sql from "mssql";
import User from "../models/user.model.js";

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

        return result.recordset.length === 0 ? null : User.fromRecord(result.recordset[0]);
    }
}


```md
📌 **Caso de Uso**
📂 `/usecases/auth.usecase.js`
```js
import { AuthRepository } from "../domain/repositories/auth.repository.js";
import { VerifyHashData } from "../utils/hash.utils.js";

const authRepository = new AuthRepository();

export async function loginUserUseCase(matricula, correo, contraseña) {
    const user = await authRepository.getUserByMatriculaOrCorreo(matricula, correo);

    if (!user) {
        return { success: false, message: "Credenciales inválidas" };
    }

    const isPasswordValid = await VerifyHashData(contraseña, user.contraseña);

    if (!isPasswordValid) {
        return { success: false, message: "Credenciales inválidas" };
    }

    return { success: true, user };
}


```md
📌 **Controlador**
📂 `/adapter/controllers/auth.controller.js`
```js
import { loginUserUseCase } from "../../usecases/auth.usecase.js";

export const loginUser = async (req, res) => {
    try {
        const { Matricula, Correo, Contraseña } = req.body;

        const result = await loginUserUseCase(Matricula, Correo, Contraseña);

        if (!result.success) {
            return res.status(401).json(result);
        }

        return res.json(result);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


---

## 📌 **Beneficios en el código con clean architecture implementado**
```md
### **Beneficios de este código**
- **Separación de responsabilidades** → El controlador solo maneja las solicitudes HTTP.
- **Reutilización** → `AuthRepository` encapsula el acceso a la base de datos.
- **Testabilidad** → Se pueden probar los casos de uso sin necesidad de una base de datos real.
