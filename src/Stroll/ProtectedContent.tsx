import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
export default function ProtectedContent({ children }: { children: any }) {
    //checking if someone is logged in
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  if (currentUser) {
    //render child
    return children;
  } else {
    //return nofing
    return null;
  }
}
