import { createTask, fetchTasks } from "@/lib/action/task.action";
import Tasks from "@/components/Tasks";

export default async function Home() {
  const result = await fetchTasks();
  const tasks = result.tasks ? result.tasks : [];

  return (
    <div>
      <h1 className="text-5xl">Tasks</h1>
      <form action={createTask}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            id="title"
            name="title"
            className="outline-none focus:ring-2 focus:ring-sky-300 border focus:border-0"
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <input
            type="text"
            className="outline-none focus:ring-2 focus:ring-sky-300 border focus:border-0"
            id="description"
            name="description"
            required
          />
        </div>

        <button
          type="submit"
          className="border m-5 cursor-pointer active:scale-105 p-3"
        >
          Create
        </button>
      </form> 
      
      

      <Tasks tasks={tasks}/>
    </div>
  );
}
