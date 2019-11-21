import { IStorage } from "../interface";
import { ICategory } from "../../category";
import { IProject } from "../../project";
import { ITest } from "../../test";

const storage: IStorage = {
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
  async setTest(test: ITest) {
    await fetch("/api/test", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(test)
    });
  },
  async deleteTest(id: string) {
    await fetch(`/api/test/${id}`, {
      method: "DELETE"
    });
  }
};

export default storage;
