import { Link, useFocusEffect } from "expo-router";
import { useCallback } from "react";
import { Button, StyleSheet } from "react-native";
import Loading from "../../components/Loading";
import { MachineScore } from "../../components/MachineScore";
import { PartsOfMachine } from "../../components/PartsOfMachine";
import { Text, View } from "../../components/Themed";
import { useAppDispatch, useAppSelector } from "../../hooks";
import {
  fetchMachineHealthAsync,
  getFetchMachineHealthStatus,
  getMachineHealth,
} from "../../stores/slices";
import { useMachineData } from "../useMachineData";

export default function StateScreen() {
  const { machineData, resetMachineData, loadMachineData } = useMachineData();
  const machineHealth = useAppSelector(getMachineHealth);
  const fetchMachineHealthStatus = useAppSelector(getFetchMachineHealthStatus);
  const dispatch = useAppDispatch();

  //Doing this because we're not using central state like redux
  useFocusEffect(
    useCallback(() => {
      loadMachineData();
    }, [])
  );

  const calculateHealth = useCallback(async () => {
    try {
      await dispatch(fetchMachineHealthAsync(machineData));
    } catch (error) {
      console.error(error);
      console.log(
        `There was an error calculating health. ${
          error.toString() === "AxiosError: Network Error"
            ? "Is the api server started?"
            : error
        }`
      );
    }
  }, [machineData]);

  const isLoading = fetchMachineHealthStatus === "loading";

  return (
    <View style={styles.container}>
      <View style={styles.separator} />
      {isLoading && <Loading />}

      {!machineData && (
        <Link href="/two" style={styles.link}>
          <Text style={styles.linkText}>
            Please log a part to check machine health
          </Text>
        </Link>
      )}
      {machineData && (
        <>
          <PartsOfMachine
            machineName={"Welding Robot"}
            parts={machineData?.machines?.weldingRobot}
          />
          <PartsOfMachine
            machineName={"Assembly Line"}
            parts={machineData?.machines?.assemblyLine}
          />
          <PartsOfMachine
            machineName={"Painting Station"}
            parts={machineData?.machines?.paintingStation}
          />
          <PartsOfMachine
            machineName={"Quality Control Station"}
            parts={machineData?.machines?.qualityControlStation}
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
      <Button title="Calculate Health" onPress={calculateHealth} />
      <View style={styles.resetButton}>
        <Button
          title="Reset Machine Data"
          onPress={async () => await resetMachineData()}
          color="#FF0000"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  title2: {
    fontSize: 17,
    fontWeight: "bold",
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
  text: {},
  link: {
    paddingBottom: 15,
  },
  linkText: {
    fontSize: 14,
    color: "#2e78b7",
  },
  resetButton: {
    marginTop: 10,
  },
});
