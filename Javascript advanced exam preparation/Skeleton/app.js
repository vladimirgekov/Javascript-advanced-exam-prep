function solve() {
  //zapazvame referencii kum elementite,koito shte manipulirame prez celiq jivot na prilojenieto
  const sections = document.querySelectorAll("section");
  const openDiv = sections.item(1).querySelectorAll("div").item(1);
  const progressDiv = sections.item(2).querySelectorAll("div").item(1);
  const finishDiv = sections.item(3).querySelectorAll("div").item(1);

  const inputTask = document.querySelector("#task");
  const inputDesc = document.querySelector("#description");
  const inputDate = document.querySelector("#date");

  document.querySelector("#add").addEventListener("click", addTask);
  //suzdavane na zadachi (dom elementi)
  function addTask(e) {
    e.preventDefault();
    //prochitame sudurjanieto na formulyara i validirame
    const taskName = inputTask.value.trim();
    const taskDesc = inputDesc.value.trim();
    const taskDate = inputDate.value.trim();

    if (taskName.length > 0 && taskDesc.length > 0 && taskDate.length > 0) {
      //suzdavame elementite
      const startBtn = el("button", "Start", { className: "green" });
      const finishBtn = el("button", "Finish", { className: "orange" });
      const deleteBtn = el("button", "Delete", { className: "red" });
      const btnDiv = el("div", [startBtn, deleteBtn], { className: "flex" });
      const task = el("article", [
        el("h3", taskName),
        el("p", `Description: ${taskDesc}`),
        el("p", `Due Date: ${taskDate}`),
        btnDiv,
      ]);
      //zakachame funkcionalnost
      startBtn.addEventListener("click", () => {
        progressDiv.appendChild(task);
        startBtn.remove();
        btnDiv.appendChild(finishBtn);
      });

      finishBtn.addEventListener("click", () => {
        finishDiv.appendChild(task);
        btnDiv.remove();
      });

      deleteBtn.addEventListener("click", () => {
        task.remove();
      });

      //dobavqme elementa v dom durvoto
      openDiv.appendChild(task);
    }
  }
  function el(type, content, attributes) {
    const result = document.createElement(type);

    if (attributes !== undefined) {
      Object.assign(result, attributes);
    }

    if (Array.isArray(content)) {
      content.forEach(append);
    } else {
      append(content);
    }

    function append(node) {
      if (typeof node === "string") {
        node = document.createTextNode(node);
      }
      result.appendChild(node);
    }
    return result;
  }
}
