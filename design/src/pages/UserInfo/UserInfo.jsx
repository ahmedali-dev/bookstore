import React from "react"
import Informations from "../Informations/Informations";
import Orders from "../orders/orders";
import Address from "../address/Address";
import Checkout from "../checkout/Checkout";

const UserInfo = ()=>{
    return(
        <div className="userinfo">
            {/* <Informations/> */}
            {/* <Orders/> */}
            {/* <Address/> */}
            <Checkout/>
        </div>
    )
}

export default UserInfo;