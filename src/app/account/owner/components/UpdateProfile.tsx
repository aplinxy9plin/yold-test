import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/Dialog";
import { PenIcon } from "react-line-awesome";
import { Button } from "@/components/ui/Button";
import { Typography } from "@/components/ui/Typography";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { useUser } from "@/hooks/useUser";
import { useUpdateProfile } from "@/hooks/useUpdateProfile";

const UpdateProfile = () => {
  const { user, isLoading: isUserLoading } = useUser();
  const { update } = useUpdateProfile();
  const [updatedUser, setUpdatedUser] = useState({ ...user });
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSave = async () => {
    if (!updatedUser.name || !updatedUser.slug) {
      setError("Имя и адрес профиля обязательны для заполнения");
      return;
    }
    try {
      setIsLoading(true);
      setError(null);
      await update({
        name: updatedUser.name,
        description: updatedUser.description || null,
        slug: updatedUser.slug,
      });
      setOpen(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Произошла ошибка");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setUpdatedUser({ ...user });
          setOpen(isOpen);
        }}
      >
        <Button
          variant="secondary"
          before={<PenIcon />}
          onClick={() => setOpen(true)}
        >
          Редактировать
        </Button>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              <Typography variant="title">Редактировать профиль</Typography>
            </DialogTitle>
            {error && <div className="text-error mb-4">{error}</div>}
            <div className="flex flex-col gap-4">
              <Input
                label="Имя"
                placeholder="Имя"
                value={updatedUser?.name || ""}
                maxLength={100}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, name: e.target.value })
                }
              />
              <Input
                label="Адрес профиля"
                prepend="example.com/"
                placeholder="Адрес профиля"
                value={updatedUser?.slug || ""}
                maxLength={100}
                onChange={(e) =>
                  setUpdatedUser({ ...updatedUser, slug: e.target.value })
                }
              />
              <Textarea
                className="h-[154px]"
                label="Описание"
                placeholder="Описание"
                maxLength={1000}
                value={updatedUser?.description || ""}
                onChange={(e) =>
                  setUpdatedUser({
                    ...updatedUser,
                    description: e.target.value,
                  })
                }
              />
            </div>
            <div className="flex items-center justify-between gap-2.5 mt-[25px]">
              <Button
                onClick={() => {
                  setOpen(false);
                  setUpdatedUser({ ...user });
                }}
                className="w-full h-[50px]"
                variant="secondary"
              >
                Отменить
              </Button>
              <Button
                onClick={handleSave}
                className="w-full h-[50px]"
                variant="primary"
                disabled={isLoading || isUserLoading}
              >
                {isLoading ? "Сохраняется..." : "Сохранить"}
              </Button>
            </div>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfile;
