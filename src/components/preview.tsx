import "./preview.css";
import { useEffect, useRef } from "react";

interface PreviewProps {
  code: string;
  buildError: string;
}

const html: string = `
  <html>
    <head>
    </head>
    <body>
      <div id="root"></div>
      <script>
        const handleError = (error) => {
          const html = document.querySelector("#root");
            html.innerHTML = '<div style="color: red"><h4>Runtime error</h4>' + error.message + '</div>';
            console.log(error);
        };

        window.addEventListener("error", (event) => {
          event.preventDefault();
          handleError(event.error); 
        });

        window.addEventListener("message", (e) => {
          try {
            eval(e.data);
          } catch (e) {
            handleError(e);
          }
        }, false);
      </script>
    </body>
  </html>`;

const Preview: React.FC<PreviewProps> = ({ code, buildError }) => {
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
      {buildError && (
        <div className="preview-error">
          <h4>Build Error</h4>
          {buildError}
        </div>
      )}
    </div>
  );
};

export default Preview;
