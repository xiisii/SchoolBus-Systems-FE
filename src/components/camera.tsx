import { Box, BoxProps, Stack } from "@mui/material";
import { CSSProperties, ReactNode, useEffect, useRef, useState } from "react";
import { PiVideoCameraSlashFill } from "react-icons/pi";
import { getCameraImage } from "src/utils/url-handler";

export const Camera = ({
  cam_id,
  style,
  onError,
  onConnected,
  onNewImage,
  renderError,
  ...props
}: {
  cam_id: string;
  style?: CSSProperties;
  onError?: () => void;
  onConnected?: () => void;
  onNewImage?: (base64: string) => void;
  renderError?: () => ReactNode;
} & BoxProps) => {
  const [base64, setBase64] = useState<string>();
  const [error, setError] = useState(false);
  const counting = useRef<number | null>(null);

  useEffect(() => {
    const loop = setInterval(async () => {
      try {
        const newBase64 = await getCameraImage(cam_id);
        onNewImage?.(newBase64);
        setBase64(newBase64);
        setError(false);
        if (counting.current == null || counting.current > 0) {
          onConnected?.();
        }
        counting.current = 0;
      } catch (error) {
        counting.current = (counting.current || 0) + 1;
        if (counting.current == 4) {
          setError(true);
          onError?.();
        }
      }
    }, 1000);
    return () => {
      clearInterval(loop);
    };
  }, [cam_id, onConnected, onError, onNewImage]);

  return (
    <Box {...props}>
      {error ? (
        <Stack
          width="100%"
          height="100%"
          alignItems="center"
          justifyContent="center"
        >
          {renderError ? (
            renderError()
          ) : (
            <PiVideoCameraSlashFill size={32} color="white" />
          )}
        </Stack>
      ) : (
        <img
          src={base64}
          height="100%"
          width="100%"
          style={{ objectFit: "cover" }}
        />
      )}
    </Box>
  );
};
