const app = document.getElementById("app");
const users = [
  {
    email: "test@test.com",
    phone: "99999999999",
    ref: 100,
    refBy: null,
  },
  {
    email: "tust@tust.com",
    phone: "99999999999",
    ref: 200,
    refBy: 100,
  },
  {
    email: "tost@tost.com",
    phone: "99999999999",
    ref: 300,
    refBy: 200,
  }
];

const getUser = (userData) => {
  return users.find((user) => user.email === userData.email);
};

// Contar indicações
const getTotalSubscriber = (userData) => {
  const subs = users.filter((user) => user.refBy === userData.ref);
  return subs.length;
}

// Mensagem ao se inscrever
const showInvite = (userData) => {
  app.innerHTML = `
  <input type="text" id="link" value="https://evento.com" disabled>

  <div id="stats">      
      <h4>
          ${getTotalSubscriber(userData)}
      </h4>
      <p>
          Inscrições feitas
      </p>
  </div>
  `;
};

// gerar número de ref de incrição
const saveUser = (userData) => {
  const newUser = {
    ...userData, // Os três pontinhos fazem a cópia dos dados de userData
    ref: Math.round(Math.random() * 4000), // Gerando um ref aleatório
    refBy: 100, 
  };

  users.push(newUser);
  console.log(users);
  return newUser;
};

// Direciona para se inscrever/login 
const formAction = () => {
  const form = document.getElementById("form");
  form.onsubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(form);
    const userData = {
      email: formData.get("email"),
      phone: formData.get("phone"),
    };

    const user = getUser(userData);
    if (user) { // encontrou usuario
      showInvite(user);
    } else { // não encontrou o usuario
      const newUser = saveUser(userData);
      showInvite(newUser);
    }
  };
};

// Formulário HTML 
const startApp = () => {
  const content = `
    <form id="form">
    <input type="email" name="email" placeholder="E-mail" required>
    <input type="text" name="phone" placeholder="Telefone" required>
    <button>
        Confirmar
    </button>
    </form>
  `;

  app.innerHTML = content;

  formAction();
};

startApp();

document.getElementById("logo").onclick = () => startApp()
