export const accounts = [
  { id: 1, name: "Alice", lastname: "X", city: "NYC" },
  { id: 2, name: "Bob", lastname: "Y", city: "NYC" },
  { id: 3, name: "Claire", lastname: "Z", city: "NYC" },
];

// later may add photo URL, report author
export const reports = [
  {
    id: 1,
    authorId: 2,
    category: "dog",
    pickup: "Brunswick",
    dropoff: "Tokyo",
    color: "black",
    status: "found",
    photo: "URL",
    message: "hello there",
  },
  {
    id: 2,
    authorId: 3,
    category: "cat",
    pickup: "Atlanta",
    dropoff: "Boston",
    color: "white",
    status: "lost",
    photo: "URL",
    message: "hello there",
  },
  {
    id: 3,
    authorId: 1,
    category: "hamster",
    pickup: "Philly",
    dropoff: "Portland",
    color: "pink",
    status: "found",
    photo: "URL",
    message: "hello there",
  },
];

export const threadposts = [
  {
    id: 1,
    authorId: 1,
    title: "Alice's adventure Part 1",
    post: "Lorem ipsum 1",
  },
  { id: 2, authorId: 2, title: "My birthday!", post: "Lorem ipsum 2" },
  {
    id: 3,
    authorId: 1,
    title: "Alice's adventure Part 2",
    post: "Lorem ipsum 3",
  },
];

export const comments = [
  {
    id: 1,
    threadpostId: 1,
    commenterId: 2,
    commenterName: "Bob",
    content: "Can't wait for Part 2!",
  },
  {
    id: 2,
    threadpostId: 3,
    commenterId: 1,
    commenterName: "Alice",
    content: "Happy birthday Bob!",
  },
  {
    id: 3,
    threadpostId: 2,
    commenterId: 3,
    commenterName: "Claire",
    content: "No wayyyyy",
  },
  {
    id: 1,
    threadpostId: 1,
    commenterId: 2,
    commenterName: "Bob",
    content: "Already??!",
  },
  {
    id: 2,
    threadpostId: 3,
    commenterId: 1,
    commenterName: "Mike",
    content: "All the best!",
  },
  {
    id: 2,
    threadpostId: 2,
    commenterId: 3,
    commenterName: "Claire",
    content: "WHAT?!",
  },
];
