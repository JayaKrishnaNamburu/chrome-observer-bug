import * as React from 'react'
import { ResizeObserver } from "./observer";

const url = URL.createObjectURL(
  new Blob(
    [
      `
  <body>
    <div id="container">
    </div>
  </body>
`
    ],
    { type: "text/html" }
  )
);

export default function IFrameBug() {
  const iframeRef = React.useRef(null);
  
  React.useEffect(() => {
    if (iframeRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        // console.log(entries);
      });
      const elm = document.createElement("h1");
      elm.innerHTML = "Heading";
      iframeRef.current.contentDocument?.body?.append(elm);
      resizeObserver.observe(elm);
    }
  }, [iframeRef]);

  return (
    <div className="App">
      <iframe
        src={url}
        ref={iframeRef}
        title="Testing Resize Observer"
      ></iframe>
    </div>
  );
}
