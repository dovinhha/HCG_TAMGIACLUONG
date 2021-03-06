import _ from "lodash";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";

// hàm chuyển đổi dữ liệu file text sang dạng array object
export const convertData = (data, setDataConvered, caculate) => {
  let tempConvertData = [];
  data.map((item, index) => {
    const hypothesis = item
      .slice(item.indexOf(" ") + 1, item.indexOf(" => "))
      .split(", ");
    const result = item.slice(item.indexOf(" => ") + 4, item.indexOf(" = "));
    // vd: r1: a, b, c => p = ( a + b + c ) / 2
    // hypothesis là giả thuyết của luật lấy từ đầu cho đến "=>"
    // hypothesis = ["a", "b", "c"]
    // result là kết quả của luật lấy từ "=>" cho đến "="
    // result = "p"
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
    // const obj = {
    //   index: index,
    //   a: true,
    //   b: true,
    //   c: true,
    //   ha: false,
    //   hb: false,
    //   hc: false,
    //   A: false,
    //   B: false,
    //   C: false,
    //   S: false,
    //   p: false,
    //   result: "p",
    //   distance: -1,
    // };
    tempConvertData.push(obj);
    // tempConvertData là mảng chứa các đối tượng (obj) luật
  });
  setDataConvered(tempConvertData);
};

// hàm tính toán đưa ra các luật thỏa mãn yêu cầu
export const handleCalculate = (
  arrHypothesis,
  dataConvered,
  caculate,
  setSATResult,
  setHypoDistance,
  setArrTable
) => {
  // trước khi tính cần tính khoảng cách từ kết luận của các luật đến KL
  const tempDataConvered = handleCalculateDistanceEachRules(
    caculate,
    dataConvered
  );
  const arrTable = [];
  setHypoDistance(tempDataConvered);
  let tempHypothesisConvert = [];
  let SAT = [];
  let SATUsed = [];
  // tách giả thuyết của bài toán arrHypothesis thành mảng
  // vd: ["a", "b", "c"]
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

// hàm đệ quy tính toán trả ra các luật thỏa mãn điều kiện
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
      // nếu luật đã được duyệt thì return bỏ qua
      if (
        !_.isEmpty(indexApproved) &&
        indexApproved.indexOf(item.index) !== -1
      ) {
        return;
      }
      let check = 0; // số thuộc tính = true và bằng giả thuyết
      let checkRequire = 0; // số thuộc tính = true
      let checkResult = false; // kiểm tra xem giả thuyết có chứa kết luận của luật không
      // duyệt obj
      Object.keys(item).map((key, inKey) => {
        if (item[key] === true) {
          checkRequire++;
        }
        // duyệt giả thuyết được cho bởi bài toán
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
    // kiểm tra arrHypothesisCurrent có chứa luật thỏa mãn điều kiện
    if (!_.isEmpty(arrHypothesisCurrent)) {
      let indexMinDistance = 0; // vị trí luật chứa khoảng cách bé nhất
      let indexHypothesisCurrent = arrHypothesisCurrent[0].index; // vị trí luật chứa khoảng cách bé nhất hiện tại
      let valueMinDistance = arrHypothesisCurrent[0].distance; // giá trị khoảng cách bé nhất hiện tại
      let checkResult = false; // kiểm tra khoảng cách của luật
      let indexResult = -1; // vị trí của luật chứa KL
      arrHypothesisCurrent.every((item, index) => {
        // kiểm tra khoảng cách của luật. nếu khoảng cách = 0 thì dừng luôn
        if (item.distance === 0) {
          checkResult = true;
          indexResult = index;
          return false;
        }
        // ngược lại thì gán khoảng cách min
        if (valueMinDistance > item.distance) {
          indexMinDistance = index;
          indexHypothesisCurrent = item.index;
          valueMinDistance = item.distance;
        }
        return true;
      });
      // thêm các vị trí đã duyệt vào indexApproved để sau đó đệ quy thì check để bỏ qua luật này
      indexApproved.push(indexHypothesisCurrent);
      // nếu giả thuyết chứa kết luận thì trả về mảng chứa các luật đã được sử dụng và luật đang được duyệt
      if (checkResult) {
        arrTable.push({
          arrHypoConvert: [...tempHypothesisConvert],
          arrHypoCurrent: [...arrHypothesisCurrent],
          arrSAT: [...SATUsed, arrHypothesisCurrent[indexResult]],
        });
        setArrTable(arrTable);
        return [...SATUsed, arrHypothesisCurrent[indexResult]];
      }
      // ngược lại tiếp tục đệ quy
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

// hàm tính khoảng cách từ kết luận của các luật đến KL
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
