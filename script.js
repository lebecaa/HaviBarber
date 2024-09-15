let servicoSelecionado = "";
let precoSelecionado = "";

// Horários agendados armazenados na memória do cliente
const horariosAgendados = {}; // {'data': ['horario1', 'horario2', ...]}

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

function gerarHorariosDisponiveis(dataSelecionada) {
    const horarios = [];
    
    let inicioManha = new Date(`${dataSelecionada}T09:00`);
    let fimManha = new Date(`${dataSelecionada}T12:00`);
    
    let inicioTarde = new Date(`${dataSelecionada}T14:00`);
    let fimTarde = new Date(`${dataSelecionada}T19:30`);
    
    let atual = new Date(inicioManha);
    while (atual <= fimManha) {
        horarios.push(new Date(atual));
        atual.setMinutes(atual.getMinutes() + 40); 
    }

    atual = new Date(inicioTarde);
    while (atual <= fimTarde) {
        horarios.push(new Date(atual));
        atual.setMinutes(atual.getMinutes() + 40);
    }

    return horarios;
}

function formatarHorario(date) {
    return date.toTimeString().slice(0, 5);
}

async function preencherHorariosDisponiveis(data) {
    const horarios = gerarHorariosDisponiveis(data);
    const botoesHorarios = document.querySelectorAll('.horarios button');
    
    try {
        // Solicita horários agendados ao backend
        const response = await fetch('/api/horarios');
        if (!response.ok) throw new Error('Erro ao buscar horários agendados');

        const dados = await response.json();
        Object.assign(horariosAgendados, dados);

        // Atualiza a interface com base nos horários agendados
        botoesHorarios.forEach((botao) => {
            const horario = botao.textContent;
            if (horariosAgendados[data] && horariosAgendados[data].includes(horario)) {
                botao.disabled = true;
                botao.classList.add('agendado');
            } else {
                botao.disabled = false;
                botao.classList.remove('agendado');
            }
        });
    } catch (error) {
        console.error('Erro ao preencher horários disponíveis:', error);
        alert('Ocorreu um erro ao atualizar os horários disponíveis.');
    }
}

document.getElementById('data').addEventListener('change', (event) => {
    const data = event.target.value;
    if (data) {
        preencherHorariosDisponiveis(data);
    }
});

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

function formatarData(data) {
    const partes = data.split('-');
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

async function confirmarAgendamento() {
    const nome = document.getElementById('nome').value;
    const telefone = document.getElementById('telefone').value;
    const data = document.getElementById('data').value;
    const horario = document.getElementById('horario').value;

    if (nome && telefone && data && horario) {
        try {
            // Verifica se o horário está disponível no backend
            const response = await fetch('/api/agendamento', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ data, horario }),
            });

            if (response.ok) {
                const dataFormatada = formatarData(data);
                const numeroWhatsApp = '5599991330396';
                const mensagem = `Olá, meu nome é ${nome}. Gostaria de agendar um ${servicoSelecionado} (${precoSelecionado}) para o dia ${dataFormatada} às ${horario}. Meu telefone é ${telefone}.`;

                const url = `https://wa.me/${numeroWhatsApp}?text=${encodeURIComponent(mensagem)}`;
                window.open(url, '_blank');

                alert('Agendamento confirmado! Você será redirecionado para o WhatsApp.');
                document.getElementById('agendamentoForm').reset();
                changeScreen();
            } else {
                alert('Este horário já está agendado. Por favor, escolha outro horário.');
            }
        } catch (error) {
            console.error('Erro ao confirmar agendamento:', error);
            alert('Ocorreu um erro ao tentar confirmar o agendamento.');
        }
    } else {
        alert('Por favor, preencha todos os campos!');
    }
}
