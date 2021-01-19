import React from "react";
import axios from "axios";
import {
  AppBar,
  Tabs,
  Tab,
  Typography,
  Button,
  makeStyles,
  Select,
  MenuItem,
} from "@material-ui/core";
import TabPanel from "./components/TabPanel";
import Layout from "./components/Layout";
import Graph from "./components/Graph";
import DropzoneAreaEx from "./components/DraopZoneAreaEx";
import Form from "./components/Form";
function App() {
  const [value, setValue] = React.useState(0);
  const [fps, setFps] = React.useState(60);
  const [analyze, setAnalyze] = React.useState(false);
  const [graph, setGraph] = React.useState({ x: [], v: [], a: [], t: [] });
  const useStyles = makeStyles((theme) => ({
    btn: {
      margin: "2rem auto",
    },
    select: {
      marginLeft: "2rem",
    },
  }));

  const classes = useStyles();
  const changeTab = (event, newValue) => {
    setValue(newValue);
  };
  const handleUpload = (file) => {
    const data = new FormData();
    data.append("file", file);
    console.log(file);
    data.append("fps", fps);
    const url = "http://127.0.0.1:5000/upload";
    if (file) {
      axios({
        method: "POST",
        url,
        data,
        headers: {
          "Access-Control-Allow-Origin": "*",
        },
      })
        .then(({ data }) => {
          console.log(data);
          let x = [];
          let v = [];
          let a = [];
          let t = [];
          data.forEach((el) => {
            x.push(el[0]);
            v.push(el[1]);
            a.push(el[2]);
            t.push(el[3]);
          });
          console.log(x, v, a, t);
          setGraph({ x, v, a, t });
          console.log(graph);
          setAnalyze(!analyze);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div className="App">
      <Layout>
        <Typography align="center" variant="h2" gutterBottom>
          Motion Tracking GP 2021
        </Typography>
        <Form />
        <AppBar position="static">
          <Tabs value={value} onChange={changeTab}>
            <Tab label="Upload Video" />
            <Tab label="Graph" />
          </Tabs>
        </AppBar>
        <TabPanel value={value} index={0}>
          <DropzoneAreaEx onUpload={handleUpload} />
          <Button
            //disabled={!analyze}
            variant="contained"
            color="primary"
            className={classes.btn}
            onClick={() => setValue(1)}
          >
            Analyze
          </Button>
          <Select
            className={classes.select}
            onChange={(e) => {
              setFps(e.target.value);
            }}
            value={fps}
          >
            <MenuItem value={30}>30</MenuItem>
            <MenuItem value={60}>60</MenuItem>
            <MenuItem value={90}>90</MenuItem>
            <MenuItem value={120}>120</MenuItem>
            <MenuItem value={240}>240</MenuItem>
          </Select>
          {/* <CircularProgress size={24} className={classes.buttonProgress} /> */}
        </TabPanel>
        <TabPanel value={value} index={1}>
          <Graph x={graph.x} v={graph.v} a={graph.a} t={graph.t} />
        </TabPanel>
      </Layout>
    </div>
  );
}

export default App;
