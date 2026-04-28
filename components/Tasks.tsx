"use client";
import { useState } from "react";
import { deleteTask, updateTask } from "@/lib/action/task.action";
import { useRouter } from "next/navigation";

const Tasks = ({ tasks }: { tasks: Task[] }) => {
  const [updatingId, setUpdatingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const router = useRouter();

  const handleUpdate = () => {
    if (!updatingId) return;
    updateTask({
      id: updatingId,
      title: editTitle,
      description: editDescription,
    });
    setUpdatingId(null);
    router.refresh();
  };

  return (
    <div>
      {tasks.map((t) => {
        const isUpdating = updatingId === t._id;
        return (
          <ul key={t._id}>
            <li className="mt-3">
              {isUpdating ? (
                <input
                  type="text"
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="border block focus:outline-1 focus:outline-sky-300 focus:border-0"
                />
              ) : (
                <p>{t.title}</p>
              )}
              {isUpdating ? (
                <input
                  type="text"
                  value={editDescription}
                  onChange={(e) => setEditDescription(e.target.value)}
                  className="border block focus:outline-1 focus:outline-sky-300 focus:border-0 ml-5 mt-3"
                />
              ) : (
                <p className="ml-5">{t.description}</p>
              )}
              <div className="ml-5 flex gap-3 mt-5">
                <button
                  className="border rounded-md active:scale-105 cursor-pointer px-2 py-1"
                  type="button"
                  onClick={
                    isUpdating
                      ? handleUpdate
                      : () => {
                          setUpdatingId(t._id);
                          setEditTitle(t.title);
                          setEditDescription(t.description);
                        }
                  }
                >
                  {isUpdating ? "Save" : "Update"}
                </button>
                <button
                  className="border rounded-md active:scale-105 cursor-pointer px-2 py-1"
                  onClick={() => deleteTask(t._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          </ul>
        );
      })}
    </div>
  );
};

export default Tasks;
