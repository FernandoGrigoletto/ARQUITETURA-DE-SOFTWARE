class TerminalView {
  mostrarTotalImposto(valor) {
    console.log("Total de imposto devido:", valor);
  }

  mostrarPorcentagemFeminino(porcentagem) {
    console.log("Porcentagem de contribuintes femininos:", porcentagem, "%");
  }

  mostrarListaContribuintes(listaString) {
    console.log("\nContribuintes no grupo:");
    console.log(listaString);
  }

  mostrarMensagem(msg) {
    console.log(msg);
  }
}

export default TerminalView;