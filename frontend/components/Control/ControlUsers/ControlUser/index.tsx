import { SButton } from "@/components/UI/Button";
import { addDetector, removeDetector } from "@/store/actions/detector";
import { ICompany } from "@/types/company";
import { IDetector } from "@/types/detector";
import { IWorker } from "@/types/user";
import { LeftOutlined, RightOutlined } from "@ant-design/icons";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import ControlSensors from "../../ControlSensors";
import { useControlContext } from "../../indext";
import {
  SControlUser,
  SControlUserTitle,
  SControlUserMain,
  SControlUserArrows,
} from "./styles";

interface IControlUser {
  worker: IWorker;
  companyItem: ICompany;
}

const ControlUser = ({ worker, companyItem }: IControlUser) => {
  const [checkedList, setCheckedList] = useState<IDetector[]>([]);
  const { companyCheckedList } = useControlContext();

  const dispatch = useDispatch();

  const addDetectorHandler = () => {
    dispatch(addDetector(companyItem.id, worker.id, checkedList));
  };

  const removeDetectorsHandler = () => {
    dispatch(removeDetector(companyItem.id, worker.id, companyCheckedList));
  };

  return (
    <SControlUser>
      <SControlUserTitle>{`${worker.first_name} ${worker.last_name}`}</SControlUserTitle>
      <SControlUserMain>
        <SControlUserArrows>
          <SButton
            width={"32px"}
            height={"32px"}
            disabled={!!!companyCheckedList.length}
            onClick={removeDetectorsHandler}
          >
            <RightOutlined style={{ fontSize: "20px" }} />
          </SButton>
          <SButton
            width={"32px"}
            height={"32px"}
            disabled={!!!checkedList.length}
            onClick={addDetectorHandler}
          >
            <LeftOutlined style={{ fontSize: "20px" }} />
          </SButton>
        </SControlUserArrows>
        <ControlSensors
          detectors={worker.my_detectors}
          companyItem={companyItem}
          checkedList={checkedList}
          setCheckedList={setCheckedList}
        />
      </SControlUserMain>
    </SControlUser>
  );
};

export default ControlUser;
