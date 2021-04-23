import React from "react";
import { useLocation } from "react-router";

const useQuery = () => {
    return new URLSearchParams(useLocation().search);
};

export default function ResellerQuery() {
    const reseller = useQuery().get("reseller");

    if (reseller) {
        console.log("reseller", reseller);
        localStorage.setItem("tilak-reseller-code", reseller);
    }

    return null;
}
