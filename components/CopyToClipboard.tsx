export const CopyToClipboard: IComponent<{
  text: string;
}> = ({ children, text }) => {
  return (
    <div className="w-full" onClick={() => navigator.clipboard.writeText(text)}>
      {children}
    </div>
  );
};
