import MdxEditor from "@/components/mdx-editor";
import { putV1NotesNoteId } from "@yz13/api";
import { toast } from "@yz13/ui/sonner";
import { useDebounceEffect } from "ahooks";
import { useState } from "react";



type Props = {
  defaultContent?: string
  noteId: string
}
export default function ({ defaultContent = "", noteId }: Props) {

  const [content, setContent] = useState(defaultContent);

  const updateContent = async (content: string) => {
    try {
      const result = await putV1NotesNoteId(noteId, { content })

      if (result) {
        toast.success("Заметка обновлена")
      }

    } catch (error) {
      console.log("error", error)
    }
  }

  useDebounceEffect(() => {
    if (!content) return;
    if (defaultContent === content) return;
    updateContent(content)
  }, [content, defaultContent], { wait: 750 })
  return (
    <MdxEditor
      placeholder="Начните набирать текст здесь..."
      content={content}
      onContentChange={setContent}
    />
  )
}
