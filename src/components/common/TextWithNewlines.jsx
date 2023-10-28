import React from "react";

export default function TextWithNewlines({ text }) {
  const lines = text.split("\n");
  return (
    <div>
      {lines.map((line, index) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={index}>
          {line}
          {index < lines.length - 1 && <br />}
        </React.Fragment>
      ))}
    </div>
  );
}
