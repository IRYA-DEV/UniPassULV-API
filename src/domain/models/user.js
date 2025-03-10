class User {
    constructor(idLogin, matricula, correo, contraseña, nombre, apellidos, tipoUser, idCargoDelegado, tokenCFM, documentacion) {
        this.idLogin = idLogin;
        this.matricula = matricula;
        this.correo = correo;
        this.contraseña = contraseña;
        this.nombre = nombre;
        this.apellidos = apellidos;
        this.tipoUser = tipoUser;
        this.idCargoDelegado = idCargoDelegado;
        this.tokenCFM = tokenCFM;
        this.documentacion = documentacion;
    }

    static fromRecord(record) {
        return new User(
            record.IdLogin,
            record.Matricula,
            record.Correo,
            record.Contraseña,
            record.Nombre,
            record.Apellidos,
            record.TipoUser,
            record.IdCargoDelegado,
            record.TokenCFM,
            record.Documentacion
        );
    }
}

export default User;

