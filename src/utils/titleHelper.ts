

export const columnTitle = (name: string) => {
  switch (name) {
    case "new":
      return "ToDo";
    case "open":
      return "In Progress";
    case "closed":
      return "Done"
    default:
      return "Title"
  }
};
