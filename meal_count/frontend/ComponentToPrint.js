import CreateTable from "./CreateTable";
import React from "react";
import { render } from "react-dom";

export default class ComponentToPrint extends React.Component {
    render() {
        return (
            <CreateTable data = {this.props.data} />
        );
    }
}