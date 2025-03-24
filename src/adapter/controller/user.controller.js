export default ({ userUseCases }) => ({
    getUser: async (req, res) => {
      try {
        const user = await userUseCases.getUserByIdUseCase(req.params.Id);
        if (!user) return res.status(404).json({ message: "Usuario no encontrado" });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
  
    buscarUserMatricula: async (req, res) => {
      try {
        const user = await userUseCases.buscarUserMatriculaUseCase(req.params.Matricula);
        if (!user) return res.status(404).json({ message: "Dato no encontrado" });
        res.json(user);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    },
    
    getBuscarCheckers : async (req, res) => {
        try {
            console.log(req.params.EmailAsignador);
            const checkers = await userUseCases.getBuscarCheckersUseCase(req.params.EmailAsignador);
    
            if (!checkers) {
                return res.status(404).json({ message: "No hay datos registrados" });
            }
    
            return res.json(checkers);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    
    buscarPersona : async (req, res) => {
        try {
            const { Nombre } = req.params;
            const users = await userUseCases.buscarPersonaUseCase(Nombre);
    
            if (!users) {
                return res.status(404).json(null);
            }
    
            return res.json(users);
        } catch (error) {
            console.error("Error en buscarPersona:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    SearchTokenFCM : async (req, res) => {
        try {
            const { Matricula } = req.params;
            const token = await userUseCases.getTokenFCMUseCase(Matricula);
    
            if (!token) {
                return res.status(404).json({ message: "Dato no encontrado" });
            }
    
            return res.json(token);
        } catch (error) {
            console.error("Error en SearchTokenFCM:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    documentComplet : async (req, res) => {
        try {
            const { Matricula } = req.params;
            const { StatusDoc } = req.body;
    
            const success = await userUseCases.documentCompletUseCase(Matricula, StatusDoc);
    
            if (!success) {
                return res.status(404).json({ message: "Dato no encontrado" });
            }
    
            res.json({ message: "Dato actualizado correctamente" });
        } catch (error) {
            console.error("Error en documentComplet:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    registerTokenFCM : async (req, res) => {
        try {
            const { Matricula } = req.params;
            const { TokenCFM } = req.body;
    
            const success = await userUseCases.registerTokenFCMUseCase(Matricula, TokenCFM);
    
            if (!success) {
                return res.status(404).json({ message: "Dato no encontrado" });
            }
    
            res.json({ message: "Dato actualizado correctamente" });
        } catch (error) {
            console.error("Error en registerTokenFCM:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    endCargo : async (req, res) => {
        try {
            const { Matricula } = req.params;
    
            const result = await userUseCases.endCargoUseCase(Matricula);
    
            if (!result.success) {
                return res.status(404).json({ message: result.message });
            }
    
            return res.status(200).json({ message: result.message });
        } catch (error) {
            console.error("Error en endCargo:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    updateCargo : async (req, res) => {
        try {
            const { Matricula } = req.params;
            const { IdCargoDelegado } = req.body;
    
            const success = await userUseCases.updateCargoUseCase(Matricula, IdCargoDelegado);
    
            if (!success) {
                return res.status(404).json({ message: "Registro no encontrado" });
            }
    
            return res.status(200).json({ message: "Estado actualizado exitosamente" });
        } catch (error) {
            console.error("Error en updateCargo:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
    getInfoCargo : async (req, res) => {
        try {
            const { Id } = req.params;
            console.log("Buscando cargo para:", Id);
    
            const cargo = await userUseCases.getInfoCargoUseCase(Id);
    
            if (!cargo) {
                return res.status(404).json(null);
            }
    
            return res.json(cargo);
        } catch (error) {
            console.error("Error en getInfoCargo:", error);
            res.status(500).json({ error: error.message });
        }
    },
    
  });

