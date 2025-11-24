class TerminalView {
  mostrarTotalImposto(valor) {
    console.log("Total de imposto devido: R$ " + valor.toFixed(2));
  }

  mostrarPorcentagemFeminino(porcentagem) {
    console.log("Porcentagem de contribuintes femininos: " + porcentagem.toFixed(1) + "%");
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