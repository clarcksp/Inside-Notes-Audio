export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'tecnico' | 'gerente';
}

export interface Company {
  id: string;
  name: string;
  cnpj: string;
  address: string;
  contacts: string[];
}

export interface Note {
  id: string;
  companyId: string;
  userId: string;
  type: 'text' | 'audio';
  content: string;
  status: 'draft' | 'reviewing' | 'final' | 'archived';
  createdAt: Date;
  updatedAt: Date;
}

export interface GeminiConfig {
  apiKey: string;
  endpoint: string;
}

export interface DatabaseConfig {
  host: string;
  port: number;
  database: string;
  username: string;
  password: string;
}
