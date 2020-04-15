import { ICategory } from "../../category";
import { ICategoriesService } from "../../categories/service";
import { IProject } from "../../project";
import { IProjectsService } from "../../projects/service";
import { ITest } from "../../test";
import { ITestsService } from "../../tests/service";

const service: ICategoriesService & IProjectsService & ITestsService = {
  getCategories() {
    return fetch("/api/categories").then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    });
  },
  async setCategory(category: ICategory) {
    await fetch("/api/category", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(category)
    });
  },
  async deleteCategory(id: string) {
    await fetch(`/api/category/${id}`, {
      method: "DELETE"
    });
  },
  getProjects() {
    return fetch("/api/projects").then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    });
  },
  async setProject(project: IProject) {
    await fetch("/api/project", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(project)
    });
  },
  async deleteProject(id: string) {
    await fetch(`/api/project/${id}`, {
      method: "DELETE"
    });
  },
  getTests() {
    return fetch("/api/tests").then(res => {
      if (res.ok) {
        return res.json();
      }
      throw new Error();
    });
  },
  async runTest(test: Pick<ITest, "projectId" | "phantomConfig">) {
    try {
      const res = await fetch("/api/test/run", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(test)
      });
      if (!res.ok) {
        return false;
      }

      const result = await res.json();

      if (result.status === "ok") {
        return true;
      }

      return false;
    } catch {
      return false;
    }
  }
};

export default service;
