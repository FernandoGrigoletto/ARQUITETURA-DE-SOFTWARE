import PessoaFisica from "../models/pessoaFisica.js";
import PessoaJuridica from "../models/pessoaJuridica.js";
import GrupoDeContribuintes from "../models/grupodeContribuintes.js";
import TerminalView from "../views/terminalView.js";

class ImpostoController {
  constructor() {
    this.grupo = GrupoDeContribuintes.getInstance();
    this.view = new TerminalView();
  }

  async iniciar() {
    this.view.mostrarMensagem("A conectar ao banco...");
    await this.grupo.carregarDoBanco(); // Carrega dados iniciais

    let continuar = true;

    while (continuar) {
      this.view.mostrarMenu();
      const opcao = await this.view.perguntar("Escolha uma opção: ");

      switch (opcao) {
        case '1': // Listar
          await this.listar();
          break;
        case '2': // Add PF
          await this.adicionarPF();
          break;
        case '3': // Add PJ
          await this.adicionarPJ();
          break;
        case '4': // Update
          await this.atualizar();
          break;
        case '5': // Delete
          await this.excluir();
          break;
        case '0':
          continuar = false;
          break;
        default:
          this.view.mostrarMensagem("Opção inválida!");
      }
    }

    this.view.mostrarMensagem("A encerrar sistema...");
    this.view.fechar();
    process.exit(0);
  }

  async listar() {
    await this.grupo.carregarDoBanco(); // Atualiza dados
    const lista = this.grupo.toString();
    const total = this.grupo.getTotalImposto();
    const pct = this.grupo.getPorcentagemContribuintesFeminino();
    
    this.view.mostrarLista(lista || "Nenhum registo encontrado.");
    this.view.mostrarRelatorio(total, pct);
  }

  async adicionarPF() {
    console.log("\n--- Nova Pessoa Física ---");
    const nome = await this.view.perguntar("Nome: ");
    const doc = await this.view.perguntar("CPF: ");
    const renda = parseFloat(await this.view.perguntar("Renda Bruta: "));
    const sexo = await this.view.perguntar("Sexo (Masculino/Feminino): ");

    const pf = new PessoaFisica(null, nome, doc, renda, sexo);
    await this.grupo.addContribuinte(pf);
    this.view.mostrarMensagem("Pessoa Física adicionada com sucesso!");
  }

  async adicionarPJ() {
    console.log("\n--- Nova Pessoa Jurídica ---");
    const nome = await this.view.perguntar("Nome da Empresa: ");
    const doc = await this.view.perguntar("CNPJ: ");
    const renda = parseFloat(await this.view.perguntar("Renda Bruta: "));
    const ano = parseInt(await this.view.perguntar("Ano de Fundação: "));

    const pj = new PessoaJuridica(null, nome, doc, renda, ano);
    await this.grupo.addContribuinte(pj);
    this.view.mostrarMensagem("Pessoa Jurídica adicionada com sucesso!");
  }

  async atualizar() {
    await this.listar(); // Mostra IDs disponíveis
    const id = await this.view.perguntar("\nDigite o ID para atualizar a renda: ");
    const novaRenda = parseFloat(await this.view.perguntar("Nova Renda Bruta: "));
    
    await this.grupo.atualizarContribuinte(id, novaRenda);
    this.view.mostrarMensagem("Renda atualizada!");
  }

  async excluir() {
    await this.listar(); // Mostra IDs disponíveis
    const id = await this.view.perguntar("\nDigite o ID para excluir: ");
    
    await this.grupo.removerContribuinte(id);
    this.view.mostrarMensagem("Contribuinte removido!");
  }
}

export default ImpostoController;