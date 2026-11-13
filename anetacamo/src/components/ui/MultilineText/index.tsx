interface MultilineTextProps {
  text: string;
}

export default function MultilineText({ text }: MultilineTextProps) {
  return (
    <>
      {text.split("\n").map((line, i) => (
        <span key={i}>
          {i > 0 && <br />}
          {line}
        </span>
      ))}
    </>
  );
}
