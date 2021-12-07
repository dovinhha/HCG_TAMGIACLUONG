import React, { useState, useEffect } from "react";
import "./App.css";
import TapLuatTamGiacLuong_Nhom16 from "./TapLuatTamGiacLuong_Nhom16.txt";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import { makeStyles } from "@mui/styles";
import _ from "lodash";
import { store } from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import ReactNotification from "react-notifications-component";
import {
  handleCalculateDistanceEachRules,
  convertData,
  handleCalculate,
} from "./utils";

const readTextFile = (file, setData) => {
  var rawFile = new XMLHttpRequest();
  rawFile.open("GET", file, false);
  rawFile.onreadystatechange = () => {
    if (rawFile.readyState === 4) {
      if (rawFile.status === 200 || rawFile.status === 0) {
        var allText = rawFile.responseText;

        setData(allText.split("\n"));
      }
    }
  };
  rawFile.send(null);
};

function App() {
  const classes = useStyles();
  // const
  const [open, setOpen] = React.useState(false);
  const [data, setData] = useState([]);
  const [dataConvered, setDataConvered] = useState([]);
  const [hypoDistance, setHypoDistance] = useState([]);
  const [rules, setRules] = useState([]);
  const [SATResult, setSATResult] = useState([]);
  const [hyphos, setHyphos] = useState([]);
  const [arrTable, setArrTable] = useState([]);
  const [arrHypothesis, setArrHypothesis] = useState([
    [
      {
        label: "Cạnh a",
        name: "a",
        placeholder: "Nhập cạnh a",
        value: "",
        checked: false,
      },
      {
        label: "Cạnh b",
        name: "b",
        placeholder: "Nhập cạnh b",
        value: "",
        checked: false,
      },
      {
        label: "Cạnh c",
        name: "c",
        placeholder: "Nhập cạnh c",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "Chiều cao ha",
        name: "ha",
        placeholder: "Nhập chiều cao a",
        value: "",
        checked: false,
      },
      {
        label: "Chiều cao hb",
        name: "hb",
        placeholder: "Nhập chiều cao b",
        value: "",
        checked: false,
      },
      {
        label: "Chiều cao hc",
        name: "hc",
        placeholder: "Nhập chiều cao c",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "Góc A",
        name: "A",
        placeholder: "Nhập góc A",
        value: "",
        checked: false,
      },
      {
        label: "Góc B",
        name: "B",
        placeholder: "Nhập góc B",
        value: "",
        checked: false,
      },
      {
        label: "Góc C",
        name: "C",
        placeholder: "Nhập góc C",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "Diện tích S",
        name: "S",
        placeholder: "Nhập S",
        value: "",
        checked: false,
      },
      {
        label: "Nửa chu vi p",
        name: "p",
        placeholder: "Nhập p",
        value: "",
        checked: false,
      },
    ],
  ]);
  const [caculate, setCaculate] = useState("");
  const [labelCaculate, setLabelCaculate] = useState("");
  const [arrResult, setArrResult] = useState([
    {
      id: "canha",
      for: "canha",
      checked: false,
      value: "a",
      label: "Cạnh a",
      name: "conclude",
    },
    {
      id: "canhb",
      for: "canhb",
      checked: false,
      value: "b",
      label: "Cạnh b",
      name: "conclude",
    },
    {
      id: "canhc",
      for: "canhc",
      checked: false,
      value: "c",
      label: "Cạnh c",
      name: "conclude",
    },
    {
      id: "chieucaoha",
      for: "chieucaoha",
      checked: false,
      value: "ha",
      label: "Chiều cao ha",
      name: "conclude",
    },
    {
      id: "chieucaohb",
      for: "chieucaohb",
      checked: false,
      value: "hb",
      label: "Chiều cao hb",
      name: "conclude",
    },
    {
      id: "chieucaohc",
      for: "chieucaohc",
      checked: false,
      value: "hc",
      label: "Chiều cao hc",
      name: "conclude",
    },
    {
      id: "goca",
      for: "goca",
      checked: false,
      value: "A",
      label: "Góc A",
      name: "conclude",
    },
    {
      id: "gocb",
      for: "gocb",
      checked: false,
      value: "B",
      label: "Góc B",
      name: "conclude",
    },
    {
      id: "gocc",
      for: "gocc",
      checked: false,
      value: "C",
      label: "Góc C",
      name: "conclude",
    },
    {
      id: "s",
      for: "s",
      checked: false,
      value: "S",
      label: "Diện tích S",
      name: "conclude",
    },
    {
      id: "p",
      for: "p",
      checked: false,
      value: "p",
      label: "Nửa chu vi p",
      name: "conclude",
    },
  ]);
  // useEffect
  useEffect(() => {
    readTextFile(TapLuatTamGiacLuong_Nhom16, setData);
  }, [0]);
  useEffect(() => {
    convertData(data, setDataConvered);
  }, [data]);
  // function

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="App">
      <ReactNotification
        types={[
          {
            htmlClasses: ["notification"],
          },
        ]}
      />
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Tập luật tam giác lượng
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            {data.map((item, index) => {
              return <p key={index}>{item}</p>;
            })}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Đóng</Button>
        </DialogActions>
      </Dialog>
      <h1>Xây dựng hệ chuyên gia Tam giác lượng</h1>
      <h3>Giả thuyết: </h3>
      {/* <div class="d-flex flex-row"> */}
      <FormGroup>
        <Grid container>
          {arrHypothesis.map((item, index) => {
            return (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
                lg={3}
                md={3}
                sm={3}
                xs={6}
                item
              >
                {item.map((val, inVal) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          onChange={(e) => {
                            setSATResult([]);
                            setArrHypothesis([
                              ...arrHypothesis.slice(0, index),
                              [
                                ...arrHypothesis[index].slice(0, inVal),
                                {
                                  ...arrHypothesis[index][inVal],
                                  value: e.target.checked ? 1 : "",
                                  checked: e.target.checked,
                                },
                                ...arrHypothesis[index].slice(inVal + 1),
                              ],
                              ...arrHypothesis.slice(index + 1),
                            ]);
                          }}
                          checked={val.checked}
                        />
                      }
                      label={val.label}
                    />
                  );
                })}
              </Grid>
            );
          })}
        </Grid>
      </FormGroup>
      {/* <div class="item-input">
           {item.map((val, inVal) => {
            return (
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <span class="input-group-text" id="basic-addon1">
                    {val.label}
                  </span>
                </div>
                <input
                  type="number"
                  name={val.name}
                  value={val.value}
                  onChange={(e) => {
                    setSATResult([]);
                    setArrHypothesis([
                      ...arrHypothesis.slice(0, index),
                      [
                        ...arrHypothesis[index].slice(0, inVal),
                        {
                          ...arrHypothesis[index][inVal],
                          value:
                            Number(e.target.value) > 0
                              ? e.target.value
                              : "",
                        },
                        ...arrHypothesis[index].slice(inVal + 1),
                      ],
                      ...arrHypothesis.slice(index + 1),
                    ]);
                  }}
                  class="form-control"
                  placeholder={val.placeholder}
                />
              </div>
            );
          })}
        </div>
      </div> */}
      <h3>Kết luận: </h3>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div
          onChange={(e) => {
            setCaculate(e.target.value);
            setSATResult([]);
          }}
          class="d-flex flex-row align-items-center"
        >
          <h5>Kết quả cần tính</h5>
          {arrResult.map((item, index) => {
            return (
              <div class="form-check radio-item">
                <input
                  class="form-check-input"
                  type="radio"
                  name={item?.name}
                  id={item?.id}
                  value={item?.value}
                  onChange={(e) => {
                    if (e.target.checked) setLabelCaculate(item?.label);
                  }}
                />
                <label class="form-check-label" for={item?.for}>
                  {item?.label}
                </label>
              </div>
            );
          })}
        </div>
      </div>
      <div class="d-flex flex-row align-items-center justify-content-center mt-2">
        <button
          onClick={() => {
            const tempHyphos = [];
            const tempHyphos2 = [];
            arrHypothesis.map((item, index) => {
              item.map((val, inVal) => {
                if (val.value !== "") {
                  tempHyphos.push(val.label.trim());
                  tempHyphos2.push(val.name.trim());
                }
              });
            });
            setHyphos(tempHyphos);
            if (_.isEmpty(tempHyphos2)) {
              store.addNotification({
                title: "Thông báo!",
                message: "Vui lòng nhập giả thuyết!",
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
              return;
            }
            if (caculate !== "") {
              if (tempHyphos2.indexOf(caculate) !== -1) {
                store.addNotification({
                  title: "Thông báo!",
                  message:
                    "Kết quả cần tính đã nằm trong giả thuyết. Vui lòng chọn lại kết quả cần tính!",
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
                return;
              }
              handleCalculate(
                arrHypothesis,
                dataConvered,
                caculate,
                setSATResult,
                setHypoDistance,
                setArrTable,
                arrTable
              );
            } else {
              store.addNotification({
                title: "Thông báo!",
                message: "Vui lòng chọn kết quả cần tính!",
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
            }
          }}
          type="button"
          class="btn btn-primary"
        >
          Giải
        </button>
        <button
          onClick={() => {
            setSATResult([]);
            setArrHypothesis([
              [
                {
                  label: "Cạnh a",
                  name: "a",
                  placeholder: "Nhập cạnh a",
                  value: "",
                },
                {
                  label: "Cạnh b",
                  name: "b",
                  placeholder: "Nhập cạnh b",
                  value: "",
                },
                {
                  label: "Cạnh c",
                  name: "c",
                  placeholder: "Nhập cạnh c",
                  value: "",
                },
              ],
              [
                {
                  label: "Chiều cao ha",
                  name: "ha",
                  placeholder: "Nhập chiều cao a",
                  value: "",
                },
                {
                  label: "Chiều cao hb",
                  name: "hb",
                  placeholder: "Nhập chiều cao b",
                  value: "",
                },
                {
                  label: "Chiều cao hc",
                  name: "hc",
                  placeholder: "Nhập chiều cao c",
                  value: "",
                },
              ],
              [
                {
                  label: "Góc A",
                  name: "A",
                  placeholder: "Nhập góc A",
                  value: "",
                },
                {
                  label: "Góc B",
                  name: "B",
                  placeholder: "Nhập góc B",
                  value: "",
                },
                {
                  label: "Góc C",
                  name: "C",
                  placeholder: "Nhập góc C",
                  value: "",
                },
              ],
              [
                {
                  label: "Diện tích S",
                  name: "S",
                  placeholder: "Nhập S",
                  value: "",
                },
                {
                  label: "Nửa chu vi p",
                  name: "p",
                  placeholder: "Nhập p",
                  value: "",
                },
              ],
            ]);
            setCaculate("");
            setLabelCaculate("");
            var ele = document.getElementsByName("conclude");
            for (var i = 0; i < ele.length; i++) ele[i].checked = false;
          }}
          type="button"
          class="btn btn-warning ml-2 mr-2"
        >
          Làm mới
        </button>
        <button onClick={handleClickOpen} type="button" class="btn btn-info">
          Xem luật
        </button>
      </div>

      {!_.isEmpty(SATResult) && (
        <div class={classes.reslut}>
          <p>
            Giả thuyết cho:{" "}
            {!_.isEmpty(hyphos) &&
              hyphos.map((item, index) =>
                index === hyphos.length - 1 ? `${item}.` : `${item}, `
              )}
          </p>
          <p>Kết quả cần tính: {labelCaculate}</p>
          <p>Ta có: </p>
          <Grid container>
            {hypoDistance.map((item, index) => (
              <Grid item key={index} lg={3} md={3} sm={3} xs={6}>
                h(r{item.index + 1}) = kc({item.result}, {caculate}) ={" "}
                {item.distance === -1 ? "Vô cùng" : item.distance}
              </Grid>
            ))}
          </Grid>
          {!_.isEmpty(arrTable) && (
            <div>
              <TableContainer component={Paper}>
                <Table size="small" aria-label="a dense table">
                  <TableHead>
                    <TableRow>
                      <TableCell>STT</TableCell>
                      <TableCell align="left">TG</TableCell>
                      <TableCell align="left">SAT</TableCell>
                      <TableCell align="left">VET</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {arrTable.map((item, index) => (
                      <TableRow key={index}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>
                          {!_.isEmpty(item?.arrHypoConvert) &&
                            item.arrHypoConvert.map((val, inVal) =>
                              inVal === item.arrHypoConvert.length - 1
                                ? `${val}.`
                                : `${val}, `
                            )}
                        </TableCell>
                        <TableCell>
                          {!_.isEmpty(item?.arrHypoCurrent) &&
                            item.arrHypoCurrent.map(
                              (val, inVal) =>
                                // inVal === item.arrHypoCurrent.length - 1
                                //   ?
                                val.index + 1 ===
                                item.arrSAT[item.arrSAT.length - 1].index +
                                  1 ? (
                                  <b>
                                    r{val.index + 1}({val.distance})
                                    {inVal === item.arrHypoCurrent.length - 1
                                      ? "."
                                      : ", "}
                                  </b>
                                ) : (
                                  `r${val.index + 1}(${val.distance})${
                                    inVal === item.arrHypoCurrent.length - 1
                                      ? "."
                                      : ", "
                                  }`
                                )
                              // : `${
                              //     val.index + 1 ===
                              //     item.arrSAT[item.arrSAT.length - 1].index +
                              //       1 ? (
                              //       <b>
                              //         asxas
                              //         {/* r{val.index + 1}({val.distance}),{" "} */}
                              //       </b>
                              //     ) : (
                              //       `r${val.index + 1}(${val.distance}), `
                              //     )
                              //   }`
                            )}
                        </TableCell>
                        <TableCell>
                          {!_.isEmpty(item?.arrSAT) &&
                            item.arrSAT.map((val, inVal) =>
                              inVal === item.arrSAT.length - 1
                                ? `r${val.index + 1}.`
                                : `r${val.index + 1}, `
                            )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
          <p>
            Các luật sử dụng theo thứ tự:{" "}
            {SATResult.map((item, index) => (
              <p className={classes.SATResultp}>
                Bước {index + 1}: Luật {data[item?.index]}
              </p>
            ))}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  reslut: {
    padding: "0px 30px",
  },
  SATResultp: {
    marginLeft: 20,
  },
});
