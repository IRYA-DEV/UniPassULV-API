import { AuthRepository } from "../adapter/repositories/auth.repository.js";
import { VerifyHashData, hashData } from "../util/hashData.js"; 

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

export async function updatePasswordUseCase(correo, newPassword) {
    const hashedPassword = await hashData(newPassword);
    return await authRepository.updatePassword(correo, hashedPassword);
}
