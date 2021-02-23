import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Dropdown } from "semantic-ui-react";
import { setCurrency } from "../../actions/currency.action";
import "./DropDown.css";

const countryOptions = [
    { key: "eu", value: "EUR", flag: "eu", text: "Europeanunion" },
    { key: "in", value: "INR", flag: "in", text: "India" },
    { key: "uk", value: "GBP", flag: "uk", text: "United Kingdom" },
    { key: "us", value: "USD", flag: "us", text: "United States" },
];

const DropdownExampleSearchSelection = () => {
    const dispatch = useDispatch();
    const { currency } = useSelector((state) => state.currency);

    return (
        <Dropdown
            id="dropdown"
            placeholder="Select Country"
            fluid
            search
            selection
            value={currency}
            options={countryOptions}
            onChange={(e, { value }) => {
                dispatch(setCurrency(value));
            }}
        />
    );
};

export default DropdownExampleSearchSelection;
