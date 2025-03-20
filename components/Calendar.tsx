"use client"
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";
export default function Calendar() {
useEffect(()=>{
    (async function () {
    const cal = await getCalApi({"namespace":"booking"});
    cal("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
    })();
}, [])
return <Cal namespace="booking"
    calLink="atl-throne-chairs/booking"
    style={{width:"100%",height:"100%",overflow:"scroll"}}
    config={{"layout":"month_view"}}/>;
};
  