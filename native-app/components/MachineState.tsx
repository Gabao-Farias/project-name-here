import { Link } from "expo-router";
import { StyleSheet } from "react-native";
import Loading from "../components/Loading";
import { MachineScore } from "../components/MachineScore";
import { PartsOfMachine } from "../components/PartsOfMachine";
import { Text, View } from "../components/Themed";
import { colorSecondary, colorText } from "../constants/Colors";
import { DEFAULT_APP_CONTENT_PADDING } from "../constants/styles";
import Button from "./Button";

type Props = {
  machineValues?: MachineValues;
  machineHealth?: MachineHealthResponseBody;
  isLoading?: boolean;
  calculateHealth(): void;
  resetMachineValues(): void;
};

const MachineState: React.FC<Props> = (props: Props) => {
  const {
    machineValues,
    machineHealth,
    calculateHealth,
    isLoading,
    resetMachineValues,
  } = props;

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {isLoading && <Loading />}

      {!machineValues && (
        <Link href="/two" style={styles.link}>
          <Text style={styles.linkText}>
            Please log a part to check machine health
          </Text>
        </Link>
      )}

      {!!machineValues && (
        <>
          <PartsOfMachine
            machineName={"Welding Robot"}
            parts={machineValues.machines.weldingRobot}
          />
          <PartsOfMachine
            machineName={"Assembly Line"}
            parts={machineValues.machines.assemblyLine}
          />
          <PartsOfMachine
            machineName={"Painting Station"}
            parts={machineValues.machines.paintingStation}
          />
          <PartsOfMachine
            machineName={"Quality Control Station"}
            parts={machineValues.machines.qualityControlStation}
          />
          <View
            style={styles.separator}
            lightColor="#eee"
            darkColor="rgba(255,255,255,0.1)"
          />
          <Text style={styles.title}>Factory Health Score</Text>
          <Text style={styles.text}>
            {machineHealth && machineHealth.factory
              ? machineHealth.factory
              : "Not yet calculated"}
          </Text>
          {machineHealth && machineHealth.machineScores && (
            <>
              <Text style={styles.title2}>Machine Health Scores</Text>
              {Object.keys(machineHealth.machineScores).map((key) => (
                <MachineScore
                  key={key}
                  machineName={key}
                  score={machineHealth.machineScores[key]}
                />
              ))}
            </>
          )}
        </>
      )}
      <View
        style={styles.separator}
        lightColor="#eee"
        darkColor="rgba(255,255,255,0.1)"
      />

      <View style={styles.buttonWrapper}>
        <Button onPress={calculateHealth}>Calculate Health</Button>
        <Button onPress={resetMachineValues} variant="secondary">
          Reset Machine Data
        </Button>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: DEFAULT_APP_CONTENT_PADDING,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: colorText,
  },
  title2: {
    fontSize: 17,
    fontWeight: "bold",
    color: colorText,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  text: {
    color: colorText,
  },
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: colorSecondary,
  },
  resetButton: {
    marginTop: 10,
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "flex-end",
    width: "100%",
    paddingBottom: 8,
  },
});

export default MachineState;
