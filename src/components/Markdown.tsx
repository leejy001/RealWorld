import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styled from "styled-components";

interface MarkdownProp {
  markdown: string;
}

function Markdown({ markdown }: MarkdownProp) {
  return (
    <MarkdownStyle>
      <ReactMarkdown children={markdown} remarkPlugins={[remarkGfm]} />
    </MarkdownStyle>
  );
}

export default Markdown;

const MarkdownStyle = styled.div`
  margin: 32px 0px;
  font-size: 20px;
`;
