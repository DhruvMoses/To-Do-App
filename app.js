document.addEventListener("DOMContentLoaded" , () => {
    const storedTasks = JSON.parse(localStorage.getItem('tasks'))

    if(storedTasks){
        storedTasks.forEach((task) => tasks.push(task));
        updateTaskList();
        updateStats();
    }
})


let tasks = [];


//This functions adds the tasks into Local Storage
const saveTask = () => {
    localStorage.setItem('tasks' , JSON .stringify(tasks)); //the data will be stored inside the JSON file with the key as "tasks"
}


//Function for adding task
const addTask = ()=>{
    const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim(); //no blank space becomes a task
    
    if(text){   //if there is a text then only this for loop will run
        tasks.push({text: text, completed: false});
        taskInput.value = ""; //jab bhi hum apna task enter krenge aur add btn click krenge phir input field blank hojayegi
        updateTaskList();
        updateStats();
        saveTask();
    }
};


//This function is for "Checking/Unchecking" checkbox for task wether completed "True" or "False"
const toggleTaskCompleted = (index) => {  //whenever i will tick "checkbox" it will show "completed:true" and vice versa
    tasks[index].completed = !tasks[index].completed;
    updateTaskList();
    updateStats();
    saveTask();

    if(tasks.length && tasks.every(task => task.completed)){
        animatedConfetti();
    }
}


//This function is for "Delete" for deleting a task
const deleteTask = (index) => {
    tasks.splice(index,1);
    updateTaskList();
    updateStats();
    saveTask();
};


//This function is for "Editing" for editing a task
const editTask = (index) => {
    const taskInput = document.getElementById("taskInput");
    taskInput.value = tasks[index].text

    tasks.splice(index,1); //for editing we will remove the task of the particular "index" and place it back to input from where new tasks can be added
    updateTaskList();
    updateStats();
    saveTask();
}


//This function will increase the "green" bar and the counts in the circle
const updateStats = () => {
    const completedTasks = tasks.filter(task => task.completed).length  //tasks array m jo bhi task "completed" hogye h unhe filter out krke jitne bhi tasks completed h unki length lega (this is for the circle)
    const totalTasks = tasks.length; //total kitne tasks hai wo "tasks array" mai uski length as "total tasks" lega (this is for the circle)

    const progress = (completedTasks / totalTasks) * 100 //kitna progress hua h wo batayega (for that green bar)
    const progressBar = document.getElementById("progress")
    
    progressBar.style.width=`${progress}%` //this will increase/decrease the green color with according to the answer of "progress"

    document.getElementById("numbers").innerText = `${completedTasks} / ${totalTasks} `

}


//This function will update the task list in ui
const updateTaskList = () => {
    const taskList = document.getElementById("task-list"); //this is the "ul"
    taskList.innerHTML = "";

    tasks.forEach((task,index) => { //this creates tasks
        const listItem = document.createElement("li");

        listItem.innerHTML = `  
        <div class = "taskItem">

            <div class="task ${task.completed ? "completed" : ""}">  
                <input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>  
                <p>${task.text}</p>
            </div> 

            <div class="icons">
                <img src="Assets/edit.png" onClick="editTask(${index})"/>  
                <img src="Assets/bin.png" onClick="deleteTask(${index})"/> 
            </div>

        </div>
        `;

        listItem.addEventListener('change' , () => toggleTaskCompleted(index))
        taskList.appendChild(listItem);
    })
}


document.getElementById("newTask").addEventListener('click',(e)=>{
    e.preventDefault();
    addTask();
});

//
const animatedConfetti = () => {
    const count = 200,
  defaults = {
    origin: { y: 0.7 },
  };

function fire(particleRatio, opts) {
  confetti(
    Object.assign({}, defaults, opts, {
      particleCount: Math.floor(count * particleRatio),
    })
  );
}

fire(0.25, {
  spread: 26,
  startVelocity: 55,
});

fire(0.2, {
  spread: 60,
});

fire(0.35, {
  spread: 100,
  decay: 0.91,
  scalar: 0.8,
});

fire(0.1, {
  spread: 120,
  startVelocity: 25,
  decay: 0.92,
  scalar: 1.2,
});

fire(0.1, {
  spread: 120,
  startVelocity: 45,
});
}



//In this we will learn about :-
// ->CRUD Operation: create,read,update,delete 
// ->Creating Local Storage in chrome browser itself
// ->Add the JS Confetti animation

//Important Notes

//<div class="task ${task.completed ? "completed" : ""}">  //whenever a task is completed it will give a new class name of "completed"
//<input type="checkbox" class="checkbox" ${task.completed ? "checked" : ""}>  //if task gets completed so the state will go to from "unchecked" to "checked"
//<img src="/Users/spideyop/Desktop/Javascript Projects/TO-DO App/edit.jpg" onClick="editTask(${index})"/>  //on clicking the icon the "editTask" function will
//<img src="/Users/spideyop/Desktop/Javascript Projects/TO-DO App/bin.jpg" onClick="deleteTask(${index})"/> //on clicking the icon the "deleteTask" function
