import { FC, Dispatch, ReactElement, SetStateAction } from "react";
import { useZxing } from "react-zxing";

const BarcodeScanner: FC<{
  onSuccess: Dispatch<SetStateAction<boolean>>;
  onRes: Dispatch<SetStateAction<string>>;
  onClose: Dispatch<SetStateAction<boolean>>;
}> = ({ onSuccess, onClose, onRes }): ReactElement => {
  const { ref } = useZxing({
    onResult(result) {
      onRes(result.getText());
      onSuccess(true);
      onClose(false);
    },
  });

  return (
    <video
      className="border-2 border-blue-400 rounded-lg w-auto h-[200px] max-w-auto"
      ref={ref}
    />
  );
};

export default BarcodeScanner;
