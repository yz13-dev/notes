import { postV1Notes } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@yz13/ui/dialog";
import { Input } from "@yz13/ui/input";
import { Label } from "@yz13/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@yz13/ui/select";
import { toast } from "@yz13/ui/sonner";
import { Textarea } from "@yz13/ui/textarea";
import { Loader2Icon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useUser } from "../hooks/use-user";
import { useWorkspaces } from "../hooks/use-workspaces";
import { useNotesStore } from "../stores/notes-store";

interface CreateNoteModalProps {
  children: React.ReactNode;
}

export default function CreateNoteModal({ children }: CreateNoteModalProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [workspaceId, setWorkspaceId] = useState("");
  const [content, setContent] = useState("");

  const [user] = useUser();
  const [workspaces] = useWorkspaces();
  const { addNote } = useNotesStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim() || !workspaceId) {
      toast.error("Заполните обязательные поля");
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
        setOpen(false);

        // Очищаем форму
        setName("");
        setDescription("");
        setContent("");
        setWorkspaceId("");
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при создании заметки");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Создать заметку</DialogTitle>
          <DialogDescription>
            Заполните форму для создания новой заметки
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="workspace">Пространство *</Label>
            <Select value={workspaceId} onValueChange={setWorkspaceId} required>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Выберите пространство" />
              </SelectTrigger>
              <SelectContent>
                {workspaces.map((workspace) => (
                  <SelectItem key={workspace.id} value={workspace.id}>
                    {workspace.name || "Без названия"}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Название *</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Введите название заметки"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Описание</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Введите описание заметки"
              rows={2}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Содержание</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Введите содержание заметки"
              rows={4}
            />
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={loading}
            >
              Отмена
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  Создание...
                  <Loader2Icon className="h-4 w-4 animate-spin" />
                </>
              ) : (
                <>
                  Создать
                  <PlusIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
