import PessoaFisica from "./models/pessoaFisica.js";
import PessoaJuridica from "./pessoaJuridica.js";
import GrupoDeContribuintes from "./models/grupodeContribuintes.js";
import ImpostoController from "./controllers/impostoController.js";
const grupo = new GrupoDeContribuintes();

const pf1 = new PessoaFisica("Pedro", "123.456.789-00", 2500, "Masculino");
const pf2 = new PessoaFisica("Ana", "987.654.321-00", 3000, "Feminino");
const pj1 = new PessoaJuridica(
  "Empresa Fictícia",
  "12.345.678/0001-99",
  10000,
  2005
);

grupo.addContribuinte(pf1);
grupo.addContribuinte(pf2);
grupo.addContribuinte(pj1);

console.log("Total de imposto devido:", grupo.getTotalImposto());
console.log(
  "Porcentagem de contribuintes femininos:",
  grupo.getPorcentagemContribuintesFeminino(),
  "%"
);

// Exibindo a representação em string dos contribuintes
console.log("\nContribuintes no grupo:");
console.log(grupo.toString());

const app = new ImpostoController();
app.iniciar();