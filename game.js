document.addEventListener("DOMContentLoaded", () => {
  const chooseSection = document.getElementById("choose");
  const gameSection = document.getElementById("game");
  const resultSection = document.getElementById("result");

  const avatar = document.getElementById("avatar");
  const charName = document.getElementById("charName");
  const scoreElem = document.getElementById("score");

  const sceneTitle = document.getElementById("sceneTitle");
  const sceneText = document.getElementById("sceneText");
  const optionsContainer = document.getElementById("options");

  const resultText = document.getElementById("resultText");
  const reflection = document.getElementById("reflection");

  const restartBtn = document.getElementById("restart");
  const playAgainBtn = document.getElementById("playAgain");

  let currentSceneIndex = 0;
  let score = 0;
  let character = null;

  const scenes = [
  {
    title: "Atajo sospechoso",
    text: "Ves un callejón iluminado por luces moradas. Un tipo extraño te invita a seguirlo.",
    options: [
      { text: "Seguirlo", effect: -1, next: 1 },
      { text: "Ignorarlo y buscar otra ruta", effect: 1, next: 1 }
    ]
  },
  {
    title: "Puente inestable",
    text: "Un puente colgante parece ser la ruta más corta, pero cruje peligrosamente.",
    options: [
      { text: "Cruzarlo", effect: -1, next: 2 },
      { text: "Rodear por el bosque", effect: 1, next: 2 }
    ]
  },
  {
    title: "Extraña máquina",
    text: "Encuentras una máquina brillante con botones y una palanca roja que dice 'NO TOCAR'.",
    options: [
      { text: "Tirar de la palanca", effect: -1, next: 3 },
      { text: "Observar y analizar antes de tocar", effect: 1, next: 3 }
    ]
  },
  {
    title: "Encuentro misterioso",
    text: "Una sombra se mueve entre los árboles. ¿Quieres acercarte o mantener distancia?",
    options: [
      { text: "Acercarme", effect: -1, next: 4 },
      { text: "Mantener distancia", effect: 1, next: 4 }
    ]
  },
  {
    title: "Decisión crucial",
    text: "Encuentras una bifurcación en el camino: ¿izquierda o derecha?",
    options: [
      { text: "Izquierda", effect: 1, next: 5 },
      { text: "Derecha", effect: -1, next: 5 }
    ]
  },
  {
    title: "Destino final",
    text: "Has llegado al final de tu aventura. El viaje fue intenso y revelador.",
    options: []
  },
  {
    title: "Reflexión final",
    text: "Un momento para pensar en las decisiones tomadas durante el viaje.",
    options: [
      { text: "Aceptar el resultado", effect: 0, next: 5 }
    ]
  }
];



  const reflections = {
    high: "Tu juicio fue excelente: actuaste con prudencia y astucia.",
    mid: "Equilibraste riesgo y seguridad, aunque hubo momentos impulsivos.",
    low: "Fuiste demasiado arriesgado: a veces la adrenalina puede costar caro."
  };

document.querySelectorAll(".select-char").forEach(btn => {
  btn.addEventListener("click", () => {
    const charType = btn.dataset.char.trim().toLowerCase();
    character = charType;

    // Limpiar contenido anterior del avatar
    avatar.innerHTML = "";

    // Crear imagen para el avatar
    const img = document.createElement("img");
    img.className = "w-14 h-14 rounded-full object-cover border-2 border-cyan-400";

    if (charType === "kitty") {
      img.src = "KITTY.png"; // ruta de la imagen de Isabel
      charName.textContent = "Kitty - Gatita astuta pero impulsiva";
    } else {
      img.src = "BATTT.png"; // ruta de la imagen de Chava
      charName.textContent = "Batt - Libre, rompe las reglas y nunca sigue las indicaciones";
    }

    avatar.appendChild(img);

    score = 0;
    scoreElem.textContent = score;
    currentSceneIndex = 0;
    chooseSection.classList.add("hidden");
    gameSection.classList.remove("hidden");
    showScene();
  });
});

  function showScene() {
    const scene = scenes[currentSceneIndex];
    sceneTitle.textContent = scene.title;
    sceneText.textContent = scene.text;
    optionsContainer.innerHTML = "";
    if (scene.options.length === 0) {
      showResult();
      return;
    }
    scene.options.forEach(option => {
      const btn = document.createElement("button");
      btn.textContent = option.text;
      btn.className =
        "px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-600 transition-colors text-black font-semibold";
      btn.addEventListener("click", () => {
        score += option.effect;
        scoreElem.textContent = score;
        currentSceneIndex = option.next;
        showScene();
      });
      optionsContainer.appendChild(btn);
    });
  }

  function showResult() {
    gameSection.classList.add("hidden");
    resultSection.classList.remove("hidden");
    resultText.textContent = `Tu puntaje final de juicio fue ${score}.`;
    if (score >= 2) {
      reflection.textContent = reflections.high;
    } else if (score >= 0) {
      reflection.textContent = reflections.mid;
    } else {
      reflection.textContent = reflections.low;
    }
  }

  restartBtn.addEventListener("click", () => {
    chooseSection.classList.remove("hidden");
    gameSection.classList.add("hidden");
    resultSection.classList.add("hidden");
  });

  playAgainBtn.addEventListener("click", () => {
    chooseSection.classList.remove("hidden");
    resultSection.classList.add("hidden");
  });
});

