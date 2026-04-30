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

interface CreateBook {
  title: string;
  author: string;
  fileUrl: string;
  fileBlobKey: string;
  coverURL: string;
  fileSize: number;
  totalSegments: number;
}

interface TextSegment {
  text: string;
  segmentIndex: number;
  pageNumber?: number;
  wordCount: number;
}