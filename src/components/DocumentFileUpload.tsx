import {
  AlertCircleIcon,
  PaperclipIcon,
  UploadCloudIcon,
  XIcon,
} from "lucide-react";
import { forwardRef, useImperativeHandle, useState } from "react";

import { formatBytes, useFileUpload } from "@/hooks/use-file-upload";
import { Button } from "@/components/ui/button";
import { useTranslations } from "next-intl";

interface DocumentFileUploadProps {
  onFileChange?: (file: File | null) => void;
  maxSize?: number;
  accept?: string;
  disabled?: boolean;
  initialFile?: File | null;
  initialUrl?: string;
}

export interface DocumentFileUploadRef {
  clearFile: () => void;
  getFile: () => File | null;
}

const DocumentFileUpload = forwardRef<
  DocumentFileUploadRef,
  DocumentFileUploadProps
>(
  (
    {
      onFileChange,
      maxSize = 5 * 1024 * 1024,
      accept = ".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp",
      disabled = false,
      initialFile = null,
      initialUrl = null,
    },
    ref,
  ) => {
    const t = useTranslations();
    const [initialUrlCleared, setInitialUrlCleared] = useState(false);
    const [
      { files, isDragging, errors },
      {
        handleDragEnter,
        handleDragLeave,
        handleDragOver,
        handleDrop,
        openFileDialog,
        removeFile,
        getInputProps,
      },
    ] = useFileUpload({
      maxSize,
      accept,
      multiple: false,
      initialFiles: initialFile
        ? [
            {
              name: initialFile.name,
              size: initialFile.size,
              type: initialFile.type,
              url: "",
              id: `${initialFile.name}-${Date.now()}`,
            },
          ]
        : [],
      onFilesChange: (newFiles) => {
        const file =
          newFiles.length > 0 && newFiles[0].file instanceof File
            ? newFiles[0].file
            : null;
        onFileChange?.(file);
      },
    });

    useImperativeHandle(ref, () => ({
      clearFile: () => {
        if (files.length > 0) {
          removeFile(files[0].id);
        } else if (initialUrl) {
          setInitialUrlCleared(true);
          onFileChange?.(null);
        }
      },
      getFile: (): File | null => {
        if (!files.length) return null;
        const file = files[0].file;
        return file instanceof File ? file : null;
      },
    }));

    const file = files[0];
    const hasExistingFile = Boolean(initialUrl && !initialUrlCleared);

    return (
      <div className="flex flex-col gap-2">
        {/* Drop area */}
        <div
          role="button"
          onClick={disabled ? undefined : openFileDialog}
          onDragEnter={disabled ? undefined : handleDragEnter}
          onDragLeave={disabled ? undefined : handleDragLeave}
          onDragOver={disabled ? undefined : handleDragOver}
          onDrop={disabled ? undefined : handleDrop}
          data-dragging={isDragging || undefined}
          className={`hover:bg-accent/50 data-[dragging=true]:bg-accent/50 has-[input:focus]:border-ring has-[input:focus]:ring-ring/50 flex min-h-46 flex-col items-center justify-center rounded-[15px] border-2 border-dashed border-primary p-4 transition-colors has-disabled:pointer-events-none has-disabled:opacity-50 has-[input:focus]:ring-[3px] ${
            disabled ? "pointer-events-none opacity-50" : ""
          }`}
        >
          <input
            {...getInputProps()}
            className="sr-only"
            aria-label="Upload file"
            disabled={disabled || Boolean(file) || hasExistingFile}
            accept={accept}
          />

          <div className="flex flex-col items-center justify-center text-center">
            <UploadCloudIcon className="w-9 h-9 text-primary mb-2" />
            {file || hasExistingFile ? (
              <>
                <p className="mb-1.5 text-sm font-medium">
                  {t("documentFileUpload.fileSelected")}
                </p>
                {/* <p className="text-muted-foreground text-xs">
                  {t(
                    'documentFileUpload.clickToChange',
                    'Click to change file',
                  )}
                </p> */}
              </>
            ) : (
              <>
                <div className="flex items-center justify-center gap-1 text-sm">
                  <span>
                    {t("documentFileUpload.dragFiles")}
                  </span>
                  <span className="text-primary font-bold">
                    {t("documentFileUpload.browse")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-1 font-inter">
                  {t(
                    "documentFileUpload.maxSize",
                    {
                      maxSize: formatBytes(maxSize),
                    },
                  )}
                </p>
              </>
            )}
          </div>
        </div>

        {errors.length > 0 && (
          <div
            className="text-destructive flex items-center gap-1 text-xs"
            role="alert"
          >
            <AlertCircleIcon className="size-3 shrink-0" />
            <span>{errors[0]}</span>
          </div>
        )}

        {/* File display */}
        {(file || hasExistingFile) && (
          <div className="space-y-2">
            <div
              key={file?.id || "existing-file"}
              className="flex items-center justify-between gap-2 rounded-xl border px-4 py-2"
            >
              <div className="flex items-center gap-3 overflow-hidden">
                <PaperclipIcon
                  className="size-4 shrink-0 opacity-60"
                  aria-hidden="true"
                />
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-medium max-w-60">
                    {file
                      ? file.file instanceof File
                        ? file.file.name
                        : file.file.name
                      : initialUrl?.split("/").pop() || t("Existing file")}
                  </p>
                  <p className="text-muted-foreground text-xs">
                    {file
                      ? formatBytes(
                          file.file instanceof File
                            ? file.file.size
                            : file.file.size,
                        )
                      : t("Existing file")}
                  </p>
                </div>
              </div>

              {!disabled && (
                <Button
                  size="icon"
                  variant="ghost"
                  type="button"
                  className="text-muted-foreground/80 hover:text-foreground -me-2 size-8 hover:bg-transparent"
                  onClick={() => {
                    if (file) {
                      removeFile(file.id);
                    } else if (hasExistingFile) {
                      setInitialUrlCleared(true);
                      onFileChange?.(null);
                    }
                  }}
                  aria-label="Remove file"
                >
                  <XIcon className="size-4" aria-hidden="true" />
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    );
  },
);

DocumentFileUpload.displayName = "DocumentFileUpload";

export default DocumentFileUpload;
