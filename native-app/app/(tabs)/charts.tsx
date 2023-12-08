import { Dimensions, StyleSheet, Text } from "react-native";
import { LineChart } from "react-native-chart-kit";

import reactotron from "reactotron-react-native";
import Loading from "../../components/Loading";
import { View } from "../../components/Themed";
import {
  colorPrimary,
  colorSecondary,
  colorText,
} from "../../constants/Colors";
import { useAppSelector } from "../../hooks";
import {
  getFetchMachineHistoryStatus,
  getMachineHistory,
} from "../../stores/slices";

export default function ChartTab() {
  const machineHistory = useAppSelector(getMachineHistory);
  const fetchMachineHistoryStatus = useAppSelector(
    getFetchMachineHistoryStatus
  );

  const labels = machineHistory
    .map(({ created_at }) => new Date(created_at).toLocaleTimeString())
    .slice(0)
    .slice(-5);

  const factoryScore = machineHistory
    .map(({ machine_health }) => machine_health.factory)
    .slice(0)
    .slice(-5);

  if (reactotron.log) {
    reactotron.log(factoryScore);
  }

  const isLoading = fetchMachineHistoryStatus === "loading";

  return (
    <View style={styles.container}>
      <View style={styles.separator} />

      {isLoading && <Loading />}

      {machineHistory.length > 0 && !isLoading && (
        <>
          <Text style={styles.title}>Latest 5 factory score records</Text>

          <LineChart
            data={{
              labels,
              datasets: [
                {
                  data: factoryScore,
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.9} // from react-native
            height={320}
            yAxisInterval={1} // optional, defaults to 1
            withShadow
            chartConfig={{
              backgroundGradientFrom: colorSecondary,
              backgroundGradientTo: colorPrimary,
              decimalPlaces: 1, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16,
              },
              propsForDots: {
                r: "5",
                strokeWidth: "2",
                stroke: "#c3dad2",
              },
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16,
            }}
          />
        </>
      )}

      {machineHistory.length <= 0 && !isLoading && (
        <Text style={styles.title}>
          No records found! Try to add params and calculate the health to start
          loading data to see the trends chart.
        </Text>
      )}
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
    color: colorText,
  },
  separator: {
    marginVertical: 20,
    height: 1,
    width: "80%",
  },
});
