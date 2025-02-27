import axios from "axios";
import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Issue } from "../types/Issue";
import { IssuesState } from "../types/IssuesState";
import { UrlState } from "../types/UrlState";

const token = process.env.GITHUB_TOKEN;

export const useIssues = create<IssuesState>()(
  persist(
    (set, get) => ({
      issues: {
        new: [],
        open: [],
        closed: [],
      },
      loading: false,
      error: null,
      fetchIssues: async (owner: string, repo: string) => {
        set({ loading: true });

        try {
          const response = await axios.get(
            `https://api.github.com/repos/${owner}/${repo}/issues`,
            {
              headers: {
                Accept: "application/vnd.github.raw+json",
                Authorization:
                  `Bearer ${token}`,
                "X-GitHub-Api-Version": "2022-11-28",
              },
            }
          );
          const issuesArr: Issue[] = await response.data;

          // Отримуємо поточний стан
          const { issues } = get();

          // Нові значення
          const newIssues = {
            new: issuesArr.filter(
              (issue) => issue.state === "open" && !issue.assignee
            ),
            open: issuesArr.filter(
              (issue) => issue.state === "open" && issue.assignee
            ),
            closed: issuesArr.filter((issue) => issue.state === "closed"),
          };

          // Перевіряємо, чи змінились значення перед оновленням стану
          if (JSON.stringify(issues) !== JSON.stringify(newIssues)) {
            set({
              issues: newIssues,
              error: null,
            });
          }
        } catch (error) {
          // set({ error: error.message });
          console.error(error);
        } finally {
          set({ loading: false });
        }
      },
    }),
    { name: "issues-storage" }
  )
);

export const useUrl = create<UrlState>()(
  persist(
    (set, get) => ({
      currentUrl: "",
      updateCurrentUrl: (newUrl: string) => {
        const { currentUrl } = get();
        if (newUrl === currentUrl) {
          return;
        }

        set({ currentUrl: newUrl });
      },
    }),
    { name: "url-storage" }
  )
);
