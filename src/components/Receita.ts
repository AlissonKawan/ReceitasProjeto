export type Receita = {
  id: number;
  nome: string;
  categoria: string;
  tempo: string;
  porcoes: number;
  dificuldade: string;
  imagem: string;

  ingredientes: string[];
  modoPreparo: string[];
};