const form = document.querySelector("form")!;
const nameInput = form.elements.namedItem("name") as HTMLInputElement;
const ageInput = form.elements.namedItem("age") as HTMLInputElement;
const submitButton = document.querySelector("button[type='submit']")!;
const ul = document.querySelector("ul")!;

interface User {
  name: string;
  age: string;
}

function getUsersFromStorage(): User[] {
  const data = localStorage.getItem("users");
  return data ? JSON.parse(data) : [];
}

function saveUsersToStorage(users: User[]): void {
  localStorage.setItem("users", JSON.stringify(users));
}

function renderUsers() {
  ul.innerHTML = "";
  const users = getUsersFromStorage();

  users.forEach((user, index) => {
    const li = document.createElement("li");

    const p = document.createElement("p");
    p.textContent = `Name: ${user.name}, Age: ${user.age}`;

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.style.marginLeft = "10px";

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.style.marginLeft = "5px";

    editBtn.addEventListener("click", () => {
      nameInput.value = user.name;
      ageInput.value = user.age;

      users.splice(index, 1);
      saveUsersToStorage(users);
      renderUsers();
    });

    deleteBtn.addEventListener("click", () => {
      users.splice(index, 1);
      saveUsersToStorage(users);
      renderUsers();
    });

    li.appendChild(p);
    li.appendChild(editBtn);
    li.appendChild(deleteBtn);

    ul.appendChild(li);
  });
}

submitButton.addEventListener("click", (e) => {
  e.preventDefault();

  const nameValue = nameInput.value.trim();
  const ageValue = ageInput.value.trim();

  if (!nameValue || !ageValue) {
    alert("Iltimos, ism va yoshni kiriting.");
    return;
  }

  const users = getUsersFromStorage();
  users.push({ name: nameValue, age: ageValue });
  saveUsersToStorage(users);
  renderUsers();

  nameInput.value = "";
  ageInput.value = "";
});

document.addEventListener("DOMContentLoaded", renderUsers);
