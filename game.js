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
  title: "Examen inesperado",
  text: "El profesor anuncia un examen sorpresa de inglés. No estudiaste mucho ayer. ¿Qué haces?",
    options: [
      { text: "Intentar resolver con lo que sabes", effect: 1, next: 1 },
      { text: "Copiar de un compañero", effect: -1, next: 1 }
    ]
  },
  {
  title: "Trabajo en grupo",
  text: "Tienes un proyecto en equipo. Tus compañeros no participan mucho. ¿Qué decides?",
  options: [
    { text: "Hacer tú solo el trabajo para que salga bien", effect: -1, next: 2 },
    { text: "Motivar al grupo y repartir tareas", effect: 1, next: 2 }
    ]
  },
  {
  title: "Oportunidad de beca",
  text: "Escuchas que habrá una beca para estudiantes con buen rendimiento y participación. ¿Qué haces?",
  options: [
    { text: "Anotarte y esforzarte más", effect: 1, next: 3 },
    { text: "No intentarlo porque piensas que no ganarás", effect: -1, next: 3 }
    ]
  },
  {
  title: "Amigos en clase",
  text: "Un amigo te invita a no entrar a la última clase porque 'es aburrida'. ¿Qué haces?",
  options: [
    { text: "Ir a la clase de todos modos", effect: 1, next: 4 },
    { text: "Salir con tu amigo", effect: -1, next: 4 }
    ]
  },
  {
  title: "Presentación difícil",
  text: "Te toca exponer en público y sientes nervios. ¿Cómo actúas?",
  options: [
    { text: "Respiras hondo y presentas lo mejor que puedas", effect: 1, next: 5 },
    { text: "Evitas participar y dejas que otros hablen", effect: -1, next: 5 }
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
  high: "Tu juicio fue excelente: actuaste con prudencia y astucia. Demostraste que sabes pensar antes de decidir, y eso te da una gran ventaja para alcanzar tus metas.",
 
  mid: "Equilibraste riesgo y seguridad, aunque hubo momentos impulsivos. Tus decisiones muestran que tienes potencial, pero aún puedes aprender a reflexionar mejor antes de actuar.",
 
  low: "Fuiste demasiado arriesgado: a veces la adrenalina puede costar caro. No todo se resuelve con valentía; pensar en las consecuencias también es parte de crecer y mejorar."
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
      img.src = "KITTY.png"; 
      charName.textContent = "Kitty - Gatita astuta pero impulsiva";
    } else {
      img.src = "BATTT.png"; 
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

