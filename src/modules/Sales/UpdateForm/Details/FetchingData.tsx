import Accordion from "@components/Accordion";
import useFetchDetailSalesOrder from "@hooks/Sales/useFetchDetailSalesOrder";
import { ListIndex, RemoveStatus } from "@stores/Common";
import {
  FC,
  ReactElement,
  useEffect,
  Fragment,
  ChangeEventHandler,
} from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useSetRecoilState, useRecoilValue } from "recoil";
import DetailsContent from "./Content";

const FetchingDataDetails: FC = (): ReactElement => {
  const { slug } = useParams();
  const { data: resData } = useFetchDetailSalesOrder(slug as string);
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
      {resData?.Details.map((detail, index) => (
        <Accordion
          key={index}
          index={index}
          title={detail.InventoryID + " - " + detail.Description}
          onChange={handleCheck}
          value={index.toString()}
          withCheckbox={false}
          withButton={false}
        >
          <DetailsContent {...detail} />
        </Accordion>
      ))}
    </Fragment>
  );
};

export default FetchingDataDetails;
