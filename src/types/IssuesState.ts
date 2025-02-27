import { Issue } from "./Issue";

export interface IssuesState {
  issues: {
    new: Issue[];
    open: Issue[];
    closed: Issue[];
  };
  loading: boolean;
  error: string | null;
  fetchIssues: (owner: string, repo: string) => Promise<void>;
}