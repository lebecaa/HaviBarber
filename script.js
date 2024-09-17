let servicoSelecionado = "";
let precoSelecionado = "";

const horariosAgendados = {}; 

function changeScreen(button) {
    const tela1 = document.getElementById('tela-1');
    const tela2 = document.getElementById('tela-2');

    if (tela1.classList.contains('active')) {
        tela1.classList.remove('active');
        tela2.classList.add('active');

        servicoSelecionado = button.getAttribute('data-servico');
        precoSelecionado = button.getAttribute('data-preco');
    } else {
        tela2.classList.remove('active');
        tela1.classList.add('active');
    }
}


function setHorario(horarioSelecionado) {
    document.getElementById('horario').value = horarioSelecionado;

    const botoesHorarios = document.querySelectorAll('.horarios button');
    botoesHorarios.forEach((botao) => {
        botao.classList.remove('selected');
    });

    const botaoSelecionado = Array.from(botoesHorarios).find(
        (botao) => botao.textContent === horarioSelecionado
    );
    if (botaoSelecionado) {
        botaoSelecionado.classList.add('selected');
    }
}

function confirmarAgendamento() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;
    
    const mensagem = `Olá, meu nome é ${nome}. Gostaria de confirmar o agendamento para ${data} às ${horario}. Meu telefone é ${telefone}.`;
    
    const mensagemCodificada = encodeURIComponent(mensagem);
    
    const numeroWhatsapp = "5599991330396"; 
    const link = `https://wa.me/${numeroWhatsapp}?text=${mensagemCodificada}`;

    window.open(link, '_blank');
}
