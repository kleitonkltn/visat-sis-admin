

class AtividadePrincipal {
  text: string;
  code: string;
}

class AtividadesSecundaria {
  text: string;
  code: string;
}

class Billing {
  free: boolean;
  database: boolean;
}

export class CNPJ {
  atividade_principal: AtividadePrincipal[];
  data_situacao: string;
  nome: string;
  uf: string;
  telefone: string;
  atividades_secundarias: AtividadesSecundaria[];
  qsa: any[];
  situacao: string;
  bairro: string;
  logradouro: string;
  numero: string;
  cep: string;
  municipio: string;
  porte: string;
  abertura: string;
  natureza_juridica: string;
  fantasia: string;
  cnpj: string;
  ultima_atualizacao: Date;
  status: string;
  tipo: string;
  complemento: string;
  email: string;
  efr: string;
  motivo_situacao: string;
  situacao_especial: string;
  data_situacao_especial: string;
  capital_social: string;
  extra: {};
  billing: Billing;
}


