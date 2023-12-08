import React, { useCallback, useState } from "react";
import { StyleSheet, TextInput } from "react-native";

import { DEFAULT_MACHINE_VALUES_OBJECT } from "../constants";
import { DEFAULT_APP_CONTENT_PADDING } from "../constants/styles";
import { MachineType } from "../data/types";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getMachineValues, setMachineValues } from "../stores/slices";
import Button from "./Button";
import Picker from "./Picker";
import { Text, View } from "./Themed";

export default function EditScreenInfo({ path }: { path: string }) {
  const [machineName, setMachineName] = useState("");
  const [partName, setPartName] = useState("");
  const [partValue, setPartValue] = useState("");
  const [isSaved, setIsSaved] = useState(false);

  const machineValues = useAppSelector(getMachineValues);

  const dispatch = useAppDispatch();

  const machineNames = [
    { label: "Welding Robot", value: MachineType.WeldingRobot },
    { label: "PaintingStation", value: MachineType.PaintingStation },
    { label: "Assembly Line", value: MachineType.AssemblyLine },
    {
      label: "Quality Control Station",
      value: MachineType.QualityControlStation,
    },
  ];

  const partNames = [
    { value: "arcStability", label: "Arc Stability" },
    {
      value: "coolingEfficiency",
      label: "Cooling Efficiency",
    },
    { value: "electrodeWear", label: "Electrode Wear" },
    { value: "seamWidth", label: "Seam Width" },
    {
      value: "shieldingPressure",
      label: "Shielding Pressure",
    },
    { value: "vibrationLevel", label: "Vibration Level" },
    { value: "wireFeedRate", label: "Wire Feed Rate" },
    {
      value: "colorConsistency",
      label: "Color Consistency",
    },
    { value: "flowRate", label: "Flow Rate" },
    {
      value: "nozzleCondition",
      label: "Nozzle Condition",
    },
    { value: "pressure", label: "Pressure" },
    {
      value: "alignmentAccuracy",
      label: "Alignment Accuracy",
    },
    { value: "beltSpeed", label: "Belt Speed" },
    {
      value: "fittingTolerance",
      label: "Fitting Tolerance",
    },
    { value: "speed", label: "Speed" },
    {
      value: "cameraCalibration",
      label: "Camera Calibration",
    },
    {
      value: "criteriaSettings",
      label: "Criteria Settings",
    },
    {
      value: "lightIntensity",
      label: "Light Intensity",
    },
    {
      value: "softwareVersion",
      label: "Software Version",
    },
  ];

  const savePart = useCallback(async () => {
    try {
      const newMachineData: MachineValues = machineValues
        ? JSON.parse(JSON.stringify(machineValues))
        : DEFAULT_MACHINE_VALUES_OBJECT; // Deep copy machine parts

      if (!newMachineData.machines[machineName]) {
        newMachineData.machines[machineName] = {};
      }

      newMachineData.machines[machineName][partName] = partValue;

      dispatch(setMachineValues(newMachineData));

      setIsSaved(true);
      setTimeout(() => {
        setIsSaved(false);
      }, 2000);
    } catch (error) {
      console.error(error);
      throw error; // Handle API errors appropriately
    }
  }, [machineName, partName, partValue]);

  return (
    <View style={styles.container}>
      <View>
        <Text style={styles.label}>Machine Name</Text>
        <Picker
          value={machineName}
          onSetValue={setMachineName}
          items={machineNames}
        />

        <Text style={styles.label}>Part Name</Text>
        <Picker value={partName} onSetValue={setPartName} items={partNames} />

        <Text style={styles.label}>Part Value</Text>
        <TextInput
          style={styles.input}
          value={partValue}
          onChangeText={(text) => setPartValue(text)}
          placeholder="Enter part value"
        />

        {isSaved && <Text style={styles.healthScore}>Saved ✔️</Text>}
      </View>

      <View style={styles.buttonWrapper}>
        <Button onPress={savePart}>Save</Button>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
  container: {
    flex: 1,
    paddingHorizontal: DEFAULT_APP_CONTENT_PADDING,
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  input: {
    height: 40,
    width: "100%",
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  healthScore: {
    fontSize: 20,
    fontWeight: "bold",
    marginTop: 20,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    paddingBottom: 8,
  },
});
