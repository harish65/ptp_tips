import React, { useState, useEffect } from "react";
import actions from "../../redux/actions/selections";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import Select from "react-select";
import moment from "moment-timezone";
import { Row, Col, CustomInput } from "reactstrap";
import Badge from "reactstrap/lib/Badge";
import Close from "../../assets/Icons/close.svg";
import Warning from "../../assets/Icons/warning.svg";
import Clear from "../../assets/Icons/clear.png";
import { isObject } from "lodash";
import { Slider, Button, Radio } from "@material-ui/core";
// import CheckBoxOutlineBlankIcon from "@material-ui/icons/CheckBoxOutlineBlank";
// import CheckBoxIcon from "@material-ui/icons/CheckBox";
// import { name } from "file-loader";
// import { parse } from "dotenv";

import LoadingNew from "../../components/loading/LoadingNew";
import "./search-filter.scss";
import "./SearchFilter.css";

export const SearchFilter = (props) => {
  const baseRules = [
    { value: "ptp%", label: "PTP%", id: 0 },
    { value: "diff%", label: "DIFF%", id: 1 },
    { value: "horse", label: "Horse", id: 2 },
    { value: "jockey", label: "Jockey", id: 3 },
    { value: "venue", label: "Venue", id: 4 },
    { value: "trackCondition", label: "Track Condition", id: 5 },
    { value: "distance", label: "Distance", id: 6 },
    { value: "runs", label: "Runs", id: 7 },
    { value: "wins", label: "Wins", id: 8 },
    { value: "odds", label: "Odds", id: 9 },
    { value: "rating", label: "Rating", id: 10 },
    { value: "nr", label: "Show N/R", id: 11 },
    { value: "prize", label: "Prize Money", id: 12 },
    { value: "equalS", label: "Equal Selections", id: 13 },
    { value: "starters", label: "Starters", id: 14 },
  ];

  const conditions = {
    isEqual: [2, 3, 4, 5, 11, 13],
    isBiggerThan: [0, 1, 8, 12],
    isBetween: [6, 7, 9, 10, 14],
    dropDowns: [2, 3, 4, 5],
  };

  const [ruleOptions, setRuleOptions] = useState([]);
  const [activeRules, setActiveRules] = useState([]);
  const [distance, setDistance] = useState([2000, 3500]);
  const [odds, setOdds] = useState([25, 75]);
  const [star, setStar] = useState([1.5, 4]);
  const [selectedPTPValue, setSelectedPTPValue] = useState(0);
  const [selectedDIFFValue, setSelectedDIFFValue] = useState(0);
  const [selectedWins, setSelectedWins] = useState(0);
  const [selectedTrackValue, setSelectedTrackValue] = useState([
    {},
    { value: "G", label: "Good" },
    { value: "SO", label: "Soft" },
    { value: "SY", label: "Synthetic" },
    { value: "H", label: "Heavy" },
    { value: "F", label: "Firm" },
  ]);
  const [prizeMoney, setPrizeMoney] = useState([500]);
  const [runs, setRuns] = useState([6, 26]);
  const [starts, setStarts] = useState([6, 26]);

  const [addNewRule, setAddNewRule] = useState({
    rule: "",
    condition: "",
    value: "",
    min: "",
    max: "",
  });

  const [addRuleError, setAddRuleError] = useState(false);

  const trackConditions = [
    { value: "G", label: "Good" },
    { value: "SO", label: "Soft" },
    { value: "SY", label: "Synthetic" },
    { value: "H", label: "Heavy" },
    { value: "F", label: "Firm" },
  ];
  const trackCondition = [
    {},
    { value: "G", label: "Good" },
    { value: "SO", label: "Soft" },
    { value: "SY", label: "Synthetic" },
    { value: "H", label: "Heavy" },
    { value: "F", label: "Firm" },
  ];

  const [eqSelection, setEqSelection] = useState([]);
  const [eqSelBool, setEqSelBool] = useState(false);

  useEffect(() => {
    setRuleOptions(baseRules);
    props.getFutureTips();
  }, [1]);

  const handleRuleChange = (e) => {
    if (conditions?.isEqual?.includes(e.id) === true) {
      setAddNewRule({ ...addNewRule, condition: "is equal", rule: e });
    }
    if (conditions?.isBiggerThan?.includes(e.id) === true) {
      setAddNewRule({ ...addNewRule, condition: "is bigger than", rule: e });
    }
    if (conditions?.isBetween?.includes(e.id) === true) {
      setAddNewRule({ ...addNewRule, condition: "is between", rule: e });
    }
  };

  // Loop Equal Selection
  const loopEqualSelections = (element) => {
    let equalSelection = [];
    let isE = 0;
    if (element?.raceDetails) {
      for (let i = 0; i < element?.raceDetails.length - 1; i++) {
        if (
          element?.raceDetails[i].selection ===
          element?.raceDetails[0].selection &&
          i < 3
        ) {
          equalSelection.push({
            horse_name: element?.raceDetails[i].horse_name,
          });
          isE++;
        }
      }
    }
    if (isE > 1) {
      eqSelection.push(element);
    }
    return equalSelection;
  };

  const addRule = () => {
    if (!addNewRule.rule || !addNewRule.condition) {
      setAddRuleError(true);
    }

    if (
      addNewRule.rule &&
      addNewRule.rule.id !== null &&
      addNewRule.rule.id !== "undefined"
    ) {
      if (conditions?.isEqual?.includes(addNewRule.rule.id) === true) {
        if (
          addNewRule.value !== null &&
          addNewRule.value !== "undefined" &&
          addNewRule.value !== ""
        ) {
          handleResetAddRule();
        } else {
          setAddRuleError(true);
        }
      }
      if (conditions?.isBiggerThan?.includes(addNewRule.rule.id) === true) {
        if (
          addNewRule.value !== null &&
          addNewRule.value !== "undefined" &&
          addNewRule.value !== ""
        ) {
          handleResetAddRule();
        } else {
          setAddRuleError(true);
        }
      }
      if (conditions?.isBetween?.includes(addNewRule.rule.id) === true) {
        if (
          addNewRule.min !== null &&
          addNewRule.max !== null &&
          addNewRule.min !== "undefined" &&
          addNewRule.max !== "undefined" &&
          addNewRule.min !== "" &&
          addNewRule.max !== ""
        ) {
          handleResetAddRule();
        } else {
          setAddRuleError(true);
        }
      }
    } else {
      setAddRuleError(true);
    }
  };

  // Handle Rules selected
  const handleResetAddRule = () => {
    let finalData = activeRules;
    finalData.push(addNewRule);

    let newBaseRules = [];
    ruleOptions.map((zone) => {
      if (zone.id !== addNewRule.rule.id) {
        newBaseRules.push(zone);
      }
    });
    setActiveRules(finalData);
    setAddRuleError(false);
    setAddNewRule({
      rule: "",
      condition: "",
      value: "",
      min: "",
      max: "",
    });
    /*setRuleOptions(newBaseRules); */ setRuleOptions(ruleOptions);
  };

  const handleDropdownOptions = (id) => {
    if (id === 2) {
      return props?.futureTips?.horses;
    } else if (id === 3) {
      return props?.futureTips?.jockeys;
    } else if (id === 4) {
      return props?.futureTips?.venues;
    } else if (id === 5) {
      return trackConditions;
    }
  };

  const handleRemoveRule = (rule, id) => {
    let newBaseRules = ruleOptions;
    newBaseRules.push(rule);

    let finalData = [];
    activeRules.map((zone, i) => {
      if (i !== id) {
        finalData.push(zone);
      }
    });
    setActiveRules(finalData);
    setRuleOptions(newBaseRules);
  };

  const handleClearRules = () => {
    setActiveRules([]);
    setRuleOptions(baseRules);
  };

  //  New Functions
  // Handle checkbox

  // PTP
  const handleClickPtp = (e) => {
    if (Number(e.target.value) === Number(selectedPTPValue)) {
      setSelectedPTPValue("");
    }
  };

  const handlePushPtp = (e) => {
    setSelectedPTPValue(Number(e.target.value));
    setAddNewRule({
      ...addNewRule,
      value: e.target.value,
      rule: { value: "ptp%", label: "PTP%", id: 0 },
      condition: "is bigger than",
    });
  };

  // DIFF
  const handleClickDiff = (e) => {
    if (Number(e.target.value) === Number(selectedDIFFValue)) {
      setSelectedDIFFValue("");
    }
  };

  const handlePushDiff = (e) => {
    setSelectedDIFFValue(Number(e.target.value));

    setAddNewRule({
      ...addNewRule,
      value: e.target.value,
      rule: { value: "diff%", label: "DIFF%", id: 1 },
      condition: "is bigger than",
    });
  };

  // Track Condition
  const handleClickTrackCon = (e) => {
    if (e.target.value == selectedTrackValue.value) {
      setSelectedTrackValue("");
    }
  };
  const handlePushTrackCon = (e) => {
    setSelectedTrackValue({ value: e.target.value, label: e.target.name });

    setAddNewRule({
      ...addNewRule,
      value: { value: e.target.value, label: e.target.name },
      rule: { value: "trackCondition", label: "Track Condition", id: 5 },
      condition: "is equal",
    });
  };

  // Distance
  const handlePushDist = (e) => {
    setAddNewRule({
      ...addNewRule,
      min: distance[0],
      max: distance[1],
      rule: { value: "distance", label: "Distance", id: 6 },
      condition: "is between",
    });
  };

  // Runs
  const handlePushRuns = (e) => {
    setAddNewRule({
      ...addNewRule,
      min: runs[0],
      max: runs[1],
      rule: { value: "runs", label: "Runs", id: 7 },
      condition: "is between",
    });
  };

  // Wins
  const handleClickWins = (e) => {
    if (Number(e.target.value) === Number(selectedWins)) {
      setSelectedWins("");
    }
  };

  const handlePushWins = (e) => {
    setSelectedWins(Number(e.target.value));

    setAddNewRule({
      ...addNewRule,
      value: e.target.value,
      rule: { value: "wins", label: "Wins", id: 8 },
      condition: "is bigger than",
    });
  };

  // Odds
  const handlePushOdd = (e) => {
    setAddNewRule({
      ...addNewRule,
      min: odds[0],
      max: odds[1],
      rule: { value: "odds", label: "Odds", id: 9 },
      condition: "is between",
    });
  };

  // Rate
  const handlePushRate = (e) => {
    setAddNewRule({
      ...addNewRule,
      min: star[0],
      max: star[1],
      rule: { value: "rating", label: "Rating", id: 10 },
      condition: "is between",
    });
  };

  // Prize Money
  const handlePushPrize = (e) => {
    setAddNewRule({
      ...addNewRule,
      value: prizeMoney[0] * 1000,
      rule: { value: "prize", label: "Prize Money", id: 12 },
      condition: "is bigger than",
    });
  };

  // Equal Selection
  const handlePushEqual = (e) => {
    setEqSelBool(!eqSelBool);
  };

  const filterEqSelection = (data) => {
    if (eqSelBool) {
      return eqSelection;
    } else {
      return data;
    }
  };

  // Starters
  const handlePushStarters = (e) => {
    setAddNewRule({
      min: starts[0],
      max: starts[1],
      rule: { value: "starters", label: "Starters", id: 14 },
      condition: "is between",
    });
  };

  // Check if checkbox is selected
  // PTP
  const radioCheckPtp = (name) => {
    if (name === selectedPTPValue) {
      return true;
    } else {
      return false;
    }
  };

  // DIFF
  const radioCheckDiff = (name) => {
    if (name === selectedDIFFValue) {
      return true;
    } else {
      return false;
    }
  };

  // Track Condition
  const radioCheckTrackCon = (name) => {
    if (name === selectedTrackValue.value) {
      return true;
    } else {
      return false;
    }
  };

  // Wins
  const radioCheckWins = (name) => {
    if (name === selectedWins) {
      return true;
    } else {
      return false;
    }
  };

  // Load PTP for user interface
  const loadPtp = () => {
    let comp = [];
    let name = 30;
    let name1 = 60;

    for (let i = 0; i < 4; i++) {
      //7
      comp.push(
        <Col key={i}>
          <Radio
            checked={radioCheckPtp(Number(name))}
            onChange={handlePushPtp}
            onClick={handleClickPtp}
            value={name}
            style={{ color: "#142841", marginLeft: 25 }}
          />
          <b>{name}</b>

          <Radio
            checked={radioCheckPtp(Number(name1))}
            onChange={handlePushPtp}
            onClick={handleClickPtp}
            value={name1}
            style={{
              color: "#142841",
            }}
          />
          <b>{name1}</b>
        </Col>
      );
      name = Number(name + 10);
      name1 = Number(name1 + 10);
    }
    return comp;
  };

  // Load DIFF for user interface
  const loadDiff = () => {
    let comp = [];
    let name = 0;
    let name1 = 15;
    let name2 = 30;
    for (let i = 0; i < 4; i++) {
      //11
      comp.push(
        <Col key={i}>
          <Radio
            checked={radioCheckDiff(Number(name))}
            onChange={handlePushDiff}
            onClick={handleClickDiff}
            value={name}
            margin="2px"
            style={{
              color: "#142841",
              marginLeft: 10,
              alignSelf: "right",
              justifySelf: "right",
            }}
          />
          <b>{name}</b>
          <Radio
            checked={radioCheckDiff(Number(name1))}
            onChange={handlePushDiff}
            onClick={handleClickDiff}
            value={name1}
            margin="2px"
            style={{
              color: "#142841",
            }}
          />
          <b>{name1}</b>
          <Radio
            checked={radioCheckDiff(Number(name2))}
            onChange={handlePushDiff}
            onClick={handleClickDiff}
            value={name2}
            margin="2px"
            style={{
              color: "#142841",
              alignSelf: "center",
              justifySelf: "center",
            }}
          />
          <b>{name2}</b>
        </Col>
      );
      name = Number(name + 5);
      name1 = Number(name1 + 5);
      name2 = Number(name2 + 5);
    }
    return comp;
  };

  // Load Distance for user interface
  const loadDistance = () => {
    const handleChange = (e, newDistance) => {
      setDistance(newDistance);
    };
    return (
      <div>
        <Slider
          style={{ width: 170, margin: 15, color: "#142841" }}
          value={distance}
          marks
          min={500}
          max={5000}
          step={50}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Button
          variant="contained"
          onClick={handlePushDist}
          style={{
            color: "white",
            backgroundColor: "#142841",
            width: 75,
            height: 30,
            marginLeft: 60,
            borderRadius: 20,
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  // Load Runs for user interface
  const loadRuns = () => {
    const handleChange = (e, newRuns) => {
      setRuns(newRuns);
    };
    return (
      <div>
        <Slider
          style={{ width: 170, margin: 15, color: "#142841" }}
          value={runs}
          marks
          min={2}
          max={30}
          step={2}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Button
          variant="contained"
          onClick={handlePushRuns}
          style={{
            color: "white",
            backgroundColor: "#142841",
            width: 75,
            height: 30,
            marginLeft: 60,
            borderRadius: 20,
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  // Load Wins for user interface
  const loadWins = () => {
    let comp = [];
    let name = 0;
    let name1 = 3;
    let name2 = 6;

    for (let i = 0; i < 4; i++) {
      //11
      comp.push(
        <Col key={i}>
          <Radio
            checked={radioCheckWins(Number(name))}
            onChange={handlePushWins}
            onClick={handleClickWins}
            value={name}
            style={{ color: "#142841" }}
          />
          <b>{name}</b>
          <Radio
            checked={radioCheckWins(Number(name1))}
            onChange={handlePushWins}
            onClick={handleClickWins}
            value={name1}
            style={{ color: "#142841" }}
          />
          <b>{name1}</b>
          <Radio
            checked={radioCheckWins(Number(name2))}
            onChange={handlePushWins}
            onClick={handleClickWins}
            value={name2}
            style={{ color: "#142841" }}
          />
          <b>{name2}</b>
        </Col>
      );
      name = Number(name + 1);
      name1 = Number(name1 + 1);
      name2 = Number(name2 + 1);
    }
    return comp;
  };

  // Load Odds for user interface
  const loadOdds = () => {
    const handleChange = (e, newOdds) => {
      setOdds(newOdds);
    };
    return (
      <div>
        <Slider
          style={{
            width: 170,
            margin: 15,
            color: "#142841",
          }}
          value={odds}
          marks
          min={1}
          max={100}
          step={1}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="reverse-range-slider"
        />
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#142841",
            marginLeft: 60,
            borderRadius: 20,
            width: 75,
            height: 30,
          }}
          onClick={handlePushOdd}
        >
          Save
        </Button>
      </div>
    );
  };

  //   Loasd Rating for user interface
  const loadRating = () => {
    const handleChange = (e, newStar) => {
      setStar(newStar);
    };
    return (
      <div>
        <Slider
          style={{
            width: 170,
            margin: 15,
            color: "#142841",
            scrollbarTrackColor: "#142841",
          }}
          value={star}
          marks
          min={0.5}
          max={5}
          step={0.5}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#142841",
            marginLeft: 60,
            borderRadius: 20,
            width: 75,
            height: 30,
          }}
          onClick={handlePushRate}
        >
          Save
        </Button>
      </div>
    );
  };

  // Load Prize for user interface
  const loadPrize = () => {
    function valueLabelFormat(prize) {
      const units = ["K", "M"];

      let unitIndex = 0;
      let scaledPrize = prize;

      while (scaledPrize >= 1000 && unitIndex < units.length - 1) {
        unitIndex += 1;
        scaledPrize /= 1000;
      }

      return `${scaledPrize} ${units[unitIndex]}`;
    }

    const handleChange = (e, newPrize) => {
      setPrizeMoney(newPrize);
    };
    return (
      <div>
        <Slider
          style={{ width: 170, margin: 15, color: "#142841" }}
          step={50}
          value={prizeMoney}
          marks
          min={0}
          max={1000}
          onChange={handleChange}
          getAriaValueText={valueLabelFormat}
          valueLabelFormat={valueLabelFormat}
          valueLabelDisplay="auto"
          aria-labelledby="slider"
        />
        <Button
          variant="contained"
          style={{
            color: "white",
            backgroundColor: "#142841",
            width: 75,
            height: 30,
            marginLeft: 60,
            borderRadius: 20,
          }}
          onClick={handlePushPrize}
        >
          Save
        </Button>
      </div>
    );
  };

  // Load Satrters for user interface
  const loadStarters = () => {
    const handleChange = (e, newStarts) => {
      setStarts(newStarts);
    };
    return (
      <div>
        <Slider
          style={{ width: 170, margin: 15, color: "#142841" }}
          value={starts}
          marks
          min={2}
          max={30}
          step={2}
          onChange={handleChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
        />
        <Button
          variant="contained"
          onClick={handlePushStarters}
          style={{
            color: "white",
            backgroundColor: "#142841",
            width: 75,
            height: 30,
            marginLeft: 60,
            borderRadius: 20,
          }}
        >
          Save
        </Button>
      </div>
    );
  };

  const filter = () => {
    if (activeRules?.length > 0) {
      let finalData = props?.futureTips?.races;

      activeRules.map((zone) => {
        let percentageData = [];
        if (zone.rule.id === 0) {
          let p = finalData?.map((races) => {
            if (
              races?.raceDetails?.length > 0 &&
              races?.raceDetails[0].selection >= Number(zone.value)
            ) {
              percentageData.push(races);
            }
          });
        } else {
          percentageData = finalData;
        }

        let diffrenceData = [];
        if (zone.rule.id === 1) {
          let d = percentageData?.map((races) => {
            if (
              races?.raceDetails?.length > 0 &&
              races?.raceDetails[0].selection -
              races?.raceDetails[1].selection >=
              Number(zone.value)
            ) {
              diffrenceData.push(races);
            }
          });
        } else {
          diffrenceData = percentageData;
        }

        let trackConditionData = [];
        if (zone.rule.id === 5) {
          let tc = diffrenceData?.map((races) => {
            if (races?.track_condition === zone?.value?.value) {
              trackConditionData.push(races);
            }
          });
        } else {
          trackConditionData = diffrenceData;
        }

        let venueData = [];
        if (zone.rule.id === 4) {
          let v = trackConditionData?.map((races) => {
            if (races?.track_name === zone?.value?.value) {
              venueData.push(races);
            }
          });
        } else {
          venueData = trackConditionData;
        }

        let horseData = [];
        if (zone.rule.id === 2) {
          let h = venueData?.map((races) => {
            let horseCount = 0;
            let rd = races?.raceDetails?.map((zone1) => {
              if (zone1.horse_name === zone?.value?.value) {
                horseCount++;
              }
            });
            if (horseCount > 0) {
              horseData.push(races);
            }
          });
        } else {
          horseData = venueData;
        }

        let jockeyData = [];
        if (zone.rule.id === 3) {
          let j = horseData?.map((races) => {
            let jockeyCount = 0;
            let rdj = races?.raceDetails?.map((zone1) => {
              if (zone1.horse_jockey === zone?.value?.value) {
                jockeyCount++;
              }
            });
            if (jockeyCount > 0) {
              jockeyData.push(races);
            }
          });
        } else {
          jockeyData = horseData;
        }

        let distanceData = [];
        if (zone.rule.id === 6) {
          let dt = jockeyData?.map((races) => {
            let formatedDistance = Number(races.track_distance?.split("M")[0]);
            if (
              formatedDistance >= Number(zone.min) &&
              formatedDistance <= Number(zone.max)
            ) {
              distanceData.push(races);
            }
          });
        } else {
          distanceData = jockeyData;
        }

        let formData = [];
        if (zone.rule.id === 7) {
          let fo = distanceData?.map((races) => {
            if (races?.raceDetails?.length > 0) {
              let formCount = 0;
              let crr = races.raceDetails.map((zone1) => {
                if (zone1.career) {
                  let stats = zone1.career.split("-")[0];
                  let starts = stats.split(":")[0];
                  if (starts >= Number(zone.value)) {
                    formCount++;
                  }
                }
              });
              if (races?.raceDetails?.length === formCount) {
                formData.push(races);
              }
            }
          });
        } else {
          formData = distanceData;
        }

        let wins = [];
        if (zone.rule.id === 8) {
          let fo = formData?.map((races) => {
            if (races?.raceDetails?.length > 0) {
              let formCount = 0;
              let crr = races.raceDetails.map((zone1) => {
                if (zone1.career) {
                  let stats = zone1.career.split("-")[0];
                  let won = stats.split(":")[1];
                  if (won >= Number(zone.value)) {
                    formCount++;
                  }
                }
              });
              if (races?.raceDetails?.length === formCount) {
                wins.push(races);
              }
            }
          });
        } else {
          wins = formData;
        }

        let oddsData = [];
        if (zone.rule.id === 9) {
          let odd = wins?.map((races) => {
            if (races?.raceDetails?.length > 0) {
              if (
                races?.raceDetails[0]?.ub_win >= parseFloat(zone.min) &&
                races?.raceDetails[0]?.ub_win <= parseFloat(zone.max)
              ) {
                oddsData.push(races);
              }
            }
          });
        } else {
          oddsData = wins;
        }

        let ratingData = [];
        if (zone.rule.id === 10) {
          let r = oddsData?.map((races) => {
            if (
              races.rating != null &&
              races.rating <= parseFloat(zone.max) &&
              races.rating >= parseFloat(zone.min)
            ) {
              ratingData.push(races);
            }
          });
        } else {
          ratingData = oddsData;
        }

        let prizeData = [];
        if (zone.rule.id === 12) {
          let pm = ratingData?.map((races) => {
            if (races?.raceprize >= zone?.value) {
              prizeData.push(races);
            }
          });
        } else {
          prizeData = ratingData;
        }

        let eqsData = [];
        if (zone.rule.id === 13) {
          let em = prizeData?.map((races) => {
            if (
              (races?.raceDetails?.length > 0 &&
                races?.raceDetails[0].selection ===
                races?.raceDetails[1].selection) ||
              (races?.raceDetails?.length > 0 &&
                races?.raceDetails[0].selection ===
                races?.raceDetails[1].selection &&
                races?.raceDetails[0].selection ===
                races?.raceDetails[2].selection)
            ) {
              eqsData.push(races);
            }
          });
        } else {
          eqsData = prizeData;
        }

        let startersData = [];
        if (zone.rule.id === 14) {
          let st = eqsData?.map((races) => {
            if (races?.raceDetails?.length > 0) {
              if (
                races?.raceDetails?.length >= parseFloat(zone.min) &&
                races?.raceDetails?.length <= parseFloat(zone.max)
              ) {
                startersData.push(races);
              }
            }
          });
        } else {
          startersData = eqsData;
        }

        finalData = startersData;
      });

      finalData = filterEqSelection(finalData);
      return finalData;
    } else {
      return props?.futureTips?.races;
    }
  };
  // console.log(props?.futureTips?.races);

  var filteredData = filter();
  return (
    <div style={{ marginTop: 14 }}>
      {props.loading === true ? (
        <LoadingNew />
      ) : (
        <div>
          <div style={{ marginLeft: 10 }}>
            <div
              style={{
                marginTop: 10,
                paddingRight: 15,
                paddingBottom: 20,
                display: "grid",
                justifyContent: "space-between",
                float: "left",
                alignItems: "center",
              }}
            >
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  alignItems: "center",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    marginBottom: 2,
                    borderRadius: "5px",
                  }}
                >
                  {" "}
                  <span style={{ fontSize: 20 }}>
                    <b>New Rule</b>
                  </span>{" "}
                  <div>
                    <CustomInput
                      type="checkbox"
                      id="equal"
                      label="EQ"
                      value="equalS"
                      onChange={handlePushEqual}
                    />
                  </div>
                </Col>

                <Col>
                  <Select
                    value={addNewRule.rule}
                    onChange={(e) => {
                      handleRuleChange(e);
                    }}
                    options={ruleOptions}
                    isSearchable={true}
                    style={{ width: 150, marginLeft: 10 }}
                    theme={(theme) => ({
                      ...theme,
                      colors: {
                        ...theme.colors,
                        primary: "#142841",
                        primary25: "#DDE1E5",
                        neutral20: "#142841",
                        neutral50: "#142841",
                        neutral60: "#142841",
                        neutral80: "#142841",
                      },
                    })}
                  />
                </Col>

                <Col>
                  <div
                    style={{
                      textAlign: "center",
                      borderRadius: 20,
                      border: "solid 1px #142841",
                      color: "#142841",
                      backgroundColor: "#DDE1E5",
                      padding: 10,
                      fontWeight: 600,
                      marginTop: 6,
                      marginBottom: 6,
                      marginLeft: 10,
                      width: 150,
                    }}
                  >
                    {addNewRule.condition ? addNewRule.condition : "is equal"}
                  </div>
                </Col>
                {conditions?.isBetween?.includes(addNewRule?.rule?.id) ===
                  true ? (
                  <Row
                    style={{
                      margin: 0,
                      padding: 0,
                      display: "grid",
                      alignItems: "center",
                    }}
                  >
                    <Col>
                      <input
                        style={{
                          padding: 6,
                          marginTop: 3,
                          marginLeft: 10,
                          width: 150,
                        }}
                        name="min"
                        placeholder="Enter Min Value"
                        type="number"
                        onChange={(e) => {
                          setAddNewRule({ ...addNewRule, min: e.target.value });
                        }}
                        value={addNewRule.min}
                      ></input>
                    </Col>
                    <Col>
                      <div
                        style={{
                          textAlign: "center",
                          borderRadius: 20,
                          border: "solid 1px #142841",
                          color: "#142841",
                          backgroundColor: "#DDE1E5",
                          padding: 10,
                          fontWeight: 600,
                          marginTop: 6,
                          marginLeft: 10,
                          width: 150,
                        }}
                      >
                        and
                      </div>
                    </Col>

                    <Col>
                      <input
                        style={{
                          padding: 6,
                          marginTop: 6,
                          marginLeft: 10,
                          width: 150,
                        }}
                        name="max"
                        placeholder="Enter Max Value"
                        type="number"
                        onChange={(e) => {
                          setAddNewRule({ ...addNewRule, max: e.target.value });
                        }}
                        value={addNewRule.max}
                      ></input>
                    </Col>
                  </Row>
                ) : (
                  <Col>
                    {conditions?.dropDowns?.includes(addNewRule?.rule?.id) ===
                      true ? (
                      <Select
                        value={addNewRule.value}
                        onChange={(e) => {
                          setAddNewRule({ ...addNewRule, value: e });
                        }}
                        options={handleDropdownOptions(addNewRule.rule.id)}
                        style={{ width: 150, marginLeft: 10 }}
                        theme={(theme) => ({
                          ...theme,
                          colors: {
                            ...theme.colors,
                            primary: "#142841",
                            primary25: "#DDE1E5",
                            neutral20: "#142841",
                            neutral50: "#142841",
                            neutral60: "#142841",
                            neutral80: "#142841",
                          },
                        })}
                      />
                    ) : (
                      <input
                        style={{
                          padding: 6,
                          marginTop: 4,
                          width: 160,
                          marginLeft: 7,
                        }}
                        name="value"
                        placeholder="Enter Value"
                        type="number"
                        onChange={(e) => {
                          setAddNewRule({
                            ...addNewRule,
                            value: e.target.value,
                          });
                        }}
                        value={addNewRule.value}
                      ></input>
                    )}
                  </Col>
                )}

                <Col>
                  <div
                    style={{
                      color: "white",
                      backgroundColor: "#142841",
                      borderRadius: 12,
                      textAlign: "center",
                      padding: 6,
                      cursor: "pointer",
                      marginTop: 6,
                      marginLeft: 10,
                      width: 150,
                    }}
                    onClick={() => {
                      addRule();
                    }}
                  >
                    Add Rule
                  </div>
                </Col>

                {addRuleError === true ? (
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      marginTop: 6,
                    }}
                  >
                    <img src={Warning} style={{ height: 20, width: 20 }} />
                    <p style={{ color: "red", marginLeft: 6 }}>
                      Error Adding Rule please make sure all fields are filled
                    </p>
                  </div>
                ) : null}
                <img
                  src={Clear}
                  style={{ width: 22, height: 22, cursor: "pointer" }}
                  onClick={() => {
                    handleClearRules();
                  }}
                />
              </Row>

              {/* New */}

              {/* PTP% */}
              <Row
                className="scroll"
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "none",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                }}
              >
                {loadPtp()}
                <Col
                  style={{
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b style={{ fontSize: 20, textAlign: "center" }}>PTP%</b>
                  {/* (bigger than){" "} */}
                </Col>
                <br />
                <br />
              </Row>

              {/* DIFF% */}
              <Row
                className="scroll"
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                {loadDiff()}
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>DIFF%</b>{" "}
                </Col>
                <br />
                <br />
              </Row>

              {/* Track Condition */}
              <Row
                className="scroll"
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                {trackCondition.map((tc, index) => {
                  return (
                    <Col key={index + 1}>
                      <Radio
                        checked={radioCheckTrackCon(tc.value)}
                        onChange={handlePushTrackCon}
                        onClick={handleClickTrackCon}
                        value={tc.value}
                        style={{ color: "#142841" }}
                        name={tc.label}
                      />
                      <b>{tc.label}</b>
                    </Col>
                  );
                })}
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Track Condition</b>{" "}
                </Col>
                <br />
                <br />
              </Row>

              {/* Wins */}
              <Row
                className="scroll"
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                {loadWins()}
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Wins</b>{" "}
                </Col>
                <br />
                <br />
              </Row>

              {/* Distance */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  <b>Distance</b>
                </Col>
                <br />
                <br />
                <br />
                {loadDistance()}
              </Row>

              {/* Runs */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Runs</b>{" "}
                </Col>
                <br />
                <br />
                <br />
                {loadRuns()}
              </Row>

              {/* Odds */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Odds</b>{" "}
                </Col>
                <br />
                <br />
                <br />
                {loadOdds()}
              </Row>

              {/* Rating */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Rating</b>{" "}
                </Col>
                <br />
                <br />
                <br />
                {loadRating()}
              </Row>

              {/* Prize Money */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Prize Money</b>
                </Col>
                <br />
                <br />
                <br />
                {loadPrize()}
              </Row>

              {/* Starters */}
              <Row
                style={{
                  marginLeft: 20,
                  display: "grid",
                  borderStyle: "solid",
                  borderWidth: "1px",
                  paddingBottom: 10,
                  marginTop: 3,
                  height: 150,
                  width: 200,
                  borderStyle: "none",
                }}
              >
                <Col
                  style={{
                    fontSize: 20,
                    color: "white",
                    backgroundColor: "rgb(20,40,65)",
                    width: 198,
                    position: "absolute",
                    borderRadius: "5px",
                    textAlign: "center",
                  }}
                >
                  {" "}
                  <b>Starters</b>{" "}
                </Col>
                <br />
                <br />
                <br />
                {loadStarters()}
              </Row>
            </div>
            {activeRules.map((zone, i) => {
              return (
                <div key={i}>
                  {i >= 0 ? (
                    <hr style={{ width: 200, color: "#142841" }} />
                  ) : null}
                  <div
                    style={{
                      padding: 8,
                      display: "flex",
                      alignItems: "center",
                    }}
                  >
                    <div
                      style={{
                        marginLeft: 8,
                        marginRight: 8,
                        cursor: "pointer",
                      }}
                      onClick={() => {
                        handleRemoveRule(zone.rule, i);
                      }}
                    >
                      <img
                        src={Close}
                        style={{ width: "12px", height: "12px" }}
                      />
                    </div>

                    <div
                      style={{
                        textAlign: "center",
                        color: "#142841",
                        marginLeft: 8,
                        marginRight: 8,
                      }}
                    >
                      <b style={{ fontSize: 16 }}>{zone?.rule?.label}</b>
                    </div>

                    <div
                      style={{
                        border: "solid 2px #142841",
                        padding: "6px 8px 6px 8px",
                        textAlign: "center",
                        color: "#142841",
                        marginLeft: 8,
                        marginRight: 8,
                        borderRadius: 20,
                      }}
                    >
                      {zone?.condition}
                    </div>

                    {zone.condition === "is between" ? (
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <div
                          style={{
                            textAlign: "center",
                            color: "#142841",
                            marginLeft: 8,
                            marginRight: 8,
                          }}
                        >
                          <b style={{ fontSize: 16 }}>{zone?.min}</b>
                        </div>
                        <div
                          style={{
                            border: "solid 2px #142841",
                            padding: "6px 8px 6px 8px",
                            textAlign: "center",
                            color: "#142841",
                            marginLeft: 8,
                            marginRight: 8,
                            borderRadius: 20,
                          }}
                        >
                          and
                        </div>
                        <div
                          style={{
                            textAlign: "center",
                            color: "#142841",
                            marginLeft: 8,
                            marginRight: 8,
                          }}
                        >
                          <b style={{ fontSize: 16 }}>{zone?.max}</b>
                        </div>
                      </div>
                    ) : (
                      <div
                        style={{
                          textAlign: "center",
                          color: "#142841",
                          marginLeft: 8,
                          marginRight: 8,
                        }}
                      >
                        <b style={{ fontSize: 16 }}>
                          {zone.value !== null &&
                            zone.value != "undefined" &&
                            isObject(zone.value) === true
                            ? zone.value.label
                            : zone.value}
                        </b>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          <Row
            style={{
              padding: 8,
              marginLeft: 0,
              marginRight: 0,
              display: "flex",
              justifyContent: "center",
            }}
          >
            {filteredData ? (
              filteredData?.map((element, i) => {
                {
                  {/* console.log(element); */ }
                }
                return (
                  <Link
                    key={i}
                    to={`/horse-racing-tips/${moment(element?.meetdate).format(
                      "DD-MM-YYYY"
                    )}/${element?.track_name}/R${element?.race_num}/${element?.point_id
                      }`}
                    style={{ marginLeft: 8, marginRight: 8 }}
                  >
                    <div
                      style={{
                        marginTop: 12,
                        backgroundColor: "white",
                        padding: 8,
                        borderRadius: 4,
                        minWidth: 300,
                        height: 200,
                      }}
                    >
                      {/* <Badge>{moment(element?.meetdate).format('DD-MM-YYYY')} at {element?.race_time.split(':')[0]}:{element?.race_time.split(':')[1]}</Badge> */}
                      <div style={{ display: "flex", alignItems: "center" }}>
                        <Badge>
                          {moment(element?.meetdate).format("DD-MM-YYYY")}
                        </Badge>
                        <p style={{ marginLeft: 4, color: "grey" }}>
                          at {element?.race_time?.split(":")[0]}:
                          {element?.race_time?.split(":")[1]}
                        </p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          marginTop: 8,
                        }}
                      >
                        <h3 style={{ color: "black", fontWeight: "bold" }}>
                          {element?.track_name} R{element?.race_num}
                        </h3>
                        <p>{element?.track_description}</p>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "flex-start",
                          justifyContent: "flex-start",
                          flexDirection: "column",
                          marginTop: 8,
                        }}
                      >
                        <p style={{ color: "#142841" }}>
                          Prize:{" "}
                          {element?.raceprize ? (
                            <span>{element?.raceprize}$</span>
                          ) : (
                            <span style={{ color: "red" }}>TBA</span>
                          )}
                        </p>
                        <div style={{ marginBottom: 2 }}>
                          <Badge
                            style={{
                              backgroundColor: "black",
                              padding: 5,
                              marginRight: 5,
                            }}
                          >
                            <strong
                              style={{
                                marginLeft: 4,
                                marginRight: 4,
                                color: "white",
                              }}
                            >
                              UB: {element?.raceDetails[0].ub_win?.toFixed(2)}
                            </strong>
                          </Badge>
                          <Badge
                            style={{
                              backgroundColor: "#e12b80",
                              padding: 5,
                              color: "white",
                              cursor: "pointer",
                              textAlign: "center",
                            }}
                          >
                            <strong>
                              BB: {element?.raceDetails[0].sb_win?.toFixed(2)}
                            </strong>
                          </Badge>
                        </div>

                        {loopEqualSelections(element).map((item, index) => {
                          return (
                            <p
                              key={index}
                              style={{ color: "#142841", fontWeight: "bold" }}
                            >
                              Horse Name: {item?.horse_name}
                            </p>
                          );
                        })}
                      </div>
                    </div>
                  </Link>
                );
              })
            ) : (
              <p style={{ marginTop: 24, opacity: "50%" }}>No Upcoming races</p>
            )}
          </Row>
        </div>
      )}
    </div>
  );
};

const mapStateToProps = (state) => ({
  futureTips: state.selectionReducer.dataFuture,
  loading: state.selectionReducer.futureTipsLoading,
});

const mapDispatchToProps = (dispatch) => ({
  getFutureTips: () => dispatch(actions.getFutureTips()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(SearchFilter));
