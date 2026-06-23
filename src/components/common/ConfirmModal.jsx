const ConfirmModal = ({
  isOpen,
  title,
  message,
  confirmText,
  confirmColor = "bg-blue-600 hover:bg-blue-700",
  onConfirm,
  onCancel,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[90%] max-w-sm rounded-2xl bg-[#171717] border border-zinc-700 p-6">
        <h2 className="text-xl font-bold text-white">{title}</h2>

        <p className="mt-3 text-zinc-400 leading-relaxed">{message}</p>

        <div className="flex gap-3 mt-8">
          <button
            onClick={onCancel}
            className="flex-1 rounded-xl bg-zinc-700 py-3 hover:bg-zinc-600 transition"
          >
            Cancel
          </button>

          <button
            onClick={onConfirm}
            className={`flex-1 rounded-xl py-3 transition text-white ${confirmColor}`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
