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
import { Container } from "@mui/material";

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
        label: "C???nh a",
        name: "a",
        placeholder: "Nh???p c???nh a",
        value: "",
        checked: false,
      },
      {
        label: "C???nh b",
        name: "b",
        placeholder: "Nh???p c???nh b",
        value: "",
        checked: false,
      },
      {
        label: "C???nh c",
        name: "c",
        placeholder: "Nh???p c???nh c",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "Chi???u cao ha",
        name: "ha",
        placeholder: "Nh???p chi???u cao a",
        value: "",
        checked: false,
      },
      {
        label: "Chi???u cao hb",
        name: "hb",
        placeholder: "Nh???p chi???u cao b",
        value: "",
        checked: false,
      },
      {
        label: "Chi???u cao hc",
        name: "hc",
        placeholder: "Nh???p chi???u cao c",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "G??c A",
        name: "A",
        placeholder: "Nh???p g??c A",
        value: "",
        checked: false,
      },
      {
        label: "G??c B",
        name: "B",
        placeholder: "Nh???p g??c B",
        value: "",
        checked: false,
      },
      {
        label: "G??c C",
        name: "C",
        placeholder: "Nh???p g??c C",
        value: "",
        checked: false,
      },
    ],
    [
      {
        label: "Di???n t??ch S",
        name: "S",
        placeholder: "Nh???p S",
        value: "",
        checked: false,
      },
      {
        label: "N???a chu vi p",
        name: "p",
        placeholder: "Nh???p p",
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
      label: "C???nh a",
      name: "conclude",
    },
    {
      id: "canhb",
      for: "canhb",
      checked: false,
      value: "b",
      label: "C???nh b",
      name: "conclude",
    },
    {
      id: "canhc",
      for: "canhc",
      checked: false,
      value: "c",
      label: "C???nh c",
      name: "conclude",
    },
    {
      id: "chieucaoha",
      for: "chieucaoha",
      checked: false,
      value: "ha",
      label: "Chi???u cao ha",
      name: "conclude",
    },
    {
      id: "chieucaohb",
      for: "chieucaohb",
      checked: false,
      value: "hb",
      label: "Chi???u cao hb",
      name: "conclude",
    },
    {
      id: "chieucaohc",
      for: "chieucaohc",
      checked: false,
      value: "hc",
      label: "Chi???u cao hc",
      name: "conclude",
    },
    {
      id: "goca",
      for: "goca",
      checked: false,
      value: "A",
      label: "G??c A",
      name: "conclude",
    },
    {
      id: "gocb",
      for: "gocb",
      checked: false,
      value: "B",
      label: "G??c B",
      name: "conclude",
    },
    {
      id: "gocc",
      for: "gocc",
      checked: false,
      value: "C",
      label: "G??c C",
      name: "conclude",
    },
    {
      id: "s",
      for: "s",
      checked: false,
      value: "S",
      label: "Di???n t??ch S",
      name: "conclude",
    },
    {
      id: "p",
      for: "p",
      checked: false,
      value: "p",
      label: "N???a chu vi p",
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
        maxWidth="md"
      >
        <DialogTitle id="alert-dialog-title">
          T???p lu???t tam gi??c l?????ng
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Container maxWidth="lg">
              <Grid container>
                {data.map((item, index) => {
                  return (
                    <Grid key={index} item lg={6} md={6} sm={6} xs={6}>
                      <p style={{ fontSize: 14, fontWeight: 500 }}>{item}</p>
                    </Grid>
                  );
                })}
              </Grid>
            </Container>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>????ng</Button>
        </DialogActions>
      </Dialog>
      <h1>X??y d???ng h??? chuy??n gia Tam gi??c l?????ng</h1>
      <h3>Gi??? thuy???t: </h3>
      {/* <div class="d-flex flex-row"> */}
      <FormGroup>
        <Grid container>
          {arrHypothesis.map((item, index) => {
            return (
              <Grid
                style={{
                  display: "flex",
                  flexDirection: "column",
                  // alignItems: "center",
                  padding: "0px 100px",
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
      <h3>K???t lu???n: </h3>
      <div class="d-flex flex-column justify-content-center align-items-center">
        <div
          onChange={(e) => {
            setCaculate(e.target.value);
            setSATResult([]);
          }}
          class="d-flex flex-row align-items-center"
        >
          <h5>K???t qu??? c???n t??nh</h5>
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
                title: "Th??ng b??o!",
                message: "Vui l??ng nh???p gi??? thuy???t!",
                type: "warning",
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
                  title: "Th??ng b??o!",
                  message:
                    "K???t qu??? c???n t??nh ???? n???m trong gi??? thuy???t. Vui l??ng ch???n l???i k???t qu??? c???n t??nh!",
                  type: "success",
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
                title: "Th??ng b??o!",
                message: "Vui l??ng ch???n k???t qu??? c???n t??nh!",
                type: "warning",
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
          Gi???i
        </button>
        <button
          onClick={() => {
            setSATResult([]);
            setArrHypothesis([
              [
                {
                  label: "C???nh a",
                  name: "a",
                  placeholder: "Nh???p c???nh a",
                  value: "",
                },
                {
                  label: "C???nh b",
                  name: "b",
                  placeholder: "Nh???p c???nh b",
                  value: "",
                },
                {
                  label: "C???nh c",
                  name: "c",
                  placeholder: "Nh???p c???nh c",
                  value: "",
                },
              ],
              [
                {
                  label: "Chi???u cao ha",
                  name: "ha",
                  placeholder: "Nh???p chi???u cao a",
                  value: "",
                },
                {
                  label: "Chi???u cao hb",
                  name: "hb",
                  placeholder: "Nh???p chi???u cao b",
                  value: "",
                },
                {
                  label: "Chi???u cao hc",
                  name: "hc",
                  placeholder: "Nh???p chi???u cao c",
                  value: "",
                },
              ],
              [
                {
                  label: "G??c A",
                  name: "A",
                  placeholder: "Nh???p g??c A",
                  value: "",
                },
                {
                  label: "G??c B",
                  name: "B",
                  placeholder: "Nh???p g??c B",
                  value: "",
                },
                {
                  label: "G??c C",
                  name: "C",
                  placeholder: "Nh???p g??c C",
                  value: "",
                },
              ],
              [
                {
                  label: "Di???n t??ch S",
                  name: "S",
                  placeholder: "Nh???p S",
                  value: "",
                },
                {
                  label: "N???a chu vi p",
                  name: "p",
                  placeholder: "Nh???p p",
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
          L??m m???i
        </button>
        <button onClick={handleClickOpen} type="button" class="btn btn-info">
          Xem lu???t
        </button>
      </div>

      {!_.isEmpty(SATResult) && (
        <div class={classes.reslut}>
          <p>
            Gi??? thuy???t cho:{" "}
            {!_.isEmpty(hyphos) &&
              hyphos.map((item, index) =>
                index === hyphos.length - 1 ? `${item}.` : `${item}, `
              )}
          </p>
          <p>K???t qu??? c???n t??nh: {labelCaculate}</p>
          <p>Ta c??: </p>
          <Grid container>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {hypoDistance
                .slice(0, hypoDistance.length / 4)
                .map((item, index) => (
                  <div key={index}>
                    h(r{item.index + 1}) = kc({item.result}, {caculate}) ={" "}
                    {item.distance === -1 ? "V?? c??ng" : item.distance}
                  </div>
                ))}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {hypoDistance
                .slice(hypoDistance.length / 4, (hypoDistance.length / 4) * 2)
                .map((item, index) => (
                  <div key={index}>
                    h(r{item.index + 1}) = kc({item.result}, {caculate}) ={" "}
                    {item.distance === -1 ? "V?? c??ng" : item.distance}
                  </div>
                ))}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {hypoDistance
                .slice(
                  (hypoDistance.length / 4) * 2,
                  (hypoDistance.length / 4) * 3
                )
                .map((item, index) => (
                  <div key={index}>
                    h(r{item.index + 1}) = kc({item.result}, {caculate}) ={" "}
                    {item.distance === -1 ? "V?? c??ng" : item.distance}
                  </div>
                ))}
            </Grid>
            <Grid item lg={3} md={3} sm={3} xs={6}>
              {hypoDistance
                .slice((hypoDistance.length / 4) * 3)
                .map((item, index) => (
                  <div key={index}>
                    h(r{item.index + 1}) = kc({item.result}, {caculate}) ={" "}
                    {item.distance === -1 ? "V?? c??ng" : item.distance}
                  </div>
                ))}
            </Grid>
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
                                    <u>
                                      r{val.index + 1}({val.distance})
                                      {inVal === item.arrHypoCurrent.length - 1
                                        ? "."
                                        : ", "}
                                    </u>
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
            C??c lu???t s??? d???ng theo th??? t???:{" "}
            {SATResult.map((item, index) => (
              <p className={classes.SATResultp}>
                B?????c {index + 1}: Lu???t {data[item?.index]}
              </p>
            ))}
          </p>
        </div>
      )}
      <div className={classes.footer}>
        <i class="far fa-copyright"></i>&ensp;2021 - Haui - Nh??m 16 - ????? Vinh H??
        2018602730 - ?????ng Th??? Nguy??n 2019605472 - Nguy???n ?????c Long
        2019600122&emsp;
      </div>
    </div>
  );
}

export default App;

const useStyles = makeStyles({
  reslut: {
    padding: "0px 30px",
    marginBottom: 30,
  },
  SATResultp: {
    marginLeft: 20,
  },
  footer: {
    position: "fixed",
    right: 0,
    bottom: 0,
    background: "#36275d",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    color: "#fff",
  },
});
