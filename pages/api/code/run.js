import { c, cpp, node, python, java } from "compile-run";

const run = async (req, res) => {
  if (req.method == "POST") {
    const output = await compiler(req.body.code, req.body.len, "");
    res.json(output);
  }
};

const compiler = async (code, len, input) => {
  if (len == "c") return await c.runSource(code, { stdin: input });
  else if (len == "cpp") return await cpp.runSource(code, { stdin: input });
  else if (len == "java") return await java.runSource(code, { stdin: input });
  else if (len == "js") return await node.runSource(code, { stdin: input });
  else if (len == "py") return await python.runSource(code, { stdin: input });
  else return "select len";
};

export default run;
