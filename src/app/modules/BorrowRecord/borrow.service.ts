import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Borrow a book
const borrowBookFromDB = async (payload: any) => {
  // Check if the book is already borrowed by the member
  const existingBorrow = await prisma.borrowRecord.findFirst({
    where: {
      bookId: payload.bookId,
      memberId: payload.memberId,
    },
  });

  if (existingBorrow) {
    // If the book is already borrowed, throw an error
    throw new Error("This book is already borrowed by the member.");
  }

  // Create a new borrow record
  const borrowData = {
    bookId: payload.bookId,
    memberId: payload.memberId,
    borrowDate: new Date().toISOString(),
   
  };

  const borrowBook = await prisma.borrowRecord.create({
    data: borrowData,
  });

  return borrowBook;
};

// Return a book
const returnBookFromDB = async (borrowId: string) => {
  // Find the borrow record by borrowId
  const borrowRecord = await prisma.borrowRecord.findUnique({
    where: {
      borrowId: borrowId,
    },
  });

  if (!borrowRecord) {
    throw new Error("Borrow record not found.");
  }

  // Update the borrow record to mark the book as returned
  const returnedBook = await prisma.borrowRecord.update({
    where: {
      borrowId: borrowId,
    },
    data: {
      returnDate: new Date().toISOString(), // Set current date and time as return date
    },
  });

  return returnedBook;
};

const overdueBorrowListFormDB = async () => {
  const fourteenDaysAgo = new Date();
  console.log(fourteenDaysAgo);

  fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
  const overdueBorrows = await prisma.borrowRecord.findMany({
    where: {
      borrowDate: { lt: fourteenDaysAgo },
      returnDate: null,
    },

    include: {
      book: true,
      member: true,
    },
  });

  const overdueList = overdueBorrows.map((borrow)=>{
    const overdueDays= Math.floor(
     (new Date().getTime()- new Date(borrow.borrowDate).getTime()) / (1000 * 60 *60 *24)
    ) -14 
    return {
      borrowId: borrow.borrowId,
      bookTitle: borrow.book.title,
      borrowerName: borrow.member.name,
      overdueDays,
    };
  });

  return {
    success: true,
    status: 200,
    message: overdueList.length > 0 ? "Overdue borrow list fetched" : "No overdue books",
    data: overdueList,
  };
};

export const borrowServices = {
  borrowBookFromDB,
  returnBookFromDB,
  overdueBorrowListFormDB,
};
