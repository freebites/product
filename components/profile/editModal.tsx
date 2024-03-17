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

      <View style={{ flexDirection: "row", gap: 50, flex: 1 }}>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image source={choosephoto} />
          <Text style={{ color: "#505A4E" }}>Photo Album</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
          <Image source={camera} />
          <Text style={{ color: "#505A4E" }}>Take a Photo</Text>
        </View>
        <View style={{ flexDirection: "column", alignItems: "center" }}>
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
  image: {},
  editIcons: {},
});
export default EditModal;
// import React, {
//   forwardRef,
//   useCallback,
//   useMemo,
//   useRef,
//   useState,
// } from "react";
// import { View, Text, StyleSheet, Button } from "react-native";
// import {
//   BottomSheetModal,
//   BottomSheetView,
//   BottomSheetModalProvider,
// } from "@gorhom/bottom-sheet";
// import ModalBackdrop from "../common/ModalBackdrop";
// import { BottomSheetMethods } from "@gorhom/bottom-sheet/lib/typescript/types";

// const EditModal = React.forwardRef<any>((props, ref) => {
//   // const bottomSheetModalRef = props.ref;
//   const snapPoints = useMemo(() => ["15%", "35%"], []);

//   // const handleImagePress = () => {
//   //   bottomSheetModalRef.current?.present();
//   // };
//   // const handleSheetChanges = useCallback((index: number) => {}, []);

//   // renders
//   return (
//     <BottomSheetModalProvider>
//       <BottomSheetModal
//         backdropComponent={ModalBackdrop}
//         ref={ref}
//         index={1}
//         snapPoints={snapPoints}
//       >
//         <BottomSheetView style={styles.contentContainer}>
//           <Text>Awesome 🎉</Text>
//         </BottomSheetView>
//       </BottomSheetModal>
//     </BottomSheetModalProvider>
//   );
// });

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 24,
//     justifyContent: "center",
//     backgroundColor: "grey",
//   },
//   contentContainer: {
//     flex: 1,
//     alignItems: "center",
//   },
// });

// export default EditModal;
