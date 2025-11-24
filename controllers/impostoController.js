// controllers/impostoController.js
import PessoaFisica from "../models/pessoaFisica.js";
import PessoaJuridica from "../models/pessoaJuridica.js";
import GrupoDeContribuintes from "../models/grupodeContribuintes.js";
import TerminalView from "../views/terminalView.js";

class ImpostoController {
  constructor() {
    // Esta linha é a que estava a dar erro. 
    // Com o passo 1 corrigido, ela vai funcionar.
    this.grupo = GrupoDeContribuintes.getInstance(); 
    this.view = new TerminalView();
  }
  
  // ... resto do código igual ...
  iniciar() {
    this.carregarDadosIniciais();
    const totalImposto = this.grupo.getTotalImposto();
    // ...
    this.view.mostrarTotalImposto(totalImposto);
    // ...
  }
  
  carregarDadosIniciais() {
      // ... lógica de adicionar contribuintes ...
  }
}

export default ImpostoController;