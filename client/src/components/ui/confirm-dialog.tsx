import { Button } from "./button";
import { Modal } from "./modal";

type ConfirmDialogProps = {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export const ConfirmDialog = ({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) => (
  <Modal title={title} size="md" onClose={onCancel}>
    <p className="text-sm leading-6 text-gray-500">{message}</p>

    <div className="mt-8 flex justify-end gap-3">
      <Button variant="secondary" onClick={onCancel}>
        Cancel
      </Button>

      <Button variant="danger" onClick={onConfirm}>
        {confirmLabel}
      </Button>
    </div>
  </Modal>
);
