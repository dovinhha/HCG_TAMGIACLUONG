import _ from "lodash";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
export const convertData = (data, setDataConvered, caculate) => {
  let tempConvertData = [];
  data.map((item, index) => {
    const hypothesis = item
      .slice(item.indexOf(" ") + 1, item.indexOf(" => "))
      .split(", ");
    const result = item.slice(item.indexOf(" => ") + 4, item.indexOf(" = "));
    const obj = {
      index: index,
      a: false,
      b: false,
      c: false,
      ha: false,
      hb: false,
      hc: false,
      A: false,
      B: false,
      C: false,
      S: false,
      p: false,
      result: result,
      distance: -1,
    };
    hypothesis.forEach((val, inVal) => {
      obj[val] = true;
    });
    tempConvertData.push(obj);
  });
  setDataConvered(tempConvertData);
};

export const handleCalculate = (
  arrHypothesis,
  dataConvered,
  caculate,
  setSATResult,
  setHypoDistance,
  setArrTable
  // arrTable
) => {
  const tempDataConvered = handleCalculateDistanceEachRules(
    caculate,
    dataConvered
  );
  const arrTable = [];
  setHypoDistance(tempDataConvered);
  let tempHypothesisConvert = [];
  let SAT = [];
  let SATUsed = [];
  arrHypothesis.map((item, index) => {
    item.map((val, inVal) => {
      if (val.value !== "") {
        tempHypothesisConvert.push(val.name.trim());
      }
    });
  });
  let indexApproved = [];
  const SATResult = callbackCaculate(
    tempHypothesisConvert,
    SAT,
    SATUsed,
    tempDataConvered,
    indexApproved,
    setArrTable,
    arrTable
  );
  setSATResult(SATResult);
};

const callbackCaculate = (
  tempHypothesisConvert,
  SAT,
  SATUsed,
  dataConvered,
  indexApproved,
  setArrTable,
  arrTable
) => {
  const arrHypothesisCurrent = [];
  if (!_.isEmpty(dataConvered)) {
    dataConvered.map((item, index) => {
      if (
        !_.isEmpty(indexApproved) &&
        indexApproved.indexOf(item.index) !== -1
      ) {
        return;
      }
      let check = 0;
      let checkRequire = 0;
      let checkResult = false;
      Object.keys(item).map((key, inKey) => {
        if (item[key] === true) {
          checkRequire++;
        }
        tempHypothesisConvert.map((val, inVal) => {
          if (item[key] === true && key === val) {
            check++;
          }
          if (item[key] === val && key === "result") {
            checkResult = true;
          }
        });
      });
      if (
        check <= tempHypothesisConvert.length &&
        check > 1 &&
        checkRequire === check &&
        !checkResult
      ) {
        arrHypothesisCurrent.push(item);
        SAT.push(item);
      }
    });

    if (!_.isEmpty(arrHypothesisCurrent)) {
      let indexMinDistance = 0;
      let indexHypothesisCurrent = arrHypothesisCurrent[0].index;
      let valueMinDistance = arrHypothesisCurrent[0].distance;
      let checkResult = false;
      let indexResult = -1;
      arrHypothesisCurrent.every((item, index) => {
        if (item.distance === 0) {
          checkResult = true;
          indexResult = index;
          return false;
        }
        if (valueMinDistance > item.distance) {
          indexMinDistance = index;
          indexHypothesisCurrent = item.index;
          valueMinDistance = item.distance;
        }
        return true;
      });
      indexApproved.push(indexHypothesisCurrent);
      if (checkResult) {
        arrTable.push({
          arrHypoConvert: [...tempHypothesisConvert],
          arrHypoCurrent: [...arrHypothesisCurrent],
          arrSAT: [...SATUsed, arrHypothesisCurrent[indexResult]],
        });
        setArrTable(arrTable);
        return [...SATUsed, arrHypothesisCurrent[indexResult]];
      }
      SATUsed = [...SATUsed, arrHypothesisCurrent[indexMinDistance]];
      arrTable.push({
        arrHypoConvert: [...tempHypothesisConvert],
        arrHypoCurrent: [...arrHypothesisCurrent],
        arrSAT: [...SATUsed],
      });
      tempHypothesisConvert = [
        ...tempHypothesisConvert,
        arrHypothesisCurrent[indexMinDistance].result,
      ];
      SAT.filter((item, index) => item.index !== indexHypothesisCurrent);
      return callbackCaculate(
        tempHypothesisConvert,
        SAT,
        SATUsed,
        dataConvered,
        indexApproved,
        setArrTable,
        arrTable
      );
    } else {
      setArrTable([]);
      store.addNotification({
        title: "Thông báo!",
        message: "Giả thuyết đã cho không thể tính!",
        type: "danger",
        container: "bottom-right",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          onScreen: true,
          pauseOnHover: true,
          duration: 5000,
        },
      });
      return [];
    }
  }
};

export const handleCalculateDistanceEachRules = (caculate, dataConvered) => {
  let tempDataConvert = [...dataConvered];
  dataConvered.map((item, index) => {
    let distance = 0;
    if (item?.result === caculate) {
      tempDataConvert[index].distance = distance;
    } else {
      let arrParent = [{ ...item }];
      let arrRuleApproved = [item.index];
      const resultCallback = callbackCaculateDistance(
        arrParent,
        item,
        distance,
        arrRuleApproved,
        dataConvered,
        caculate
      );
      tempDataConvert[index].distance = resultCallback;
    }
  });
  return [...tempDataConvert];
};

const callbackCaculateDistance = (
  arrParent,
  objCurrent,
  distance,
  arrRuleApproved,
  dataConvered,
  caculate
) => {
  distance++;
  const tempArrFound = [];
  dataConvered.map((item, index) => {
    if (arrRuleApproved.indexOf(item?.index) !== -1) return;
    Object.keys(item).map((key, inKey) => {
      if (item[key] === true && key === objCurrent.result) {
        tempArrFound.push(item);
      }
    });
  });
  if (_.isEmpty(tempArrFound)) {
    return -1;
  }
  let checkResult = false;
  tempArrFound.map((val, inVal) => {
    if (val.result === caculate) {
      checkResult = true;
    }
  });
  if (checkResult) {
    return distance;
  } else {
    let resultCallback = -1;
    const arrResultCallback = [];
    tempArrFound.map((val, inVal) => {
      let tempDistanceCallback = distance;
      arrParent.push(val);
      arrRuleApproved.push(val.index);
      resultCallback = callbackCaculateDistance(
        arrParent,
        val,
        tempDistanceCallback,
        arrRuleApproved,
        dataConvered,
        caculate
      );
      resultCallback !== -1 && arrResultCallback.push(resultCallback);
    });
    return !_.isEmpty(arrResultCallback)
      ? Math.min.apply(Math, arrResultCallback)
      : -1;
  }
};

export default {
  convertData,
  handleCalculate,
  handleCalculateDistanceEachRules,
};
