export const accounts = [
  { id: 1, name: "Alice", lastname: "X", city: "NYC" },
  { id: 2, name: "Bob", lastname: "Y", city: "NYC" },
  { id: 3, name: "Claire", lastname: "Z", city: "NYC" },
];

// later may add photo URL, report author
export const reports = [
  {
    id: 1,
    category: "dog",
    pickup: "Brunswick",
    dropoff: "Tokyo",
    color: "black",
    status: "found",
    photo: "URL",
    authorId: 2,
  },
  {
    id: 2,
    category: "cat",
    pickup: "Atlanta",
    dropoff: "Boston",
    color: "white",
    status: "lost",
    photo: "URL",
    authorId: 3,
  },
  {
    id: 3,
    category: "hamster",
    pickup: "Philly",
    dropoff: "Portland",
    color: "pink",
    status: "found",
    photo: "URL",
    authorId: 1,
  },
];

export const threadpost = [
  { id: 1, authorId: 1, title: "Alice's adventure Part 1" },
  { id: 2, authorId: 2, title: "My birthday!" },
  { id: 3, authorId: 1, title: "Alice's adventure Part 2" },
];

export const comments = [
  {
    id: 1,
    threadpostId: 1,
    commenterId: 2,
    content: "Can't wait for Part 2!",
  },
  { id: 2, threadpostId: 2, commenterId: 1, content: "Happy birthday Bob!" },
  { id: 3, threadpostId: 2, commenterId: 3, content: "No wayyyyy" },
];
