import React from "react";
import { BrowserRouter } from "react-router-dom";
import REGISTER from "./Register";

export default {
  title: "Components/Register",
  component: REGISTER,
  decorators: [
    (story) => (
      <BrowserRouter>
        {story()}
      </BrowserRouter>
    ),
  ],
};

export const Default = () => <REGISTER />;
