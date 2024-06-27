import { View, Text, Button, StyleSheet } from "react-native";
import React, {
  forwardRef,
  useCallback,
  useContext,
  useMemo,
  useRef,
  useImperativeHandle,
  useEffect,
} from "react";
import BottomSheet, {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { BottomSheetModalMethods } from "@gorhom/bottom-sheet/lib/typescript/types";
import FilterList from "./FilterList";
import { BottomSheetDefaultBackdropProps } from "@gorhom/bottom-sheet/lib/typescript/components/bottomSheetBackdrop/types";

const SearchModal = forwardRef<BottomSheetModalMethods, any>((props, ref) => {
  // variables
  const snapPoints = useMemo(() => ["95%"], []);
  const handleSheetChanges = useCallback((index: number) => {}, []);


  // backdrop component
  const renderBackdrop = useCallback(
    (
      props: React.JSX.IntrinsicAttributes & BottomSheetDefaultBackdropProps
    ) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0} // Updated to match the index when the modal is open
        disappearsOnIndex={-1} // Updated to match the index when the modal is closed
      />
    ),
    []
  );

  // renders
  return (
    <BottomSheetModal
      ref={ref}
      index={0}
      snapPoints={snapPoints}
      onChange={handleSheetChanges}
      backdropComponent={renderBackdrop}
      enablePanDownToClose={true}
      backgroundComponent={null}
      handleIndicatorStyle={{ display: "none" }}
    >
      <BottomSheetView style={styles.contentContainer}>
        <FilterList/>
      </BottomSheetView>
    </BottomSheetModal>
  );
});

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: "center",
    backgroundColor: "grey",
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
  },
});

export default SearchModal;
