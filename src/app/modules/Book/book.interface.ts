export interface IBook {
    bookId: string;          // Unique identifier for the book, matching the Prisma model's @id
    title: string;           // Title of the book
    genre: string;           // Genre of the book
    publishedYear: number;   // Year the book was published, of type `Int` in Prisma
    totalCopies: number;     // Total number of copies available
    availableCopies: number; // Number of copies currently available for borrowing
  }
  