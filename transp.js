document.getElementById('shipmentForm').addEventListener('submit', function(event) {
    event.preventDefault();  
    
    const nomeRemetente = document.getElementById('nomeR').value;
    const tellR = document.getElementById('tellR').value;
    const tellD = document.getElementById('telD').value;
    const nomeDestinatario = document.getElementById('nomed').value;
    const tipoEncomenda = document.getElementById('tipo').value;
    const cep = document.getElementById('cep').value.replace(/\D/g, ''); // Remove não números
    const numero = document.getElementById('num').value;
    const complemento = document.getElementById('comp').value;

    if (!nomeRemetente || !nomeDestinatario || !cep || !tipoEncomenda || !tellD || !tellR) {
      alert('Por favor, preencha todos os campos obrigatórios!');
      return;
    }
    if (tellR.length != 11 || tellD.length != 11) {
        alert('Telefone inválido!');
        return;
      }
    if (cep.length !== 8) {
      alert('CEP inválido!');
      return;
    }

    fetch(`https://viacep.com.br/ws/${cep}/json/`)
      .then(res => res.json())
      .then(data => {
        if (data.erro) {
          alert('CEP não encontrado.');
          return;
        }

        alert(`A encomenda "${tipoEncomenda}" enviada por ${nomeRemetente} para ${nomeDestinatario} foi cadastrada com sucesso.
Endereço: ${data.logradouro}, ${numero}, ${complemento} - ${data.bairro}, ${data.localidade} - ${data.uf}.`);
      })
      .catch(() => alert('Erro ao buscar o CEP.'));
  });