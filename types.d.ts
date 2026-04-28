interface Task  {
  _id: string;
  title: string;
  description: string;
  createdAt: string;
  updatedAt: string;
};

interface UpdatedTask {
  id: string;
  title: string;
  description: string;
}