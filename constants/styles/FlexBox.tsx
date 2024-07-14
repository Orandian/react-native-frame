import { StyleSheet } from "react-native";

const flexBox = StyleSheet.create({
    row: {
        flexDirection: "row",
    },
    column: {
        flexDirection: "column",
    },
    center: {
        justifyContent: "center",
        alignItems: "center",
    },
    spaceBetween: {
        justifyContent: "space-between",
    },
    spaceAround: {
        justifyContent: "space-around",
    },
    spaceEvenly: {
        justifyContent: "space-evenly",
    },
    alignStart: {
        alignItems: "flex-start",
    },
    alignEnd: {
        alignItems: "flex-end",
    },
    alignCenter: {
        alignItems: "center",
    },
    justifyStart: {
        justifyContent: "flex-start",
    },
    justifyEnd: {
        justifyContent: "flex-end",
    },
    stretch: {
        alignItems: "stretch",
    },
    wrap: {
        flexWrap: "wrap",
    },
    noWrap: {
        flexWrap: "nowrap",
    },
    grow: {
        flexGrow: 1,
    },
    shrink: {
        flexShrink: 1,
    },
    basisAuto: {
        flexBasis: "auto",
    },
    basisZero: {
        flexBasis: 0,
    },
});

export default flexBox;