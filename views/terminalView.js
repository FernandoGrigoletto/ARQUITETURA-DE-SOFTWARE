import readline from 'readline';

class TerminalView {
  constructor() {
    this.rl = readline.createInterface({
      input: process.stdin,
      output: process.stdout
    });
  }

  // Método auxiliar para fazer perguntas e esperar resposta (Promise)
  perguntar(pergunta) {
    return new Promise((resolve) => {
      this.rl.question(pergunta, (resposta) => {
        resolve(resposta);
      });
    });
  }

  mostrarMenu() {
    console.log("\n=== SISTEMA TRIBUTÁRIO ===");
    console.log("1. Listar Contribuintes");
    console.log("2. Adicionar Pessoa Física");
    console.log("3. Adicionar Pessoa Jurídica");
    console.log("4. Atualizar Renda (pelo ID)");
    console.log("5. Excluir Contribuinte (pelo ID)");
    console.log("0. Sair");
    console.log("==========================");
  }

  mostrarRelatorio(total, pctFem) {
    console.log(`\n>>> Total de Impostos: R$ ${total.toFixed(2)}`);
    console.log(`>>> Mulheres (P. Física): ${pctFem.toFixed(1)}%`);
  }

  mostrarLista(texto) {
    console.log("\n--- Lista Atual ---");
    console.log(texto);
  }

  mostrarMensagem(msg) {
    console.log(`\n[INFO]: ${msg}`);
  }

  fechar() {
    this.rl.close();
  }
}

export default TerminalView;