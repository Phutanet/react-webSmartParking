import React, { useEffect, useRef } from "react";
import { Outlet } from "react-router-dom";


const AuthProtectedComponent = () => {
    const firstRender = useRef(true)
    const items = localStorage.getItem('accessToken')

    useEffect(() => {
        if (firstRender.current) {
            firstRender.current = false;

            async function isAuth() {
                //กรณีไม่มี accessToken
                if (items === null) {
                    window.location.href='/EXT/login'
    
                    //กรณีที่มี accessToken
                } else {
                    const token = { accessToken: `${localStorage.getItem("accessToken")}` };
                    const body = {}
    
                    let res = await fetch("/smartparking/auth/validate", {
                        method: 'POST',
                        headers: token,
                        body: body
                    });
                    // console.log("res =", res)
                    const data = await res.json()
                    // console.log("data =", data)
    
                    //ตรวจสอบ accessToken ที่มีจาก response.status
                    if (res.status === 200) {
                        localStorage.setItem('email', data.email);
                    
                    } else {
                        localStorage.removeItem("accessToken")
                        localStorage.removeItem("role")
                        localStorage.removeItem("email")
                        window.location.href='/EXT/login'
                    }
                }
            }
            isAuth()
        }
    }, [items])
    return (<Outlet />)
}

export default AuthProtectedComponent