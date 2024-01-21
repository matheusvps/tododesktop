class BacklogService {
   static saveBacklog(tasks, completedTasks) {
     const currentDate = new Date();
     const data = {
       tasks: tasks.map(task => ({ 
         name: task,
         date: currentDate,
       })),      
       completedTasks: completedTasks.map(taskIndex => ({
         name: tasks[taskIndex],
         date: currentDate, // Alteração aqui para completedDate
       })),
     };
 
     const jsonData = JSON.stringify(data, null, 2);
 
     const blob = new Blob([jsonData], { type: 'application/json' });
 
     const link = document.createElement('a');
     link.href = URL.createObjectURL(blob);
     link.download = `backlog_${currentDate.toISOString()}.json`;
 
     document.body.appendChild(link);
     link.click();
 
     document.body.removeChild(link);
   }

   static getDayKey(date) {
      return new Date(date.toDateString()).toLocaleDateString();
    }
  
    static importBacklog(data) {
      try {
        const jsonData = JSON.parse(data);
        const tasksByDay = {};
  
        const processTask = (task, isCompleted) => {
          const dateKey = this.getDayKey(new Date(task.date));
          console.debug(dateKey);
          if (!tasksByDay[dateKey]) {
            tasksByDay[dateKey] = {
              date: dateKey,
              completedTasks: [],
              incompleteTasks: [],
            };
          }
  
          const taskList = isCompleted ? tasksByDay[dateKey].completedTasks : tasksByDay[dateKey].incompleteTasks;
  
          taskList.push(task);
        };
  
        jsonData.tasks.forEach((task) => {
          processTask(task, false);
        });
  
        jsonData.completedTasks.forEach((completedTask) => {
          processTask(completedTask, true);
        });
        
        console.debug(tasksByDay);
        return Object.values(tasksByDay);
      } catch (error) {
        throw new Error('Erro ao processar o backlog: ' + error.message);
      }
    }
  
 }
 
 export default BacklogService;
 