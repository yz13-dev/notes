import { Route } from ".react-router/types/app/routes/workspace/[id]/new/+types/page";
import Breadcrumbs from "@/components/breadcrumbs";
import MdxEditor from "@/components/mdx-editor";
import { useNotesStore } from "@/stores/notes-store";
import { postV1Notes } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Separator } from "@yz13/ui/separator";
import { toast } from "@yz13/ui/sonner";
import { Textarea } from "@yz13/ui/textarea";
import { ArrowLeftIcon, Loader2Icon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function ({ params }: Route.ComponentProps) {
  const workspaceId = params.id;
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");

  // const [workspace, workspaceLoading] = useWorkspace(workspaceId);
  // const [tags] = useWorkspaceTags(workspaceId);
  const { addNote } = useNotesStore();

  // const workspaceName = workspace?.name ?? "Без названия";
  // const workspaceDescription = workspace?.description ?? "Без описания";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Введите название заметки");
      return;
    }

    setLoading(true);
    try {
      const newNote = await postV1Notes({
        name: name.trim(),
        description: description.trim() || undefined,
        content: content.trim() || undefined,
        workspace_id: workspaceId
      });

      if (newNote) {
        // Добавляем новую заметку в стор
        addNote(newNote);

        toast.success("Заметка создана");

        // Переходим к созданной заметке
        navigate(`/workspace/${workspaceId}/${newNote.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при создании заметки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Новая заметка</title>
      <div className="px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to={`/workspace/${workspaceId}`}>
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <Breadcrumbs workspaceId={workspaceId} />
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate(`/workspace/${workspaceId}`)}
              disabled={loading}
            >
              Отмена
            </Button>

            <Button
              onClick={handleSubmit}
              disabled={loading || !name.trim()}
            >
              {loading ? (
                <>
                  Создание...
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Создать заметку
                  <SaveIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full py-8 px-6 *:block space-y-2">
        <div className="flex flex-wrap flex-row gap-1 items-start w-full">
          {/* {tags.map(tag => (
            <Badge variant="secondary" key={tag.id}>{tag.tag}</Badge>
          ))} */}
        </div>

        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название заметки"
            className="text-4xl font-semibold text-foreground border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none shadow-none"
            required
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание заметки"
            className="text-base text-muted-foreground border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none rounded-none shadow-none"
            rows={1}
          />
        </div>
      </div>

      <Separator />

      <div className="w-full px-6 py-8 space-y-3">
        <MdxEditor
          placeholder="Начните набирать текст здесь..."
          content={content}
          onContentChange={setContent}
        />
      </div>
    </>
  );
}
