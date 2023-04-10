function calculateFinalValue(inicio: string, fim: string, valorDiario: number): number {
  const MILISSEGUNDOS_POR_DIA = 86400000; // 1 dia tem 86400000 milissegundos
  const partesInicio = inicio.split('/');
  const partesFim = fim.split('/');
  const dataInicio = new Date(Number(partesInicio[2]), Number(partesInicio[1]) - 1, Number(partesInicio[0]));
  const dataFim = new Date(Number(partesFim[2]), Number(partesFim[1]) - 1, Number(partesFim[0]));
  const diferencaEmDias = Math.ceil((dataFim.getTime() - dataInicio.getTime()) / MILISSEGUNDOS_POR_DIA) + 1;
  const valorTotal = diferencaEmDias * valorDiario;
  return valorTotal;
}

export { calculateFinalValue }