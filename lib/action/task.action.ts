"use server";

import connectMongoDB from "@/database/mongodb";
import Task from "@/database/models/task.model";
import { revalidatePath } from "next/cache";

export const createTask = async (formData: FormData): Promise<void> => {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  try {
    await connectMongoDB();

    await Task.create({
      title,
      description,
    });

    revalidatePath("/");
  } catch (e) {
    console.error(`Error create task`, e);
  }
};

export const fetchTasks = async () => {
  try {
    await connectMongoDB();

    const tasks = await Task.find().lean();

    return {
      success: true,
      tasks: tasks.map((task) => ({
        ...task,
        _id: task._id.toString(),
      })),
    };
  } catch (e) {
    console.error(`Error fetching tasks`, e);
    return {
      success: false,
      error: "Failed to fetch all tasks. Please refresh page.",
    };
  }
};

export const updateTask = async (payload: UpdatedTask) => {
  const { id, title, description } = payload;
  try {
    if (!id || !title || !description) {
      return {
        success: false,
        error: `Incomplete data`,
      };
    }

    await connectMongoDB();
    await Task.findByIdAndUpdate(id, { title, description });
  } catch (e) {
    console.error(`Error updating task`, e);
    return {
      success: false,
      error: `Error updating task. Please try again`,
    };
  }
};

export const deleteTask = async (id: string) => {
  try {
    if (!id) {
      return { success: false, error: "No ID provided." };
    }

    await connectMongoDB();
    await Task.findByIdAndDelete(id);
    revalidatePath("/");

    return { success: true };
  } catch (e) {
    console.error(`Error deleting`, e);
    return {
      success: false,
      error: `Error deleting the task. Please try again.`,
    };
  }
};
