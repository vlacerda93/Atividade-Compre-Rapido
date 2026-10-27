document.addEventListener("DOMContentLoaded", () => {
  const cenarios = {
    normal: {
      titulo: "Servidor monolítico em operação",
      descricao: "A aplicação funciona em um único servidor, mas depende de um ponto único de falha.",
      cpu: "35%",
      classe: "normal",
      trafego: "Tráfego normal",
      status: "Operacional",
      mensagem: "Requisições atendidas pelo servidor central.",
      percentualCPU: 35
    },
    crise: {
      titulo: "Crise Black Friday: serviço indisponível",
      descricao: "O aumento do tráfego satura a CPU do monólito, provocando timeouts e indisponibilidade.",
      cpu: "100%",
      classe: "crise",
      trafego: "Pico de acessos - Black Friday",
      status: "CPU saturada - indisponível",
      mensagem: "Falha simulada: requisições não são atendidas.",
      percentualCPU: 100
    },
    recuperacao: {
      titulo: "Arquitetura horizontal proposta",
      descricao: "Um balanceador distribui as requisições entre instâncias saudáveis. Health checks permitem retirar instâncias com falha do tráfego.",
      cpu: "Distribuída entre instâncias",
      classe: "recuperacao",
      trafego: "Alto tráfego distribuído",
      mensagem: "Balanceador encaminhando requisições para três instâncias saudáveis."
    }
  };

  const painel = document.getElementById("simulador-resultado");
  const titulo = document.getElementById("simulador-titulo");
  const descricao = document.getElementById("simulador-descricao");
  const cpu = document.getElementById("simulador-cpu");
  const botoes = document.querySelectorAll("[data-cenario]");

  const arquitetura = document.getElementById("arquitetura-visual");
  const balanceador = document.getElementById("arquitetura-balanceador");
  const monolito = document.getElementById("servidor-monolito");
  const replicas = document.getElementById("arquitetura-replicas");
  const trafego = document.getElementById("trafego-label");
  const status = document.getElementById("servidor-status");
  const barraCPU = document.getElementById("cpu-barra");
  const valorCPU = document.getElementById("cpu-valor");
  const mensagem = document.getElementById("arquitetura-mensagem");

  const elementos = [
    painel, titulo, descricao, cpu, arquitetura,
    balanceador, monolito, replicas, trafego,
    status, barraCPU, valorCPU, mensagem
  ];

  if (elementos.some(elemento => !elemento) || !botoes.length) {
    console.warn("Elementos do simulador não encontrados.");
    return;
  }

  function atualizarCenario(nome) {
    const cenario = cenarios[nome];
    if (!cenario) return;

    titulo.textContent = cenario.titulo;
    descricao.textContent = cenario.descricao;
    cpu.textContent = "CPU simulada: " + cenario.cpu;

    painel.classList.remove("normal", "crise", "recuperacao");
    painel.classList.add(cenario.classe);

    arquitetura.classList.remove("normal", "crise", "recuperacao");
    arquitetura.classList.add(cenario.classe);

    trafego.textContent = cenario.trafego;
    mensagem.textContent = cenario.mensagem;

    const recuperacao = nome === "recuperacao";

    balanceador.hidden = !recuperacao;
    replicas.hidden = !recuperacao;
    monolito.hidden = recuperacao;

    if (!recuperacao) {
      status.textContent = cenario.status;
      barraCPU.style.width = cenario.percentualCPU + "%";
      valorCPU.textContent = "CPU: " + cenario.cpu;
    }

    botoes.forEach(botao => {
      const ativo = botao.dataset.cenario === nome;
      botao.setAttribute("aria-pressed", String(ativo));
    });
  }

  botoes.forEach(botao => {
    botao.addEventListener("click", () => {
      atualizarCenario(botao.dataset.cenario);
    });
  });

  atualizarCenario("normal");
});