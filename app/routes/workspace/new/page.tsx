import { useUser } from "@/hooks/use-user";
import { useRefreshWorkspaces } from "@/hooks/use-workspaces";
import { postV1Workspaces } from "@yz13/api";
import { Button } from "@yz13/ui/button";
import { Input } from "@yz13/ui/input";
import { Label } from "@yz13/ui/label";
import { toast } from "@yz13/ui/sonner";
import { Switch } from "@yz13/ui/switch";
import { Textarea } from "@yz13/ui/textarea";
import { ArrowLeftIcon, Loader2Icon, SaveIcon } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";

export default function () {
  const navigate = useNavigate();
  const [user] = useUser();
  const [refresh] = useRefreshWorkspaces();

  const [loading, setLoading] = useState(false);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [isPublic, setIsPublic] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Введите название пространства");
      return;
    }

    if (!user) {
      toast.error("Пользователь не найден");
      return;
    }

    setLoading(true);
    try {
      const newWorkspace = await postV1Workspaces({
        name: name.trim(),
        description: description.trim() || undefined,
        public: isPublic,
        owner: user.id
      });

      if (newWorkspace) {
        // Добавляем новое пространство в стор
        refresh();

        toast.success("Пространство создано");

        // Переходим к созданному пространству
        navigate(`/workspace/${newWorkspace.id}`);
      }
    } catch (error) {
      console.error(error);
      toast.error("Ошибка при создании пространства");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <title>Новое пространство</title>
      <div className="px-6 py-3 border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" asChild>
              <Link to="/">
                <ArrowLeftIcon className="h-4 w-4" />
              </Link>
            </Button>
            <span className="text-lg font-medium">Создание пространства</span>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              onClick={() => navigate("/")}
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
                  Создать пространство
                  <SaveIcon className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </div>
      </div>

      <div className="w-full py-8 px-6 space-y-2">
        <div className="flex flex-wrap flex-row gap-1 items-start w-full">
          {/* Здесь можно добавить теги в будущем */}
        </div>

        <div className="space-y-4">
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Введите название пространства"
            className="!text-4xl font-semibold text-foreground border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 rounded-none shadow-none"
            required
          />

          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Введите описание пространства"
            className="!text-base text-muted-foreground border-none p-0 focus-visible:ring-0 focus-visible:ring-offset-0 resize-none rounded-none shadow-none"
            rows={1}
          />
        </div>
        <div className="flex items-center gap-2">
          <Switch
            id="public"
            checked={isPublic}
            onCheckedChange={(checked) => setIsPublic(checked)}
          />
          <Label htmlFor="public" className="text-sm font-medium">
            Публичное пространство
          </Label>
        </div>
      </div>
    </>
  );
}
