export type IssueStatus = "open" | "in-progress" | "closed";

export type Issue = {
  id: string;
  title: string;
  status: IssueStatus;
};
