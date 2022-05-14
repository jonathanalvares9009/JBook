import { useState, useEffect } from "react";
import CodeEditor from "../components/code-editor";
import Preview from "../components/preview";
import bundle from "../bundler";
import Resizable from "./resizable";

const CodeCell = () => {
  const [input, setInput] = useState("");
  const [error, setError] = useState("");
  const [code, setCode] = useState("");

  useEffect(() => {
    const timer = setTimeout(async () => {
      const output = await bundle(input);
      setCode(output.code);
      setError(output.error);
    }, 3000);
    return () => clearTimeout(timer);
  }, [input]);

  return (
    <Resizable direction="vertical">
      <div style={{ height: "100%", display: "flex", flexDirection: "row" }}>
        <Resizable direction="horizontal">
          <CodeEditor
            initialValue='console.log("Hello World")'
            onChange={(value) => setInput(value)}
          />
        </Resizable>
        <Preview code={code} buildError={error} />
      </div>
    </Resizable>
  );
};

export default CodeCell;
