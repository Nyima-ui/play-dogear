interface TextSegment {
  text: string;
  segmentIndex: number;
  pageNumber?: number;
  wordCount: number;
}

export const splitIntoSegments = (
  text: string,
  segmentSize: number = 500,
  overlapSize: number = 50,
): TextSegment[] => {
  if (segmentSize <= 0) {
    throw new Error("segmentSize must be greater than 0");
  }
  if (overlapSize < 0 || overlapSize >= segmentSize) {
    throw new Error("overlapSize must be >= 0 and < segmentSize");
  }

  const words = text.split(/\s+/).filter((word) => word.length > 0);
  const segments: TextSegment[] = [];

  let segmentIndex = 0;
  let startIndex = 0;

  while (startIndex < words.length) {
    const endIndex = Math.min(startIndex + segmentSize, words.length);
    const segmentWords = words.slice(startIndex, endIndex);
    const segmentText = segmentWords.join(" ");

    segments.push({
      text: segmentText,
      segmentIndex,
      wordCount: segmentWords.length,
    });

    segmentIndex++;

    if (endIndex >= words.length) break;
    startIndex = endIndex - overlapSize;
  }

  return segments;
};

export const parsePDFFile = async (file: File) => {
  try {
    const pdfjsLib = await import("pdfjs-dist");

    if (typeof window !== "undefined") {
      pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
        "pdfjs-dist/build/pdf.worker.min.mjs",
        import.meta.url,
      ).toString();
    }

    const arrayBuffer = await file.arrayBuffer();

    const loadingTask = pdfjsLib.getDocument({ data: arrayBuffer });
    const pdfDocument = await loadingTask.promise;

    const firstPage = await pdfDocument.getPage(1);
    const viewport = firstPage.getViewport({ scale: 2 });

    const canvas = document.createElement("canvas");
    canvas.width = viewport.width;
    canvas.height = viewport.height;
    const context = canvas.getContext("2d");

    if (!context) {
      throw new Error(`Could not get canvas context.`);
    }

    await firstPage.render({
      canvasContext: context,
      viewport: viewport,
      canvas: canvas,
    }).promise;

    const coverDataUrl = await canvas.toDataURL("image/png");

    let fullText = "";

    for (let pageNum = 1; pageNum <= pdfDocument.numPages; pageNum++) {
      const page = await pdfDocument.getPage(pageNum);
      const textContent = await page.getTextContent();
      const pageText = textContent.items
        .filter((item) => "str" in item)
        .map((item) => item.str)
        .join(" ");

      fullText += pageText + "\n";
    }

    const segments = splitIntoSegments(fullText);

    await pdfDocument.destroy();

    return {
      content: segments,
      cover: coverDataUrl,
    };
  } catch (e) {
    console.error(`Error parsing PDF:`, e);
    throw new Error(
      `Failed to parse PDF file: ${e instanceof Error ? e.message : String(e)}`,
    );
  }
};
