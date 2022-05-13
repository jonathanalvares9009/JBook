import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
}

const html: string = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
      <script>
        window.addEventListener("message", (e) => {
          try {
            eval(e.data);
          } catch (e) {
            const html = document.querySelector("#root");
            html.innerHTML = '<div style"color: red">' + e.message + '</div>';
            throw e;
          }
        }, false);
      </script>
    </body>
  </html>`;

const Preview: React.FC<PreviewProps> = ({ code }) => {
  const iframe = useRef<any>();
  useEffect(() => {
    iframe.current.srcdoc = html;
    setTimeout(() => {
      iframe.current.contentWindow.postMessage(code, "*");
    }, 50);
  }, [code]);
  return (
    <div className="preview-wrapper">
      <iframe ref={iframe} sandbox="allow-scripts" srcDoc={html} />
    </div>
  );
};

export default Preview;
