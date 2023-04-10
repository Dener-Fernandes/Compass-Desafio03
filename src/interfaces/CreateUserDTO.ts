interface CreateUserDTO {
  name: string;
  cpf: string;
  birth: string;
  email: string;
  password: string;
  cep: string;
  qualified: boolean;
}

export { CreateUserDTO }