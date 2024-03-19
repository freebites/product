import { Text, View, StyleSheet, Image } from "react-native";

const placeholder = require(" ../../../assets/icons/freebites/placeholder.png");
const choosephoto = require(" ../../../assets/icons/choosephoto.png");
const camera = require(" ../../../assets/icons/camera.png");
const trash = require(" ../../../assets/icons/trash.png");

const EditModal = () => {
  return (
    <View style={styles.container}>
      <Image
        source={placeholder}
        style={{
          width: "40%",
          height: "25%",
          resizeMode: "contain",
          marginBottom: 10,
        }}
      />
      <View
        style={{
          width: "25%",
          height: 4,
          backgroundColor: "#F19D48",
          borderRadius: 5,
          marginBottom: 15,
        }}
      ></View>

      <View style={styles.modalRow}>
        <View style={styles.modalColumns}>
          <Image source={choosephoto} />
          <Text style={{ color: "#505A4E" }}>Photo Album</Text>
        </View>
        <View style={styles.modalColumns}>
          <Image source={camera} />
          <Text style={{ color: "#505A4E" }}>Take a Photo</Text>
        </View>
        <View style={styles.modalColumns}>
          <Image source={trash} style={{}} />
          <Text style={{ color: "#505A4E" }}>Remove Photo</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    flexDirection: "column",
    alignItems: "center",
  },
  modalColumns: {
    flexDirection: "column",
    alignItems: "center",
  },
  modalRow: {
    marginLeft: 10,
    flexDirection: "row",
    gap: 50,
    alignItems: "center",
    justifyContent: "space-between",
  },
});
export default EditModal;
