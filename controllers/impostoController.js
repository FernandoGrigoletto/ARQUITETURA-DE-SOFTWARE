import PessoaFisica from "../models/pessoaFisica.js";
import PessoaJuridica from "../models/pessoaJuridica.js";
import GrupoDeContribuintes from "../models/grupodeContribuintes.js";
import TerminalView from "../views/terminalView.js";
// As linhas duplicadas foram removidas aqui

class ImpostoController {
  constructor() {
    this.grupo = GrupoDeContribuintes.getInstance(); 
    this.view = new TerminalView();
  }

  iniciar() {
    this.carregarDadosIniciais();

    const totalImposto = this.grupo.getTotalImposto();
    const pctFeminino = this.grupo.getPorcentagemContribuintesFeminino();
    const representacaoString = this.grupo.toString();

    this.view.mostrarTotalImposto(totalImposto);
    this.view.mostrarPorcentagemFeminino(pctFeminino);
    this.view.mostrarListaContribuintes(representacaoString);
  }

  carregarDadosIniciais() {
    try {
      // Certifique-se de que os caminhos dos imports dos modelos estão corretos
      const pf1 = new PessoaFisica("Pedro", "123.456.789-00", 2500, "Masculino");
      const pf2 = new PessoaFisica("Ana", "987.654.321-00", 3000, "Feminino");
      const pj1 = new PessoaJuridica(
        "Empresa Fictícia",
        "12.345.678/0001-99",
        10000,
        2005
      );

      this.grupo.addContribuinte(pf1);
      this.grupo.addContribuinte(pf2);
      this.grupo.addContribuinte(pj1);
    } catch (error) {
      this.view.mostrarMensagem("Erro: " + error.message);
    }
  }
}

export default ImpostoController;