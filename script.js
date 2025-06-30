// Verifica se o usuário está logado
auth.onAuthStateChanged(user => {
  if (!user) {
    window.location = "login.html";
  }
});

// Inicializa o mapa com Leaflet
const mapa = L.map('map').setView([-17.0665, 15.7257], 14);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(mapa);

// Array para armazenar ocorrências
const ocorrencias = [];

// Renderiza ocorrências na interface
function renderOcorrencias() {
  const lista = document.getElementById("listaOcorrencias");
  lista.innerHTML = "";
  ocorrencias.forEach(o => {
    // Marcador no mapa
    L.marker([o.lat, o.lng]).addTo(mapa).bindPopup(o.tipo);

    // Item na lista
    const li = document.createElement("li");
    li.textContent = `${o.tipo}: ${o.descricao}`;
    lista.appendChild(li);
  });
}

// Busca as ocorrências do Firebase Realtime Database
db.ref("ocorrencias").on("value", snapshot => {
  const data = snapshot.val();
  ocorrencias.length = 0; // Limpa antes de recarregar
  for (let id in data) {
    ocorrencias.push(data[id]);
  }
  renderOcorrencias();
});

// Ação do botão de pânico
document.getElementById("btnPanico").addEventListener("click", () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const novaOcorrencia = {
        tipo: "Alerta de Pânico",
        descricao: "Usuário solicitou ajuda",
        lat: pos.coords.latitude,
        lng: pos.coords.longitude,
        data: new Date().toISOString()
      };

      db.ref("ocorrencias").push(novaOcorrencia)
        .then(() => {
          alert("Alerta de pânico enviado com sucesso!");
        })
        .catch(err => {
          console.error("Erro ao enviar alerta:", err);
          alert("Erro ao enviar alerta.");
        });
    });
  } else {
    alert("Geolocalização não é suportada no seu navegador.");
  }
});

// Função para logout
function logout() {
  auth.signOut().then(() => {
    window.location = "login.html";
  });
}
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('service-worker.js')
    .then(() => console.log("Service Worker registrado!"))
    .catch(err => console.error("Erro ao registrar Service Worker:", err));
}
function verUsuarios() {
  window.location.href = "ver-usuarios.html";
}
