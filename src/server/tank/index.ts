import { spawn } from "child_process";
import { join } from "path";

export default () =>
  new Promise(resolve => {
    const configDir = join(__dirname, "../../../run-tank-config");
    const child = spawn("yandex-tank", ["-c", join(configDir, "load.yaml")], {
      cwd: "/var/loadtest"
    });

    child.stdout.on("data", chunk => {
      console.log(chunk.toString());
    });

    child.stderr.on("data", chunk => {
      console.error(chunk.toString());
    });

    child.on("close", code => {
      console.log(`child process exited with code ${code}`);
      resolve();
    });
  });
