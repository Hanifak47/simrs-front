interface ImagePreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  src: string;
}

export const ImagePreviewModal = ({
  isOpen,
  onClose,
  src,
}: ImagePreviewModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="modal z-50 fixed top-0 left-0 w-full h-full flex items-center justify-center">
      <div
        className="absolute w-full h-full bg-[#292D32B2]"
        onClick={onClose}
      />
      <div className="relative flex flex-col w-[720px] sm:w-full h-fit m-auto items-center justify-center gap-8 z-10">
        <div className="flex items-center justify-center w-full max-h-[80vh]">
          <div className="rounded-2xl overflow-hidden w-full">
            <img
              src={src}
              className="w-full h-full object-contain max-h-[80vh]"
              alt="Proof"
            />
          </div>
        </div>
        <button
          onClick={onClose}
          className="flex items-center w-fit h-12 rounded-full border border-white/10 bg-white/10 py-3 px-4 gap-2 self-center"
        >
          <img
            src="/assets/images/icons/close-circle-white.svg"
            className="size-6"
            alt="Close icon"
          />
          <p className="font-medium text-white">Close Preview</p>
        </button>
      </div>
    </div>
  );
};
