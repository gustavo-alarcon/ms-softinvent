export interface Roles {
    invitado?: boolean;
    colaborador?: boolean;
    administrador?: boolean;
    cliente?: boolean;
}

export interface User {
    uid?: string;
    name?: string;
    lastname?: string;
    email?: string;
    photoURL?: string;
    db?: string;
    roles?: Roles;
    company?: string;
    web?: string;
    accountType?: number;
    accountState?: number;
    regDate?: Date;
}