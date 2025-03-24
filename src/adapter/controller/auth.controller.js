export default ({ authUseCases }) => ({
    loginUser: async (req, res) => {
      try {
        const { Matricula, Correo, Contraseña } = req.body;
  
        if (!Matricula && !Correo) {
          return res.status(400).json({ success: false, message: "Debe proporcionar matrícula o correo" });
        }
  
        const result = await authUseCases.loginUserUseCase(Matricula, Correo, Contraseña);
  
        if (!result.success) {
          return res.status(401).json(result);
        }
  
        return res.json(result);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    putPassword: async (req, res) => {
      try {
        const { Correo } = req.params;
        const { NewPassword } = req.body;
  
        const success = await authUseCases.updatePasswordUseCase(Correo, NewPassword);
  
        if (!success) {
          return res.status(404).json({ message: "Contraseña no actualizada" });
        }
  
        res.json({ message: "Contraseña actualizada correctamente" });
      } catch (error) {
        console.error("Error al actualizar la contraseña:", error);
        res.status(500).json({ error: "Error al actualizar la contraseña" });
      }
    }
  });
  