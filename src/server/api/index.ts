import { Router } from "express";
import uuid from "uuid/v4";
import FileStorage from "../../app/storage/file";
import { ITest } from "app/test";

export interface IParams {
  path: string;
}

export default ({ path }: IParams) => {
  const storage = new FileStorage(path);
  const router = Router();

  router.get("/categories", async (_, res) => {
    res.json(await storage.getCategories());
  });

  router.put("/category", async (req, res) => {
    await storage.setCategory(req.body);
    res.json({ status: "ok" });
  });

  router.delete("/category/:id", async (req, res) => {
    await storage.deleteCategory(req.params.id);
    res.json({ status: "ok" });
  });

  router.get("/projects", async (_, res, next) => {
    try {
      res.json(await storage.getProjects());
    } catch (e) {
      next(e);
    }
  });

  router.put("/project", async (req, res) => {
    await storage.setProject(req.body);
    res.json({ status: "ok" });
  });

  router.delete("/project/:id", async (req, res) => {
    await storage.deleteProject(req.params.id);
    res.json({ status: "ok" });
  });

  router.get("/tests", async (_, res) => {
    res.json(await storage.getTests());
  });

  router.put("/test", async (req, res) => {
    await storage.setTest(req.body);
    res.json({ status: "ok" });
  });

  router.delete("/test/:id", async (req, res) => {
    await storage.deleteTest(req.params.id);
    res.json({ status: "ok" });
  });

  router.post("/test/run", async (req, res) => {
    const body: Pick<ITest, "projectId" | "phantomConfig"> = req.body;
    if (!body.phantomConfig || !body.projectId) {
      res.sendStatus(400);
      res.json({ error: "Incorrect data" });
      return;
    }

    await storage.setTest({
      ...body,
      date: new Date().getTime(),
      id: uuid()
    });

    res.json({ status: "ok" });
  });

  return router;
};
