import { headingsPlugin, linkPlugin, listsPlugin, markdownShortcutPlugin, MDXEditor, quotePlugin, thematicBreakPlugin } from "@mdxeditor/editor";
import '@mdxeditor/editor/style.css';
import "../styles/markdown.css";

export default function ({
  content = "",
  onContentChange,
  placeholder,
}: {
  placeholder?: string
  content?: string
  onContentChange?: (content: string) => void
}) {
  return <MDXEditor
    placeholder={placeholder}
    markdown={content}
    onChange={onContentChange}
    className="markdown"
    plugins={[
      headingsPlugin(),
      linkPlugin(),
      listsPlugin(),
      quotePlugin(),
      thematicBreakPlugin(),
      markdownShortcutPlugin()
    ]}
    contentEditableClassName="!p-0"
  />;
}
