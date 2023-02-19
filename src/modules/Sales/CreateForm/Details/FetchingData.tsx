import Accordion from "@components/Accordion";
import { ListIndex, RemoveStatus } from "@stores/Common";
import { SalesDetailsPayload } from "@stores/Sales";
import {
  FC,
  ReactElement,
  useEffect,
  Fragment,
  ChangeEventHandler,
} from "react";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import DetailsContent from "./Content";

const FetchingDataDetails: FC = (): ReactElement => {
  const resData = useRecoilValue(SalesDetailsPayload);
  const setRemoveStatus = useSetRecoilState(RemoveStatus);
  const [deletedListArr, setDeletedListArr] =
    useRecoilState<number[]>(ListIndex);

  const handleCheck: ChangeEventHandler<HTMLInputElement> = (event) => {
    let updatedList: number[] = [...deletedListArr];
    if (event.target.checked) {
      updatedList = [...deletedListArr, parseInt(event.target.value)];
    } else {
      updatedList.splice(
        deletedListArr.indexOf(parseInt(event.target.value)),
        1
      );
    }
    setDeletedListArr(updatedList);
  };

  useEffect(() => {
    deletedListArr.length === 0
      ? setRemoveStatus(false)
      : setRemoveStatus(true);
  }, [deletedListArr.length, setRemoveStatus]);

  console.log("Res Data", resData);

  return (
    <Fragment>
      {resData?.map((detail, index) => (
        <Accordion
          key={index}
          index={index}
          title={detail.InventoryID + " - " + detail.Description}
          onChange={handleCheck}
          value={index.toString()}
          withCheckbox={true}
          withButton={false}
        >
          <DetailsContent {...detail} />
        </Accordion>
      ))}
    </Fragment>
  );
};

export default FetchingDataDetails;
