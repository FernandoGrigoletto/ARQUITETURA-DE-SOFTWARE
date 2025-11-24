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
    this.view.mostrarMensagem("A conectar ao banco de dados...");
    
    // 1. Inserir dados (se necessário) ou apenas carregar
    await this.carregarDadosIniciais();

    // 2. Buscar todos os dados atualizados do banco
    await this.grupo.carregarDoBanco();

    // 3. Processar e Mostrar
    const totalImposto = this.grupo.getTotalImposto();
    const pctFeminino = this.grupo.getPorcentagemContribuintesFeminino();
    const listaContribuintes = this.grupo.toString();

    this.view.mostrarTotalImposto(totalImposto);
    this.view.mostrarPorcentagemFeminino(pctFeminino);
    this.view.mostrarListaContribuintes(listaContribuintes);
    
    // Encerrar processo (importante para fechar conexão com banco)
    process.exit(0);
  }

  async carregarDadosIniciais() {
    try {
      // Verifica se já tem dados para não duplicar a cada execução
      const pool = this.grupo.dbConnection.getPool();
      const [rows] = await pool.execute('SELECT count(*) as total FROM contribuintes');
      
      if (rows[0].total > 0) {
        this.view.mostrarMensagem("Dados já existem no banco. Pulando inserção inicial.");
        return;
      }

      this.view.mostrarMensagem("Inserindo dados iniciais...");
      const pf1 = new PessoaFisica("Pedro", "123.456.789-00", 2500, "Masculino");
      const pf2 = new PessoaFisica("Ana", "987.654.321-00", 3000, "Feminino");
      const pj1 = new PessoaJuridica("Empresa Fictícia", "12.345.678/0001-99", 10000, 2005);

      await this.grupo.addContribuinte(pf1);
      await this.grupo.addContribuinte(pf2);
      await this.grupo.addContribuinte(pj1);
      
    } catch (e) {
      this.view.mostrarMensagem("Erro ao manipular dados: " + e.message);
    }
  }
}

export default ImpostoController;